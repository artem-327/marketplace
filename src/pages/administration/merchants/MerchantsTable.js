import React, {Component} from 'react';
import Merchant from './components/Merchant';
import './MerchantsTable.css';

class MerchantsTable extends Component {

    renderMerchants(){

        return this.props.merchants.data.map((val,index)=>{
            return <Merchant merch={val} key={index} id={val.id} approveMerchant={this.props.approveMerchant}/>
                });
    }

    componentDidMount(){
        this.props.getData();
    }


    render(){

        return (
            <div>
                <h1 className="header">MerchantsTable</h1>
                <table className="merchant-table">
                    <thead className="merch-table">
                        <tr>
                            <th className="merch-header-item">Name</th>
                            <th className="merch-header-item">Surname</th>
                            <th className="merch-header-item">E-mail</th>
                            <th className="merch-header-item">Approve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderMerchants()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MerchantsTable;