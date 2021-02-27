import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import './App.css';
import 'tachyons'
import { Component } from 'react'

const ParticlesParams = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'ea60c88d6c204e198a177598a2dd9f10'
 });

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      outputs: [],
      route: 'signin',
      isSignedin: false
    }
  }

  calculateFaceLocations = (data) => {
    const image = document.getElementById('image')
      const width = Number(image.width)
      const height = Number(image.height)
      const processedData = data.map(region => {
        return {
          leftCol: region.left_col * width,
          topRow: region.top_row * height,
          rightCol: width - (region.right_col * width),
          bottomRow: height - (region.bottom_row * height)  
        }
      })
    return processedData
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  onSubmit = () => {
    this.setState({
      imageURL: this.state.input
    })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((res) => res.outputs[0].data.regions)
      .then((data) => data.map(region => region.region_info.bounding_box))
      .then((data) => {
        const locations = this.calculateFaceLocations(data);
        this.setState({
          outputs: locations
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({
        isSignedin: true
      })
    } else if(route === 'signin'){
      this.setState({
        isSignedin: false
      })
    }
    this.setState({
      route: route
    })
  }

  render(){
    return (
      <div className="App">
        <Particles className = 'particles' params={ParticlesParams}/>
        <Navigation isSignedin = {this.state.isSignedin} onRouteChange = {this.onRouteChange}/>
        {this.state.route === 'home' ?  
        <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
            <FaceRecognition imageURL = {this.state.imageURL} coords = {this.state.outputs}/>
        </div>
        :( this.state.route === 'signin' ? <Signin onRouteChange = {this.onRouteChange}/>
          : <Register onRouteChange = {this.onRouteChange}/>
        ) 
        }


      </div>
    );
  }
  
}

export default App;
