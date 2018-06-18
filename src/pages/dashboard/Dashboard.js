import React, {Component} from 'react';
import './dashboard.css'
// import AddInventory from './components/AddInventory';
import ConMess from '../../components/constructionMessage';


class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard">
                <h1 className='header'>Dashboard</h1>
                {/*<AddInventory {...this.props}/>*/}
                <ConMess/>
            </div>
        );
    }
}

export default Dashboard;
