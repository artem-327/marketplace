import React, {Component} from 'react';
import AddGroup from '../AddGroup'
import {Form} from 'react-redux-form';
import Pricing from './Pricing';
import Location from './Location';
import classnames from 'classnames';
import Chemical from "../Chemical";
import {FormattedMessage} from 'react-intl';
import {checkToken} from "../../../../../utils/auth";

export default class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {},
            incrementalPricing: [{
                quantityFrom:'',
                quantityTo:'',
                price:'',
            }]
        }

        this.cancelEdit = this.cancelEdit.bind(this)
    }

    componentWillMount(){
        this.props.fetchWarehouses();
        this.props.fetchLocations();
    }

    componentWillUnmount(){
        this.props.resetForm('forms.addProductOffer');
    }

    addProductOfferTimeout = async (inputs) => {
        document.getElementById("mapping-btn").click();
        document.getElementById("offering-btn").click();

        setTimeout(function(){
            this.addProductOffer(inputs);
        }.bind(this), 3000);
    }

    addProductOffer(inputs){
        if (checkToken(this.props)) return;

        if (!this.props.productMappingValidation || !this.props.productOfferingValidation) return;

        let newPricing = inputs['pricing'];
        if(inputs['incrementalSelected']){
            newPricing = {...inputs['pricing'], tiers: this.validateIncPricing()};
        } else {
            newPricing = {...inputs['pricing'], tiers: []}
        }

        let newTiers = newPricing.tiers || [];
        for (let i = 0; i < newTiers.length; i++) {
            delete newTiers[i].margin
            delete newTiers[i].id
        }

        const creationDate = this.props.productOfferingForm.creationDate && this.props.productOfferingForm.creationDate.includes("T") 
                             ? this.props.productOfferingForm.creationDate 
                             : `${this.props.productOfferingForm.creationDate}T00:00:00Z`

        const expirationDate = this.props.productOfferingForm.expirationDate && this.props.productOfferingForm.expirationDate.includes("T") 
                             ? this.props.productOfferingForm.expirationDate 
                             : `${this.props.productOfferingForm.expirationDate}T00:00:00Z`

        let params = Object.assign({}, inputs, {
            ...this.props.mappingForm,
            ...this.props.productOfferingForm,
            anonymous: false,
            assayMin: parseInt(this.props.productOfferingForm.assayMin),
            assayMax: parseInt(this.props.productOfferingForm.assayMax),
            creationDate: creationDate,
            expirationDate: expirationDate,
            pricing: {
                ...this.props.addProductOfferForm.pricing,
                price: parseInt(this.props.addProductOfferForm.pricing.price),
                cost: parseInt(this.props.addProductOfferForm.pricing.cost),
                tiers: newTiers
            },
            manufacturer: this.props.productOfferingForm.manufacturer.id || this.props.productOffer.manufacturer.id,
            origin: this.props.productOfferingForm.origin.id || this.props.productOffer.origin.id,
            product: parseInt(this.props.mappingForm.casNumber.replace(/-/g,"")),
            packaging: {
                ...this.props.mappingForm.packaging,
                size: parseInt(this.props.mappingForm.packaging.size),
                originalPkgAmount: parseInt(this.props.productOfferingForm.pkgAmount)
            }
        });

        delete params.packaging.splits;
        delete params.packaging.minimum;

        delete params.casNumber;
        delete params.chemicalName;
        delete params.indexName;
        delete params.lotNumber;
        delete params.pkgAmount;
        //delete params.productName;
        //delete params.productNumber;
        
        this.props.addProductOffer(params).then(()=>{
            this.props.history.push("/inventory/my-inventory");
        });
    }

    validateIncPricing(){
        let tmp = this.state.incrementalPricing.filter(data => data.quantityFrom !=='' && data.price !== '');
        return tmp;
    }

    getIncPricing(data){
        this.setState({incrementalPricing:data},()=>this.validateIncPricing());
    }

    editProductOffer(inputs){

        let newPricing = inputs['pricing'];
        if(inputs['incrementalSelected']){
            newPricing = {...inputs['pricing'], tiers: this.validateIncPricing()};
        } else {
            newPricing = {...inputs['pricing'], tiers: []}
        }

        let newTiers = newPricing.tiers || [];
        for (let i = 0; i < newTiers.length; i++) {
            delete newTiers[i].margin
            delete newTiers[i].id
        }

        const creationDate = this.props.productOfferingForm.creationDate && this.props.productOfferingForm.creationDate.includes("T") 
                             ? this.props.productOfferingForm.creationDate 
                             : `${this.props.productOfferingForm.creationDate}T00:00:00Z`

        const expirationDate = this.props.productOfferingForm.expirationDate && this.props.productOfferingForm.expirationDate.includes("T") 
                             ? this.props.productOfferingForm.expirationDate 
                             : `${this.props.productOfferingForm.expirationDate}T00:00:00Z`

        let params = Object.assign({}, inputs, {
            ...this.props.mappingForm,
            ...this.props.productOfferingForm,
            anonymous: false,
            pricing: {
                ...this.props.addProductOfferForm.pricing,
                price: parseInt(this.props.addProductOfferForm.pricing.price),
                cost: parseInt(this.props.addProductOfferForm.pricing.cost),
                tiers: newTiers
            },
            creationDate: creationDate,
            expirationDate: expirationDate,
            manufacturer: this.props.productOfferingForm.manufacturer.id || this.props.productOffer.manufacturer.id,
            origin: this.props.productOfferingForm.origin.id || this.props.productOffer.origin.id,
            product: this.props.productOffer.product.id,
            productName: this.props.productOffer.product.casIndexName,
            productNumber: this.props.productOffer.product.id,
            packaging: {...this.props.mappingForm.packaging}
        });

        this.props.editProductOffer(this.props.productOffer.id, params).then(()=>{
            this.props.history.push("/inventory/my-inventory");
        });

        delete params.casNumber;
        delete params.chemicalName;
        delete params.indexName;
        delete params.pkgAmount;
    }

    cancelEdit() {
        this.props.history.push("/inventory/my-inventory")
    }

    render() {
        let cancelButton = this.props.edit ?
            <button
                onClick={this.cancelEdit}
                className={classnames('button add-inventory big')}>
                    <FormattedMessage
                        id='addInventory.cancelEdit'
                        defaultMessage='Cancel Edit'
                    />
            </button>
            : null;
        let submitButton =
            <button
                disabled={this.props.disable}
                className={classnames('button add-inventory big', {'disabled' : this.props.disable})}>
                    <FormattedMessage
                        id='addInventory.save'
                        defaultMessage='Save'
                    />
            </button>;
        return (
            <div className={classnames('add-inventory', {'disable' : this.props.disable})}>
                <Form
                    model="forms.addProductOffer"
                    onSubmit={(inputs) =>
                        this.props.edit ?
                            this.editProductOffer(inputs)
                            : this.addProductOfferTimeout(inputs)}
                >
                    <AddGroup
                        header='chemical'
                        component={<Chemical {...this.props}
                        edit={this.props.edit}
                        resetForm={this.props.resetForm}/>}
                    />
                    <AddGroup
                        header='pricing'
                        disable={this.props.disable}
                        component = {
                            <Pricing
                                {...this.props}
                                getIncPricing={(data) =>this.getIncPricing(data)}
                            />
                        }
                    />
                    <AddGroup
                        header='warehouse'
                        disable={this.props.disable}
                        component={<Location {...this.props}/>}
                    />
                    {submitButton}
                </Form>
                {cancelButton}
            </div>
            )
            
    }
}
