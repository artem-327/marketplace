import React, {Component} from 'react';
import './ProductOffers.css';
import moment from "moment";
import {DATE_FORMAT} from "../../../../utils/constants";

class ProductOffers extends Component {

    constructor(props) {
        super(props);
        this.toggleProduct = this.toggleProduct.bind(this);
        this.state = {
            products: this.groupProductOffers(this.props.productOffers)
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({products: this.groupProductOffers(nextProps.productOffers)});
    }

    groupProductOffers(productOffers) {
        return productOffers.reduce((carry, offer) => {
            (carry[offer.product.id] = carry[offer.product.id] || {...offer.product, visible: true, productOffers: []}).productOffers.push(offer);
            return carry;
        }, {});
    }

   toggleProduct(productId){
        this.setState({
            products: {
                ...this.state.products,
                [productId]:{
                    ...this.state.products[productId],
                    visible: !this.state.products[productId].visible
                }
            }
        })
   }


    render() {
        console.log(this.state.products);
        return (
            <div className="App">
                <table className="product-offers">
                    <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Merchant</th>
                        <th>Available</th>
                        <th>Packaging</th>
                        <th>Pkg. size</th>
                        <th>Quantity</th>
                        <th>FOB Price</th>
                        <th>Trade Name</th>
                        <th>MFR.</th>
                        <th>Origin</th>
                        <th>Expiration</th>
                        <th>Assay</th>
                        <th>Condition</th>
                        <th>Form</th>
                        <th>Location</th>
                        <th><i className="fas fa-cog"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(this.state.products).reduce((rows, product) => {
                        rows.push(
                        <tr className="product" key={'m' + product.cas} onClick={() => {this.toggleProduct(product.id)}}>
                            <td colSpan="13">
                                <span><a href="#">{product.cas}</a></span>
                                <span className="product-name">{product.name}</span>
                            </td>
                            <td colSpan="3" className="quantity">
                                <span>Total Qty: 100</span>
                                {product.visible ? <i className="icon fas fa-angle-down"/> : <i className="icon fas fa-angle-up"/>}
                            </td>
                        </tr>
                        );
                        product.visible ?
                        product.productOffers.forEach((offer) => {
                            rows.push(
                                <tr className="product-offer" key={'m' + offer.id}>
                                    <td><input type="checkbox"/></td>
                                    <td>{offer.merchant.name}</td>
                                    <td>{offer.packageAmount}</td>
                                    <td>{offer.packageType.name}</td>
                                    <td>{offer.packageType.capacity}</td>
                                    <td>{offer.packageType.quantity}</td>
                                    <td>unknown</td>
                                    <td>unknown</td>
                                    <td>unknown</td>
                                    <td>unknown</td>
                                    <td>{moment(offer.expirationDate).format(DATE_FORMAT)}</td>
                                    <td>unknown</td>
                                    <td>{offer.productCondition.name}</td>
                                    <td>{offer.productForm.name}</td>
                                    <td>{offer.currentLocation.name}</td>
                                    <td><button>BUY</button></td>
                                </tr>
                            )
                        }) : null;
                        return rows;
                    }, [])}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ProductOffers;