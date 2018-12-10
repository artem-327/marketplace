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

    this.timeout = 30
  }

  onIdle = () => {
    this.props.history.push('/')
    localStorage.clear()
    alert("You've been logged out due to being inactive for " + this.timeout.toString() + (this.timeout === 1 ? " minute." : " minutes."))
    window.location.reload();
  }

  //router paths - Main
  render() {
    return (
      <IdleTimer
        ref={ref => { this.idleTimer = ref }}
        element={document}
        onActive={this.onActive}
        onIdle={this.onIdle}
        timeout={1000 * 60 * this.timeout} //logout after 30minutes {1000 * 60 * 30}
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
