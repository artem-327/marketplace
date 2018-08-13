import React, {Component} from 'react';
import './ProductOffers.css';
import Checkbox from "../../../../components/Checkbox/Checkbox";
import ThreeDots from "../../../../components/ThreeDots/ThreeDots";
import {capitalizeFirstLetter} from "../../../../utils/functions";
import classnames from "classnames";


class ProductOffers extends Component {

    constructor(props) {
        super(props);
        this.toggleProduct = this.toggleProduct.bind(this);
        this.state = {
            products: this.groupProductOffers(this.props.productOffers),
            isOpen: false,
            brActive: false,
        }
    }

    //componentWillReceiveProps(nextProps){
        //this.setState({products: this.groupProductOffers(nextProps.productOffers)});
    //}

    groupProductOffers(productOffers) {
        return productOffers.reduce((carry, offer) => {
            (carry[offer.product.id] = carry[offer.product.id] || {...offer.product, visible: true, productOffers: []}).productOffers.push(offer);
            return carry;
        }, {});
    }

    toggleProduct(e, productId){
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

    toggleBroadcastRule(e, id){
        if(this.props.toggleBroadcastRule) this.props.toggleBroadcastRule(true, {x: e.clientX, y: e.clientY - 90}, id)
    }

    render() {
        return (
            <div className="App">
                <table className="product-offers">
                    <thead>
                    <tr>
                        <th><Checkbox onChange={(value) => {console.log(value)}}/></th>
                        <th><ThreeDots/></th>
                        <th>Product Name</th>
                        <th>Available</th>
                        <th>Packaging</th>
                        <th>Pkg. size</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>FOB Price</th>
                        <th>Trade Name</th>
                        <th>MFR.</th>
                        <th>Condition</th>
                        <th>MFG Date</th>
                        <th>Broadcast</th>
                        <th><i className="fas fa-cog"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(this.state.products).reduce((rows, product) => {
                        rows.push(
                            <tr className="product" key={product.casNumber}  onClick={(e) => {this.toggleProduct(e, product.id)}}>
                                <td colSpan="1">
                                    <Checkbox onChange={(value) => {console.log(value)}}/>
                                </td>
                                <td colSpan="10">
                                    <span className="product-casnumber">{product.casNumber}</span>
                                    <span className="text-capitalize product-name">{capitalizeFirstLetter(product.casIndexName)}</span>
                                    <span className="text-capitalize product-name">{product.primaryName}</span>
                                </td>
                                <td colSpan="4" className="quantity">
                                    <span>Product offerings: {product.productOffers.length}</span>
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
                                        <td onClick={()=>{this.setState({isOpen: !this.state.isOpen})}}><span onClick={this.state.isOpen ? (e)=>this.toggleBroadcastRule(e, offer.id) : null}><ThreeDots className='small'/></span></td>
                                        <td>{capitalizeFirstLetter(offer.product.casIndexName)}</td>
                                        {/*<td>{offer.packaging.amount}</td>*/}
                                        {/*<td>{offer.packaging.container.name}</td>*/}
                                        {/*<td>{offer.packaging.capacity}</td>*/}
                                        {/*<td>{parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)}</td>*/}
                                        {/*<td>{offer.pricing.cost}</td>*/}
                                        {/*<td>{offer.pricing.price}</td>*/}
                                        <td>{offer.name}</td>
                                        <td>{offer.manufacturer}</td>
                                        <td>{offer.productCondition.name}</td>
                                        <td>unknown</td>
                                        <td><span className={'broadcast-mark' + classnames({' open' : this.props.broadcastActive})}> </span></td>
                                        <td> </td>
                                    </tr>
                                );
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
