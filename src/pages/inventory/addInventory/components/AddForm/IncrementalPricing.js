import React, {Component} from 'react';

export default class IncrementalPricing extends Component {
    constructor(props){
        super(props);
        this.state = {
            splits: 0,
            minimum: 0,
            unit: 'lb',
            incrementalPricing: [{
                from: this.props.minimum,
                to: '',
                price: ''
            }]
        }
    }

    handleChange(e, index, type){
        if(e.target.value < 0) return;
        let value = e.target.value ? parseInt(e.target.value, 10) : '';
        let newIncremental = this.state.incrementalPricing.slice(0);
        newIncremental[index][type] = value;
        this.setState({
            incrementalPricing: newIncremental
        })
    }

    validateInputs(){
        let newIncremental = this.state.incrementalPricing.slice(0);
        let splits = parseInt(this.state.splits, 10);
        newIncremental.map((item, index)=>{
            let difference = item.to % splits;
            if(difference > splits / 2){
                item.to += splits-difference
            }else{
                item.to -= difference
            }
            if(item.to !== '' && item.to <= item.from){
                item.to = item.from + splits
            }
            if(newIncremental[index+1] !== undefined){
                newIncremental[index+1].from =  item.to + splits ;
            }
            return true;
        });
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
        newstate[e.target.className] = e.target.value;
        this.setState(newstate);
    }
    
    validateSplitsMinimum(){
        let newsplit = this.state.splits;
        if (this.state.minimum > this.state.splits){
            newsplit = this.state.minimum;
        }
        this.setState({splits:newsplit});
    }

    renderSplits(){
        return (
            <div>
                <label>Splits</label>
                <input
                    className='splits'
                    type='number'
                    onChange={e => this.splitsMinimumChange(e)}
                    onBlur={()=> this.validateSplitsMinimum()}
                    min={this.state.minimum}
                />
                <label>Minimum</label>
                <input
                    className='minimum'    
                    type='number'
                    onChange={e => this.splitsMinimumChange(e)}
                    onBlur={()=> this.validateSplitsMinimum()}
                />
            </div>
        )
           
    }

    renderIncrementalPricing(){
        return this.state.incrementalPricing.map((item, index)=>{
            let plusButton = (item.to !== '' && item.price !== '' && index === this.state.incrementalPricing.length-1) ?
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
                            onChange={(e)=>this.handleChange(e, index, 'from')}
                            onBlur={()=>{this.validateInputs()}}
                    />
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           step={this.state.splits}
                           value={item.to}
                           onBlur={()=>{this.validateInputs()}}
                           onChange={(e)=>this.handleChange(e, index, 'to')}/>
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           value={item.price}
                           onBlur={()=>{this.validateInputs()}}
                           onChange={(e)=>this.handleChange(e, index, 'price')}/>
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           onBlur={()=>{this.validateInputs()}}
                           onChange={(e)=>this.handleChange(e, index, 'margin')}/>
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
