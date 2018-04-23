import React, {Component} from 'react';
import {Translate} from 'react-localize-redux'
import './addForm.css'
import { Control} from 'react-redux-form';
import DocumentsImage from "../../../../../images/documentsButton.png"


class BroadcastSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div  className="broadcast-settings">

                <div className="broadcast-header col-lg-12 col-md-12 col-sm-12">
                    <Translate id="inventoryPage.addInventory.form.broadcastSettings"/>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.listAnonymously"/></th>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.restrictedStates"/></th>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.restrictedCompanies"/></th>
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


                <div className="broadcast-header col-lg-12 col-md-12 col-sm-12">
                    <Translate id="inventoryPage.addInventory.form.documents"/>
                </div>
                <div className="row documents-buttons">
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <button>
                            <img alt="documentsImage" src={DocumentsImage}/>
                            <Translate id="inventoryPage.addInventory.form.attachCofA"/>
                        </button>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <button>
                            <img alt="documentsImage" src={DocumentsImage}/>
                            <Translate id="inventoryPage.addInventory.form.attachSDS"/>
                        </button>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <button>
                            <img alt="documentsImage" src={DocumentsImage}/>
                            <Translate id="inventoryPage.addInventory.form.attachSpecSheet"/>
                        </button>
                    </div>
                </div>
                <div className="row add-inventory">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <button className="add-inventory-button">
                            <img alt="documentsImage" src={DocumentsImage}/>
                            <Translate id="inventoryPage.addInventory.form.addInventoryButton"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default BroadcastSettings;