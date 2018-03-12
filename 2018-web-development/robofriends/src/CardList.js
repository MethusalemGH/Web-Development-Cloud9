import React from 'react';
import Card from './Card';
import fetch from 'isomorphic-fetch';

class CardList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((fetchedUsers) => this.setState({ users: fetchedUsers }));
  }
  render() {
    const filter = this.props.filter.toLowerCase();
    const filteredUsers = this.state.users.filter((user) => user.name.toLowerCase().includes(filter));
    return (
      <div>{filteredUsers.map((user) => <Card key={user.id} name={user.name} email={user.email} />)}</div>
    );
  }
}

export default CardList;
