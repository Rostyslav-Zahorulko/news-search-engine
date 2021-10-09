import axios from 'axios';

const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

axios.defaults.baseURL = 'https://newsapi.org';
axios.defaults.headers.common['Authorization'] = `Bearer ${newsApiKey}`;

const fetchArticles = ({ searchQuery, currentPage, articlesPerPage = 5 }) =>
  axios
    .get(
      `/v2/everything?q=${searchQuery}&page=${currentPage}&pageSize=${articlesPerPage}`,
    )
    .then(({ data }) => data.articles);

const newsApi = {
  fetchArticles,
};

export default newsApi;
