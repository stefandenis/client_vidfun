import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginInfo from "./LoginInfo.js";

const RegisterBox = () => {
  return (
    <div className="user-box register">
      <Link to="/register" className="link">
        Register
      </Link>
    </div>
  );
};

class LogReg extends Component {
    constructor(props){
      super(props)
  
    
    }
  


  render() {

    return (
      <div id="user-box-login-register">
        <LoginInfo  updateLoginStatus={this.props.updateLoginStatus}/>

        <RegisterBox />
      </div>
    );
  }
}

export default LogReg;
