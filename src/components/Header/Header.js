import React, { Component } from "react";
import LogReg from "../LogReg.js";
import Logo from "../Logo.js";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './Header.css'
import { Link } from "react-router-dom";
import { privateEncrypt } from "crypto";
import UploadPopUp from '../UploadPopUp/UploadPopUp'
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from "reactjs-popup";

class Header extends Component {
  constructor(props){
    super(props)
    
    this.state  = {
      loggedOut : false,
      toggleMenu : false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.extend = this.extend.bind(this)
    this.carret = this.carret.bind(this)
    this.popup = this.popup.bind(this)
  }
  

extend(){
   const menuIsDropedDown = this.state.toggleMenu
  if(!menuIsDropedDown){
    const toggleUserMenu = document.getElementById("toggle-menu")
    toggleUserMenu.style.display = "block"
  
    this.setState({
      toggleMenu : true
    })
  }
  else{
    const toggleUserMenu = document.getElementById("toggle-menu")
    toggleUserMenu.style.display = "none"
    this.setState({
      toggleMenu : false
    })


  }

  }


onSubmit(event){
  
  event.preventDefault();
  
    
    
    axios.post("user/logout")
      .then(response => {
        console.log(response);
      
          console.log('Logout succesfull');
         if(response.status === 200){
          this.props.updateLoginStatus({
            loggedIn: false,
            username: null
        })

        this.setState({
          loggedOut: true
        })
      }
      }).catch(error => {
        console.log("Logout failed");
        console.log(error)
      });
    


}

  
carret(){
  if(!this.state.toggleMenu){
    return ( <a   onClick={this.extend} id="triangle-down" className = " Header-user-dropdown"><i class="Header-user-carret-down fas fa-caret-down"></i></a>)

  }
  else{
    return(<a   onClick={this.extend} id="triangle-down" className = " Header-user-dropdown"><i class="Header-user-carret-down fas fa-caret-up"></i></a>)
  }
}  

popup(){
  


}


  render() {
    
        
    
          if(this.props.loggedIn){
             return (
                    <header className="Header-header">
                       <span id="logo-margin">
                            <Logo />
                       </span>
      
                       <div className = "Header-box" id="user-box-login-register">
                            <span>{this.props.user}</span>

                             <a className = "Header-user-icon-a "> <i class=" Header-user-icon fas fa-user-circle"></i> </a>
                             {this.carret()}
                             
                             <div align="center" id='toggle-menu' className = "Header-dropdown" >
                                <Link to={`/profile/${this.props.user}`} className="Header-user-option link">Profile</Link>
                                <hr className = "Header-hr"></hr>
                                <hr className = "Header-hr"></hr>
                                <Link to="/settings" className="Header-user-option link">Settings</Link>
                                <hr className = "Header-hr"></hr>
                                
                                <Link to={`/${this.props.user}/videos`} className="Header-user-option link">Your Videos</Link>
                                <hr className = "Header-hr"></hr>
                                
                                <UploadPopUp user={this.props.user}>   </UploadPopUp>
                                <hr className = "Header-hr "></hr>
                                <hr className = "Header-hr "></hr>
                               
                                
                                <Link to={`/help`} className="Header-user-option link">Help</Link>

                                
                             </div>
                          <button onClick={this.onSubmit} className="login-btn" type="submit">
                                    Logout
                          </button>

                       </div>

                    </header>)
          }
  
          else{
            {console.log("it get's here")}
               return (
      
                  <header className="Header-header">
                      <span id="logo-margin">
                          <Logo />
                      </span>
       
                      <LogReg  updateLoginStatus={this.props.updateLoginStatus} />
                  </header>
               );
          }
   

          

        }

  
}

export default Header;
