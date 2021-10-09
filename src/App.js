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

  getArticles = ({ query, page }) => {
    this.setState({
      articles: [],
      searchQuery: query,
      isLoading: true,
      error: '',
    });

    newsApi
      .fetchArticles(query, page)
      .then(articles =>
        this.setState({
          articles,
          currentPage: page + 1,
        }),
      )
      .catch(({ response }) => this.setState({ error: response.data.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  getMoreArticles = () => {
    const { searchQuery, currentPage } = this.state;

    this.setState({ isLoading: true, error: '' });

    newsApi
      .fetchArticles(searchQuery, currentPage)
      .then(articles =>
        this.setState(prevState => ({
          articles: [...prevState.articles, ...articles],
          currentPage: prevState.currentPage + 1,
        })),
      )
      .catch(({ response }) => this.setState({ error: response.data.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { articles, isLoading } = this.state;
    const shouldRenderShowMoreButton = articles.length > 0 && !isLoading;

    return (
      <Container>
        <h1>Breaking News</h1>
        <SearchForm onSubmit={this.getArticles} />
        <ArticlesList articles={articles} />
        {shouldRenderShowMoreButton && (
          <ShowMoreButton onClick={this.getMoreArticles} />
        )}
        {isLoading && <p>Loading...</p>}
      </Container>
    );
  }
}

export default App;
