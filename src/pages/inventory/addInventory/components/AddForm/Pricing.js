import React, {Component} from 'react';
import {Control, Errors} from 'react-redux-form';
import {required, isNumber, min, messages} from "../../../../../utils/validation";
import IncrementalPricing from "./IncrementalPricing";
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";
import './Pricing.css';
import classnames from 'classnames';


export default class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIncrementalPricing: false,
            margin: " ",
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

    componentWillReceiveProps(nextProps) {
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
      var newstate = {};
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
                                          required
                                      }}
                                      defaultValue=""
                                      placeholder="$"/>
                    </div>
                    <div className='group-item-wr'>
                        <div className='gross-margin'>
                            <h6>Gross Margin</h6>
                            <div className={classnames({inRed: this.state.margin < 0})}>{this.state.margin}%</div>
                        </div>
                        <div className='group-item-wr'>
                            <h6>Total Sales Price</h6>
                            <h6>$ {(measurement * totalPackages * price).formatMoney(2)}</h6>
                        </div>
                    </div>

                    <div>                    
                      <div className='group-item-wr'>
                          <label>Splits</label>
                          <input
                              className='splits'
                              type='number'
                              value={this.state.splits}
                              min={'1'}
                              onChange={e => this.splitsMinimumChange(e)}
                              onBlur={() => this.validateMinimum('splits')}
                          />
                      </div>
                      <div className='group-item-wr'>
                          <label>Minimum</label>
                          <input
                              className='minimum'    
                              type='number'
                              min={'0'}
                              value={this.state.minimum}
                              onChange={e => this.splitsMinimumChange(e)}
                              onBlur={e => this.validateMinimum('minimum')}
                          />
                      </div>
                  </div>

                    <div>
                        <div className='group-item-wr'>
                            <CheckboxRedux name='incremental'
                                           label='Tiered Pricing'
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