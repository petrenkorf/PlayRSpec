import { useRef } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";
import "monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js";
import { DefaultRubyVM } from "https://cdn.jsdelivr.net/npm/@ruby/wasm-wasi@2.8.1/dist/browser/+esm";

const response = await fetch("https://cdn.jsdelivr.net/npm/@ruby/4.0-wasm-wasi@2.8.1/dist/ruby+stdlib.wasm");
const module = await WebAssembly.compileStreaming(response);
const { vm } = await DefaultRubyVM(module);

vm.eval(`
  require "js"
  JS.global[:document].write "Hello, world!"
`);

const defaultCode = `# Nothing to do here`;

const defaultSpec = `RSpec.describe 'My First Spec' do 
  it "is not correct" do 
    expect(1+1).to eq(3)
  end
end
`;


const ExercisePage = () => {
  const testEditor = useRef(null);
  const codeEditor = useRef(null);

  const onEditorMount = (editor, monaco) => {
    editor.onKeyDown((e) => {
      if (e.keyCode !== monaco.KeyCode.Enter) return;

      const model = editor.getModel();
      const pos = editor.getPosition();
      if (!model || !pos) return;

      const line = model.getLineContent(pos.lineNumber);

      const trimmed = line.trim();

      if (trimmed === "" || trimmed.startsWith("#")) {
        return;
      }

      const lineStartKeywords =
        /^\s*(def|class|module|if|unless|case|while|until|begin)\b/;

      const inlineDoKeyword = /\bdo\b(?!\s*end)/;

      const opensBlock =
        lineStartKeywords.test(line) || inlineDoKeyword.test(line);

      if (!opensBlock) return;

      e.preventDefault();
      e.stopPropagation();

      queueMicrotask(() => {
        const controller = editor.getContribution("snippetController2");
        controller?.insert("\n  $0\nend");
      });
    });
  };

  return (
    <>
      <Editor
        ref={codeEditor}
        height="50vh"
        width="49vw"
        theme="vs-dark"
        defaultLanguage="ruby"
        defaultValue={defaultCode}
        options={{
          minimap: { enabled: false },
          tabSize: 2,
          formatOnType: true,
          insertSpaces: true,
          autoIndent: "advanced",
          scrollbar: { vertical: "hidden" },
        }}
        onMount={onEditorMount}
      />
      <Editor
        ref={testEditor}
        height="50vh"
        width="49vw"
        theme="vs-dark"
        defaultLanguage="ruby"
        defaultValue={defaultSpec}
        options={{
          minimap: { enabled: false },
          tabSize: 2,
          formatOnType: true,
          insertSpaces: true,
          autoIndent: "advanced",
          scrollbar: { vertical: "hidden" },
        }}
        onMount={onEditorMount}
      />
      <button>Run Tests</button>
      <button>Reset</button>
    </>
  );
}

export default ExercisePage;
