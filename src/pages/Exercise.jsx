import { Link } from "react-router-dom"
import CodeEditor from "../components/CodeEditor";

const Exercise = () => {
  return (
    <div>
      <header className="bg-zinc-800 text-white py-4">
        <Link to="/">Back to Exercises</Link> <span>Exercise Name</span>
      </header>
      <div className="bg-zinc-800 size-full grid grid-cols-2">
        <div>
          Exercise Content
        </div>
        <div><CodeEditor /></div>
      </div>
    </div>
  )
}

export default Exercise;
