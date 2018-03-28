import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation';
import SignIn from './Components/SignIn';
import Register from './Components/Register';
import Logo from './Components/Logo';
import Ranking from './Components/Ranking';
import ImageLinkForm from './Components/ImageLinkForm';
import FaceRecognition from './Components/ImageRecognition';
import 'tachyons';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // input: 'https://samples.clarifai.com/face-det.jpg',
      input: 'http://images.indianexpress.com/2016/04/stana-katic-759.jpg',
      box: {},
      route: 'signin'
    };
  }
  render = () => {
    return (
      <div className = 'App' >
        <Particles params={particleOptions} className='particles'/>
        <div className='flex'>
          <Logo />
          {this.state.route === 'home' ? <Navigation onRouteChange={this.onRouteChange}/> : null }
        </div>
        { this.state.route === 'home'
          ? <div>
              <Ranking />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} imageURL={this.state.input} />
              <FaceRecognition imageURL={this.state.input} box={this.state.box} />
            </div>
          : this.state.route === 'signin'
            ? <div>
                <SignIn onRouteChange={this.onRouteChange} />
              </div>
            : <div>
                <Register onRouteChange={this.onRouteChange} />
              </div>
        }
      </div>
    );
  }

  // Message Handlers
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonClick = () => {
    const app = new Clarifai.App({ apiKey: 'cd21979a4dad41eb9f0a4e6eff58d4ab' });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response.outputs["0"].data.regions[0])))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  // private functions
  calculateFaceLocation = (region) => {
    console.log(this.state.input);
    const image = document.getElementById('inputImage');
    const sizeImage = { width: Number(image.width), height: Number(image.height) };
    console.log(`Image: (${sizeImage.width} x ${sizeImage.height})`);

    const faceBox = region.region_info.bounding_box;
    return {
      top: faceBox.top_row * sizeImage.height,
      left: faceBox.left_col * sizeImage.width,
      bottom: (1 - faceBox.bottom_row) * sizeImage.height,
      right: (1 - faceBox.right_col) * sizeImage.width
    };
  }

  displayFaceBox = (faceBox, index = 0) => {
    this.setState({ box: faceBox }, () => {
      const box = this.state.box;
      console.log(`[${index}] top: ${box.top} left: ${box.left} bottom: ${box.bottom} right: ${box.right}`);
    });
  }
}

export default App;

// Options copied from the react-particle-js settings (https://vincentgarreau.com/particles.js/#nasa) and pasted here
const particleOptions = { 'particles': { 'number': { 'value': 160, 'density': { 'enable': true, 'value_area': 800 } }, 'color': { 'value': '#ffffff' }, 'shape': { 'type': 'edge', 'stroke': { 'width': 0, 'color': '#000000' }, 'polygon': { 'nb_sides': 3 }, 'image': { 'src': 'img/github.svg', 'width': 100, 'height': 100 } }, 'opacity': { 'value': 1, 'random': true, 'anim': { 'enable': true, 'speed': 1, 'opacity_min': 0, 'sync': false } }, 'size': { 'value': 3, 'random': true, 'anim': { 'enable': false, 'speed': 4, 'size_min': 0.3, 'sync': false } }, 'line_linked': { 'enable': true, 'distance': 47.34885849793636, 'color': '#ffffff', 'opacity': 0.05524033491425909, 'width': 1 }, 'move': { 'enable': true, 'speed': 1, 'direction': 'none', 'random': true, 'straight': false, 'out_mode': 'out', 'bounce': false, 'attract': { 'enable': false, 'rotateX': 600, 'rotateY': 600 } } }, 'interactivity': { 'detect_on': 'canvas', 'events': { 'onhover': { 'enable': true, 'mode': 'bubble' }, 'onclick': { 'enable': true, 'mode': 'repulse' }, 'resize': true }, 'modes': { 'grab': { 'distance': 400, 'line_linked': { 'opacity': 1 } }, 'bubble': { 'distance': 250, 'size': 0, 'duration': 2, 'opacity': 0, 'speed': 3 }, 'repulse': { 'distance': 400, 'duration': 0.4 }, 'push': { 'particles_nb': 4 }, 'remove': { 'particles_nb': 2 } } }, 'retina_detect': true };
