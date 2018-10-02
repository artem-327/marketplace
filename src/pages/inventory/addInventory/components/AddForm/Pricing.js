import React, {Component} from 'react';
import {Control, Errors, actions} from 'react-redux-form';
import {required, isNumber, min, messages} from "../../../../../utils/validation";
import IncrementalPricing from "./IncrementalPricing";
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";
import './Pricing.css';
import classnames from 'classnames';

export default class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incrementalPricing: false,
            margin: '',
            priceFlag:false,
            costFlag:false,
            marginFlag:false,
        }
    }

    handleChange(model,value){
        this.props.dispatch(actions.change(model, value));
    }

    checkFilledInputs(){

        this.setState({priceFlag:false});
        this.setState({costFlag:false});
        this.setState({marginFlag:false});

        if(this.props.form.pricing.cost !== ''){ this.setState({costFlag:true}); }
        if(this.props.form.pricing.price !== ''){ this.setState({priceFlag:true}); }
        if(this.state.margin !== ''){ this.setState({marginFlag:true}); }
    }

    componentWillReceiveProps(nextProps) {
        /*
        if (typeof nextProps.form.pricing === "undefined") {
            this.setState({margin: " "});
            return;
        }
        let total = ((parseInt(nextProps.form.pricing.price, 10) - parseInt(nextProps.form.pricing.cost, 10)) / parseInt(nextProps.form.pricing.price, 10)) * 100;

        if (isNaN(total)) {
            this.setState({margin: " "});
            return;
        }
        total = total.toFixed(2);
        this.setState({margin: String(total)});
        */
    }

    calculatePricing(e){

        let price = parseInt(this.props.form.pricing.price,10);
        //console.log(typeof price);
        //console.log(price);
        let cost = parseInt(this.props.form.pricing.cost,10);
        //console.log(cost);
        //console.log(typeof cost);
        let margin = parseInt(this.state.margin,10);
        //console.log(margin);
        //console.log(typeof margin);
        let active = e.target.name;
        //console.log(active);
        //console.log(typeof active);
        let activeVal = parseInt(e.target.value,10);
        //console.log(activeVal);
        //console.log(typeof activeVal);

        
        if (this.state.priceFlag && this.state.costFlag && this.state.marginFlag){
            switch(active){
                case 'price':{
                    if(isNaN(activeVal)) {margin = ''; this.setState({margin});}
                    margin = ((activeVal - this.props.form.pricing.cost) / activeVal) * 100;
                    margin = Number(margin.toFixed(4));
                    this.setState({margin});
                    break;
                }
                case 'cost':{
                    if(isNaN(activeVal)) break;
                    let tmp = 100 - (margin);                     
                    price = (activeVal) / tmp * 100;
                    price = Number(price.toFixed(4));
                    this.handleChange('forms.addProductOffer.pricing.price', price);                  
                    break;
                }
                case 'margin':{
                    if(isNaN(activeVal)){this.setState({margin: ''}); break;}
                    let tmp = 100 - (activeVal);                    
                    price = (cost) / tmp * 100;
                    price = Number(price.toFixed(4));                   
                    this.setState({margin: activeVal});
                    this.handleChange('forms.addProductOffer.pricing.price', price);          
                    break;
                }
                default:
            }
        }
        else {
            switch(active){
                case 'price':{
                    if(this.state.marginFlag){
                        if(isNaN(activeVal)) break;
                        cost = (activeVal) - ((margin) / 100 * (activeVal));
                        cost = Number(cost.toFixed(4));
                        this.handleChange('forms.addProductOffer.pricing.cost', cost);
                    }
                    else if (this.state.costFlag){
                        if(isNaN(activeVal)) margin = '';
                        margin = (((activeVal) - (cost)) / (activeVal)) * 100;  
                        margin = Number(margin.toFixed(4));
                        this.setState({margin});
                    }
                    break;
                }
                case 'cost':{
                    if(this.state.marginFlag){
                        if(isNaN(activeVal)) break;
                        let tmp = 100 - (margin); 
                        price = (activeVal) / tmp * 100;
                        price = Number(price.toFixed(4));
                        this.handleChange('forms.addProductOffer.pricing.price', price);
                    }
                    else if(this.state.priceFlag){
                        if(isNaN(activeVal)) margin = '';
                        margin = (((price) - (activeVal)) / (price)) * 100;       
                        margin = Number(margin.toFixed(4));
                        this.setState({margin});
                    }
                    break;
                }
                case 'margin':{
                    if (isNaN(activeVal)){this.setState({margin: ''}); break;}   
                    else if(this.state.costFlag){
                        let tmp = 100 - (activeVal);
                        price = (cost) / tmp * 100;
                        price = Number(price.toFixed(4));
                        this.handleChange('forms.addProductOffer.pricing.price', price);
                    }
                    else if(this.state.priceFlag){
                        cost = (price) - ((activeVal) * (price) / 100);
                        cost = Number(cost.toFixed(4));
                        this.handleChange('forms.addProductOffer.pricing.cost', cost);
                    }
                    this.setState({margin: activeVal});      
                    break;
                }
                default:
            }

        }
        console.log(price,cost,margin);
    }

    render() {
        let incremental = this.state.incrementalPricing ?
            <div className='incremental-wr'>
                <IncrementalPricing cost={this.props.form.pricing.cost}
                                    getIncPricing={(data) => this.props.getIncPricing(data)}/>
            </div>
            : null;
        let measurement = null;
        let totalPackages = null;
        let price = null;
        if(this.props.mappingForm.packaging) measurement = this.props.mappingForm.packaging.capacity;
        if(this.props.productOfferingForm.totalPackages) totalPackages = this.props.productOfferingForm.totalPackages;
        if(this.props.addProductOfferForm.pricing) price = this.props.addProductOfferForm.pricing.price;
        return (
            <div>

                <h6>SET PRICE & RULES</h6>
                <div>
                    <Errors
                        className="form-error"
                        model=".pricing.price"
                        show="touched"
                        messages={{
                            required: messages.required,
                            isNumber: messages.isNumber,
                            min: messages.min
                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".pricePr">Price pr (lb)</label>
                        <Control.text model=".pricing.price"
                                      id=".pricePr"
                                      validators={{
                                          min: (val) => min(val, 0),
                                          isNumber,
                                          required
                                      }}
                                      name='price'
                                      onChange={(e)=>this.calculatePricing(e)}
                                      onBlur={()=>this.checkFilledInputs()}
                                      placeholder="$"
                                      defaultValue=""
                        />
                    </div>
                    <Errors
                        className="form-error"
                        model=".pricing.cost"
                        show="touched"
                        messages={{
                            required: messages.required,
                            isNumber: messages.isNumber,
                            min: messages.min
                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".costPr">Cost pr (lb)</label>
                        <Control.text model=".pricing.cost"
                                      id=".costPr"
                                      validators={{
                                          min: (val) => min(val, 0),
                                          isNumber,
                                      }}
                                      name='cost'
                                      onChange={(e)=>this.calculatePricing(e)}
                                      onBlur={()=>this.checkFilledInputs()}
                                      defaultValue=""
                                      placeholder="$"/>
                    </div>


                    <div className='group-item-wr'>
                        <div className='gross-margin'>
                            <h6>Gross Margin</h6>
                            <div className={classnames({inRed: this.state.margin < 0})}>
                                <input name='margin' type='text' className='pricing-gross-margin' 
                                    onChange={(e)=>this.calculatePricing(e)} 
                                    onBlur={()=>this.checkFilledInputs()} 
                                    value={this.state.margin}>
                                </input>
                                %
                            </div>
                        </div>
                        <div className='group-item-wr'>
                            <h6>Total Sales Price</h6>
                            <h6>$ {(measurement * totalPackages * price).formatMoney(2)}</h6>
                        </div>
                    </div>
                    <div>
                        <div className='group-item-wr'>
                            <CheckboxRedux name='incremental'
                                           label='Tiered Pricing'
                                           dispatch={this.props.dispatch}
                                           model={'forms.addProductOffer.incrementalSelected'}
                                           onChange={(value) => this.setState({incrementalPricing: value})}/>
                        </div>

                    </div>
                    {incremental}
                </div>
            </div>
        );
    }
}
