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

    constructor(props) {
        super(props)

        this.state = {
            visibility: {
                productName: true,
                available: true,
                packaging: true,
                pkgSize: true,
                quantity: true,
                cost: true,
                fobPrice: true,
                tradeName: true,
                mfr: true,
                condition: true,
                mfgDate: true,
                broadcast: true
            }
        };
    }

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

    setVisibility = () => {
        this.setState({visibility: {broadcast: false}})
    }

    render() {
        let headerInit = []

            if (this.state.visibility.productName) {
                headerInit.push({name: 'Product Name'})
            } if (this.state.visibility.available) {
                headerInit.push({name: 'Available'})
            } if (this.state.visibility.packaging) {
                headerInit.push({name: 'Packaging'})
            } if (this.state.visibility.pkgSize) {
                headerInit.push({name: 'Pkg. size'})
            } if (this.state.visibility.quantity) {
                headerInit.push({name: 'Quantity'})
            } if (this.state.visibility.cost) {
                headerInit.push({name: 'Cost'})
            } if (this.state.visibility.fobPrice) {
                headerInit.push({name: 'FOB Price'})
            } if (this.state.visibility.tradeName) {
                headerInit.push({name: 'Trade Name'})
            } if (this.state.visibility.mfr) {
                headerInit.push({name: 'MFR.'})
            } if (this.state.visibility.condition) {
                headerInit.push({name: 'Condition'})
            } if (this.state.visibility.mfgDate) {
                headerInit.push({name: 'MFG Date'})
            } if (this.state.visibility.broadcast) {
                headerInit.push({name: 'Broadcast'})
            }

            if (this.state.visibility.productName) {
                headerInit.push()
            } else     

        if(this.props.productOffers.length === 0) return null;
        let rows = Object.values(this.groupProductOffers(this.props.productOffers)).map((product) => {
                return {
                    group: <React.Fragment><span className="product-casnumber ">{product.casNumber}</span><span className="product-name capitalize">{product.casIndexName}</span></React.Fragment>,
                    countLabel: 'Product Offerings: ',
                    rows: product.productOffers.map((offer)=>{

                        const offerId = offer.id;
                        const unit = getUnit(offer.packaging.unit.name);
                        const packageSize = offer.packaging.size;
                        
                        const productName = offer.product.casIndexName;
                        const available = offer.pkgAmount.formatNumber();
                        const packaging = offer.packaging.packagingType.name;
                        const pkgSize = `${packageSize} ${unit}`;
                        const quantity = `${(parseInt(offer.pkgAmount, 10) * parseInt(offer.packaging.size, 10)).formatNumber()} ${unit}`;
                        const cost = "$" + offer.pricing.cost.formatMoney(3);
                        const fobPrice = offer.pricing.tiers.length > 0 ? offer.pricing.tiers[0].price.formatMoney(3) + '-' + offer.pricing.tiers[offer.pricing.tiers.length - 1].price.formatMoney(3) : "$" + offer.pricing.price.formatMoney(3);
                        const tradeName = offer.name;
                        const mfr = offer.manufacturer.name;
                        const condition = offer.productCondition.name;
                        const mfgDate = offer.creationDate ? moment(offer.creationDate).format(DATE_FORMAT) : 'none';
                        const broadcast = <ToggleBroadcast offerId={offerId} broadcasted={offer.broadcasted}/>

                        let data = []

                        /*
                        for (let i = 0; i < data.length; i++) {
                            if (this.state.visibility.i) {
                                data.push(i)
                            }
                        }*/

                        if (this.state.visibility.productName) {
                            data.push(productName)
                        } if (this.state.visibility.available) {
                            data.push(available)
                        } if (this.state.visibility.packaging) {
                            data.push(packaging)
                        } if (this.state.visibility.pkgSize) {
                            data.push(pkgSize)
                        } if (this.state.visibility.quantity) {
                            data.push(quantity)
                        } if (this.state.visibility.cost) {
                            data.push(cost)
                        } if (this.state.visibility.fobPrice) {
                            data.push(fobPrice)
                        } if (this.state.visibility.tradeName) {
                            data.push(tradeName)
                        } if (this.state.visibility.mfr) {
                            data.push(mfr)
                        } if (this.state.visibility.condition) {
                            data.push(condition)
                        } if (this.state.visibility.mfgDate) {
                            data.push(mfgDate)
                        } if (this.state.visibility.broadcast) {
                            data.push(broadcast)
                        }
 
                        return ({
                            id: offerId,
                            data: data
                        })
                    })
                };
            });
        return (<div className="App">
                <DataTable id="myInventoryTable"
                           selectableRows
                           sortFunc={(nameColumn) => console.log(nameColumn)}
                           headerInit={headerInit}
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
