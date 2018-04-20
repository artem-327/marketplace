import React, {Component} from 'react';
import {Translate} from 'react-localize-redux'
import './addForm.css'
import Location from "./Location"
import Details from "./Details"
import Attributes from "./Attributes"
import Rules from "./Rules"
import BroadcastSettings from "./BroadcastSettings"
import { Form } from 'react-redux-form';

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div  className="AddInventoryFrom">
                <div className="header">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Translate id="inventoryPage.addInventory.form.addInventory"/>
                    </div>
                </div>
                <div className="product">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <span className="product-id"> 68-63-62</span>
                        <span className="product-name">Isopropyl Alcohol (2-Proponal)</span>
                    </div>
                </div>
                <Location/>
                <Form model="forms.purchaseForm">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Details/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Attributes/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Rules/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <BroadcastSettings/>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

}

export default AddForm;