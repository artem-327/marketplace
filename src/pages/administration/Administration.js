import React, {Component} from 'react';
import MerchantsTable from './merchants/MerchantsTable';


class Administration extends Component {

    render() {
        
        return (
            <div>
                <MerchantsTable merchants={this.props.merchants} getData={this.props.getData} approveMerchant={this.props.approveMerchant}/>
            </div>
        );
    }
}

export default Administration;

