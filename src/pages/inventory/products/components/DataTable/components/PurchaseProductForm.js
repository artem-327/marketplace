import React, {Component} from 'react';
import { Control, Form } from 'react-redux-form';
import { Translate } from 'react-localize-redux';


class PurchaseProductForm extends Component {

    render() {
        return (
            <div className="purchase-product-form">
                <Form model="forms.purchaseForm">
                    <div className="row">
                        <div className="col-lg-5 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="form-item col-lg-3 col-md-3 col-sm-12">
                                    <label  htmlFor="forms.purchaseForm.shipTo" className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.shipTo"/></label>
                                    <select className="form-control filter-select">
                                        <option>Topeka</option>
                                        <option>2</option>
                                    </select>
                                    {/*<Control.select model="forms.purchaseForm.shipTo" />*/}
                                </div>
                                <div className="form-item col-lg-3 col-md-3 col-sm-12">
                                    <label htmlFor="forms.purchaseForm.reqShipDate" className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.reqShipDate"/></label>
                                    <Control model="forms.purchaseForm.reqShipDate" />
                                </div>
                                <div className="form-item col-lg-3 col-md-3 col-sm-12">
                                    <label  htmlFor="forms.purchaseForm.quantity" className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.quantity"/></label>
                                    <select className="form-control filter-select">
                                        <option>Drums</option>
                                        <option>2</option>
                                    </select>
                                    {/*<Control.select model="forms.purchaseForm.quantity" />*/}
                                    <span><Translate id="inventoryPage.products.inventoryTable.purchaseForm.incrementalPricing"/></span>
                                </div>
                                <div className="form-item col-lg-3 col-md-3 col-sm-12">
                                    <div className="form-item-header">
                                        <Control.checkbox model="forms.purchaseForm.shippingServiceCheckbox" />
                                        <span className="shipping-service-description"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.addShippingService"/></span>
                                    {/*<Control.select model="forms.purchaseForm.shippingService" />*/}
                                    </div>
                                    <select className="form-control filter-select">
                                        <option>N/A</option>
                                        <option>2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <div className="row">

                                <div className="form-item-description">
                                    <span className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.totalQTY"/></span>
                                    <span className="detail-item-text">980 lbs</span>
                                </div>

                                <div className="form-item-description">
                                    <span className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.priceLBFOB"/></span>
                                    <span className="detail-item-text">$1.3606</span>
                                </div>

                                <div className="form-item-description">
                                    <span className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.freightCost"/></span>
                                    <span className="detail-item-text">N/A</span>
                                </div>

                                <div className="form-item-description">
                                    <span className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.totalFreightCost"/></span>
                                    <span className="detail-item-text">N/A</span>
                                </div>

                                <div className="form-item-description">
                                    <span className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.deliveryCost"/></span>
                                    <span className="detail-item-text">N/A</span>
                                </div>

                                <div className="form-item-description">
                                    <span className="form-item-header"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.totalCost"/></span>
                                    <span className="detail-item-text">N/A</span>
                                </div>

                                <div className="form-middle form-item-description">
                                    <button className="purchase-button"><Translate id="inventoryPage.products.inventoryTable.purchaseForm.purchase"/></button>
                                    <button className="cancel-button">X</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default PurchaseProductForm;