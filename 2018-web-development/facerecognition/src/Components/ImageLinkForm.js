import React from 'react';

class ImageLinkForm extends React.Component {
  componentDidMount = () => {
    const text = document.getElementById('textImage');
    text.value = this.props.imageURL;
  }
  render = () => {
    return (
      <div className='ImageLinkForm'>
        <p className='f4 ph2'>{'Smart Brain will detect faces in your pictures. Enter an image URL ...'}</p>
        <div className='f5 center w-90 w-75-m w-60-ns pa4 br3 shadow-5' style={{backgroundColor:'rgb(112, 176, 255)'}}>
          <input type='text' className='ph2 pv2 center w-100 w-70-ns' id='textImage'
            onChange={this.props.onInputChange}
            onKeyPress={event => event.key === 'Enter' ? this.props.onButtonClick() : null}
          />
          <button className='ph2 pv2 center w-100 w-30-ns pointer' onClick={this.props.onButtonClick}>{'Detect'}</button>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;
