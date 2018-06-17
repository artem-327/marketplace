import React, {Component} from 'react';
import InputGroup from './InputGroup'
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";

export default class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location:{
                isPending: false,
                isValid: false,
                hasError: false,
            },
            productDetail:{}
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

    }

    getLocationInputs(){
        console.log(this.props);
        let { isPending, isValid, hasError } = this.state.location;
        // let {  } = this.state.productDetail;
        let buttonText = isPending ? "SAVING ..." : isValid ? "SAVED" : hasError ? "ERROR" : "+ ADD";
        return[
            {
                label: <label htmlFor="forms.inventoryLocationForm.warehouse">WAREHOUSE</label>,
                component:
                    <Dropdown opns={this.props.dropdowns.warehouse} placeholder='Select'/>                /*<Control.select model="forms.inventoryLocationForm.warehouse" id="forms.inventoryLocationForm.warehouse">*/
                /*<option value="red">red</option>*/
                /*<option value="green">green</option>*/
                /*<option value="blue">blue</option>*/
                /*/!*tady napojim data*!/*/
                /*</Control.select>*/
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
                    <Dropdown opns={this.props.dropdowns.state} placeholder='Select'/>
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
                label: <label htmlFor="forms.inventoryProductsForm.totalPackages">TOTAL PACKAGES</label>,
                component: <Control.text model="forms.inventoryProductsForm.totalPackages"
                                         id="forms.inventoryProductsForm.totalPackages"
                                         type="number"/>,
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.packaging">PACKAGING</label>,
                component:
                    <Dropdown opns={this.props.dropdowns.package} placeholder='Select'/>
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.packageSize">PACKAGE SIZE</label>,
                component: <Control.text model="forms.inventoryProductsForm.packageSize"
                                         id="forms.inventoryProductsForm.packageSize"/>,
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.price">PRICE</label>,
                component: <Control.text model="forms.inventoryProductsForm.price"
                                         id="forms.inventoryProductsForm.price"/>,
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.pricingUnits">PRICING UNITS</label>,
                component:
                    <Dropdown opns={this.props.dropdowns.pricingUnits} placeholder='Select'/>
            }
        ]
    }

    getProductAttributesInputs(){
        return[
            {
                label: <label htmlFor="forms.inventoryProductsForm.manufacturer">MANUFACTURER</label>,
                component:
                    <Dropdown opns={this.props.dropdowns.manufacturer} placeholder='Select'/>
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.origin">ORIGIN</label>,
                component:
                    <Dropdown opns={this.props.dropdowns.origin} placeholder='Select'/>
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.form">FORM</label>,
                component:
                    <Dropdown opns={this.props.dropdowns.form} placeholder='Select'/>
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.assayMin">ASSAY</label>,
                component: <div>MIN.<Control.text model="forms.inventoryProductsForm.assayMin"
                                                  id="forms.inventoryProductsForm.assayMin"
                                                  type="number"/></div>,
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.assayMax">&nbsp;</label>,
                component: <div>MAX.<Control.text model="forms.inventoryProductsForm.assayMax"
                                                  id="forms.inventoryProductsForm.assayMax"
                                                  type="number"/></div>,
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.grade">GRADE</label>,
                component:
                    <Dropdown opns={this.props.dropdowns.grade} placeholder='Select'/>
            },
            {
                label: <label htmlFor="forms.inventoryProductsForm.condition">CONDITION</label>,
                component:
                    <Dropdown opns={this.props.dropdowns.condition} placeholder='Select'/>
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
                    <Dropdown opns={this.props.dropdowns.incrementalPricing} placeholder='Select'/>
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
                    <Dropdown opns={this.props.dropdowns.incrementalPricing} placeholder='Select'/>
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

    addProductOffer(input){
        this.props.addProductOffer(
            input.totalPackages,
            input.totalPackages,
            input.packaging,
            input.price,
            input.packaging,
            input.manufacturer,
            input.condition,
            input.form).then(() => {
            setTimeout(function(){
                this.setState({
                    products: {
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
            <div className="add-inventory">
                <h1 className='header'>Add Inventory</h1>
                <Form model="forms.inventoryLocationForm" onSubmit={(inputs) => this.addLocation(inputs)}>
                    <InputGroup header='Location' inputs={this.getLocationInputs()}/>
                </Form>
                <Form model="forms.inventoryProductsForm" onSubmit={(inputs) => this.addProductOffer(inputs)}>
                    <div className="half-form left">
                        <InputGroup header='Details' inputs={this.getProductDetailInputs()}/>
                    </div>
                    <div className="half-form right">
                        <InputGroup header='Attributes' inputs={this.getProductAttributesInputs()}/>
                    </div>
                    <div className="half-form left">
                        <InputGroup header='Rules' inputs={this.getProductSellingRulesInputs()}/>
                    </div>
                    <div className="half-form right">
                        <InputGroup header='Broadcast rules' inputs={this.getProductBroadcastRulesInputs()}/>
                    </div>
                    <button className='add-inventory'>ADD INVENTORY</button>
                </Form>
            </div>
        );
    }
}
