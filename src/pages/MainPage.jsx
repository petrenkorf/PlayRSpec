import { Link } from "react-router-dom"
import lessons from "../Lessons"

const ExerciseCard = ({ id, title }) => {
  return (
    <Link to={`/exercise/${id}`}>
      <div className="p-4 border border-slate-200 rounded-md w-[240px] h-[85px]">
        {title}
      </div>
    </Link>
  )
}

const MainPage = () => {
  return (
    <div className="bg-zinc-800">
      <span>List Exercises</span>

      <div className="grid grid-cols-3 max-w-[960px]">
        {lessons.map((lesson) => (
          <ExerciseCard key={lesson.id} {...lesson} />
        ))}
      </div>
    </div>
  )
}

export default MainPage;
