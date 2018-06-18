import React, {Component} from 'react';
import ConMess from '../../components/constructionMessage';

import './orders.css'

class Orders extends Component {

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h1 className='header'>Orders</h1>
                <ConMess/>
            </div>
        );
    }
}

export default Orders;

