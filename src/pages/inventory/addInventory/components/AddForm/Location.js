import React, {Component} from 'react';
import {Translate} from 'react-localize-redux'
import './addForm.css'
import { Control, Form } from 'react-redux-form';


class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div  className="location">
                <Form model="forms.locationForm">
                    <div className="location-header col-lg-12 col-md-12 col-sm-12">
                        <Translate id="inventoryPage.addInventory.form.location"/>
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.warehouse"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.warehouseName"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.address"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.city"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.state"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.zip"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.contact"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.number"/></th>
                            <th scope="col"><Translate id="inventoryPage.addInventory.form.email"/></th>
                            <th scope="col"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <Control.select model="simple.favoriteColor">
                                    <option>Select</option>
                                    <option value="2">2</option>
                                </Control.select>
                            </td>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="Warehouse Name"/></td>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="15246 Ave"/></td>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="Seattle"/></td>
                            <td>
                                <Control.select model="simple.favoriteColor">
                                    <option>Select</option>
                                    <option value="2">2</option>
                                </Control.select>
                            </td>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="12345"/></td>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="Steve Ross"/></td>
                            <td><Control model="forms.purchaseForm.reqShipDate" placeholder="(312) 898-1234"/></td>
                            <td><Control model="forms.purchaseForm.reqShipDate" type="email" placeholder="scott@scott.com"/></td>
                            <td><button><span>+</span><Translate id="inventoryPage.addInventory.form.add"/></button></td>
                        </tr>
                        </tbody>
                    </table>
                </Form>
            </div>
        );
    }

}

export default Location;