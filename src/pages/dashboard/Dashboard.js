import React, {Component} from 'react';
import './dashboard.css'
import AddInventory from './components/AddInventory';
import Dropdown from '../../components/Dropdown/Dropdown';
import FilterOptions from "../../components/FilterOptions/FilterOptions";


class Dashboard extends Component {

    render() {
        let options = [
            {
                value: 'val1'
            },
            {
                value: 'val2'
            }
        ]
        return (
            <div className="dashboard">
                <AddInventory {...this.props}/>
                {/*<FilterOptions options={options} />*/}
            </div>
        );
    }
}

export default Dashboard;
