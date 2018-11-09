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
            newPricing = {...inputs['pricing'], tiersRequests: this.validateIncPricing()};
        }
        let params = Object.assign({}, inputs, {
                merchantVisibility: !inputs.merchantVisibility,
                pricing: newPricing,
                ...lots[index]
        });
        this.props.addProductOffer(params).then(() => {
            this.addLot(lots, inputs, ++index);
        })
    }

    validateIncPricing(){
        let tmp = this.state.incrementalPricing.filter(data => data.quantityFrom !=='' && data.quantityTo !== '' && data.price !== '');
        return tmp;
    }

    getIncPricing(data){
        this.setState({incrementalPricing:data},()=>this.validateIncPricing());
    }

    editProductOffer(inputs){
        let newPricing = inputs['pricing'];
        if(inputs['incrementalSelected']){
            newPricing = {...inputs['pricing'], tiersRequests: this.validateIncPricing()};
        }
        let params = Object.assign({}, inputs, {
            ...this.props.mappingForm,
            ...this.props.productOfferingForm,
            merchantVisibility: !inputs.merchantVisibility,
            pricing: newPricing,
            creationDate: this.props.productOffer.creationDate,
            expirationDate: this.props.productOffer.expirationDate,
            manufacturer: this.props.productOffer.manufacturer.id,
            origin: this.props.productOffer.origin.id,
            product: this.props.productOffer.product.id,
            packaging: {...this.props.mappingForm.packaging, amount: this.props.productOfferingForm.totalPackages}
        });
        this.props.editProductOffer(this.props.productOffer.id, params).then(()=>{
            this.props.history.push("/inventory/my-inventory");
        });
        console.log(this.props.productOffer.expirationDate)
    }

    render() {
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
            </div> )
    }
}
