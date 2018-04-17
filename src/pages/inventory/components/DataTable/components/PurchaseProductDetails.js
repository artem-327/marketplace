import React, {Component} from 'react';
import { Translate } from 'react-localize-redux';

class PurchaseProductDetails extends Component {

    render() {
        return (
            <div className="purchase-product-detail">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"><Translate id="inventoryTable.body.vendor"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.mfr"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.origin"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.packing"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.location"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.condition"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.form"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.assay"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.zip"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.packagingWeight"/></th>
                        <th scope="col"><Translate id="inventoryTable.body.totalProductAvailable"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Mark</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Mark</td>
                        <td>Mark</td>
                        <td>Mark</td>
                        <td>Mark</td>
                        <td>Mark</td>
                        <td>Mark</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PurchaseProductDetails