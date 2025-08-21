import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getQuestions = (params) => api.get('/questions', { params });
export const saveResult = (resultData) => {
  console.log("Sending result data:", resultData);
  return api.post('/results', resultData);
};
export const getResultsHistory = () => api.get('/results');
export const deleteResult = (id) => api.delete(`/results/${id}`);
export const getQuestionsByIds = (ids) => api.post('/questions/by-ids', { ids });
export const getResultById = (id) => api.get(`/results/${id}`);

export default api;