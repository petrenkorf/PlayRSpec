import "./App.css";
import "monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js";
import CodeEditor from "./components/CodeEditor";

const App = () => {
  return (
    <>
      <header className="bg-zinc-800 text-white py-4">
        <span>Back to Exercises</span>
        <span>Exercise Name</span>
      </header>
      <div className="bg-zinc-800 size-full grid grid-cols-2">
        <div>
          Exercise Content
        </div>
        <div><CodeEditor /></div>
      </div>
    </>
  );
}

export default App;
