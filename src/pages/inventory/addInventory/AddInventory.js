import React, {Component} from 'react';
import './AddInventory.css'
import AddForm from "./components/AddForm";
import AddGroup from './components/AddGroup';
import Chemical from "./components/Chemical";
import {actions} from "react-redux-form";

export default class AddInventory extends Component {
    componentDidMount(){
        if(this.props.edit && this.props.productOffer){
            this.props.dispatch(actions.merge('forms.productMapping', {
                casNumber: this.props.productOffer.product.casNumber,
                chemicalName: this.props.productOffer.product.chemicalName,
                indexName: this.props.productOffer.product.casIndexName,
                packaging: {
                    capacity: this.props.productOffer.packaging.capacity,
                    container: this.props.productOffer.packaging.container.id,
                    unit: this.props.productOffer.packaging.unit.id
                },
            }));
            this.props.dispatch(actions.merge('forms.productOffering', {
                // assayMax: "54"
                // assayMin: "1"
                // creationDate: "10-02-2018"
                // expirationDate: "10-03-2018"
                // externalNotes: "sdf"
                // internalNotes: "asdf"
                lotNumber: this.props.productOffer.lotNumber,
                manufacturer: this.props.productOffer.manufacturer,
                name: this.props.productOffer.name,
                origin: this.props.productOffer.origin,
                productCondition: this.props.productOffer.productCondition.id,
                productForm: this.props.productOffer.productForm.id,
                productGrade: this.props.productOffer.productGrade.id,
                totalPackages: this.props.productOffer.packaging.amount,
            }));
            this.props.dispatch(actions.merge('forms.addProductOffer', {
                warehouse: this.props.productOffer.warehouse.id
            }))
        }
    }

    render() {
        return(
        <div>
            <h1 className='header'>{!this.props.edit ? 'ADD INVENTORY' : 'EDIT PRODUCT OFFER - ' + this.props.productOffer.name}</h1>
            <AddGroup header='CHEMICAL' component={<Chemical edit={this.props.edit} resetForm={this.props.resetForm}/>}/>
            <AddForm {...this.props}/>
        </div>)
    }
}
