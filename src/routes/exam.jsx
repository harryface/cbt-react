import { useParams } from "react-router-dom";
import { getExams } from "../data";

export default function Exam() {
  let params = useParams();
  let exam = getExams(parseInt(params.examId, 10));
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {exam.amount}</h2>
      <p>
        {exam.name}: {exam.number}
      </p>
      <p>Due Date: {exam.due}</p>
    </main>
  )
}