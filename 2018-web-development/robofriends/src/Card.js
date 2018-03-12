import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super();
    this.name = props.name;
    this.email = props.email;
  }
  render() {
    return (
      <div className='bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 tc w5 f7'>
        <img src={`https://robohash.org/set_set3/${this.email}?size=200 x200`} alt='Robots' />
        <div>
          <h2>{this.name}</h2>
          <p>{this.email}</p>
        </div>
      </div>
    );
  }
}

export default Card;
