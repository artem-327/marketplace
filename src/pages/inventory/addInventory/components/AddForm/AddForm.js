import React, {Component} from 'react';
import InputGroup from './InputGroup'
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location:{
                isPending: false,
                isValid: false,
                hasError: false,
            },
            productDetail:{},
            selectedProduct: {}
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            location: {
                isPending: nextProps.inventory.location.isPending,
                isValid: nextProps.inventory.location.isValid,
                hasError: nextProps.inventory.location.hasError
            },
            productDetail: nextProps.inventory.productDetail
        })
    }

    componentDidMount(){
        this.setState({selectedProduct: this.props.product});
        this.props.fetchProductForms({productType: this.props.product.productType.id});
        this.props.fetchProductConditions({productType: this.props.product.productType.id});
        this.props.fetchProductGrade({productType: this.props.product.productType.id});
        this.props.getPackageOptions(this.props.product.productType.id);
        this.props.getManufacturer();
        this.props.getPricingUnits();
    }


    getLocationInputs(){
        let { isPending, isValid, hasError } = this.state.location;
        let buttonText = isPending ? "SAVING ..." : isValid ? "SAVED" : hasError ? "ERROR" : "+ ADD";
        return[
            {
                label: <label htmlFor="forms.inventoryLocationForm.warehouse">WAREHOUSE</label>,
                component:
                    <Dropdown opns={this.props.warehouse} placeholder='Select'/>
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
                    <Dropdown opns={this.props.state} placeholder='Select'/>
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

    getProductDetailInputs(){
        return[
            {
                label: <label htmlFor=".packageAmount">TOTAL PACKAGES</label>,
                component: <Control.text model=".packageAmount"
                                         id=".packageAmount"
                                         type="number"/>,
            },
            {
                label: <label htmlFor=".packageType">PACKAGING</label>,
                component:
                    <DropdownRedux opns={this.props.package} placeholder='Select'
                        model="forms.addProductOffer.addProductOffer.packageType" dispatch={this.props.dispatch}/>
            },
            {
                label: <label htmlFor=".pricePerUnit">PRICE</label>,
                component: <Control.text model=".pricePerUnit"
                                         id=".pricePerUnit"/>,
            },
            {
                label: <label htmlFor=".currency">PRICING UNITS</label>,
                component:
                    <DropdownRedux opns={this.props.pricingUnits} placeholder='Select'
                        model="forms.addProductOffer.addProductOffer.currency" dispatch={this.props.dispatch}/>
            }
        ]
    }

    getProductAttributesInputs(){
        return[
            {
                label: <label htmlFor=".manufacturer">MANUFACTURER</label>,
                component:
                    <DropdownRedux opns={this.props.manufacturer} placeholder='Select'
                        model="forms.addProductOffer.addProductOffer.manufacturer" dispatch={this.props.dispatch}/>
            },
            {
                label: <label htmlFor=".origin">ORIGIN</label>,
                component:
                    <DropdownRedux opns={this.props.origin} placeholder='Select'
                        model="forms.addProductOffer.addProductOffer.origin" dispatch={this.props.dispatch}/>
            },
            {
                label: <label htmlFor=".productForm">FORM</label>,
                component:
                    <DropdownRedux opns={this.props.productForms} placeholder='Select'
                        model="forms.addProductOffer.addProductOffer.productForm" dispatch={this.props.dispatch}/>
            },
            {
                label: <label htmlFor=".assayMin">ASSAY</label>,
                component: <div>MIN.<Control.text model=".assayMin"
                                                  id=".assayMin"
                                                  type="number"/></div>,
            },
            {
                label: <label htmlFor=".assayMax">&nbsp;</label>,
                component: <div>MAX.<Control.text model=".assayMax"
                                                  id=".assayMax"
                                                  type="number"/></div>,
            },
            {
                label: <label htmlFor=".productGrade">GRADE</label>,
                component:
                    <DropdownRedux opns={this.props.grade} placeholder='Select'
                        model="forms.addProductOffer.addProductOffer.productGrade" dispatch={this.props.dispatch}/>
            },
            {
                label: <label htmlFor=".productCondition">CONDITION</label>,
                component:
                    <DropdownRedux opns={this.props.productConditions} placeholder='Select'
                        model="forms.addProductOffer.addProductOffer.productCondition" dispatch={this.props.dispatch}/>
            }
        ]
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
            location: "test location",
            merchantVisibility: true,
        });
        this.props.addProductOffer(params).then(() => {
            this.props.history.push("/inventory/my-inventory");
        })
    }

    render() {
        return (
            <div className="add-inventory">
                <h1 className='header'>Add Inventory</h1>
                <Form model="forms.inventoryLocationForm" onSubmit={(inputs) => this.addLocation(inputs)}>
                    <InputGroup header='Location' inputs={this.getLocationInputs()}/>
                </Form>
                <Form model="forms.addProductOffer.addProductOffer" onSubmit={(inputs) => this.addProductOffer(inputs)}>
                    <div className="half-form left">
                        <InputGroup header='Details' inputs={this.getProductDetailInputs()}/>
                    </div>
                    <div className="half-form right">
                        <InputGroup header='Attributes' inputs={this.getProductAttributesInputs()}/>
                    </div>
                    {/*<div className="half-form left">*/}
                        {/*<InputGroup header='Rules' inputs={this.getProductSellingRulesInputs()}/>*/}
                    {/*</div>*/}
                    {/*<div className="half-form right">*/}
                        {/*<InputGroup header='Broadcast rules' inputs={this.getProductBroadcastRulesInputs()}/>*/}
                    {/*</div>*/}
                    <button className='add-inventory'>ADD INVENTORY</button>
                </Form>
            </div>
        );
    }
}
