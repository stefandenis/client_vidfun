import React, { Component } from "react";
import Logo from "../Logo";
import "./RegisterPage.css";
import axios from "axios";
import { generateKeyPair } from "crypto";
import {Redirect} from "react-router-dom"

const Verifier = require("email-verifier");

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        username: "",
        email: "",
        password: "",
        password2: ""
      },
      redirectTo: false
    };
    this.registerButton = this.registerButton.bind(this);
    
    this.passwordMatch = this.passwordMatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  handleChange(e) {
    const { name, username, email, password, password2 } = this.state.data;
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  passwordMatch() {
    const { name, username, email, password, password2 } = this.state.data;

    if (!(password === password2)) {
      return <div style={divStyle}> Passwords do not match</div>;
    }
  }

  registerButton() {
    const { name, username, email, password, password2 } = this.state.data;
    if (password === password2 && password.length && password2.length)
      return (
        <button className="RegisterPage-register-btn" onSubmit={this.submit}>
          Register
        </button>
      );
    else
      return (
        <button className="RegisterPage-register-btn" style={disabledButton} disabled>
          Register
        </button>
      );
  }

  submitRegister(event) {
    event.preventDefault();
    const data = this.state.data
    axios.post("/user", {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password
    })
      .then(response => {
        console.log(response);
        if(response.data){
          console.log('Succesful signup');
          this.setState({ //redirect to login page
						redirectTo: '/'
					})
        }


      }).catch(error => {
        console.log("Sign up to server failed");
        console.log(error)
      });
    
  }

  

  render() {
    if(this.state.redirectTo){
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }else{
    return (
      <div class = "RegisterPage">
        <div align="center" className="RegisterPage-register-header">
          <Logo />

          <hr id="RegisterPage-delimiter-register" />
          <hr id="RegisterPage-delimiter-register" />

          <div className="RegisterPage-form-register-container">
            <a className="RegisterPage-social-login" href="#">
              <i class="RegisterPage-icon fab fa-facebook" />
              Login with Facebook
            </a>
            <a className="RegisterPage-social-login" href="#">
              <i class="RegisterPage-icon  fab fa-twitter-square" />
              Login with Twitter
            </a>
            <a className="RegisterPage-social-login" href="#">
              <i class="RegisterPage-icon fab fa-google-plus-square" />
              Login with Google
            </a>
            <div align="left">
              <form onSubmit={this.submitRegister}>
                <label for="name">Your name</label>
                <input
                  onChange={this.handleChange}
                  className="RegisterPage-register-fields"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name..."
                />

                <label for="username">Your username</label>
                <input
                  onChange={this.handleChange}
                  className="RegisterPage-register-fields"
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username..."
                />

                <label for="email">Your email</label>
                <input
                  onChange={this.handleChange}
                  className="RegisterPage-register-fields"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email..."
                />

                <label for="password">Choose your password</label>
                <input
                  onChange={this.handleChange}
                  className="RegisterPage-register-fields"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password..."
                />

                <label for="password2">Verify your password</label>
                <input
                  onChange={this.handleChange}
                  className="RegisterPage-register-fields"
                  id="password2"
                  type="password"
                  name="password2"
                  placeholder="Verify password..."
                />

                {this.passwordMatch()}
                {this.registerButton()}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    }
  }
}

var divStyle = {
  color: "red"
};

var disabledButton = {
  backgroundColor: "gray"
};

export default RegisterPage;
