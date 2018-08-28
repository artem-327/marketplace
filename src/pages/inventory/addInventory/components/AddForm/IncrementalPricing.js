import React, {Component} from 'react';
import './IncrementalPricing.css';

export default class IncrementalPricing extends Component {
    constructor(props){
        super(props);

        this.state = {
            splits: '',
            minimum: '',
            unit: 'lb',
            disabled: true,
            incrementalPricing: [{
                from: '',
                to: '',
                price: '',
            }]
        }
    }

    validateInputs(){
        let newIncremental = this.state.incrementalPricing.slice(0);
        let splits = parseInt(this.state.splits, 10);
        newIncremental.map((item, index)=>{

            let difference = item.to % splits;
            let differenceFrom = item.from % splits;

            if(item.from <= this.state.minimum){
                item.from = this.state.minimum;
            }
            else{
                if(differenceFrom * 2 > splits)
                    item.from = item.from - differenceFrom + splits;
                
                else
                    item.from = item.from - differenceFrom;
                
            }
            if(difference > splits / 2)
                item.to += splits-difference
            else
                item.to -= difference
            
            if(item.to !== '' && item.to <= item.from)
                item.to = item.from + splits
            
            if(newIncremental[index+1] !== undefined){
                
                if(newIncremental[index+1].from <= item.to)
                    newIncremental[index+1].from =  item.to + splits;   
            }
            return true;
        });

        this.props.getIncPricing(newIncremental);

        this.setState({incrementalPricing: newIncremental})
    }

    addNewIncrementalPricing(index){
        let newIncremental = this.state.incrementalPricing.slice(0);
        newIncremental.push({
            from: parseInt(this.state.incrementalPricing[index].to, 10) + parseInt(this.state.splits, 10),
            to: '',
            price: ''
        });
        this.setState({
            incrementalPricing: newIncremental
        })
    }

    removeIncrementalPricing(index){
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
            return " ";
        }
        console.log(margin);
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
            let plusButton = (item.to !== '' && item.price !== '' && index === this.state.incrementalPricing.length-1) && grossMargin !== ' ' ?
                <button onClick={()=>this.addNewIncrementalPricing(index)} className='incremental-button add'>+</button> : null;
            let minusButton = (index !== 0) ?
                <button onClick={()=>this.removeIncrementalPricing(index)} className='incremental-button remove'>-</button> : null;
            return <tr key={index}>
                {/*<td><span className='incremental-index'><span>{index + 1}</span></span></td>*/}
                <td>
                    <input  className='tieredPricing'
                            type='number'
                            step={this.state.splits}
                            value={item.from}
                            min={this.state.minimum}
                            onChange={(e)=>this.handleChange(e, index, 'from')}
                            onBlur={()=>{this.validateInputs()}}
                            disabled={this.state.disabled}
                    />
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           step={this.state.splits}
                           value={item.to}
                           onBlur={()=>{this.validateInputs()}}
                           onChange={(e)=>this.handleChange(e, index, 'to')}
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
                    <div>{grossMargin}%</div>
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
                            <th>Price per lb {this.props.unit}</th>
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
