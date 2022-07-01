import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SiteService from "../services/site";
import Body from "../components/body";
import eventBus from "../services/common/eventbus";

export default function Exam() {
  const params = useParams();
  const [exam, setExam] = useState({ questions: [] });
  const [answer, setAnswer] = useState([]);
  const [current, setCurrent] = useState({ id: 1 });

  useEffect(() => {
    retrieveExam();
  }, []);

  const retrieveExam = () => {
    SiteService.getExam(parseInt(params.examId, 10))
      .then((response) => {
        setExam(response.data);
        setCurrent(
          response.data?.questions[0] ? response.data.questions[0] : { id: 1 }
        );
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // eventBus.dispatch("logout");
        }
        Swal.fire({
          icon: "error",
          title: "Something is wrong",
          text: "Please Try Back Later",
        });
      });
  };

  const getQuestion = (event) => {
    const id = event.currentTarget.id;
    const question = exam.questions.find((question) => question.id === parseInt(id));
    setCurrent(question);
  };

  const addAnswer = (obj) => {
    /* If an answer was chosen, remove it and add the new. */
    setAnswer(...answer, obj);
  };

  return (
    <Body>
      <div className="columns is-multiline is-variable is-5 ">
        <div className="column  is-offset-9 is-3">
          <span className="tag is-primary">00: 00: 00</span>{" "}
          <strong>Remaining</strong>
        </div>

        <div className="column is-12">
          <div className="columns is-variable is-3 is-vcentered is-centered">
            <div className="column is-5">
              <p className="bd-notification is-primary  pr-5">
                {current.question}
              </p>
            </div>
            <div className="column is-4">
                {current.option_1 && (
                  <><button className="button is-outlined is-success is-fullwidth">
                    {current.option_1}
                  </button><br/></>
                )}
                {current.option_2 && (
                  <><button className="button is-success is-outlined is-fullwidth">
                    {current.option_2}
                  </button><br/></>
                )}
                {current.option_3 && (
                  <><button className="button is-success is-outlined is-fullwidth">
                    {current.option_3}
                  </button><br/></>
                )}
                {current.option_4 && (
                  <button className="button is-success is-outlined is-fullwidth">
                    {current.option_4}
                  </button>
                )}
                {current.option_5 && (
                  <><br/><button className="button is-success is-outlined is-fullwidth">
                    {current.option_5}
                  </button></>
                )}
            </div>
          </div>
        </div>
        <div className="column">
          <nav
            className="pagination is-small is-centered pt-4"
            role="navigation"
            aria-label="pagination"
          >
            <ul className="pagination-list">
              {exam?.questions.map((quiz, index) => (
                <button
                  id={quiz.id}
                  className={
                    current.id == quiz.id
                      ? "pagination-link is-current"
                      : "pagination-link"
                  }
                  onClick={getQuestion}
                  key={ index }
                >
                  { index + 1 }
                </button>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </Body>
  );
}
