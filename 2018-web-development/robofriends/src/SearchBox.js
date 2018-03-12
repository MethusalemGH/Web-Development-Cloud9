import React from 'react';

// Just a test, the styles should rather be in 'SearchBox.css'
const styles = {
  Search: {
    textAlign: 'center',
  },
  SomeOtherStyle: {
    color: 'red',
    textAlign: 'left',
  },
};

class SearchBox extends React.Component {
  render() {
    return (
      <div className='roboSearch pa1 ba2' style={styles.Search}>
        <input
          type='search'
          placeholder='Search Robots ...'
          className='pa3 ba b--light-blue bg-lightest-blue'
          onChange={this.props.searchChange}
        />
      </div>
    );
  }
}

export default SearchBox;
