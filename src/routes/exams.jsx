import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SiteService from "../services/site";
import Body from "../components/body";
import eventBus from "../services/common/eventbus";

export default function Exams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    retrieveExams();
  }, []);

  const retrieveExams = () => {
    SiteService.getExams()
      .then((response) => {
        setExams(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // eventBus.dispatch("logout");
          console.log("unautorised")
        }
        Swal.fire({
          icon: "error",
          title: "Something is wrong",
          text: "Please Try Back Later",
        });
      });
  };

  return (
    <Body>
      <div className="columns is-multiline is-variable">
        {exams.length ? (exams.map((exam) => (
          <div key={ exam.id } className="column is-4">
            <article className="panel is-info">
              <p className="panel-heading">{exam.title}</p>
              <div className="panel-block is-active">
                <p>
                  {" "}
                  <strong>Duration: </strong> {exam.duration}{" "}
                </p>
              </div>
              <div className="panel-block is-active">
                <p>
                  {" "}
                  <strong>Instructions: </strong> {exam.instructions}{" "}
                </p>
              </div>
              <div className="panel-block is-active">
                <p>
                  {" "}
                  <strong>Questions: </strong> {exam.questions.length}{" "}
                </p>
              </div>
              <div className="panel-block">
                <Link
                  className="button is-link is-outlined is-fullwidth"
                  to={`/exam/${exam.id}`}
                  key={exam.id}
                >
                  Start Exam
                </Link>
              </div>
            </article>
          </div>
        ))) : <p>No exams for you</p>}
      </div>

    </Body>
  );
}
