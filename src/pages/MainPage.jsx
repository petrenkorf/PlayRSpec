import { Link } from "react-router-dom"
import lessons from "../Lessons"
import logo from "../assets/PlayRSpec.png"

const ExerciseCard = ({ id, title, description, available }) => {
  const isAvailable = id <= 15;

  return (
    <Link
      to={`/exercise/${id}`}
      className={`text-white ${isAvailable ? "hover:y-[-5px]" : "opacity-25 cursor-auto"}`}
      onClick={(e) => { if (!isAvailable) e.preventDefault() }}
    >
      <div className="text-left bg-zinc-600 p-4 my-2 border border-zinc-600 rounded-md h-[85px]">
        <p className="font-bold">{id} - {title}</p>
        <p>{description}</p>
      </div>
    </Link>
  )
}

const MainPage = () => {
  return (
    <div className="bg-[#171922]">
      <img src={logo} className="m-auto" />

      <div className="grid grid-cols-1 max-w-[960px] m-auto">
        {lessons.map((lesson) => (<ExerciseCard key={lesson.id} {...lesson} />))}
      </div>
    </div>
  )
}

export default MainPage;
