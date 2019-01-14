import React, {Component} from 'react';
import './ProductOffers.css';
import DataTable from "../../../../components/DataTable";
import BroadcastRule from "./BroadcastRule";
import AddBroadcast from "../../../../pages/inventory/myInventory/components/broadcast";
import ToggleBroadcast from "./ToggleBroadcast";
import {DATE_FORMAT} from "../../../../utils/constants";
import moment from "moment";
import {getUnit} from "../../../../utils/functions";
import Checkbox from "../../../../components/Checkbox/Checkbox"

class ProductOffers extends Component {
    constructor() {
        super();

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

    //state={isOpen: false};

    checkboxToggle = (type) => {

        let newVisibility = {...this.state.visibility};

        newVisibility.broadcast = !newVisibility.broadcast;

        this.setState({
            visibility: newVisibility
        })
    };

    groupProductOffers = (productOffers) => {
        return productOffers.reduce((carry, offer) => {
            (carry[offer.product.id] =
                carry[offer.product.id]
                ||
                {...offer.product, visible: true, productOffers: []}).productOffers.push(offer);
            return carry;
        }, {});
    };

    openBroadcast = (id) => {
        this.props.addPopup(
            <AddBroadcast id={id}/>
        );
    };

    render() {
        let headerInit = [];
        let names = {
            productName: {name: 'Product Name'},
            available: {name: 'Available'},
            packaging: {name: 'Packaging'},
            pkgSize: {name: 'Pkg. size'},
            quantity: {name: 'Quantity'},
            cost: {name: 'Cost'},
            fobPrice: {name: 'FOB Price'},
            tradeName: {name: 'Trade Name'},
            mfr: {name: 'MFR.'},
            condition: {name: 'Condition'},
            mfgDate: {name: 'MFG Date'},
            broadcast: {name: 'Broadcast'}
        };
        const array = Object.keys(this.state.visibility);
        array.map(item => {
            headerInit.push(names[item])
        });

        if(this.props.productOffers.length === 0) return null;
        let rows = Object.values(this.groupProductOffers(this.props.productOffers));
        rows = rows.map(product => {
            return {
                get group() {
                    return (
                        <React.Fragment>
                            <span className="product-casnumber ">
                                {product.casNumber}
                            </span>
                            <span className="product-name capitalize">
                                {product.casIndexName}
                            </span>
                        </React.Fragment>
                    );
                },
                countLabel: 'Product Offerings: ',
                rows: product.productOffers.map(offer=>{
                    const object = {
                        offerId: offer.id,
                        unit: getUnit(offer.packaging.unit.name),
                        packageSize: offer.packaging.size,
                        productName: offer.product.casIndexName,
                        available: offer.pkgAmount.formatNumber(),
                        packaging: offer.packaging.packagingType.name,
                        get pkgSize() {
                            return `${this.packageSize} ${this.unit}`;
                        },
                        get quantity() {
                            return (
                                `${
                                    (parseInt(offer.pkgAmount, 10)
                                        * parseInt(offer.packaging.size, 10)).formatNumber()
                                    } ${this.unit}`);
                        },
                        cost: "$" + offer.pricing.cost.formatMoney(3),
                        fobPrice: (offer.pricing.tiers.length > 0)
                            ? (offer.pricing.tiers[0].price.formatMoney(3) +
                                '-' +
                                offer.pricing.tiers[offer.pricing.tiers.length - 1].price.formatMoney(3))
                            : "$" + offer.pricing.price.formatMoney(3),
                        tradeName: offer.name,
                        mfr: offer.manufacturer.name,
                        condition: offer.productCondition.name,
                        mfgDate: offer.creationDate ? moment(offer.creationDate).format(DATE_FORMAT) : 'none',
                        get broadcast() {
                            return (
                                <ToggleBroadcast
                                    offerId={this.offerId}
                                    broadcasted={offer.broadcasted}
                                />
                            );
                        }
                    };
                    let data = [];

                    array.map(item => {
                        data.push(object[item])
                    });

                    return ({
                        id: object.offerId,
                        data: data
                    })
                })
            };
        });
        return (
            <div className="App">
                <DataTable id="myInventoryTable"
                           selectableRows
                           sortFunc={(nameColumn) => console.log(nameColumn)}
                           headerInit={headerInit}
                           contextMenu={
                               [
                                   {
                                       action: id=>this.props.history.push(`/inventory/edit-inventory/${id}`),
                                       label: 'Edit Listing',
                                   },
                                   {
                                       action: id => this.openBroadcast(id),
                                       label: 'Custom Broadcast'
                                   },
                                   {
                                       action: id => {
                                           this.props.removeProductOffer(
                                               id,
                                               () => this.props.fetchMyProductOffers({})
                                           )
                                       },
                                       label: 'Delete Listing'
                                   }
                               ]
                           }
                           rows={rows}
                           rowComponent={
                               <BroadcastRule
                                   submitRules={this.props.submitRules}
                                   addPopup={this.props.addPopup}
                                   removePopup={this.props.removePopup}
                                   getProductOffers={this.props.fetchMyProductOffers}
                                   targetGroups={this.props.targetGroups}
                                   selections={this.props.selections}
                                   setFilter={(type) => this.props.setFilter(type)}
                                   currentSelected={this.props.currentSelected}
                                   productOffersSelection={this.state.productOffersSelection}
                                   setActiveBroadcastButton={active => this.props.setActiveBroadcastButton(active)}
                               />
                           }
                />
                {/*
                <div>
                    <Checkbox
                        name='broadcacst'
                        label='Broadcast'
                        onChange={this.checkboxToggle}
                        defaultValue={this.state.visibility.broadcast}
                    />
                </div>
                */}
            </div>
        );
    }
}
export default ProductOffers;
