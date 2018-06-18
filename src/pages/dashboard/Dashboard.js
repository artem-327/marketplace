import React, {Component} from 'react';
import './dashboard.css'
import ConMess from '../../components/constructionMessage';


class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard">
                <h1 className='header'>Dashboard</h1>
                <ConMess/>
            </div>
        );
    }
}

export default Dashboard;
