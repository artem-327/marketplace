import React, {Component} from 'react';
import {startAnimation} from 'react-countup'

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
        return (
            <div className="LandingPage">
                <p >
                   Dashboard
                </p>
            </div>
        );
    }
}

export default Dashboard;

