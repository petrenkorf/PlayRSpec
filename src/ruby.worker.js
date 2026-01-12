let vm; 

async function initVM() {
  const { DefaultRubyVM } = await import(
    "https://cdn.jsdelivr.net/npm/@ruby/wasm-wasi@2.8.1/dist/browser/+esm"
  );
  const wasm = await fetch("/PlayRSpec/base.wasm");
  const module = await WebAssembly.compileStreaming(wasm);
  const result = await DefaultRubyVM(module);

  vm = result.vm

  vm.eval(`
    require 'js'
    require 'rspec'
    require 'stringio'
    require 'json'

    if RSpec::Core::ExampleGroup.const_defined?(:DEFAULT_FAILURE_NOTIFIER)
      RSpec::Core::ExampleGroup.send(:remove_const, :DEFAULT_FAILURE_NOTIFIER)
    end

    RSpec::Core::ExampleGroup::DEFAULT_FAILURE_NOTIFIER =
      proc { |_f, _o| }
  `);

  self.postMessage({type: 'READY'});
}

initVM();

self.onmessage = async (event) => {
  const { type, spec } = event.data;

  if (!vm) {
    self.postMessage({type: 'ERROR', message: 'VM not ready'});
    return;
  }

  if (type == 'RUN') {
    try {
      const result = vm.eval(`
        RSpec.clear_examples 
        RSpec.reset
        code = <<~RUBY 
          ${spec}

          output = StringIO.new
          $stdout = output
          $stderr = output

          config = RSpec.configuration
          config.output_stream = output
          config.error_stream  = output
          config.full_backtrace = false

          runner = ::RSpec::Core::Runner.new(config)
          exit_code = runner.run_specs(::RSpec.world.ordered_example_groups)
        
          $stdout = STDOUT
          $stderr = STDERR

          JSON.generate({
            exit_code: exit_code,
            output: output.string
          })
        RUBY

        eval(code, binding, "editor_spec.rb", 1)
      `)

      const parsed_output = JSON.parse(result);

      self.postMessage({
        type: 'DONE',
        result: parsed_output
      });
    } catch (err) {
      self.postMessage({
        type: 'ERROR',
        result: {
          exit_code: 1,
          output: err.message
        }
      })
    }
  }
}

