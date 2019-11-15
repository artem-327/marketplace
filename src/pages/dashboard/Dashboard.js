import React, {Component} from 'react';
import './dashboard.scss'
import ConMess from '../../components/constructionMessage';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="dashboard">
                    <h1 className='header'>Dashboard</h1>
                    <ConMess/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
