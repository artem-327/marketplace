import React, {Component} from 'react';
import './dashboard.css'
import Merchants from './components/merchants';


class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard">
                {/*<AddInventory {...this.props}/>*/}
                <Merchants {...this.props}/>
            </div>
        );
    }
}

export default Dashboard;
