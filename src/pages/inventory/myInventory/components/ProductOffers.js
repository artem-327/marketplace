import React, {Component} from 'react';
import './ProductOffers.css';

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
                        <th><input type="checkbox" /></th>
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
                        <tr className="product" key={'p' + product.id} onClick={() => {this.toggleProduct(product.id)}}>
                            <td colSpan="11">
                                <span>{product.cas}</span>
                                <span className="product-name">{product.name}</span>
                            </td>
                            <td colSpan="3" className="quantity">
                                <span>Product offerings: {product.productOffers.length}</span>
                                {product.visible ? <i className="icon fas fa-angle-down"/> : <i className="icon fas fa-angle-up"/>}
                            </td>
                        </tr>
                        );
                        product.visible ?
                        product.productOffers.forEach((offer) => {
                            rows.push(
                                <tr className="product-offer" key={'o' + offer.id}>
                                    <td><input type="checkbox"/></td>
                                    <td>{offer.product.name}</td>
                                    <td>{offer.packageAmount}</td>
                                    <td>{offer.packageType.name}</td>
                                    <td>{offer.packageType.capacity}</td>
                                    <td>{offer.packageType.quantity}</td>
                                    <td>unknown</td>
                                    <td>unknown</td>
                                    <td>unknown</td>
                                    <td>unknown</td>
                                    <td>{offer.productCondition.name}</td>
                                    <td>unknown</td>
                                    <td>unkown</td>
                                    <td>unkown</td>
                                </tr>
                            );
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