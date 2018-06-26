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
        if(nextProps.product && nextProps.product!== this.state.selectedProduct){
            this.setState({selectedProduct: nextProps.product}, () => {
                let productType = this.state.selectedProduct.productType.id;
                this.props.fetchProductForms({productType});
                this.props.fetchProductConditions({productType});
                this.props.fetchProductGrade({productType});
                this.props.getPackageOptions(productType);
                this.props.fetchWarehouse();
                this.props.getManufacturer();
                this.props.getPricingUnits();
            });
        }
    }

    addProductOffer(inputs){
        console.log(this.props.form);
        let pckgs = this.props.form.addProductOffer;
        let pckgName = "";
        let measureType = "";
        try{
            for(let i = 0; i < this.props.package.length; i++){
                if(this.props.package[i].id === pckgs.packageType){
                    pckgName = this.props.package[i].name;
                    measureType = this.props.package[i].measureType
                }
            }
            this.props.validatePackageType(pckgName, measureType, pckgs.packageSize, pckgs.units).then(()=>{
                //TODO:: Add new form for mock inputs
                let params = Object.assign({}, inputs, {
                    product: this.state.selectedProduct.id,
                    expiresAt:  "1993-03-18T13:09:41.305Z",
                    packageType: this.props.packageTypeId,
                });
                this.props.addProductOffer(params).then(() => {
                    this.props.history.push("/inventory/my-inventory");
                })

            })
        }catch (err){
            console.log(err)
        }

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
