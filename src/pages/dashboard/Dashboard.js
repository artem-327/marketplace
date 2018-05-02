import React, {Component} from 'react';
import {startAnimation} from 'react-countup'
import InputGroup from './components/InputGroup'

import './dashboard.css'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterActivated: false,
            statsRef:{}
        }
    }

    handleScroll(e) {
        let pos = document.getElementById('ScrollStats');
        if(pos !== undefined && !this.state.counterActivated){
            pos = pos.getBoundingClientRect();
            //910 - position of stats from top
            if(pos.y < 910) {
                this.setState({counterActivated: true})
                startAnimation(this.state.statsRef.avgPrice);
                startAnimation(this.state.statsRef.peopleMobile);
                startAnimation(this.state.statsRef.perMobile);
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    render() {
      let location = [
        {
          // todo need to create select box
          label: 'WAREHOUSE',
          type: 'select',
          name: 'warehouse',
          value: 'Select'
        },
        {
          label: 'WAREHOUSE NAME',
          type: 'text',
          name: 'warehouse-name',
          value: ''
        },
        {
          label: 'ADDRESS',
          type: 'text',
          name: 'address',
          value: ''
        },
        /*
        {
          label: 'WAREHOUSE NAME',
          type: 'password',
          name: 'first',
          value: ''
        },
        */
      ]

      let detail = [
        {
          label: 'TOTAL PACKAGES',
          type: 'text',
          name: 'total-packages',
          value: ''
        },

        // todo need to create select box
        {

        }
      ]

        return (
            <div className="LandingPage">
                   Dashboard test
                   <InputGroup title='filter' inputsLocation={location} inputsDetail={detail}/>
            </div>
        );
    }
}

export default Dashboard;
