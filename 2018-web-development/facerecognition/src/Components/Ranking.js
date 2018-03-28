import React from 'react';

class Ranking extends React.Component {
  render = () => {
    return (
      <div className='pb4 ph2'>
        <div className='RankHeading f3'>
          {'<User>, your current ranking is ...'}
        </div>
        <div className='Ranking f2'>
          {'#<Rank>'}
        </div>
      </div>
    );
  }
}

export default Ranking;
