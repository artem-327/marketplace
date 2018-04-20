import React, {Component} from 'react';
import {Translate} from 'react-localize-redux'
import './addForm.css'
import { Control, Field} from 'react-redux-form';


class Attributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div  className="attributes">

                <div className="attributes-header col-lg-12 col-md-12 col-sm-12">
                    <Translate id="inventoryPage.addInventory.form.attributes"/>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.manufacturer"/></th>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.origin"/></th>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.form"/></th>
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
                        <td>
                            <Control.select model="simple.favoriteColor">
                                <option>Select</option>
                                <option value="2">2</option>
                            </Control.select>
                        </td>
                        <td>
                            <Control.select model="simple.favoriteColor">
                                <option>Select</option>
                                <option value="2">2</option>
                            </Control.select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.assay"/></th>
                        <th scope="col"/>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.grade"/></th>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.condition"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Field model="attributes.assayMin">
                                <label>
                                    <span className="min-text">
                                        <Translate id="inventoryPage.addInventory.form.min"/>
                                    </span>
                                    <input type="number" placeholder="99.00"/>
                                </label>
                            </Field>
                        </td>
                        <td className="min-max-inputs">
                            <Field model="attributes.assayMax">
                                <label>
                                    <span className="max-text">
                                        <Translate id="inventoryPage.addInventory.form.max"/>
                                    </span>
                                    <div className="input-group">
                                        <input type="number"/>
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon2">%</span>
                                        </div>
                                    </div>

                                </label>
                            </Field>
                        </td>
                        <td>
                            <Control.select model="simple.favoriteColor">
                                <option>Select</option>
                                <option value="2">2</option>
                            </Control.select>
                        </td>
                        <td>
                            <Control.select model="simple.favoriteColor">
                                <option>Select</option>
                                <option value="2">2</option>
                            </Control.select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Attributes;