import React, {Component} from 'react';
import './Pricing.css';
import classnames from 'classnames';


export default class IncrementalPricing extends Component {
    constructor(props){
        super(props);

        this.state = {
            incrementalPricing: [{
                quantityFrom: '',
                quantityTo: '',
                price: '',
            }]
        }
    }
  
    calculateGrossMargin(index){   
        let margin = ((this.props.incrementalPricing[index].price - parseInt(this.props.cost,10)) / this.props.incrementalPricing[index].price * 100);
        if(isNaN(margin) || this.props.incrementalPricing[index].price === ''){   
            return '';
        }
        return margin.toFixed(2);
    }

    renderIncrementalPricing(){
        return this.props.incrementalPricing.map((item, index)=>{
            let grossMargin = this.calculateGrossMargin(index);
            let plusButton = (item.quantityTo !== '' && item.price !== '' && index === this.props.incrementalPricing.length-1) && grossMargin !== ' ' ?
                <button onClick={(e)=>this.props.addNewIncrementalPricing(e, index)} className='incremental-button add'>+</button> : null;
            let minusButton = (index !== 0) ?
                <button onClick={(e)=>this.props.removeIncrementalPricing(e, index)} className='incremental-button remove'>-</button> : null;
            return <tr key={index}>
                {/*<td><span className='incremental-index'><span>{index + 1}</span></span></td>*/}
                <td>
                    <input  className='tieredPricing'
                            type='number'
                            step={this.props.splits}
                            value={item.quantityFrom}
                            min={this.props.minimum}
                            onChange={(e)=>this.props.handleChange(e, index, 'quantityFrom')}
                            onBlur={()=>{this.validateInputs()}}
                            disabled={this.props.disabled}
                    />
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           step={this.props.splits}
                           value={item.quantityTo}
                           onBlur={()=>{this.validateInputs()}}
                           onChange={(e)=>this.handleChange(e, index, 'quantityTo')}
                           disabled={this.props.disabled}
                           />
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           value={item.price}
                           onBlur={()=>{this.validateInputs()}}
                           onChange={(e)=>this.handleChange(e, index, 'price')}
                           disabled={this.props.disabled}
                           
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
        console.log('%c props ', 'background: #222; color: #bada55', this.props);
        return(
            <div>
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
