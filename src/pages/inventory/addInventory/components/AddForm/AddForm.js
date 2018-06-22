import React, {Component} from 'react';
import AddGroup from '../AddGroup'
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
import Details from './Details';
import Pricing from './Pricing';
import Location from './Location';
import classnames from 'classnames';
import Attributes from "./Attributes";

export default class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location:{
                isPending: false,
                isValid: false,
                hasError: false,
            },
            selectedProduct: {}
        }
    }


    componentWillMount(){
        if(this.props.product){
            this.setState({selectedProduct: this.props.product}, ()=>{
                let productType = this.state.selectedProduct.productType.id;
                this.props.fetchProductForms({productType});
                this.props.fetchProductConditions({productType});
                this.props.fetchProductGrade({productType});
                this.props.getPackageOptions(productType);
                this.props.getManufacturer();
                this.props.getPricingUnits();
            });
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            location: {
                isPending: nextProps.inventory.location.isPending,
                isValid: nextProps.inventory.location.isValid,
                hasError: nextProps.inventory.location.hasError
            }
        });
        if(nextProps.product && nextProps.product!== this.state.selectedProduct){
            this.setState({selectedProduct: nextProps.product}, () => {
                let productType = this.state.selectedProduct.productType.id;
                this.props.fetchProductForms({productType});
                this.props.fetchProductConditions({productType});
                this.props.fetchProductGrade({productType});
                this.props.getPackageOptions(productType);
                this.props.getManufacturer();
                this.props.getPricingUnits();
            });
        }
    }

    getProductSellingRulesInputs(){
        return[
            {
                label: <label htmlFor="forms.inventoryProductsForm.rulesSplitPackages">SPLIT (PACKAGES)</label>,
                component:
                    <Control.text model="forms.inventoryProductsForm.rulesSplitPackages"
                                  id="forms.inventoryProductsForm.rulesSplitPackages"
                                  type="number" />
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.rulesMinimumPackages">MINIMUM (PACKAGES)</label>,
                component:
                    <Control.text model="forms.inventoryProductsForm.rulesMinimumPackages"
                                  id="forms.inventoryProductsForm.rulesMinimumPackages"
                                  type="number" />
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.rulesIncrementalPricing">INCREMENTAL PRICING</label>,
                component:
                    <Dropdown opns={this.props.incrementalPricing} placeholder='Select'/>
            },
        ]
    }

    getProductBroadcastRulesInputs(){
        return[
            {
                label: <label htmlFor="forms.inventoryProductsForm.broadcastSplitPackages">SPLIT (PACKAGES)</label>,
                component:
                    <Control.text model="forms.inventoryProductsForm.broadcastSplitPackages"
                                  id="forms.inventoryProductsForm.broadcastSplitPackages"
                                  type="number" />
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.broadcastMinimumPackages">MINIMUM (PACKAGES)</label>,
                component:
                    <Control.text model="forms.inventoryProductsForm.broadcastMinimumPackages"
                                  id="forms.inventoryProductsForm.broadcastMinimumPackages"
                                  type="number" />
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.broadcastIncrementalPricing">INCREMENTAL PRICING</label>,
                component:
                    <Dropdown opns={this.props.incrementalPricing} placeholder='Select'/>
            },
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

    addProductOffer(inputs){
        //TODO:: Add new form for mock inputs
        let params = Object.assign({}, inputs, {
            product: this.state.selectedProduct.id,
            expiresAt:  "1993-03-18T13:09:41.305Z",
            location: 1,
        });
        console.log(params);
        // this.props.addProductOffer(params).then(() => {
        //     this.props.history.push("/inventory/my-inventory");
        // })
    }

    render() {
        return (
            <div className={classnames('add-inventory', {'disable' : this.props.disable})} >
                <Form model="forms.addProductOffer.addProductOffer" onSubmit={(inputs) => this.addProductOffer(inputs)}>
                    <AddGroup header='DETAILS' disable={this.props.disable} component = {<Details {...this.props}/>} />
                    <AddGroup header='PRICING' disable={this.props.disable} component = {<Pricing {...this.props}/>} />
                    {/*Location - handle submit inside*/}
                    <AddGroup header='LOCATION' disable={this.props.disable} component = {<Location {...this.props}/>} />
                    <AddGroup header='ATTRIBUTES' disable={this.props.disable} component = {<Attributes {...this.props}/>} />
                    <button disabled={this.props.disable}
                            className={classnames('button add-inventory big', {'disabled' : this.props.disable})}>
                        ADD INVENTORY
                    </button>
                </Form>
            </div> )
    }
}
