import "./App.css";
import "monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js";
import MainPage from "./pages/MainPage";
import Exercise from "./pages/Exercise";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import rubyLogo from "./assets/ruby.png";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/exercise/:id" element={<Exercise />} />
      </Routes>
      <div className="py-8 text-white">
        <p className="flex items-center justify-center gap-2">
          Made with
          <img
            src={reactLogo}
            alt="React"
            className="inline-block h-5 w-5"
          />
          and
          <img
            src={rubyLogo}
            alt="Ruby"
            className="inline-block h-5 w-5"
          />
          by Petris Rodrigo Fernandes
        </p>
      </div>
    </>
  );
}

export default App;
