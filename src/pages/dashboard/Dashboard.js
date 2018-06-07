import React, {Component} from 'react';
import './dashboard.css'
import AddInventory from './components/AddInventory';
import Dropdown from '../../components/Dropdown/Dropdown';


class Dashboard extends Component {

    render() {
        // let options = [
        //     {
        //         value: 'val1'
        //     },
        //     {
        //         value: 'val2'
        //     }
        // ]
        return (
            <div className="dashboard">
                <AddInventory {...this.props}/>
                {/*<Dropdown options={options} placeholder='Select our option' currentValue='val2'/>*/}
            </div>
        );
    }
}

export default Dashboard;
