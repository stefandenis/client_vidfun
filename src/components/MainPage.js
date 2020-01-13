import React, { Component } from "react";
import Header from "./Header/Header.js";
import { Route } from "react-router-dom";
import YourVideos from "../components/YourVideos/YourVideos"
import { BrowserRouter } from "react-router-dom";
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import axios from "axios";

class MainPage extends Component {
      constructor(props)
      {
        super(props)
      
        this.state = {
          feedVideos : false,
          numberOfVideos : 0

        }
        this.renderVideos = this.renderVideos.bind(this);
        this.displayVideos = this.displayVideos.bind(this);
      }

componentWillMount(){
  this.renderVideos();
}

displayVideos(){

return (
  
      
    <div>


           <Header user = {this.props.user}
           loggedIn={this.props.loggedIn} updateLoginStatus = {this.props.updateLoginStatus} />
     
           <Route path="/"  exact
             render = {() => 
         
                 <div>
                 <p>Feed Videos</p>

                 
                 <Player
                 playsInline
                 poster="/assets/poster.png"
                 src="https://vidfun2.azurewebsites.net/videos/"
                  /> 

                  
                 <Player
                 playsInline
                 poster="/assets/poster.png"
                 src="https://vidfun2.azurewebsites.net/videos/"
                  /> 

                 </div>

                   } 
           />

           <Route path={`/${this.props.user}/videos`}
               render = {() => 
                  <YourVideos/>
     
                        }/>
</div>                             



   
   
   

);
  

}


renderVideos() {

  axios.get('/user/videoscheck/')
  .then(response => {
    console.log("raspuns")
    console.log(response);
    if (response.status === 200) {
      //can display videos
      this.setState({
        feedVideos : true
        
      })
     
        
      }
      
    } 
      )

     

      
  


  
  }
  

  render() {
    
  //   {console.log("props.user in main page: "+ this.props.user)}
    
  //   console.log("feedVideos" +this.state.feedVideos);
    
  //     if(!this.state.feedVideos){
  //       return(
  //         <div>
  //  <Header user = {this.props.user}
  //             loggedIn={this.props.loggedIn} updateLoginStatus = {this.props.updateLoginStatus} />
        
  //             <Route path="/"  exact
  //               render = {() => 
            
  //                   <div>
  //                   <p>Feed Videos</p>

                    
                   

  //                   </div>

  //                     } 
  //             />

  //             <Route path={`/${this.props.user}/videos`}
  //                 render = {() => 
  //                    <YourVideos/>
        
  //                          }/>
  //                <p> There are no videos in the feed </p>
          
          
  //         </div>
  //       )
  //       }else{
  //         this.displayVideos()
  //       }
    
 
  return (
  
      
    <div>


           <Header user = {this.props.user}
           loggedIn={this.props.loggedIn} updateLoginStatus = {this.props.updateLoginStatus} />
     
           <Route path="/"  exact
             render = {() => 
         
                 <div>
                 <p>Feed Videos</p>

                 <div style={{marginTop: "100px"}}></div>
                 <Player
                 playsInline
                 poster="/assets/poster.png"
                 src="https://vidfun2.azurewebsites.net/user/video1/"

                  /> 

                  <div style={{margin: "10px"}}></div>


                 <Player
                 playsInline
                 poster="/assets/poster.png"
                 src="https://vidfun2.azurewebsites.net/user/video2/"
                  /> 
                    <div style={{margin: "10px"}}></div>
              <Player
                 playsInline
                 poster="/assets/poster.png"
                 src="https://vidfun2.azurewebsites.net/user/video3/"
                  /> 
                      <div style={{margin: "10px"}}></div>
                <Player
                 playsInline
                 poster="/assets/poster.png"
                 src="https://vidfun2.azurewebsites.net/user/video4/"
                  /> 



                 </div>

                   } 
           />

           <Route path={`/${this.props.user}/videos`}
               render = {() => 
                  <YourVideos/>
     
                        }/>
</div>                             



   
   
   

);
    
    
    
    
    
    
    
    
    }
}
export default MainPage;
