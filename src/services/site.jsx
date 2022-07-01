import api from "./api";

const submitAnswer = (answers) => {
  // answers is a list.
  return api.post("/core/answer/", answers)
};

const getExams = () => {
  return api.get("/core/exam/");
};

const getExam = (id) => {
  return api.get(`/core/exam/${id}/`);
};

const createExam = (exam) => {
  // exam is an object.
  return api.post("/core/exam/", exam)
};

const patchExam = (exam) => {
  // exam is an object.
  return api.patch("/core/exam/", exam)
};

const deleteExam = (id) => {
  return api.delete(`/core/exam/${id}/`);
};

const getResult = (id) => {
  return api.get(`/core/exam/${id}/result/`);
};


const SiteService = {
  submitAnswer,
  createExam,
  patchExam,
  deleteExam,
  getExam,
  getExams,
  getResult,
};

export default SiteService;