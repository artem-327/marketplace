import React, {Component} from 'react';

import TableItem from './TableItem'

class TableBody extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="data-table">
                <div className="data-table-header">
                <span className="data-table-header-item">
                    Vendor
                </span>
                    <span className="data-table-header-item">
                    MFR.
                </span>
                    <span className="data-table-header-item">
                    ORIGIN
                </span>
                    <span className="data-table-header-item">
                    QUANTITY
                </span>
                    <span className="data-table-header-item">
                    FOB PRICE
                </span>
                    <span className="data-table-header-item">
                    PACKAGING
                </span>
                    <span className="data-table-header-item">
                    EXP.
                </span>
                    <span className="data-table-header-item">
                    CONDITION
                </span>
                    <span className="data-table-header-item">
                    FORM
                </span>
                    <span className="data-table-header-item">
                    LOCATION
                </span>
                    <span className="data-table-header-item">
                    ZIP CODE
                </span>
                    <span className="data-table-header-item">
                    DISTANCE
                </span>
                    <span className="data-table-header-item">
                    TERMS
                </span>
                </div>
                <div className="data-table-line">
                    <hr/>
                </div>
                <TableItem/>
            </div>
        );
    }
}

export default TableBody