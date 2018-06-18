import React, {Component} from 'react';
import './clients.css';
import ConMess from '../../components/constructionMessage';

class Clients extends Component {

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h1 className="header">Clients</h1>
                <ConMess/>
            </div>
        );
    }
}

export default Clients;

