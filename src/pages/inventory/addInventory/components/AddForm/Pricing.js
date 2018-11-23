import React, {Component} from 'react';
import {Control, Errors, actions} from 'react-redux-form';
import {required, isNumber, min, messages} from "../../../../../utils/validation";
import IncrementalPricing from "./IncrementalPricing";
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";
import Checkbox from "../../../../../components/Checkbox/Checkbox";
import './Pricing.css';
import classNames from 'classnames';


export default class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIncrementalPricing: false,
            margin: '',
            priceFlag: false,
            costFlag: false,
            marginFlag: false,
            splits: '',
            minimum: '',
            disabled: true,
            incrementalPricing: [{
              quantityFrom: '',
              quantityTo: '',
              price: '',
          }]
        }
    }

    componentDidMount(){
        if(this.props.edit){
            if(this.props.productOffer.pricing.tiers.length !== 0){
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
        let margin = parseInt(this.state.margin,10);
        let active = e.target.name;
        let activeVal = parseInt(e.target.value,10);

            switch(active){
                case 'price': {
                    let newmargin = (activeVal - cost) / cost * 100;
                    newmargin = Number(newmargin.toFixed(3));
                    if (isNaN(newmargin)) {
                        this.setState({margin: ''})
                    } else {
                        this.setState({margin: newmargin})
                    }
                    break;
                }

                case 'cost': {
                    let newmargin = (price - activeVal) / activeVal * 100;
                    newmargin = Number(newmargin.toFixed(3));
                    if (isNaN(newmargin)) {
                        this.setState({margin: ''})
                    } else {
                        this.setState({margin: newmargin})
                    }
                    break;
                }

                default: {
                    console.log('pricing.js bad target name');
                    break;
                }
            }
    }


    validateInputs = () => {
      let newIncremental = this.state.incrementalPricing.slice(0);
      let splits = parseInt(this.state.splits, 10);
      newIncremental.map((item, index) => {
          let difference = item.quantityTo % splits;
          let differenceFrom = item.quantityFrom % splits;
          if(item.quantityFrom <= this.state.minimum){
              item.quantityFrom = this.state.minimum;
          }
          else{
              if(differenceFrom * 2 > splits)
                  item.quantityFrom = item.quantityFrom - differenceFrom + splits;

              else
                  item.quantityFrom = item.quantityFrom - differenceFrom;

          }
          if(difference > splits / 2)
              item.quantityTo += splits-difference
          else
              item.quantityTo -= difference

          if(item.quantityTo !== '' && item.quantityTo <= item.quantityFrom)
              item.quantityTo = item.quantityFrom + splits

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

    handleChange = (e, index, type) => {
      let value = e.target.value ? parseInt(e.target.value, 10) : '';
      let newIncremental = this.state.incrementalPricing.slice(0);
      newIncremental[index][type] = value;
      this.setState({
          incrementalPricing: newIncremental
      })
    }
    render() {
      const {
        mappingForm: {packaging},
        productOfferingForm: {totalPackages = 50},
        addProductOfferForm: {pricing}
      } = this.props
      const {showIncrementalPricing, splits, minimum, disabled, incrementalPricing} = this.state

      const measurement = packaging ? packaging.capacity : null
      const price = pricing ? pricing.price : null

      console.log(this.props.margin)
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
                                      type='number'
                                      name='price'
                                      onChange={(e)=>this.calculatePricing(e)}
                                      onBlur={()=>this.checkFilledInputs()}
                                      placeholder="$"
                                      defaultValue={this.props.edit ? this.props.productOffer.pricing.price : null}
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
                                      defaultValue={this.props.edit ? this.props.productOffer.pricing.cost : null}
                                      type='number'
                                      name='cost'
                                      onChange={(e)=>this.calculatePricing(e)}
                                      onBlur={()=>this.checkFilledInputs()}
                                      placeholder="$"/>
                    </div>
                    <div className='group-item-wr'>
                        <div className='gross-margin'>
                            <h6>Gross Margin %</h6>
                            <div>
                                <h6>
                                    <input
                                        className= {classNames({inRed: this.state.margin < 0},  'pricing-gross-margin')}
                                        name='margin' type='text'
                                        //onChange={(e)=>this.calculatePricing(e)}
                                        //onBlur={()=>this.checkFilledInputs()}
                                        value={this.state.margin}
                                        placeholder='%'
                                    />
                                </h6>
                            </div>
                        </div>
                        <div className='group-item-wr'>
                            <h6>Total Sales Price</h6>
                            <h6>${(measurement * totalPackages * price).formatMoney(3)}</h6>
                        </div>
                    </div>

                    <div>
                      <div className='group-item-wr'>
                          <label>Splits</label>
                          <Control.text model="forms.productMapping.packaging.splits"
                                        id="forms.productMapping.packaging.splits"
                                        defaultValue={this.props.edit ? this.props.productOffer.packaging.splits : null}
                                        onChange={e => this.splitsMinimumChange(e)}
                                        onBlur={() => this.validateMinimum('splits')}
                                        className='splits'
                                        type='number'
                                        min={'1'}
                                        placeholder="$"/>
                      </div>
                      <div className='group-item-wr'>
                          <label>Minimum</label>
                          <Control.text model="forms.productMapping.packaging.minimum"
                                        id="forms.productMapping.packaging.minimum"
                                        defaultValue={this.props.edit ? this.props.productOffer.packaging.minimum : null}
                                        onChange={e => this.splitsMinimumChange(e)}
                                        onBlur={e => this.validateMinimum('minimum')}
                                        className='minimum'
                                        type='number'
                                        min={'0'}/>
                      </div>
                      <div className='group-item-wr'>
                            <Control.checkbox 
                                name='merchantVisibility'
                                model='forms.addProductOffer.merchantVisibility'
                                component={Checkbox}
                                label="List Anonymously"
                            />
                        </div>
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
                        validateInputs={this.validateInputs}
                      />
                    </div>}
                </div>
            </div>
        );
    }
}