import React from 'react';
import './Navigation.css';

class Navigation extends React.Component {
  render = () => {
    return (
      <nav className='Navigation w-80'>
        <div className='f5 link black underline pa3 '>
          <span className='dim pointer grow' onClick={() => this.props.onRouteChange('signin')} >Sign Out</span>
        </div>
      </nav>
    );
  }
}

export default Navigation;
