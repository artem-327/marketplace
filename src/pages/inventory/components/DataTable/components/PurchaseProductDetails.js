import React, {Component} from 'react';
import { Translate } from 'react-localize-redux';

class PurchaseProductDetails extends Component {

    render() {
        return (
            <div className="purchase-product-detail">
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.vendor"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.mfr"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.origin"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.packing"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.location"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.condition"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.form"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.assay"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.zip"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item-long left-border-line">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.packagingWeight"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
                <div className="detail-item-long">
                    <span className="detail-item-header"><Translate id="inventoryTable.body.totalProductAvailable"/></span>
                    <span className="detail-item-text"><Translate id="inventoryTable.body.vendor"/></span>
                </div>
            </div>
        );
    }
}

export default PurchaseProductDetails