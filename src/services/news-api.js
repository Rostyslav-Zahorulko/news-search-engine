import axios from 'axios';

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

axios.defaults.baseURL = 'https://newsapi.org';
axios.defaults.headers.common['Authorization'] = `Bearer ${newsApiKey}`;

const fetchArticles = (query, page) =>
  axios
    .get(`/v2/everything?q=${query}&page=${page}&pageSize=5`)
    .then(({ data }) => data.articles);

const newsApi = {
  fetchArticles,
};

export default newsApi;
