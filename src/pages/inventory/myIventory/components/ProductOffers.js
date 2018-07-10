import React, {Component} from 'react';
import './ProductOffers.css';
import {PRICE_PRECISION} from "../../../../utils/constants";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import ThreeDots from "../../../../components/ThreeDots/ThreeDots";

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
                            <tr className="product" key={product.casNumber} onClick={() => {this.toggleProduct(product.id)}}>
                                <td colSpan="1">
                                    <Checkbox onChange={(value) => {console.log(value)}}/>
                                </td>
                                <td colSpan="10">
                                    <span>{product.casNumber}</span>
                                    <span className="product-name">{product.primaryName}</span>
                                </td>
                                <td colSpan="4" className="quantity">
                                    <span>Product offerings: {product.productOffers.length}</span>
                                    {product.visible}
                                </td>
                            </tr>
                        );
                        if(product.visible){
                            product.productOffers.forEach((offer) => {
                                rows.push(
                                    <tr className="product-offer" key={offer.id}>
                                        <td><Checkbox onChange={(value) => {console.log(value)}}/></td>
                                        <td><ThreeDots className='small'/></td>
                                        <td>{offer.product.primaryName}</td>
                                        <td>{offer.packageAmount}</td>
                                        <td>{offer.packageType.name}</td>
                                        <td>{offer.packageType.capacity}</td>
                                        <td>{offer.packageAmount}</td>
                                        <td>{offer.pricePerUnit.toFixed(PRICE_PRECISION)}</td>
                                        <td>unknown</td>
                                        <td>unknown</td>
                                        <td>unknown</td>
                                        <td>{offer.productCondition.name}</td>
                                        <td>unknown</td>
                                        <td>unkown</td>
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
