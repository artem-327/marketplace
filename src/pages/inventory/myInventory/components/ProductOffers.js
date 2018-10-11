import React, {Component} from 'react';
import './ProductOffers.css';
import Checkbox from "../../../../components/Checkbox/Checkbox";
import ThreeDots from "../../../../components/ThreeDots/ThreeDots";
import ProductOfferItem from "./ProductOfferItem";
import DataTable from "../../../../components/DataTable";

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

    // toggleBroadcastRule(e, id){
    //     if(this.props.toggleBroadcastRule) this.props.toggleBroadcastRule(true, {x: e.clientX, y: e.clientY - 90}, id)
    // }

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
        console.log(rowInit)
        return (
            <div className="App">
                <DataTable id="myInventoryTable"
                           selectable
                           sortFunc={(nameColumn) => console.log(nameColumn)}
                           headerInit={[{name: 'Product Name'}, {name: 'Available'}, {name: 'Packaging'}, {name: 'Pkg. size'}, {name: 'Quantity'}, {name: 'Cost'}, {name: 'FOB Price'}, {name: 'Trade Name'}, {name: 'MFR.'}, {name: 'Condition'}, {name: 'MFG Date'}]}
                           contextMenu={
                               [
                                   {action: (id)=>this.props.history.push(`/inventory/edit-inventory/${id}`), label: 'Edit Listing',},
                                   {action: (id)=>console.log('BR'), label: 'Custom Broadcast'},
                                   {action: (id)=>console.log('delete'), label: 'Delete Listing'}
                               ]
                           }
                           rowsInit={rowInit}
                />
            </div>
        );
    }
}
export default ProductOffers;
