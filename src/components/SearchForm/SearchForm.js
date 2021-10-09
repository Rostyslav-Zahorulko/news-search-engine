import { Component } from 'react';

class SearchForm extends Component {
  state = {
    text: '',
  };

  handleChange = e => {
    this.setState({ text: e.currentTarget.value });
  };

  handleSubmit = e => {
    const { text } = this.state;
    const { onSubmit } = this.props;

    e.preventDefault();

    if (text) {
      const options = {
        query: text,
        page: 1,
      };

      onSubmit(options);
      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state;

    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <label>
          Find what you want
          <input type="text" value={text} onChange={this.handleChange} />
        </label>
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
