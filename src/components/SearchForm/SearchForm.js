import { Component } from 'react';

class SearchForm extends Component {
  state = {
    text: '',
  };

  handleInputChange = e => {
    this.setState({ text: e.currentTarget.value });
  };

  handleFormSubmit = e => {
    const { text } = this.state;
    const { onSubmit } = this.props;

    e.preventDefault();

    if (text) {
      onSubmit(text);
      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state;

    return (
      <form autoComplete="off" onSubmit={this.handleFormSubmit}>
        <label>
          Find what you want
          <input type="text" value={text} onChange={this.handleInputChange} />
        </label>
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
