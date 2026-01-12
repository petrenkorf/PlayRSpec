import { Link, useParams } from "react-router-dom"
import CodeEditor from "../components/CodeEditor";
import lessons from "../Lessons";

const Exercise = () => {
  let params = useParams();

  const lessonId = params.id - 1;

  return (
    <div>
      <header className="bg-zinc-800 text-white py-4">
        <Link to="/">Back to Exercises</Link> <span>{lessons[lessonId].title}</span>
      </header>
      <div className="bg-zinc-800 size-full grid grid-cols-2 text-white">
        <div>
          {lessons[lessonId].description}
        </div>
        <div><CodeEditor /></div>
      </div>
    </div>
  )
}

export default Exercise;
