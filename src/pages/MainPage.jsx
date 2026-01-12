import { Link } from "react-router-dom"
import lessons from "../Lessons"

const ExerciseCard = ({ id, title, description }) => {
  return (
    <Link to={`/exercise/${id}`} className="text-white">
      <div className="text-left bg-zinc-600 p-4 my-2 border border-zinc-600 rounded-md h-[85px]">
        <p className="text-bold">{title}</p>
        <p>{description}</p>
      </div>
    </Link>
  )
}

const MainPage = () => {
  return (
    <div className="bg-zinc-800">
      <span className="text-white">List Exercises</span>

      <div className="grid grid-cols-1 max-w-[960px] m-auto">
        {lessons.map((lesson) => (<ExerciseCard key={lesson.id} {...lesson} />))}
      </div>
    </div>
  )
}

export default MainPage;
