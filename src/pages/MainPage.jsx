import { Link } from "react-router-dom"

const MainPage = () => {
  return (
    <div>
      <span>List Exercises</span>

      <div>
        <Link to="/exercise/1">
          Exercício 1
        </Link>
      </div>
    </div>
  )
}

export default MainPage;
