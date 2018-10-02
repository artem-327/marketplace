import React, {Component} from 'react';
import './Pricing.css';
import classnames from 'classnames';


export default class IncrementalPricing extends Component {
    constructor(props){
        super(props);

        this.state = {
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

    validateInputs(){
        let newIncremental = this.state.incrementalPricing.slice(0);
        let splits = parseInt(this.state.splits, 10);
        newIncremental.map((item, index)=>{

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

    addNewIncrementalPricing(e, index){
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

    removeIncrementalPricing(e, index){
        e.preventDefault();
        this.setState({
            incrementalPricing: [...this.state.incrementalPricing.slice(0,index), ...this.state.incrementalPricing.slice(index+1)]
        }, ()=>this.validateInputs())
    }

    splitsMinimumChange(e){
        var newstate = {};
        newstate[e.target.className] = e.target.value ? parseInt(e.target.value, 10) : '';
        this.setState(newstate);  
    }

    handleChange(e, index, type){
        let value = e.target.value ? parseInt(e.target.value, 10) : '';
        let newIncremental = this.state.incrementalPricing.slice(0);
        newIncremental[index][type] = value;
        this.setState({
            incrementalPricing: newIncremental
        })
    }
  
    validateMinimum(form){
        if( form === 'minimum'){
            if (this.state.minimum < 0 || this.state.minimum === ''){
                this.setState({minimum:''},() => this.disableInput());
                return;
            }
            else if(this.state.splits === ''){
                return;
            }
        }
        else if ( form === 'splits'){
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

    disableInput(){
        if(this.state.splits === '' || this.state.minimum === ''){
            this.setState({disabled:true});
        }
        else
            this.setState({disabled:false});
    }

    calculateGrossMargin(index){
        
        let margin = ((this.state.incrementalPricing[index].price - parseInt(this.props.cost,10)) / this.state.incrementalPricing[index].price * 100);
        if(isNaN(margin) || this.state.incrementalPricing[index].price === ''){   
            return '';
        }
        return margin.toFixed(2);
    }

    renderSplits(){
        return (
            <div>
                <div className='inc-pricing-splits'>
                    <label>Splits</label>
                    <input
                        className='splits'
                        type='number'
                        value={this.state.splits}
                        min={'1'}
                        onChange={e => this.splitsMinimumChange(e)}
                        onBlur={()=> this.validateMinimum('splits')}
                    />
                </div>
                <div className='inc-pricing-splits'>
                    <label>Minimum</label>
                    <input
                        className='minimum'    
                        type='number'
                        min={'0'}
                        value={this.state.minimum}
                        onChange={e => this.splitsMinimumChange(e)}
                        onBlur={(e)=> this.validateMinimum('minimum')}
                    />
                </div>
            </div>
        )
    }

    renderIncrementalPricing(){
        return this.state.incrementalPricing.map((item, index)=>{
            let grossMargin = this.calculateGrossMargin(index);
            let plusButton = (item.quantityTo !== '' && item.price !== '' && index === this.state.incrementalPricing.length-1) && grossMargin !== ' ' ?
                <button onClick={(e)=>this.addNewIncrementalPricing(e, index)} className='incremental-button add'>+</button> : null;
            let minusButton = (index !== 0) ?
                <button onClick={(e)=>this.removeIncrementalPricing(e, index)} className='incremental-button remove'>-</button> : null;
            return <tr key={index}>
                {/*<td><span className='incremental-index'><span>{index + 1}</span></span></td>*/}
                <td>
                    <input  className='tieredPricing'
                            type='number'
                            step={this.state.splits}
                            value={item.quantityFrom}
                            min={this.state.minimum}
                            onChange={(e)=>this.handleChange(e, index, 'quantityFrom')}
                            onBlur={()=>{this.validateInputs()}}
                            disabled={this.state.disabled}
                    />
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           step={this.state.splits}
                           value={item.quantityTo}
                           onBlur={()=>{this.validateInputs()}}
                           onChange={(e)=>this.handleChange(e, index, 'quantityTo')}
                           disabled={this.state.disabled}
                           />
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           value={item.price}
                           onBlur={()=>{this.validateInputs()}}
                           onChange={(e)=>this.handleChange(e, index, 'price')}
                           disabled={this.state.disabled}
                           
                           />
                </td>
                <td>
                    <div className={classnames({inRed:grossMargin < 0})}>{grossMargin}%</div>
                </td>
                <td>{minusButton}</td>
                <td>{plusButton}</td>
            </tr>
        })
    }

    render() {
        return(
            <div>
                {this.renderSplits()}
                <h4>Tiered Pricing</h4>
                <table className='incremental-pricing-table'>
                    <thead>
                        <tr>
                            <th>Quantity From</th>
                            <th>Quantity To</th>
                            <th>Price per lb</th>
                            <th>Gross Margin %</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderIncrementalPricing()}
                    </tbody>
                </table>
            </div>
        )
    }
}
