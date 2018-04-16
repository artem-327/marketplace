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
                    <Translate id="inventoryTable.body.vendor"/>
                </span>
                    <span className="data-table-header-item">
                         <Translate id="inventoryTable.body.mfr"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.origin"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.quantity"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.fobPrice"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.packing"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.exp"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.condition"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.form"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.location"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.zipCode"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.distance"/>
                </span>
                    <span className="data-table-header-item">
                        <Translate id="inventoryTable.body.terms"/>
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