import React from 'react';
import './ImageRecognition.css';

class ImageRecognition extends React.Component {
  render = () => {
    const box = this.props.box;
    return (
      <div className='ImageRecognition center w-90 w-75-m w-60-ns'>
        <img src={this.props.imageURL} alt='' id='inputImage' className='mt2 cover ba b--blue w-100 br3 shadow-5' />
        { (box.left > 0.0)
          ? <div className='bounding-box mt2 ba' style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left}}></div>
          : null
        }
      </div>
    );
  }
}

export default ImageRecognition;
