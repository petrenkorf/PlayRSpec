import { DefaultRubyVM } from "https://cdn.jsdelivr.net/npm/@ruby/wasm-wasi@2.8.1/dist/browser/+esm";

let vm; 

async function initVM() {
  const wasm = await fetch("/PlayRSpec/base.wasm");
  const module = await WebAssembly.compileStreaming(wasm);
  const result = await DefaultRubyVM(module);

  vm = result.vm

  globalThis.onRubyDone = (type, payload) => {
    self.postMessage({ type, payload } );
  };

  vm.eval(`
    require 'js'
    require 'rspec'
  `);

  self.postMessage({type: 'READY'});
}

initVM();

self.onmessage = async (event) => {
  console.log("WORKER RECEIVED:", event.data);

  const { type, spec } = event.data;

  if (!vm) {
    self.postMessage({type: 'ERROR', message: 'VM not ready'});
    return;
  }

  if (type == 'RUN') {
    try {
      const result = vm.eval(`
        begin
          RSpec.clear_examples 
          RSpec.reset

          ${spec}

          runner = ::RSpec::Core::Runner.new(::RSpec.configuration)
          result = runner.run_specs(::RSpec.world.ordered_example_groups)

          # JS.global[:onRubyDone].call('DONE', result)
        rescue => e
          # JS.global[:onRubyDone].call('ERROR', e.message)
        end
      `)

      console.log("RUN finished, result:", result);

      self.postMessage({
        type: 'DONE',
        result: Number(result)
      });
    } catch (err) {
      self.postMessage({
        type: 'ERROR',
        message: err.message
      })
    }
  }
}

