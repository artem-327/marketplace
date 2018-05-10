import React, {Component} from 'react';
import InputGroup from './InputGroup'
import {Control, Form} from 'react-redux-form';
// import classnames from "classnames";

export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location:{
                isPending: false,
                isValid: false,
                hasError: false,
            }
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            location: {
                isPending: nextProps.inventory.location.isPending,
                isValid: nextProps.inventory.location.isValid,
                hasError: nextProps.inventory.location.hasError
            }
        })
    }

    componentWillMount(){

    }

    getLocationInputs(){
        let { isPending, isValid, hasError } = this.state.location;
        let buttonText = isPending ? "SAVING ..." : isValid ? "SAVED" : hasError ? "ERROR" : "+ ADD";
        return[
            {
                label: <label htmlFor="forms.inventoryLocationForm.warehouse">WAREHOUSE</label>,
                component:
                    <Control.select model="forms.inventoryLocationForm.warehouse" id="forms.inventoryLocationForm.warehouse">
                        <option value="red">red</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>
                    </Control.select>,
            },
            {
                label: <label htmlFor="forms.inventoryLocationForm.warehouseName">WAREHOUSE NAME</label>,
                component: <Control.text model="forms.inventoryLocationForm.warehouseName"
                                         id="forms.inventoryLocationForm.warehouseName"/>,
            },
            {
                label: <label htmlFor="forms.inventoryLocationForm.warehouseName">ADDRESS</label>,
                component: <Control.text model="forms.inventoryLocationForm.address"
                                         id="forms.inventoryLocationForm.warehouseName"/>,
            },
            {
                label: <label htmlFor="forms.inventoryLocationForm.city">CITY</label>,
                component: <Control.text model="forms.inventoryLocationForm.city"
                                         id="forms.inventoryLocationForm.city"/>,
            },
            {
                label: <label htmlFor="forms.inventoryLocationForm.state">STATE</label>,
                component:
                    <Control.select model="forms.inventoryLocationForm.state" id="forms.inventoryLocationForm.state">
                        <option value="red">red</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>
                    </Control.select>,
            },
            {
                label: <label htmlFor="forms.inventoryLocationForm.zip">ZIP</label>,
                component: <Control.text model="forms.inventoryLocationForm.zip"
                                         id="forms.inventoryLocationForm.zip"
                                         type="number" />,
            },
            {
                label: <label htmlFor="forms.inventoryLocationForm.contact">CONTACT</label>,
                component: <Control.text model="forms.inventoryLocationForm.contact"
                                         id="forms.inventoryLocationForm.contact"/>,
            },
            {
                label: <label htmlFor="forms.inventoryLocationForm.number">NUMBER</label>,
                component: <Control.text model="forms.inventoryLocationForm.number"
                                         id="forms.inventoryLocationForm.number"/>,
            },
            {
                label: <label htmlFor="forms.inventoryLocationForm.email">EMAIL</label>,
                component: <Control.text model="forms.inventoryLocationForm.email"
                                         id="forms.inventoryLocationForm.email"/>,
            },
            {
                label: "",
                component: <button className='add-form'>{buttonText}</button>,
            }
        ]
    }

    addLocation(input){
        this.props.addLocation(input.country, input.state, input.city, input.address).then(() => {
            setTimeout(function(){
                this.setState({
                    location: {
                        isPending: false,
                        isValid: false,
                        hasError: false,
                    }
                })
            }.bind(this), 2000);
        })
    }

    render() {
        return (
            <div className="input-group">
                <h1>Add Inventory</h1>
                <Form model="forms.inventoryLocationForm" onSubmit={(inputs) => this.addLocation(inputs)}>
                    <InputGroup header='Location' inputs={this.getLocationInputs()}/>
                </Form>
            </div>
        );
    }
}
