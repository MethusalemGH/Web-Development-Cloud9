import React from 'react';

class Ranking extends React.Component {
  render = () => {
    return (
      <div className='pb4 ph2'>
        <div className='RankHeading f3'>
          {`${this.props.name}, your current number of entries is ...`}
        </div>
        <div className='Ranking f3'>
          {`${this.props.entries}`}
        </div>
      </div>
    );
  }
}

export default Ranking;
