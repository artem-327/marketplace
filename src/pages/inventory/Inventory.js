import React, {Component} from 'react';
import Filter from './components/Filter'
import DataTable from './components/DataTable'
import './inventory.css'



class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterActivated: false,
            statsRef:{}
        }
    }

    // handleScroll(e) {
    //     let pos = document.getElementById('ScrollStats');
    //     if(pos !== undefined && !this.state.counterActivated){
    //         pos = pos.getBoundingClientRect();
    //         //910 - position of stats from top
    //         if(pos.y < 910) {
    //             this.setState({counterActivated: true})
    //             startAnimation(this.state.statsRef.avgPrice);
    //             startAnimation(this.state.statsRef.peopleMobile);
    //             startAnimation(this.state.statsRef.perMobile);
    //         }
    //     }
    // }
    //
    // componentDidMount() {
    //     window.addEventListener('scroll', this.handleScroll.bind(this));
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll.bind(this));
    // }

    render() {
        return (
            <div className="LandingPage">
                <Filter/>
                <DataTable/>
            </div>
        );
    }
}

export default Inventory;

