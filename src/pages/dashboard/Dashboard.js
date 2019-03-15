import React, {Component} from 'react';
import './dashboard.scss'
import ConMess from '../../components/constructionMessage';
import {FormattedMessage} from 'react-intl';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="dashboard">
                    <h1 className='header'>
                        <FormattedMessage
                            id='dashboard.dashboard'
                            defaultMessage='Dashboard'
                        />
                    </h1>
                    <ConMess/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
