import React, {Component} from 'react';

import './orders.css'



class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterActivated: false,
            statsRef:{}
        }
    }

    render() {
        return (
            <div className="LandingPage">

                <p>
                Orders
                </p>
                {/*<Header />*/}
                {/*<Info/>*/}
                {/*<Options/>*/}
                {/*<Stats callbackParent={(childrenRef) => this.setState({statsRef:childrenRef}) }/>*/}
                {/*<FormPlace {...this.props}/>*/}
            </div>
        );
    }
}

export default Orders;

