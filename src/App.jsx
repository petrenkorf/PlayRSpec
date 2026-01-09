import { useRef, useState, useEffect } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";
import "monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js";
import CodeEditor from "./components/CodeEditor";


const OutputDisplay = ({ content }) => {
  let terminalColor = 'text-white';

  if (content.exit_code == 1) {
    terminalColor = 'text-red-500';
  } else {
    terminalColor = 'text-green-500';
  }

  return (
    <div
      className={"overflow-y-auto h-64 text-left whitespace-pre-wrap bg-zinc-900 w-full " + terminalColor} >
      {content.output}
    </div >
  )
}

const App = () => {
  return (
    <>
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
