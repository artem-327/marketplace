import React, {Component} from 'react';
import {Translate} from 'react-localize-redux'
import './addForm.css'
import { Control} from 'react-redux-form';


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div  className="details">

                    <div className="location-header col-lg-12 col-md-12 col-sm-12">
                        <Translate id="inventoryPage.addInventory.form.details"/>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.totalPackages"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.packaging"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.packageSize"/></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="1000"/></td>
                            <td>
                                <Control.select model="simple.favoriteColor">
                                    <option>Select</option>
                                    <option value="2">2</option>
                                </Control.select>
                            </td>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="50"/></td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.price"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.pricingUnits"/></th>
                            <th scope="col"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="51.25"/></td>
                            <td>
                                <Control.select model="simple.favoriteColor">
                                    <option>Select</option>
                                    <option value="2">2</option>
                                </Control.select>
                            </td>
                            <td className="description">
                                <span>
                                    <Translate id="inventoryPage.addInventory.form.totalQuantity"/>
                                </span>
                                <span>
                                    50,000.00
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
        );
    }

}

export default Details;