import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {

      pictures: [],
      value: '',
      page: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.pageHandler = this.pageHandler.bind(this);
  }

  handleChange = (event) => {
    let self = this;
    console.log("handle change received value as "+event.target.value);
    this.setState(
      { value: event.target.value+"" },
      () => { self.componentDidMount()}
    );

    // if (event.target.value === undefined || event.target.value === null) { return; }
   
    // console.log("inside handle changed: "+ this.state.value);
   
  }

  pageHandler = () => {
    console.log(this.state.page);
    this.setState({ page: this.state.page + 1 })
    this.componentDidMount()
  }

  componentDidMount() {
    if(this.state.value === null || this.state.value === undefined || this.state.value === ""){
      this.setState({ pictures: [] });
      return;
    }
    console.log("inside mount: "+this.state.value);
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + process.env.REACT_APP_API_KEY + '&text=' + this.state.value + '&page=' + this.state.page + '&safe_search(1)&sort=relevance&format=json&nojsoncallback=1')
      .then(function (response) {
        return response.json();
      })
      .then(function (j) {
        /// j is response from api server in json format
        console.log("data cereived as "+JSON.stringify(j));
        
        if (j === undefined || j.photos === undefined || j.photos.photo === undefined) {
          console.log("test1");
          return;

        }

        let picArray = j.photos.photo.map((pic) => {

          var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
          return (

            <img alt="dogs" src={srcPath} className="IMAGE"></img>

          )
        })
        this.setState({ pictures: picArray });
      }.bind(this))
  }



  render() {
    console.log("render function called.");

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


        <button onClick={this.pageHandler}>
          change page
      </button>

      </div>
    );
  }
}

export default App;
