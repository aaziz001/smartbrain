import { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Particles from "react-particles-js";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";

import "./App.css";

const ParticlesParams = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageURL: "",
  outputs: [],
  route: "signin",
  isSignedin: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      outputs: [],
      route: "home",
      isSignedin: true,
      isProfileOpen: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  calculateFaceLocations = (data) => {
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);
    const processedData = data.map((region) => {
      return {
        leftCol: region.left_col * width,
        topRow: region.top_row * height,
        rightCol: width - region.right_col * width,
        bottomRow: height - region.bottom_row * height,
      };
    });
    return processedData;
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  onInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  onSubmit = () => {
    this.setState({
      imageURL: this.state.input,
    });
    fetch("http://localhost:3001/imageURL", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageURL: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((res) => res.json())
            .then((entries) => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries,
                },
              });
            });
        }
        return res.outputs[0].data.regions;
      })
      .then((data) => data.map((region) => region.region_info.bounding_box))
      .then((data) => {
        const locations = this.calculateFaceLocations(data);
        this.setState({
          outputs: locations,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedin: true });
    }
    this.setState({
      route: route,
    });
  };

  loaduser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        joined: user.joined,
        entries: user.entries,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={ParticlesParams} />
        <Navigation
          isSignedin={this.state.isSignedin}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {this.state.isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={this.state.isProfileOpen}
              toggleModal={this.toggleModal}
              user={this.state.user}
              loaduser={this.loaduser}
            />
          </Modal>
        )}
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              imageURL={this.state.imageURL}
              coords={this.state.outputs}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loaduser={this.loaduser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loaduser={this.loaduser}
          />
        )}
      </div>
    );
  }
}

export default App;
