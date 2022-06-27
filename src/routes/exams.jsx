import { Outlet, useSearchParams } from "react-router-dom";
import { getExams } from "../data";
import { QueryNavLink } from "../helpers/querynavlink";

export default function Exams() {
  let exams = getExams();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />

        {exams
          .filter((exam) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = exam.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((exam) => (
            <QueryNavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              })}
              to={`/exams/${exam.number}`}
              key={exam.number}
            >
              {exam.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
