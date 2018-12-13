import React, {Component} from 'react';
import AddGroup from '../AddGroup'
import {Form} from 'react-redux-form';
import Pricing from './Pricing';
import Location from './Location';
import classnames from 'classnames';

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

    addProductOffer(inputs){
        if(localStorage.getItem('productLots')){
            let lots = JSON.parse(localStorage.getItem('productLots'));
            this.addLot(lots, inputs, 0)
        }
        else {
            this.props.addMessage('You must add lot first.')
        }
    }

    addLot(lots, inputs, index){
        if(index === lots.length){
            if(index === 0) return;
            localStorage.removeItem('productLots');
            this.props.history.push("/inventory/my-inventory");
            return;
        }
        let newPricing = inputs['pricing'];
        if(inputs['incrementalSelected']){
            newPricing = {...inputs['pricing'], pricingTiers: this.validateIncPricing()};
        }
        const creationDate = this.props.productOfferingForm.creationDate.includes("T") ? this.props.productOfferingForm.creationDate : `${this.props.productOfferingForm.creationDate}T00:00:00Z`
        const expirationDate = this.props.productOfferingForm.expirationDate.includes("T") ? this.props.productOfferingForm.expirationDate : `${this.props.productOfferingForm.expirationDate}T00:00:00Z`
        const assayMin = parseInt(this.props.productOfferingForm.assayMin)
        const assayMax = parseInt(this.props.productOfferingForm.assayMax)
        const manufacturer = this.props.productOfferingForm.manufacturer.id
        const origin = this.props.productOfferingForm.origin.id

        let params = Object.assign({}, inputs, {
                ...this.props.mappingForm,
                ...this.props.productOfferingForm,
                merchantVisibility: !inputs.merchantVisibility,
                pricing: newPricing,
                ...lots[index],
                creationDate: creationDate,
                expirationDate: expirationDate,
                manufacturer: manufacturer,
                origin: origin,
                assayMin: assayMin,
                assayMax: assayMax,
        });
        this.props.addProductOffer(params).then(() => {
            this.addLot(lots, inputs, ++index);
        })
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
            newPricing = {...inputs['pricing'], pricingTiers: this.validateIncPricing()};
        }
        const creationDate = this.props.productOfferingForm.creationDate.includes("T") ? this.props.productOfferingForm.creationDate : `${this.props.productOfferingForm.creationDate}T00:00:00Z`
        const expirationDate = this.props.productOfferingForm.expirationDate.includes("T") ? this.props.productOfferingForm.expirationDate : `${this.props.productOfferingForm.expirationDate}T00:00:00Z`
        let params = Object.assign({}, inputs, {
            ...this.props.mappingForm,
            ...this.props.productOfferingForm,
            merchantVisibility: !inputs.merchantVisibility,
            pricing: newPricing,
            creationDate: creationDate,
            expirationDate: expirationDate,
            manufacturer: this.props.productOfferingForm.manufacturer.id || this.props.productOffer.manufacturer.id,
            origin: this.props.productOfferingForm.origin.id || this.props.productOffer.origin.id,
            product: this.props.productOffer.product.id,
            packaging: {...this.props.mappingForm.packaging, amount: this.props.productOfferingForm.totalPackages}
        });
        this.props.editProductOffer(this.props.productOffer.id, params).then(()=>{
            this.props.history.push("/inventory/my-inventory");
        });
    }

    cancelEdit() {
        this.props.history.push("/inventory/my-inventory")
    }

    render() {

        let cancelButton = this.props.edit ? <button onClick={this.cancelEdit} className={classnames('button add-inventory big')}>Cancel Edit</button> : null;

        return (
            <div className={classnames('add-inventory', {'disable' : this.props.disable})} >
                <Form model="forms.addProductOffer" onSubmit={(inputs) => this.props.edit ? this.editProductOffer(inputs) : this.addProductOffer(inputs)}>
                    <AddGroup header='PRICING' disable={this.props.disable} component = {<Pricing {...this.props} getIncPricing={(data)=>this.getIncPricing(data)}/>} />
                    <AddGroup header='WAREHOUSE' disable={this.props.disable} component = {<Location {...this.props}/>} />
                    <button disabled={this.props.disable}
                            className={classnames('button add-inventory big', {'disabled' : this.props.disable})}>
                        {!this.props.edit ? 'Add Product Offer' : 'Edit Product Offer' }
                    </button>
                </Form>
                {cancelButton}
            </div> 
            )
            
    }
}
