import React, { Component } from "react";
import "./Signin.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (e) => {
    this.setState({
      signInEmail: e.target.value,
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      signInPassword: e.target.value,
    });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          this.props.loaduser(data);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" for="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" for="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-black"
                  value="Sign in"
                  type="submit"
                  onClick={this.onSubmitSignIn}
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  className="f6 link dim black db pointer"
                  onClick={() => {
                    onRouteChange("register");
                  }}
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Signin;
