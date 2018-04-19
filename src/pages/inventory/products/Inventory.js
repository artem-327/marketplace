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

