import { Component } from 'react';
import Container from './components/Container';
import SearchForm from './components/SearchForm';
import ArticlesList from './components/ArticlesList';
import ShowMoreButton from './components/ShowMoreButton';
import newsApi from './services/news-api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      searchQuery: '',
      currentPage: 1,
      error: '',
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchArticles();
    }
  }

  resetAppState = query => {
    this.setState({
      articles: [],
      searchQuery: query,
      currentPage: 1,
      error: '',
    });
  };

  fetchArticles = () => {
    const { searchQuery, currentPage } = this.state;

    const options = {
      searchQuery,
      currentPage,
    };

    this.setState({ isLoading: true });

    newsApi
      .fetchArticles(options)
      .then(articles => {
        this.setState(prevState => ({
          articles: [...prevState.articles, ...articles],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(({ response }) => this.setState({ error: response.data.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { articles, isLoading } = this.state;
    const shouldRenderShowMoreButton = articles.length > 0 && !isLoading;

    return (
      <Container>
        <h1>Breaking News</h1>
        <SearchForm onSubmit={this.resetAppState} />
        <ArticlesList articles={articles} />
        {shouldRenderShowMoreButton && (
          <ShowMoreButton onClick={this.fetchArticles} />
        )}
        {isLoading && <p>Loading...</p>}
      </Container>
    );
  }
}

export default App;
