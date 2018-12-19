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
import {NavLink} from 'react-router-dom';

class ProductOffers extends Component {

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
        
        const rows = Object.values(this.groupProductOffers(this.props.productOffers)).map((product) => {
                return {
                    group: <React.Fragment><span className="product-casnumber ">{product.casNumber}</span><span className="product-name capitalize">{product.casIndexName}</span></React.Fragment>,
                    countLabel: 'Product Offerings: ',
                    rows: product.productOffers.map((productOffer) => {
                        
                        const productOfferId = productOffer.id
                        const productName = productOffer.product.casIndexName;
                        const available = productOffer.pkgAmount.formatNumber();
                        const packaging = productOffer.packaging.packagingType.name;
                        const pkgSize = `${productOffer.packaging.size} ${getUnit(productOffer.packaging.unit.name)}`;
                        const quantity = `${(parseInt(productOffer.pkgAmount, 10) * parseInt(productOffer.packaging.size, 10)).formatNumber()} ${getUnit(productOffer.packaging.unit.name)}`;
                        const cost = "$" + productOffer.pricing.cost.formatMoney(3);
                        const fobPrice = productOffer.pricing.tiers.length > 1 
                                         ? ("$" + productOffer.pricing.tiers[productOffer.pricing.tiers.length - 1].price.formatMoney(3) + ' - ' + "$" + productOffer.pricing.tiers[0].price.formatMoney(3))
                                         : ("$" + productOffer.pricing.price.formatMoney(3));              
                        const tradeName = productOffer.name;
                        const mfr = productOffer.manufacturer.name;
                        const condition = productOffer.productCondition.name;
                        const mfgDate = productOffer.creationDate ? moment(productOffer.creationDate).format(DATE_FORMAT) : 'none';
                        const broadcast = <ToggleBroadcast offerId={productOfferId} broadcasted={productOffer.broadcasted}/> 

                        return ({
                            id: productOfferId,
                            data: [
                                productName,
                                available,
                                packaging,
                                pkgSize,
                                quantity,
                                cost,
                                fobPrice,
                                tradeName,
                                mfr,
                                condition,
                                mfgDate,
                                broadcast
                            ]
                        })
                    })
                };
            });

            const headerInit = [
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
            ]

            const dataTable = <DataTable id="myInventoryTable"
                                        selectableRows
                                        sortFunc={(nameColumn) => console.log(nameColumn)}
                                        headerInit={headerInit}
                                        contextMenu={[
                                            {action: (id) => this.props.history.push(`/inventory/edit-inventory/${id}`), label: 'Edit Listing',},
                                            {action: (id) => this.openBroadcast(id), label: 'Custom Broadcast'},
                                            {action: (id) => confirm('Remove listings', 'Are you sure you want to remove listings from Your Inventory?').then(
                                                    () => {
                                                        this.props.removeProductOffer(id, () => this.props.fetchMyProductOffers({}))
                                                    },
                                                        () => {}
                                                ), label: 'Delete Listing'}
                                            ]}
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
                                            setActiveBroadcastButton={active => this.props.setActiveBroadcastButton(active)}/>}
                                        />

        return (dataTable);
    }
}

export default ProductOffers;
