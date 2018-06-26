import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
import Checkbox from "../../../../../components/Checkbox/Checkbox";
import IncrementalPricing from './IncrementalPricing';
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";

export default class Pricing extends Component {
    constructor(props){
        super(props);
        this.state = {incrementalPricing: false}
    }

    render() {
        let incremental = this.state.incrementalPricing ?
            <div className='incremental-wr'>
                <h4>Incremental Pricing</h4>
                <IncrementalPricing splits={15} minimum={20} />
            </div>
            : null;
        return (
            <div>
                <div className='group-inside'>
                    <h4>Set Price</h4>
                    <div className='group-item-wr'>
                        <label htmlFor=".pricePerUnit">Price</label>
                        <Control.text model=".pricePerUnit"
                                      id=".pricePerUnit"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".currency">Pricing Units</label>
                        <DropdownRedux opns={this.props.pricingUnits} placeholder='Select'
                                       model="forms.addProductOffer.addProductOffer.currency"
                                       dispatch={this.props.dispatch}/>
                    </div>
                    <div className='anonymous'>
                        <CheckboxRedux model="forms.addProductOffer.addProductOffer.merchantVisibility"
                                       name="merchantVisibility"
                                       label="List Anonymously"
                                       dispatch={this.props.dispatch}/>
                    </div>
                    {/*<div className='incremental'>*/}
                        {/*<Checkbox name='incremental'*/}
                                  {/*label='Incremental Pricing'*/}
                                  {/*onChange={(value) => this.setState({incrementalPricing: value})} />*/}
                    {/*</div>*/}
                </div>
                {/*<div className='group-inside'>*/}
                    {/*<h4>Rules</h4>*/}
                    {/*<div className='group-item-wr'>*/}
                        {/*<label htmlFor=".splits">Splits</label>*/}
                        {/*<Control.text model=".splits"*/}
                                      {/*id=".splits"/>*/}
                    {/*</div>*/}
                    {/*<div className='group-item-wr'>*/}
                        {/*<label htmlFor=".minimum">Minimum</label>*/}
                        {/*<DropdownRedux opns={[{id: 10, name: '10'}]} placeholder='Select'*/}
                                       {/*model="forms.addProductOffer.addProductOffer.minimum"*/}
                                       {/*dispatch={this.props.dispatch}/>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {incremental}
            </div>
        );
    }
}
