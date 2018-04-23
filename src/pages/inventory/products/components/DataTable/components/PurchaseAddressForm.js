import React, {Component} from 'react';
import { Control, Form } from 'react-redux-form';
import { Translate } from 'react-localize-redux';
import SaveIcon from "../../../../../../images/saveIcon.PNG"


class PurchaseAddressForm extends Component {

    render() {
        let addressRow = <Translate>
            {(translate) =>
                <tr>
                    <td><Control model="forms.purchaseForm.reqShipDate" placeholder={ translate('inventoryPage.products.inventoryTable.purchaseForm.nickname') }/></td>
                    <td><Control model="forms.purchaseForm.reqShipDate" placeholder={ translate('inventoryPage.products.inventoryTable.purchaseForm.companyName') }/></td>
                    <td><Control model="forms.purchaseForm.reqShipDate" placeholder={ translate('inventoryPage.products.inventoryTable.purchaseForm.address') }/></td>
                    <td><Control model="forms.purchaseForm.reqShipDate" placeholder={ translate('inventoryPage.products.inventoryTable.purchaseForm.city') }/></td>
                    <td>
                        <Control.select model="simple.favoriteColor">
                            <option>{ translate('inventoryPage.products.inventoryTable.purchaseForm.selectState') }</option>
                            <option value="2">2</option>
                        </Control.select>
                    </td>
                    <td><Control model="forms.purchaseForm.reqShipDate" placeholder={ translate('inventoryPage.products.inventoryTable.purchaseForm.zip') }/></td>
                    <td><Control model="forms.purchaseForm.reqShipDate" placeholder={ translate('inventoryPage.products.inventoryTable.purchaseForm.contact') }/></td>
                    <td><Control model="forms.purchaseForm.reqShipDate" placeholder={ translate('inventoryPage.products.inventoryTable.purchaseForm.contactNumber') }/></td>
                    <td><Control model="forms.purchaseForm.reqShipDate" type="email" placeholder={ translate('inventoryPage.products.inventoryTable.purchaseForm.contactEmail') }/></td>
                    <td>
                        <button>
                            <img src={SaveIcon} alt="saveAddress"/>
                        </button>
                    </td>
                </tr>

            }
        </Translate>;

        return (
            <div className="purchase-address-form">
                <Form model="forms.addressForm">
                    <table className="table">
                        <tbody>
                        {addressRow}
                        </tbody>
                    </table>
                </Form>
            </div>
        );
    }
}

export default PurchaseAddressForm;