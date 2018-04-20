import React, {Component} from 'react';
import {Translate} from 'react-localize-redux'
import './addForm.css'
import { Control} from 'react-redux-form';


class BroadcastSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div  className="broadcast-settings">

                <div className="rules-header col-lg-12 col-md-12 col-sm-12">
                    <Translate id="inventoryPage.addInventory.form.rules"/>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.splitPackages"/></th>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.minimumPackages"/></th>
                        <th scope="col"><Translate id="inventoryPage.addInventory.form.incrementalPricing"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><Control model="forms.purchaseForm.reqShipDate" type="number" placeholder="10"/></td>
                        <td><Control model="forms.purchaseForm.reqShipDate" type="number" placeholder="10"/></td>
                        <td>
                            <Control.select model="simple.favoriteColor">
                                <option><Translate id="inventoryPage.addInventory.form.yes"/></option>
                                <option><Translate id="inventoryPage.addInventory.form.no"/></option>
                            </Control.select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                {/*<table className="table">*/}
                    {/*<thead>*/}
                    {/*<tr>*/}
                        {/*<th scope="col"/>*/}
                        {/*<th scope="col"><Translate id="inventoryPage.addInventory.form.fromPackages"/></th>*/}
                        {/*<th scope="col"><Translate id="inventoryPage.addInventory.form.toPackages"/></th>*/}
                        {/*<th scope="col"><Translate id="inventoryPage.addInventory.form.priceLBS"/></th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    {/*<tbody>*/}
                    {/*<RulesRow id={1} from={10} price={1.86}/>*/}
                    {/*<RulesRow id={2} from={50} price={1.86}/>*/}

                    {/*</tbody>*/}
                {/*</table>*/}
            </div>
        );
    }

}

export default BroadcastSettings;