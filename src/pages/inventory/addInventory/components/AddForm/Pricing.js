import React, {Component} from 'react';
import {Control, Errors} from 'react-redux-form';
import {required, isNumber, min, messages} from "../../../../../utils/validation";
import IncrementalPricing from "./IncrementalPricing";
import Checkbox from "../../../../../components/Checkbox/Checkbox";
import './Pricing.css';
import classnames from 'classnames';


export default class Pricing extends Component {
    constructor(props){
        super(props);
        this.state = {
            incrementalPricing: false,
            margin:" ",
        }
    }

    componentWillReceiveProps(nextProps){

            if(typeof nextProps.form.pricing === "undefined"){
                this.setState({margin:" "});
                return;
            }
            let total = ((parseInt(nextProps.form.pricing.price,10)-parseInt(nextProps.form.pricing.cost,10)) / parseInt(nextProps.form.pricing.price,10)) * 100;

            if(isNaN(total)){
                this.setState({margin:" "});
                return;
            }
            total = total.toFixed(2);
            this.setState({margin:String(total)});

    }

    render() {
        
        let incremental = this.state.incrementalPricing ?
            <div className='incremental-wr'>
                <IncrementalPricing cost={this.props.form.pricing.cost} getIncPricing={(data)=>this.props.getIncPricing(data)}/>
            </div>
            : null;
        
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
                        <div className={classnames({inRed:this.state.margin < 0})}>{this.state.margin}%</div>
                        </div>
                    <div className='group-item-wr'>
                        <h6>Total Sales Price</h6>
                        <h6>$ UNDEFINED</h6>
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <Checkbox name='incremental'
                                  label='Tiered Pricing'
                                  onChange={(value) => this.setState({incrementalPricing: value})} />
                    </div>

                </div>
                {incremental}
            </div>
            </div>
        );
    }
}
