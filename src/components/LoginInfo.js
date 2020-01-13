import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Redirect} from 'react-router-dom'
class LoginInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        username: "",
        password: ""
      },
      buttonSendData: false,
      error: "",
      redirectTo: false,
      credentialsAreValid: true
    };

    this.renderDisplayFields = this.renderDisplayFields.bind(this);
    this.renderSendData = this.renderSendData.bind(this);
    this.extend = this.extend.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.credentialsCheck = this.credentialsCheck.bind(this)
}

  handleChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }


credentialsCheck(){
  console.log("credentialsAreValid: " + this.state.credentialsAreValid)
  if(!this.state.credentialsAreValid){
    return (
      
       <div style = {{fontSize: "13px", color : 'red'}}>Username or Password are incorrect</div>
      
    )
    }

}

  onSubmit() {
   // this.props.submit(this.state.data);
    const { user , pass } = this.state.data


    axios.post('/user/login/',{
      username: this.state.data.username,
      password: this.state.data.password
    }).then(response => {
      console.log("raspuns")
      console.log(response);
      if (response.status === 200) {
        // update App.js state
        this.props.updateLoginStatus({
            loggedIn: true,
            username: response.data.username
        })

        this.setState({
          redirectTo: '/',
          credentialsAreValid: true
        })
        // update the state to redirect to home
        
    }
      

    }).catch(error => {
      console.log("Sign up to server failed");
      console.log(error)
      this.setState({
        credentialsAreValid : false
      })
    });
  
}


  

  extend() {
    this.setState({ username: "", password: "", buttonSendData: true });
    console.log(this.state.buttonSendData);
    const logExtend = document.getElementById("user-info-container");
    logExtend.classList.add("left");
  }

  renderDisplayFields() {
    return (
      <div className="user-box username-pass">
        <div className="user-info-container user-box" id="user-info-container">
          <input
            className="input username"
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            className="input password"
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        
        <button onClick={this.extend} className="login-btn" type="submit">
          Log in
        </button>

      </div>
    );
  }

  renderSendData() {
    const { data } = this.state;
    return (
      <div className="user-box username-pass">
        <div className="user-info-container user-box" id="user-info-container">
          <input
            onChange={this.handleChange}
            value={data.username}
            className="input username"
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            onChange={this.handleChange}
            value={data.password}
            className="input password"
            type="password"
            name="password"
            placeholder="password"
          />
        {this.credentialsCheck()}
        </div>

        <button onClick={this.onSubmit} className="login-btn" type="submit">
          Log in
        </button>
        
      </div>
    );
  }

  render() {
    if(this.state.redirectTo){
  
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }else{
    if (!this.state.buttonSendData) 
    { 
  
      return this.renderDisplayFields();
    }
      else{ 
       
      return this.renderSendData()
        
    }
    }
  }
}

LoginInfo.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginInfo;
