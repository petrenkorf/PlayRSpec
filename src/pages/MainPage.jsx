import { Link } from "react-router-dom"

const Home = () => {
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

export default Home;
