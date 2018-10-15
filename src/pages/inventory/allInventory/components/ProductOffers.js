import React, {Component} from 'react';
import './ProductOffers.css';
import moment from "moment";
import AddCart from '../../../cart/AddCart'
import {DATE_FORMAT} from "../../../../utils/constants";
import {getUnit} from "../../../../utils/functions";

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
                <table className="all-product-offers">
                    <thead>
                    <tr>
                        <th>Merchant</th>
                        <th>Available</th>
                        <th>Packaging</th>
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
                            <td colSpan="12">
                                <span className="product-casnumber">{product.casNumber}</span>
                                <span className="product-name capitalize">{product.casIndexName}</span>
                            </td>
                            <td colSpan="3" className="quantity">
                                <span>Total Qty: 100</span>
                                {product.visible ? <i className="icon fas fa-angle-down"/> : <i className="icon fas fa-angle-up"/>}
                            </td>
                        </tr>
                        );
                        if(product.visible){
                            product.productOffers.forEach((offer) => {
                                const unit = getUnit(offer.packaging.unit.name);
                                const packageSize = offer.packaging.capacity;
                                const packageUnit = offer.packaging.container.name;
                                const packaging = `${packageSize} ${unit} ${packageUnit}`;
                                const merchantName = offer.merchantVisibility ? offer.merchant.email : "Anonymous"
                                rows.push(
                                    <tr className="product-offer" key={offer.id}>
                                        <td>{merchantName}</td>
                                        <td>{offer.packaging.amount.formatNumber()}</td>
                                        <td>{packaging}</td>
                                        <td>{(parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)).formatNumber()} {unit}</td>
                                        <td>$ {offer.pricing.price.formatMoney(2)}/{unit}</td>
                                        <td>{offer.name}</td>
                                        <td>{offer.manufacturer.name}</td>
                                        <td>{offer.origin.name}</td>
                                        <td>{offer.expirationDate ? moment(offer.expirationDate).format(DATE_FORMAT) : 'none'}</td>
                                        <td>Unknown</td>
                                        <td>{offer.productCondition.name}</td>
                                        <td>{offer.productForm.name}</td>
                                        <td>{offer.warehouse.name} ({offer.warehouse.address.province.name})</td>
                                        <td><button className='info-button' onClick={()=>{this.addCart(offer.id)}}>BUY</button></td>
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