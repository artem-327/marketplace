import React, {Component} from 'react';
import './AddInventory.css'
import AddForm from "./components/AddForm";
import AddGroup from './components/AddGroup';
import Chemical from "./components/Chemical";
import {actions} from "react-redux-form";
import {FormattedMessage} from 'react-intl';
import {logout} from "../../../modules/identity";

export default class AddInventory extends Component {
    componentDidMount(){
        if(this.props.edit && this.props.productOffer) {
            this.props.dispatch(actions.merge('forms.productMapping', {
                casNumber: (typeof this.props.productOffer.product !== 'undefined' ? this.props.productOffer.product.casNumber : ''),
                chemicalName: (typeof this.props.productOffer.product !== 'undefined' ? this.props.productOffer.product.chemicalName : ''),
                indexName: (typeof this.props.productOffer.product !== 'undefined' ? this.props.productOffer.product.casIndexName : ''),
                packaging: {
                    size: (typeof this.props.productOffer.packaging !== 'undefined' ? this.props.productOffer.packaging.size : 1),
                    packagingType: (typeof this.props.productOffer.packaging !== 'undefined' ? this.props.productOffer.packaging.packagingType.id : 0),
                    unit: (typeof this.props.productOffer.packaging !== 'undefined' ? this.props.productOffer.packaging.unit.id : 0)
                },
            }));
            this.props.dispatch(actions.merge('forms.productOffering', {
                tradeName: this.props.productOffer.tradeName,
                assayMax: this.props.productOffer.assayMax,
                assayMin: this.props.productOffer.assayMin,
                creationDate: this.props.productOffer.creationDate,
                expirationDate: this.props.productOffer.expirationDate,
                externalNotes: this.props.productOffer.externalNotes,
                internalNotes: this.props.productOffer.internalNotes,
                lotNumber: this.props.productOffer.lotNumber,
                manufacturer: this.props.productOffer.manufacturer,
                anonymous: this.props.productOffer.anonymous,
                name: this.props.productOffer.name,
                origin: this.props.productOffer.origin,
                productCondition: this.props.productOffer.productCondition.id,
                productForm: this.props.productOffer.productForm.id,
                productGrade: this.props.productOffer.productGrade.id,
            }));
            this.props.dispatch(actions.merge('forms.addProductOffer', {
                warehouse: this.props.productOffer.warehouse.id
            }))
        } 
    }

    render() {
        const { productOffer } = this.props;
        return(
            <div>
                <h1
                    className='header'>
                    {
                        !this.props.edit ?
                            <FormattedMessage
                                id='addInventory.addInventory'
                                defaultMessage='ADD INVENTORY'
                            />
                            :
                            <FormattedMessage
                                id='addInventory.editProductOffer'
                                defaultMessage={'EDIT PRODUCT OFFER - ' + productOffer.productName || productOffer.tradeName}
                                values={{productName: productOffer.productName || productOffer.tradeName}}
                            />
                    }
                </h1>
                <AddForm {...this.props}/>
            </div>
        )
    }
}
