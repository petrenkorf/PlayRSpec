import { Link, useParams } from "react-router-dom"
import CodeEditor from "../components/CodeEditor";
import lessons from "../Lessons";

const Exercise = () => {
  let params = useParams();

  return (
    <div>
      <header className="bg-zinc-800 text-white py-4">
        <Link to="/">Back to Exercises</Link> <span>{lessons[params.id - 1].title}</span>
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
