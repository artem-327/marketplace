import React, { Component } from 'react';
import './app.css';
import Main from './layout/Main'
import Header from './layout/Header'
import PopUp from './components/PopUp'
import ErrorsHandler from './utils/errorsHandler'
import IdleTimer from 'react-idle-timer'

class App extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
  }

  onIdle = (e) => {
    this.props.history.push('/login/')
    localStorage.clear()
    alert("You've been logged out due to inactivity")
  }

  //router paths - Main
  render() {
    return (
      <IdleTimer
        ref={ref => { this.idleTimer = ref }}
        element={document}
        onActive={this.onActive}
        onIdle={this.onIdle}
        timeout={1000 * 60 * 30} //logout after 30minutes
      >
        <div className="App" >
          <PopUp />
          <Header />
          <Main />
          <ErrorsHandler />
        </div>
      </IdleTimer>
    );
  }

}

export default App;
