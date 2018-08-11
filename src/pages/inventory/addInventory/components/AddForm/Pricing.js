import React, {Component} from 'react';
import {Control} from 'react-redux-form';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
// import Checkbox from "../../../../../components/Checkbox/Checkbox";
import IncrementalPricing from './IncrementalPricing';
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";

export default class Pricing extends Component {
    constructor(props){
        super(props);
        this.state = {
            incrementalPricing: false,
            margin:"",
        }
    }

    componentWillReceiveProps(nextProps){
       
            if(typeof nextProps.form.addProductOffer.pricing === "undefined"){
                return;
            }
            let total = ((parseInt(nextProps.form.addProductOffer.pricing.price,10)-parseInt(nextProps.form.addProductOffer.pricing.cost,10)) / parseInt(nextProps.form.addProductOffer.pricing.price,10)) * 100;
            this.setState({margin:String(total)});
       
    }

    

    render() {

        let incremental = this.state.incrementalPricing ?
            <div className='incremental-wr'>
                <h4>Tiered Pricing</h4>
                <IncrementalPricing splits={15} minimum={20} />
            </div>
            : null;
        return (
            <div>

                    <h6>SET PRICE & RULES</h6>
                <div>         
                    <div className='group-item-wr'>
                        <label htmlFor=".pricePr">Price pr (lb)</label>
                        <Control.text model=".pricing.price"
                                      id=".pricePr"
                                      placeholder="$"
                                      defaultValue=""                                      
                                      />
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".costPr">Cost pr (lb)</label>
                        <Control.text model=".pricing.cost"
                                      id=".costPr"
                                      placeholder="$"
                                      defaultValue=""                                                                            
                                      />
                    </div>

                    {/*<div className='group-item-wr'>
                        <label htmlFor=".grossMargin">Gross Margin %</label>
                        <Control.text model=".pricing.margin"
                                      id=".grossMargin"
                                      placeholder="$"/>
                    </div>*/}
                    <div className='group-item-wr'>{this.state.margin}</div>

                    <div className='group-item-wr'>
                        <h6>Total Sales Price</h6>
                        <h6>$ UNDEFINED</h6>
                    </div>
                </div>
                {/*<div>*/}
                    {/*<div className='group-item-wr'>*/}
                        {/*<Checkbox name='incremental'*/}
                                  {/*label='Tiered Pricing'*/}
                                  {/*onChange={(value) => this.setState({incrementalPricing: value})} />*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div>
                <div className='group-item-wr'>
                <label htmlFor=".splits">Splits</label>
                <Control.text model=".splits"
                              id=".splits"
                              placeholder="Packages"/>
                </div>
                <div className='group-item-wr'>
                <label htmlFor=".minimum">Minimum</label>
                <DropdownRedux opns={[{id: 10, name: '10'}]} placeholder='Packages'
                model="forms.addProductOffer.addProductOffer.minimum"
                dispatch={this.props.dispatch}/>
                </div>
                </div>
                <div className='group-item-wr'>
                        <CheckboxRedux model="forms.addProductOffer.addProductOffer.merchantVisibility"
                                       name="merchantVisibility"
                                       label="List Anonymously"
                                       dispatch={this.props.dispatch}/>
                </div>

                {incremental}
            </div>
        );
    }
}
