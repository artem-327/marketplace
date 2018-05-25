import React, { Component } from 'react';
import productOff from '../../../modules/productOff'

class productOffer extends Component {

    componentWillMount(){
        this.props.getData();
    }


    renderProductOffer () {
        return this.props.data.data.productOffers.map((item, index)=>{
            // bud if nebo ternarni operator

            return <tr key={'m'+index}>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                    <td>{item.expirationDate}</td>
                    <td>{item.price}</td>

                </tr>;
        })
    }

    render() {
        let merchants = this.props.isFetching ? <tr><td>Načítání</td></tr> : this.renderProductOffer();
        return (
            <div className="App">
                <table border="1">
                    <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Expiration date</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>{productOff}</tbody>
                </table>
            </div>
        );
    }
}

export default productOffer;