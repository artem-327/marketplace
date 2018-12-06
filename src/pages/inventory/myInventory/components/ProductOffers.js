import React, {Component} from 'react';
import './ProductOffers.css';
import DataTable from "../../../../components/DataTable";
import BroadcastRule from "./BroadcastRule";
import AddBroadcast from "../../../../pages/inventory/myInventory/components/broadcast";
import ToggleBroadcast from "./ToggleBroadcast";
import {DATE_FORMAT} from "../../../../utils/constants";
import moment from "moment";
import {getUnit} from "../../../../utils/functions";

class ProductOffers extends Component {

    state={isOpen: false};

    groupProductOffers(productOffers) {
        return productOffers.reduce((carry, offer) => {
            (carry[offer.product.id] = carry[offer.product.id] || {...offer.product, visible: true, productOffers: []}).productOffers.push(offer);
            return carry;
        }, {});
    }

    openBroadcast = (id) => {
        this.props.addPopup(<AddBroadcast id={id}/>)
    }

    render() {
        console.log(this.props)
        if(this.props.productOffers.length === 0) return null;
        let rows = Object.values(this.groupProductOffers(this.props.productOffers)).map((product) => {
                return {
                    group:  <React.Fragment><span className="product-casnumber ">{product.casNumber}</span><span className="product-name capitalize">{product.casIndexName}</span></React.Fragment>,
                    countLabel: 'Product Offerings: ',
                    rows: product.productOffers.map((offer)=>{
                        const offerId = offer.id
                        const unit = getUnit(offer.packaging.unit.name);
                        const packageUnit = offer.packaging.container.name;
                        const packageSize = offer.packaging.capacity;
                        return ({
                        id: offerId,
                        data: [offer.product.casIndexName,
                            offer.packaging.amount.formatNumber(),
                            packageUnit,
                            `${packageSize} ${unit}`,
                            `${(parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)).formatNumber()} ${unit}`,
                            offer.pricing.tiers.length > 1 ? offer.pricing.tiers[0].price.formatMoney(3) + '-' + offer.pricing.tiers[offer.pricing.tiers.length - 1].price.formatMoney(3) : "$" + offer.pricing.cost.formatMoney(3),
                            "$" + offer.pricing.price.formatMoney(3),
                            offer.name,
                            offer.manufacturer.name,
                            offer.productCondition.name,
                            offer.creationDate ? moment(offer.creationDate).format(DATE_FORMAT) : 'none',
                            <ToggleBroadcast 
                                offerId={offerId}
                                broadcasted={offer.broadcasted}
                            /> 
                        ]
                        })
                    })
                };
            });
        return (<div className="App">
                <DataTable id="myInventoryTable"
                           selectableRows
                           sortFunc={(nameColumn) => console.log(nameColumn)}
                           headerInit={[
                               {name: 'Product Name'}, 
                               {name: 'Available'}, 
                               {name: 'Packaging'}, 
                               {name: 'Pkg. size'}, 
                               {name: 'Quantity'}, 
                               {name: 'Cost'}, 
                               {name: 'FOB Price'}, 
                               {name: 'Trade Name'}, 
                               {name: 'MFR.'}, 
                               {name: 'Condition'}, 
                               {name: 'MFG Date'},
                               {name: 'Broadcast'}
                            ]}
                           contextMenu={
                               [
                                   {action: (id)=>this.props.history.push(`/inventory/edit-inventory/${id}`), label: 'Edit Listing',},
                                   {action: (id) => this.openBroadcast(id), label: 'Custom Broadcast'},
                                   {action: (id) => this.props.removeProductOffer(id, () => this.props.fetchMyProductOffers({})), label: 'Delete Listing'}
                               ]
                           }
                           rows={rows}
                           rowComponent={<BroadcastRule
                               submitRules={this.props.submitRules}
                               addPopup={this.props.addPopup}
                               removePopup={this.props.removePopup}
                               getProductOffers={this.props.fetchMyProductOffers}
                               targetGroups={this.props.targetGroups}
                               selections={this.props.selections}
                               setFilter={(type) => this.props.setFilter(type)}
                               currentSelected={this.props.currentSelected}
                               productOffersSelection={this.state.productOffersSelection}
                               setActiveBroadcastButton={active => this.props.setActiveBroadcastButton(active)}/>}
                />
            </div>
        );
    }
}
export default ProductOffers;
