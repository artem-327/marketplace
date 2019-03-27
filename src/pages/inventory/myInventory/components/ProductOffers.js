import React, {Component} from 'react';
import './ProductOffers.scss';
import DataTable from "../../../../components/DataTable";
import BroadcastRule from "./BroadcastRule";
import AddBroadcast from "../../../../pages/inventory/myInventory/components/broadcast";
import ToggleBroadcast from "./ToggleBroadcast";
import {DATE_FORMAT} from "../../../../utils/constants";
import moment from "moment";
import {getUnit} from "../../../../utils/functions";
import confirm from '../../../../components/Confirmable/confirm';
import {NavLink} from 'react-router-dom';
import {checkToken} from "../../../../utils/auth";

class ProductOffers extends Component {

    groupProductOffers(productOffers) {
        return productOffers.reduce((carry, offer) => {
            (carry[(typeof offer.product !== 'undefined' ? offer.product.id : 0)] = carry[(typeof offer.product !== 'undefined' ? offer.product.id : 0)] || {...offer.product, visible: true, productOffers: []}).productOffers.push(offer);
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
                group: <React.Fragment>
                            {typeof product.casNumber !== 'undefined' ?
                                <span
                                    className="product-casnumber ">
                                        {product.casNumber}
                                </span> : ''
                            }
                            <span
                                className="product-name capitalize">
                                    {typeof product.casIndexName !== 'undefined' ? product.casIndexName : 'Unmapped'}
                            </span>
                        </React.Fragment>,
                countLabel: 'Product Offerings: ',
                rows: product.productOffers.map((productOffer) => {
                    const productOfferId = productOffer.id
                    const productName = productOffer.productName;
                    const productCode = productOffer.hasOwnProperty('productCode') ? productOffer.productCode : '';
                    const warehouse = productOffer.warehouse.warehouseName;
                    const available = productOffer.pkgAmount.formatNumber();
                    const packaging = productOffer.packaging.packagingType.name;
                    const pkgSize = `${productOffer.packaging.size} ${productOffer.packaging.unit.nameAbbreviation}`;
                    const quantityPart2 = `${productOffer.packaging.unit.nameAbbreviation}`;
                    const quantity = `${(parseInt(productOffer.pkgAmount, 10) * parseInt(productOffer.packaging.size, 10)).formatNumber()} ` + quantityPart2;
                    const cost = "$" + productOffer.pricing.cost.formatMoney(3);
                    const fobPrice = productOffer.pricing.tiers.length > 1 ?
                        ("$" + productOffer.pricing.tiers[productOffer.pricing.tiers.length - 1].price.formatMoney(3)
                            + ' - ' + "$" + productOffer.pricing.tiers[0].price.formatMoney(3))
                        : ("$" + productOffer.pricing.price.formatMoney(3));
                    const tradeName = productOffer.tradeName;
                    const mfr = (typeof productOffer.manufacturer !== 'undefined' ? productOffer.manufacturer.name : '');
                    /* temporarily removed */ //const condition = productOffer.productCondition.name;
                    /* temporarily removed */ //const mfgDate = productOffer.creationDate ? moment(productOffer.creationDate).format(DATE_FORMAT) : 'none';
                    const broadcast = <ToggleBroadcast offerId={productOfferId} broadcasted={productOffer.broadcasted}/>;

                    return ({
                        id: productOfferId,
                        data: [
                            productName,
                            productCode,
                            warehouse,
                            available,
                            packaging,
                            pkgSize,
                            quantity,
                            cost,
                            fobPrice,
                            tradeName,
                            mfr,
                            /* temporarily removed */ //condition,
                            /* temporarily removed */ //mfgDate,
                            broadcast
                        ]
                    })
                })
            };
        });

        const headerInit = [
            {name: 'ProductName'},
            {name: 'ProductNumber'},
            {name: 'Warehouse'},
            {name: 'Available'},
            {name: 'Packaging'},
            {name: 'Pkg.size'},
            {name: 'Quantity'},
            {name: 'Cost'},
            {name: 'FOBPrice'},
            {name: 'TradeName'},
            {name: 'MFR.'},
            /* temporarily removed */ //{name: 'Condition'},
            /* temporarily removed */ //{name: 'MFGDate'},
            {name: 'Broadcast'}
        ];

        const dataTable = <DataTable
                                id="myInventoryTable"
                                selectableRows
                                sortFunc={(nameColumn) => console.log(nameColumn)}
                                headerInit={headerInit}
                                contextMenu={[
                                         {action: (id) => { if (checkToken(this.props)) return; this.props.history.push(`/inventory/edit-inventory/${id}`) }, label: 'editListing',},
                                         {action: (id) => { if (checkToken(this.props)) return; this.openBroadcast(id) }, label: 'customBroadcast'},
                                         {action: (id) => { if (checkToken(this.props)) return; confirm('removeListings', 'Are you sure you want to remove listings from Your Inventory?').then(
                                                 () => {
                                                     this.props.deleteProductOffer(id, () => this.props.fetchMyProductOffers({}))
                                                 },
                                                 () => {}
                                             ) }, label: 'Delete Listing'}
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
        />;

        return (dataTable);
    }
}

export default ProductOffers;
