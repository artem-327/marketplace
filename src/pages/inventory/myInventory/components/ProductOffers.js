import React, {Component} from 'react';
import './ProductOffers.css';
import DataTable from "../../../../components/DataTable";
import BroadcastRule from "./BroadcastRule";
import AddBroadcast from "../../../../pages/inventory/myInventory/components/broadcast";
import ToggleBroadcast from "./ToggleBroadcast";
import {DATE_FORMAT} from "../../../../utils/constants";
import moment from "moment";
import {getUnit} from "../../../../utils/functions";
import confirm from '../../../../components/Confirmable/confirm';

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
        this.checkboxToggle = this.checkboxToggle.bind(this)
    }

    state={isOpen: false};

    checkboxToggle(type) {

        let newVisibility = {...this.state.visibility};

        newVisibility.broadcast = !newVisibility.broadcast;

        this.setState({
            visibility: newVisibility
        })
    }

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
                    group: <React.Fragment><span className="product-casnumber ">{product.casNumber}</span><span className="product-name capitalize">{product.casIndexName}</span></React.Fragment>,
                    countLabel: 'Product Offerings: ',
                    rows: product.productOffers.map((offer)=>{

                        const offerId = offer.id;
                        const unit = getUnit(offer.packaging.unit.name);
                        const packageUnit = offer.packaging.packagingType.name;
                        const packageSize = offer.packaging.size;
                        return ({
                        id: offerId,
                        data: [offer.product.casIndexName,
                            offer.pkgAmount.formatNumber(),
                            packageUnit,
                            `${packageSize} ${unit}`,
                            `${(parseInt(offer.pkgAmount, 10) * parseInt(offer.packaging.size, 10)).formatNumber()} ${unit}`,
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
                           headerInit={headerInit}
                           contextMenu={
                               [
                                   {action: (id)=>this.props.history.push(`/inventory/edit-inventory/${id}`), label: 'Edit Listing',},
                                   {action: (id) => this.openBroadcast(id), label: 'Custom Broadcast'},
                                   {action: (id) => confirm('Remove listings', 'Are you sure you want to remove listings from Your Inventory?').then(
                                       (result) => {
                                           // `proceed`
                                           this.props.removeProductOffer(id, () => this.props.fetchMyProductOffers({}))
                                       },
                                           (result) => {
                                           // `cancel`
                                       }
                                   ), label: 'Delete Listing'}
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
                {/*
                <div>
                    <Checkbox name='broadcacst' label='Broadcast' onChange={this.checkboxToggle} defaultValue={this.state.visibility.broadcast}/> 
                </div>*/}
            </div>
        );
    }
}
export default ProductOffers;
