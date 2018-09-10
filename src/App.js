import React, { Component } from 'react';

import './app.css';

import Main   from './layout/Main'
import Header from './layout/Header'
import PopUp from './components/PopUp'
import ErrorsHandler from './utils/errorsHandler'
class App extends Component {
//router paths - Main
  render() {
    return (
        <div className="App" >
            <PopUp/>
            <Header/>
            <Main/>
            <ErrorsHandler/>
        </div>
    );
  }
}

export default App;
