import React, {Component} from 'react';
import './dashboard.css'
import AddInventory from './components/AddInventory';


class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard">
                <AddInventory {...this.props}/>
            </div>
        );
    }
}

export default Dashboard;
