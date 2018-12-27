import React, {Component} from 'react';
import {Control, Errors, actions} from 'react-redux-form';
import {/*required,*/ isNumber, min, messages} from "../../../../../utils/validation";
import IncrementalPricing from "./IncrementalPricing";
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";
import Checkbox from "../../../../../components/Checkbox/Checkbox";
import './Pricing.css';
import classNames from 'classnames';
import WarningLabel from "../../../../../components/WarningLabel/WarningLabel"



export default class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSalesPrice: 0,
            showIncrementalPricing: false,
            margin: '',
            price: this.props.edit ? this.props.productOffer.pricing.price : null,
            priceFlag: false,
            costFlag: false,
            marginFlag: false,
            splits: this.props.edit ? this.props.productOffer.packaging.minimum : 1,
            minimum: this.props.edit ? this.props.productOffer.packaging.splits : 1,
            disabled: true,
            incrementalPricing: [{
              quantityFrom: '',
              quantityTo: '',
              price: '',
              margin: ''
          }]
        }
    }

    componentDidMount(){
        
        if(this.props.edit){
            this.setState({
                margin: parseInt((this.props.productOffer.pricing.price - this.props.productOffer.pricing.cost) / this.props.productOffer.pricing.cost * 100),
                totalSalesPrice: parseInt(this.props.productOffer.packaging.size * this.props.productOffer.pricing.price * this.props.productOffer.pkgAmount)
            })
            this.validateMinimum('splits')
            this.validateMinimum('minimum')
            if(this.props.productOffer.pricing.tiers.length > 1){
                this.props.dispatch(actions.change('forms.addProductOffer.incrementalSelected', true));
                this.setState({
                    showIncrementalPricing: true,
                    splits: this.props.productOffer.packaging.splits,
                    minimum: this.props.productOffer.packaging.minimum,
                    incrementalPricing: this.props.productOffer.pricing.tiers,
                }, ()=>this.validateInputs())
            }
        }
    }

    handlePriceChange(model,value){
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

    calculatePricing(e){

        let price = parseInt(this.props.form.pricing.price,10);
        let cost = parseInt(this.props.form.pricing.cost,10);
        let active = e.target.name;
        let activeVal = parseInt(e.target.value,10);

            switch(active){
                case 'price': {
                    let newprice = activeVal;
                    let newmargin = (activeVal - cost) / cost * 100;
                    newmargin = Number(newmargin.toFixed(3));
                    if (isNaN(newmargin)) {
                        this.setState({margin: ''})
                    } else {
                        this.setState({
                            margin: newmargin,
                            price: newprice,
                            totalSalesPrice: Number((this.props.productOffer.packaging.size * Number(activeVal) * this.props.productOffer.pkgAmount).toFixed(3))
                        })
                    }
                    break;
                }

                case 'cost': {
                    let newmargin = (price - activeVal) / activeVal * 100;
                    newmargin = Number(newmargin.toFixed(3));
                    
                    let newIncrementalPricing = this.state.incrementalPricing.slice(0)

                    for (let i = 0; i < newIncrementalPricing.length; i++) {
                        newIncrementalPricing[i].margin = Number(((newIncrementalPricing[i].price - activeVal) / activeVal * 100).toFixed(3))
                    }

                    if (isNaN(newmargin)) {
                        this.setState({margin: ''})
                    } else {
                        this.setState({margin: newmargin, incrementalPricing: newIncrementalPricing})
                    } 
                    break;
                }

                case 'margin': {

                    const newmargin = e.target.value;
                    this.setState({margin: newmargin});

                    const newprice = Number((cost + (cost * newmargin / 100)).toFixed(3))
                    this.handlePriceChange('forms.addProductOffer.pricing.price', newprice);

                    break;
                }

                default: {
                    console.log('pricing.js bad target name');
                    break;
                }
            }
    }


    validateInputs = () => {
      const newIncremental = this.state.incrementalPricing.slice(0);
      const splits = parseInt(this.state.splits, 10);
      newIncremental.map((item, index) => {
          const difference = item.quantityTo % splits;
          const differenceFrom = item.quantityFrom % splits;
          if(item.quantityFrom <= this.state.minimum){
              item.quantityFrom = this.state.minimum;
          }
          else{
              if(differenceFrom * 2 > splits)
                  item.quantityFrom = item.quantityFrom - differenceFrom + splits;

              else
                  item.quantityFrom = item.quantityFrom - differenceFrom;

          }

          if(index !== newIncremental.length-1) {
            if(difference > splits / 2)
            item.quantityTo += splits-difference
            else
                item.quantityTo -= difference

            if(item.quantityTo !== '' && item.quantityTo <= item.quantityFrom)
                item.quantityTo = item.quantityFrom + splits
          } else {
            item.quantityTo = item.quantityFrom + splits
          }
          if(newIncremental[index+1] !== undefined){

              if(newIncremental[index+1].quantityFrom <= item.quantityTo)
                  newIncremental[index+1].quantityFrom =  item.quantityTo + splits;
          } 
          return true;
      });
      this.props.getIncPricing(newIncremental);
      this.setState({incrementalPricing: newIncremental})
    }

    validateMinimum = (form) => {
      if(form === 'minimum'){
          if (this.state.minimum < 0 || this.state.minimum === ''){
              this.setState({minimum:''},() => this.disableInput());
              return;
          }
          else if(this.state.splits === ''){
              return;
          }
      }
      else if (form === 'splits'){
          if(this.state.splits < 1 || this.state.splits === ''){
              this.setState({splits:''},() => this.disableInput());
              return;
          }
          else if(this.state.minimum === ''){
              return;
          }
      }
      let difference = this.state.minimum % this.state.splits;
      let tmpMin = '';
      if (this.state.minimum < this.state.splits)
          tmpMin = (this.state.splits - this.state.minimum) > this.state.minimum ? 0 : this.state.splits;
      else
          tmpMin = this.state.splits < 2 * difference ? this.state.minimum + this.state.splits - difference : this.state.minimum - difference;
      this.setState({minimum:tmpMin},() => {this.disableInput(); this.validateInputs()});
    }

    splitsMinimumChange = e => {
      let newstate = {};
      newstate[e.target.className] = e.target.value ? parseInt(e.target.value, 10) : '';
      this.setState(newstate);
    }

    disableInput = () => {
      if(this.state.splits === '' || this.state.minimum === ''){
          this.setState({disabled:true});
      }
      else
          this.setState({disabled:false});
    }

    addNewIncrementalPricing = (e,index) => {
      e.preventDefault();
      let newIncremental = this.state.incrementalPricing.slice(0);
      newIncremental.push({
          quantityFrom: parseInt(this.state.incrementalPricing[index].quantityTo, 10) + parseInt(this.state.splits, 10),
          quantityTo: '',
          price: ''
      });
      this.setState({
          incrementalPricing: newIncremental
      })
    }

    removeIncrementalPricing = (e,index) => {
      e.preventDefault();
      this.setState({
          incrementalPricing: [...this.state.incrementalPricing.slice(0,index), ...this.state.incrementalPricing.slice(index+1)]
      }, ()=>this.validateInputs())
    }

    handlePrice = (e, index) => {
        let value = e.target.value;
        let newIncremental = this.state.incrementalPricing.slice(0);
  
        newIncremental[index].price = value;
        newIncremental[index].margin = Number(((Number(value) - Number(this.props.form.pricing.cost)) / Number(this.props.form.pricing.cost) * 100).toFixed(3))
        
        if (isNaN(newIncremental[index].margin)) {newIncremental[index].margin = ''}
        if (newIncremental[index].price !== '') {newIncremental[index].price = Number(newIncremental[index].price)}

        this.setState({
            incrementalPricing: newIncremental
        })
        
    }

    handleMargin = (e, index) => {
        let value = e.target.value;
        let newIncremental = this.state.incrementalPricing.slice(0);

            newIncremental[index].margin = value;
            newIncremental[index].price = Number((Number(this.props.form.pricing.cost) + (Number(this.props.form.pricing.cost) * value / 100)).toFixed(3))

            if (isNaN(newIncremental[index].price)) {newIncremental[index].price = ''}
            if (newIncremental[index].margin !== '') {newIncremental[index].margin = Number(newIncremental[index].margin)}
       
            this.setState({
                incrementalPricing: newIncremental
        })
    }

    handleChange = (e, index, type) => {
      let value = e.target.value ? parseInt(e.target.value) : '';
      let newIncremental = this.state.incrementalPricing.slice(0);
      newIncremental[index][type] = value;

      this.setState({
          incrementalPricing: newIncremental
      })
    }

    render() {
        console.log(this.props)
        console.log(JSON.parse(localStorage.getItem('productLots')))
        
        //console.log(this.props.productOffer.packaging.size)
        //console.log(this.props.productOffer.pricing.price)
        //console.log(this.props.productOffer.pkgAmount)

      //const {
        //mappingForm: {packaging},
        //addProductOfferForm: {pricing}
      //} = this.props
      const {showIncrementalPricing, splits, minimum, disabled, incrementalPricing} = this.state

      //const measurement = packaging ? packaging.capacity : null
      //const price = this.props


    let pricePer;
    let costPer;

    if(this.props.mappingForm.packaging) {
        if(this.props.mappingForm.packaging.unit === 1 || this.props.mappingForm.packaging.unit === 3 || this.props.mappingForm.packaging.unit === 5) {
            pricePer = 'Price per (lb)';
            costPer = 'Cost per (lb)'
        } else if(this.props.mappingForm.packaging.unit === 2 || this.props.mappingForm.packaging.unit === 4 || this.props.mappingForm.packaging.unit === 6) {
            pricePer = 'Price per (gl)';
            costPer = 'Cost per (gl)';
        } else if(!this.props.mappingForm.packaging.unit) {
            pricePer = 'Price per unit';
            costPer = 'Cost per unit';
        }
    }

    let totalSalesPrice;
    let productLots = JSON.parse(localStorage.getItem('productLots'));
    let productLotsPkgAmount = 0;
    
    for(let i = 0; i < productLots.length; i++) {
       productLotsPkgAmount += Number(productLots[i].pkgAmount);
    }

    if(this.props.edit) {
        totalSalesPrice = this.props.mappingForm.packaging && this.state.price
        ? Number(this.props.mappingForm.packaging.size) * Number(this.props.productOfferingForm.pkgAmount) * Number(this.state.price)
        : 0;
    } else if (!this.props.edit) {
        totalSalesPrice = this.props.form.pricing && this.props.mappingForm.packaging.size
        ? productLotsPkgAmount * Number(this.props.form.pricing.price * Number(this.props.mappingForm.packaging.size))
        : 0;
    }

    let pricing = 

            <div>
                <h4>SET PRICE & RULES</h4>
                <div>
                    <div className='group-item-wr'>
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
                        <label htmlFor=".pricePr">{pricePer}</label>
                        <Control.text model=".pricing.price"
                                      id=".pricePr"
                                      validators={{
                                          min: (val) => min(val, 0),
                                          isNumber,
                                          //required
                                      }}
                                      type='number'
                                      name='price'
                                      onChange={(e)=>this.calculatePricing(e)}
                                      onBlur={()=>this.checkFilledInputs()}
                                      disabled={this.state.showIncrementalPricing ? true : false}
                                      placeholder="$"
                                      defaultValue={this.props.edit ? this.props.productOffer.pricing.price : null}
                        />
                    </div>
                    <div className='group-item-wr'>
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
                        <label htmlFor=".costPr">{costPer}</label>
                        <Control.text model=".pricing.cost"
                                      id=".costPr"
                                      validators={{
                                          min: (val) => min(val, 0),
                                          isNumber,
                                          //required
                                      }}
                                      defaultValue={this.props.edit ? this.props.productOffer.pricing.cost : null}
                                      type='number'
                                      name='cost'
                                      onChange={(e)=>this.calculatePricing(e)}
                                      onBlur={()=>this.checkFilledInputs()}
                                      placeholder="$"/>
                    </div>
                    

                    <div className='group-item-wr'>
                        <div className='gross-margin'>
                            <label htmlFor=".marginPr">Gross Margin %</label>
                            <div>
                                <Control.text model=".pricing.margin"
                                      id=".marginPr"
                                      className= {classNames({inRed: this.state.margin < 0},  'pricing-gross-margin')}
                                      validators={{
                                          min: (val) => min(val, 0),
                                          isNumber,
                                          //required
                                      }}
                                      value={this.state.margin}
                                      type='number'
                                      name='margin'
                                      onChange={(e)=>this.calculatePricing(e)}
                                      onBlur={()=>this.checkFilledInputs()}
                                      placeholder="%"/>
                            </div>
                        </div>
                    </div>
                    <div className='group-item-wr'>
                        <div className='total'>
                            <h5>Total Sales Price</h5>
                            <output>${totalSalesPrice}</output>
                        </div>
                    </div>

                    <div>
                      <div className='group-item-wr'>
                          <label>Splits</label>
                          <Control.text model="forms.productMapping.packaging.splits"
                                        id="forms.productMapping.packaging.splits"
                                        defaultValue={this.props.edit ? this.props.productOffer.packaging.splits : this.state.splits}
                                        onChange={e => this.splitsMinimumChange(e)}
                                        onBlur={() => this.validateMinimum('splits')}
                                        className='splits'
                                        type='number'
                                        min={'1'}
                                        />
                      </div>
                      <div className='group-item-wr'>
                          <label>Minimum</label>
                          <Control.text model="forms.productMapping.packaging.minimum"
                                        id="forms.productMapping.packaging.minimum"
                                        defaultValue={this.props.edit ? this.props.productOffer.packaging.minimum : this.state.minimum}
                                        onChange={e => this.splitsMinimumChange(e)}
                                        onBlur={e => this.validateMinimum('minimum')}
                                        className='minimum'
                                        type='number'
                                        min={'0'}/>
                      </div>
                      {/*<div className='group-item-wr inputs-align'>
                            <Control.checkbox 
                                name='anonymous'
                                model='forms.addProductOffer.anonymous'
                                component={Checkbox}
                                value={true}
                                label="List Anonymously"
                            />
                      </div>*/}
                  </div>

                    <div>
                        <div className='group-item-wr'>
                            <CheckboxRedux name='incremental'
                                           label='Tiered Pricing'
                                           defaultValue={this.state.showIncrementalPricing}
                                           dispatch={this.props.dispatch}
                                           model={'forms.addProductOffer.incrementalSelected'}
                                           onChange={value => this.setState({showIncrementalPricing: value})}/>
                        </div>
                    </div>

                    <div>
                        <WarningLabel class={'warningBody3'} isVisible={this.state.showIncrementalPricing && (this.state.splits === '' || this.state.minimum === '')} warningText={"Please enter allowed Split and Minimum values first."}/>
                    </div>
                    
                    {showIncrementalPricing && <div className='incremental-wr'>
                      <IncrementalPricing
                        cost={this.props.form.pricing.cost}
                        splits={splits}
                        minimum={minimum}
                        disabled={disabled}
                        incrementalPricing={incrementalPricing}
                        addNewIncrementalPricing={this.addNewIncrementalPricing}
                        removeIncrementalPricing={this.removeIncrementalPricing}
                        handleChange={this.handleChange}
                        handlePrice={this.handlePrice}
                        handleMargin={this.handleMargin}
                        validateInputs={this.validateInputs}
                      />
                    </div>}
                </div>
            </div>

        return (pricing);
    }
}