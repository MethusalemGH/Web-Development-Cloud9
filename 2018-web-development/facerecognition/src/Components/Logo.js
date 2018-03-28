import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain-logo.png';

class Logo extends React.Component {
  render = () => {
    return (
      <div className='Logo pa3 w-80'>
        <Tilt className='Tilt br2 shadow-4 bg-lightest-blue' options={{ max : 50 }} style={{ height: 100, width: 100 }} >
          <div className='Tilt-inner pa2 pt3'>
            <img src={brain} alt=''/>
          </div>
        </Tilt>
      </div>
    );
  }
}

export default Logo;
