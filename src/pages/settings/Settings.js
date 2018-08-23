import React, {Component} from 'react';
import './settings.css'
import ConMess from '../../components/constructionMessage';

class Settings extends Component {
    render() {
        return (
            <div>
                <h1 className="header">Settings</h1>
                <ConMess/>
            </div>
        );
    }
}

export default Settings;

