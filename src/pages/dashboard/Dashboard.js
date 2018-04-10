import React, {Component} from 'react';
import {startAnimation} from 'react-countup'

import Header from './components/Header'
import Info from './components/Info'
import Options from './components/Options';
import Stats from './components/Stats'
import FormPlace from './components/FormPlace'
import './dashboard.css'

import Filter from './components/Filter/Filter'

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
                <Filter/>
                <p >
                   Dashboard
                </p>
                {/*<Header />*/}
                {/*<Info/>*/}
                {/*<Options/>*/}
                {/*<Stats callbackParent={(childrenRef) => this.setState({statsRef:childrenRef}) }/>*/}
                {/*<FormPlace {...this.props}/>*/}
            </div>
        );
    }
}

export default Dashboard;

