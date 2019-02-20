import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();

    this.state = {
      pictures: [],
      value: '',
      page: 1,
      totalPage: 1,
    };
    this.onSearchQueryChangeListener = this.onSearchQueryChangeListener.bind(this);
    this.pageHandler = this.pageHandler.bind(this);


  }

  onSearchQueryChangeListener = (event) => {
    let self = this;
    console.log("handle change received value as " + event.target.value);
    this.setState(
      { value: event.target.value + "" },
      () => { self.componentDidMount() }
    );


  }

  pageHandler = () => {
    console.log(this.state.totalPage);
    console.log(this.state.page);
    if (this.state.totalPage > this.state.page) {
      this.setState({ page: this.state.page + 1 })
      this.componentDidMount()
    }
  }

  componentDidMount() {
    if (this.state.value === null || this.state.value === undefined || this.state.value === "") {
      this.setState({ pictures: [] });
      return;
    }
    console.log("inside mount: " + this.state.value);
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + process.env.REACT_APP_API_KEY + '&text=' + this.state.value + '&page=' + this.state.page + '&safe_search(1)&sort=relevance&format=json&nojsoncallback=1')
      .then(function (response) {
        return response.json();
      })
      .then(function (j) {

        /// j is response from api server in json format


        if (j === undefined || j.photos === undefined || j.photos.photo === undefined) {
          this.setState({ totalPage: 1, pictures: [] })

          return;

        }
        this.setState({ totalPage: j.photos.total })
        let picArray = j.photos.photo.map((pic) => {

          var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';


          return (

            <img alt="pics" src={srcPath} className="IMAGE" ></img>
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
        <input type="text" className="Search-Bar" value={this.state.value} onChange={this.onSearchQueryChangeListener} placeholder="Search in gallery.." />


        <p className="App-intro">

          {this.state.pictures}

        </p>


        <Button variant="primary" onClick={this.pageHandler} size="lg" id="nextPageButton()" block>
          Next Page >>
        </Button>

      </div>
    );
  }
}

export default App;
