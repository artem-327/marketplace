import React, {Component} from 'react';
import './ProductOffers.css';
import DataTable from "../../../../components/DataTable";
import BroadcastRule from "./BroadcastRule";
import AddBroadcast from "../../../../pages/inventory/myInventory/components/broadcast";
import ToggleBroadcast from "./ToggleBroadcast";

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
        if(this.props.productOffers.length === 0) return null;
        let rows = Object.values(this.groupProductOffers(this.props.productOffers)).map((product) => {
                return {
                    group:  <React.Fragment><span className="product-casnumber ">{product.casNumber}</span><span className="product-name capitalize">{product.casIndexName}</span></React.Fragment>,
                    countLabel: 'Product Offerings: ',
                    rows: product.productOffers.map((offer)=>{
                        const shortManufacturerName = offer.manufacturer.name.slice(0,13);
                        const offerId = offer.id
                        return ({
                        id: offerId,
                        data: [offer.product.casIndexName,
                            offer.packaging.amount.formatNumber(),
                            offer.packaging.container.name,
                            offer.packaging.capacity,
                            (parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)).formatNumber(),
                            "$" + offer.pricing.cost.formatMoney(3),
                            "$" + offer.pricing.price.formatMoney(3),
                            offer.name,
                            `${shortManufacturerName}${shortManufacturerName.length < offer.manufacturer.name.length ? "..." : ""}`,
                            offer.productCondition.name,
                            'Unknown',
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
                                   // {action: (id)=>console.log('delete'), label: 'Delete Listing'}
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
