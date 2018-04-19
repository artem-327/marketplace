import React, {Component} from 'react';
import { Translate } from 'react-localize-redux';

class PurchaseProductDetails extends Component {

    render() {
        return (
            <div className="purchase-product-detail">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.vendor"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.mfr"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.origin"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.packing"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.location"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.condition"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.form"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.assay"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.zip"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.packagingWeight"/></th>
                        <th scope="col"><Translate id="inventoryPage.products.inventoryTable.body.totalProductAvailable"/></th>
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