import React, {Component} from 'react';
import TableItem from './TableItem'
import {Translate} from 'react-localize-redux'
import ItemPurchase from './ItemPurchase'

class TableBody extends Component {

    render() {
        return (
            <div className="data-table">
                <div className="data-table-header">
                <span className="data-table-header-item">
                   <Translate id="inventoryPage.products.inventoryTable.body.vendor"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryPage.products.inventoryTable.body.mfr"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.origin"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.quantity"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.fobPrice"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.packing"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.exp"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.condition"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.form"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.location"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.zipCode"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.distance"/>
                </span>
                    <span className="data-table-header-item">
                       <Translate id="inventoryPage.products.inventoryTable.body.terms"/>
                </span>
                </div>
                <div className="data-table-line">
                    <hr/>
                </div>
                <TableItem/>
                <ItemPurchase/>
            </div>
        );
    }
}

export default TableBody