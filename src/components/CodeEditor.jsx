import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import "monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js";

const OutputDisplay = ({ content }) => {
  let terminalColor = 'text-white';

  if (content.exit_code == 1) {
    terminalColor = 'text-red-500';
  } else {
    terminalColor = 'text-green-500';
  }

  return (
    <div
      className={"p-3 font-mono overflow-y-auto h-64 text-left whitespace-pre-wrap bg-zinc-900 w-full " + terminalColor} >
      {content.output}
    </div >
  )
}

const defaultSpec = `RSpec.describe 'My First Spec' do 
  it "is not correct" do 
    expect(1+1).to eq(3)
  end

  it "is correct" do 
    expect(1+1).to eq(2)
  end
end`;

const CodeEditor = () => {
  const workerRef = useRef(null);
  const testEditor = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");

  useEffect(() => {
    const worker = new Worker(
      new URL("../ruby.worker.js", import.meta.url),
      { type: "module" }
    );

    workerRef.current = worker;

    worker.onmessage = (event) => {
      const { type, result } = event.data;

      if (type == 'READY') {
        console.log('RUBY VM ready');
      }

      if (type === 'DONE') {
        setTerminalOutput(result)
        setIsRunning(false);
      }

      if (type == 'ERROR') {
        setTerminalOutput(result);
        setIsRunning(false);
      }
    }

    return () => { worker.terminate(); }
  }, [])

  const runTestsClickHandler = (_) => {
    if (isRunning) return;

    setIsRunning(true);

    workerRef.current.postMessage({
      type: 'RUN',
      spec: testEditor.current.getValue()
    })
  }

  const resetClickHandler = (_) => {
    testEditor.current.setValue(defaultSpec);
  }

  const onMountTestEditor = (editor) => {
    testEditor.current = editor;
  }

  return (
    <>
      <Editor
        ref={testEditor}
        height="50vh"
        width="50vw"
        theme="vs-dark"
        defaultLanguage="ruby"
        defaultValue={defaultSpec}
        options={{
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          tabSize: 2,
          formatOnType: true,
          insertSpaces: true,
          autoIndent: "advanced",
          scrollbar: { vertical: "hidden" },
        }}
        onMount={onMountTestEditor}
      />
      <p className="text-left">Output:</p>
      <OutputDisplay
        content={terminalOutput} />
      <div>
        <button
          className={`${isRunning ? 'bg-slate-300' : 'bg-green-500'} px-4 py-3 rounded text-white cursor-pointer`}
          disabled={isRunning}
          onClick={(_) => runTestsClickHandler()}
        >Run Tests</button>
        <button
          className="bg-slate-300 px-4 py-3 rounded text-black cursor-pointer"
          onClick={resetClickHandler}
        >Reset</button>
      </div>
    </>
  )
}

export default CodeEditor;
