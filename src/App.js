import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.js";
import MainPage from "./components/MainPage.js";
import axios from 'axios'
import RegisterPage from "./components/RegisterPage/RegisterPage.js";
import TestPage from './components/TestPage/TestPage.js'

class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateLoginStatus = this.updateLoginStatus.bind(this)
   // this.getDerivedStateFromProps = this.getDerivedStateFromProps.bind(this)

  }

  componentDidMount(){
    this.getUser();
  }

  updateLoginStatus(userObject){
    console.log(userObject)
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        console.log(response.data)
        this.setState({
          loggedIn: true,
          username: response.data.user.Username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      } 
    })
  }



  render() {
    return (
      <div className = "router-container">
        <Route path="/" exact 
         render = {() => 
         <BrowserRouter>
                  <MainPage user = {this.state.username} loggedIn = {this.state.loggedIn}
          updateLoginStatus = {this.updateLoginStatus}
         />
          </BrowserRouter>

          } 
         />
        <Route path="/register" 
        render = {() => 
          <RegisterPage
  
          />}
          />
        
        


          {/* <Route path="/" exact component = {TestPage}/> */}
      


          </div>
    );
  }
}

export default App;
