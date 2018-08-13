import React, {Component} from 'react';
import './ProductOffers.css';
import moment from "moment";
import AddCart from '../../../../components/Cart/AddCart'
import {DATE_FORMAT} from "../../../../utils/constants";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import {capitalizeFirstLetter} from "../../../../utils/functions";
class ProductOffers extends Component {

    constructor(props) {
        super(props);
        this.toggleProduct = this.toggleProduct.bind(this);
        this.state = {
            products: this.groupProductOffers(this.props.productOffers)
        };
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

   //TODO:: Add to cart
   addCart(id){
        this.props.addPopup(<AddCart id={id}/>)
   }

    render() {
        return (
            <div className="App">
                <table className="product-offers">
                    <thead>
                    <tr>
                        <th><Checkbox onChange={(value) => {console.log(value)}}/></th>
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
                        <th><i className="fas fa-cog"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(this.state.products).reduce((rows, product) => {
                        rows.push(
                        <tr className="product" key={product.casNumber} onClick={() => {this.toggleProduct(product.id)}}>
                            <td colSpan="1">
                                <Checkbox onChange={(value) => {console.log(value)}}/>
                            </td>
                            <td colSpan="12">
                                <span className="product-casnumber">{product.casNumber}</span>
                                <span className="product-name">{capitalizeFirstLetter(product.casIndexName)}</span>
                                <span className="product-name">{product.primaryName}</span>
                            </td>
                            <td colSpan="3" className="quantity">
                                <span>Total Qty: 100</span>
                                {product.visible ? <i className="icon fas fa-angle-down"/> : <i className="icon fas fa-angle-up"/>}
                            </td>
                        </tr>
                        );
                        if(product.visible){
                            product.productOffers.forEach((offer) => {
                                console.log(offer);
                                rows.push(
                                    <tr className="product-offer" key={offer.id}>
                                        <td><Checkbox onChange={(value) => {console.log(value)}}/></td>
                                        <td>{offer.merchant.email}</td>
                                        <td>{offer.packaging.amount}</td>
                                        <td>{offer.packaging.container.name}</td>
                                        <td>{offer.packaging.capacity}</td>
                                        <td>{parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)}</td>
                                        <td>{offer.pricing.price}</td>
                                        <td>{offer.name}</td>
                                        <td>{offer.manufacturer}</td>
                                        <td>{offer.origin}</td>
                                        <td>{offer.expirationDate ? moment(offer.expirationDate).format(DATE_FORMAT) : 'none'}</td>
                                        <td>unknown</td>
                                        <td>{offer.productCondition.name}</td>
                                        <td>{offer.productForm.name}</td>
                                        <td>{offer.warehouse.name} ({offer.warehouse.location.state})</td>
                                        <td><button onClick={()=>{this.addCart(offer.id)}}>BUY</button></td>
                                    </tr>
                                )
                            })
                        }
                        return rows;
                    }, [])}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ProductOffers;