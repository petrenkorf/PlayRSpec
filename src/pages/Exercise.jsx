import { Link, useParams } from "react-router-dom"
import CodeEditor from "../components/CodeEditor";
import lessons from "../Lessons";

const Exercise = () => {
  let params = useParams();

  const lessonId = params.id - 1;

  return (
    <div className="bg-[#171922] bg-zinc-600 h-[100vh]">
      <header className="text-white p-4 border-b border-zinc-700 flex flex-row justify-between">
        <Link to="/">Back to Exercises</Link>
        <span className="italic">{lessons[lessonId].title}</span>
        <p>Config</p>
      </header>
      <div className="size-full grid grid-cols-2 text-white">
        <div>
          {lessons[lessonId].description}
        </div>
        <div><CodeEditor /></div>
      </div>
    </div>
  )
}

export default Exercise;
