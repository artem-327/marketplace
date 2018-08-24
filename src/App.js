import React, { Component } from 'react';

import './app.css';

import Main   from './layout/Main'
import Header from './layout/Header'
import PopUp from './components/PopUp'
import errorHandler from './utils/errorsHandler';

class App extends Component {
//router paths - Main
  render() {
      const MainWithErrorsHandler = errorHandler(Main);
    return (
        <div className="App" >
            <PopUp/>
            <Header/>
            <MainWithErrorsHandler />
        </div>
    );
  }
}

// need commit

export default App;
