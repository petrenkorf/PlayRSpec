import { useRef, useState, useEffect } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";
import "monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js";

const defaultSpec = `RSpec.describe 'My First Spec' do 
  1000.times do 
    it "is not correct" do 
      expect(1+1).to eq(2)
    end
  end
end`;

const App = () => {
  const workerRef = useRef(null);
  const testEditor = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const worker = new Worker(
      new URL("./ruby.worker.js", import.meta.url),
      { type: "module" }
    );

    workerRef.current = worker;

    worker.onmessage = (event) => {
      const { type, result, message } = event.data;

      if (type == 'READY') {
        console.log('RUBY VM ready');
      }

      if (type === 'DONE') {
        setIsRunning(false);
      }

      if (type == 'ERROR') {
        console.error(message)
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

  const onMountTestEditor = (editor) => {
    testEditor.current = editor;
  }

  return (
    <>
      <div className="bg-zinc-800 size-full">
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
          onMount={onMountTestEditor}
        />
        <button
          className={`${isRunning ? 'bg-slate-300' : 'bg-green-500'} px-4 py-3 rounded text-white cursor-pointer`}
          disabled={isRunning}
          onClick={(_) => runTestsClickHandler()}
        >Run Tests</button>
        <button>Reset</button>
      </div>
    </>
  );
}

export default App;
