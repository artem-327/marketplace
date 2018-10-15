import React, {Component} from 'react';
import './ProductOffers.css';
import Checkbox from "../../../../components/Checkbox/Checkbox";
import ThreeDots from "../../../../components/ThreeDots/ThreeDots";
import ProductOfferItem from "./ProductOfferItem";
import DataTable from "../../../../components/DataTable";

class ProductOffers extends Component {

    constructor(props) {
        super(props);
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

    render() {
        if(this.props.productOffers.length === 0) return null;
        let rowInit = Object.values(this.state.products).map((product) => {
                return {
                    group: product.casIndexName,
                    countLabel: 'Product Offerings: ',
                    rows: product.productOffers.map((offer)=>({
                        id: offer.id,
                        data: [offer.product.casIndexName,
                            offer.packaging.amount.formatNumber(),
                            offer.packaging.container.name,
                            offer.packaging.capacity,
                            (parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)).formatNumber(),
                            "$ " + offer.pricing.cost.formatMoney(2),
                            "$ " + offer.pricing.price.formatMoney(2),
                            offer.name,
                            offer.manufacturer.name,
                            offer.productCondition.name,
                            'Unknown']
                    }))
                };
            });
        return (
            <div className="App">
                <table className="product-offers">
                    <thead>
                    <tr>
                        <th><Checkbox className='mark-myInv big' inputClass='input-myInv' onChange={(value) => {console.log(value)}}/></th>
                        <th><ThreeDots/></th>
                        <th>Product Name</th>
                        <th>Available</th>
                        <th>Packaging</th>
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
                                    <Checkbox className='mark-myInv' inputClass='input-myInv' onChange={(value) => {console.log(value)}}/>
                                </td>
                                <td colSpan="10">
                                    <span className="product-casnumber">{product.casNumber}</span>
                                    <span className="product-name capitalize">{product.casIndexName}</span>
                                </td>
                                <td colSpan="4" className="quantity">
                                    <span>Product offerings: {product.productOffers.length}</span>
                                    {product.visible ? <i className="icon fas fa-angle-down"/> : <i className="icon fas fa-angle-up"/>}
                                </td>
                            </tr>
                        );
                        if(product.visible){
                            product.productOffers.forEach((offer) => {
                                rows.push(
                                    <ProductOfferItem
                                        key={offer.id}
                                        submitRules={this.props.submitRules}
                                        addPopup={this.props.addPopup}
                                        removePopup={this.props.removePopup}
                                        getProductOffers={this.props.getProductOffers}
                                        targetGroups={this.props.targetGroups}
                                        selections={this.props.selections}
                                        setFilter={(type) => this.props.setFilter(type)}
                                        currentSelected={this.props.currentSelected}
                                        setActiveBroadcastButton={active => this.props.setActiveBroadcastButton(active)}
                                        offer={offer}/>
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
