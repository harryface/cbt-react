import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Body from "../components/body";

export default function Quizes() {
  let activeClassName = "pagination-link is-current";
  const [quizes, setQuizes] = useState(false);

  useEffect(() => {
    //Calls endpoint to retrieve quiz
    fetch("http://127.0.0.1:8000/quizes/me")
      .then((res) => res.json())
      .then((json) => {
        setQuizes(json);
      });
  }, []);

  return (
    <Body>
      <Outlet />
      <div className="column">
        <nav
          className="pagination is-small is-centered pt-4"
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">
            {quizes.map((quiz) => (
              <Link
                className={({ isActive }) =>
                  isActive ? activeClassName : "pagination-link"
                }
                to={`/quiz/${quiz.number}`}
                key={quiz.number}
              >
                {quiz.number}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </Body>
  );
}
