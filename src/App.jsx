import "./App.css";
import "monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetController2.js";
import MainPage from "./pages/MainPage";
import Exercise from "./pages/Exercise";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/exercise/:id" element={<Exercise />} />
      </Routes>
    </>
  );
}

export default App;
