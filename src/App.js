import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor(){
    super();
   
    this.state = {
    
      pictures: [],
      value :''
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

 
  handleChange=(event)=> {
    console.log("inside handle change");
    if(event.target.value === undefined || event.target.value === null){return;}
    this.setState({value:event.target.value});
    console.log("inside handle changed");
    this.componentDidMount()
  }

  componentDidMount(){
    
    console.log("inside mount");
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.REACT_APP_API_KEY+'&tags='+this.state.value+'&format=json&nojsoncallback=1' )
    .then(function(response){
      return response.json();
    })
    .then(function(j){                                /// j is response from api server in json format
      if(j === undefined || j.photos === undefined || j.photos.photo === undefined){
        return;
      }

      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
         
         <img  alt="dogs" src={srcPath} className="IMAGE"></img>
         
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }
  


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Gallery</h1>
        </header>
        
        
          <input type="text" className="Search-Bar" value={this.state.value} onChange={this.handleChange} placeholder="Search in gallery.." />
        
        
        <p className="App-intro">

          {this.state.pictures}
         
        </p>
      </div>
    );
  }
}

export default App;
