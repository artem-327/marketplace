import React, { Component } from 'react';
import Button from './components/Button';
// import classnames from 'classnames';

class Merchants extends Component {

    componentWillMount(){
        this.props.getData();
    }

    acceptMerchants(id){
        this.props.acceptMerchant(id)
    }

    rejectMerchants(id){
        this.props.rejectMerchant(id)
    }


    renderMerchants () {
        return this.props.data.data.merchants.map((item, index)=>{
            // bud if nebo ternarni operator

            let approve = null;
            if (item.approve) {
                approve = "Approve";
            } else {
                approve = "Reject";
            }

            return <tr key={'m'+index}>
                    <td>{item.email}</td>
                    <td>{approve}</td>
                    <td><Button id={item.id} click={(id)=>{this.acceptMerchants(id)}} title="Approve"/></td>
                    <td><Button id={item.id} click={(id)=>{this.rejectMerchants(id)}} title="Reject"/></td>
                </tr>;
        })
    }

    render() {
        let merchants = this.props.isFetching ? <tr><td>Načítání</td></tr> : this.renderMerchants();
        return (
            <div className="App">
                <table border="1">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Approve</th>
                        <th>Reject</th>
                    </tr>
                    </thead>
                    <tbody>{merchants}</tbody>
                </table>
            </div>
        );
    }
}

export default Merchants;