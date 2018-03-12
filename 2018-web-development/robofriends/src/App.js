import React from 'react';
import Title from './Title';
import SearchBox from './SearchBox';
import CardList from './CardList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: '',
    };
  }
  render() {
    return (
      <div>
        <Title />
        <SearchBox searchChange={this.onSearchChange} />
        <CardList filter={this.state.filter} />
      </div>
    );
  }

  // Message handlers, need ES6 syntax or the 'this' reference is incorrect
  onSearchChange = (event) => {
    this.setState({ filter: event.target.value });
  }
}

export default App;
