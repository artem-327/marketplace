import React, {Component} from 'react';
import Filter from './components/Filter'
import DataTable from './components/DataTable'
import './myInventory.css'



class MyInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterActivated: false,
            statsRef:{}
        }
    }

    render() {
        return (
            <div className="MyInventoryPage">
                <Filter/>
                <DataTable/>
            </div>
        );
    }
}

export default MyInventory;

