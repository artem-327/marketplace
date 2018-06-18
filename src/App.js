import React, { Component } from 'react';

import './app.css';

import Footer from './layout/Footer'
import Main   from './layout/Main'
import Header from './layout/Header'

class App extends Component {
//router paths - Main
  render() {
    return (
        <div className="App" >
            <Header/>
            <Main/>
            {/*<Footer/>*/}
        </div>
    );
  }
}

export default App;
