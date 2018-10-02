import React, {Component} from 'react';
import './Pricing.css';
import classnames from 'classnames';


const IncrementalPricing = ({incrementalPricing, validateInputs, handleChange, cost, splits, minimum, disabled, ...props}) => {

    const calculateGrossMargin = (index) => {
        let margin = ((incrementalPricing[index].price - parseInt(cost,10)) / incrementalPricing[index].price * 100);
        if(isNaN(margin) || incrementalPricing[index].price === ''){   
            return '';
        }
        return margin.toFixed(2);
      }

      const renderIncrementalPricing = () => {
        return incrementalPricing.map((item, index)=>{
            let grossMargin = calculateGrossMargin(index);
            let plusButton = (item.quantityTo !== '' && item.price !== '' && index === incrementalPricing.length-1) && grossMargin !== ' ' ?
                <button onClick={e => props.addNewIncrementalPricing(e, index)} className='incremental-button add'>+</button> : null;
            let minusButton = (index !== 0) ?
                <button onClick={e => props.removeIncrementalPricing(e, index)} className='incremental-button remove'>-</button> : null;
            return <tr key={index}>
                {/*<td><span className='incremental-index'><span>{index + 1}</span></span></td>*/}
                <td>
                    <input  className='tieredPricing'
                            type='number'
                            step={splits}
                            value={item.quantityFrom}
                            min={minimum}
                            onChange={(e)=>handleChange(e, index, 'quantityFrom')}
                            onBlur={()=>{validateInputs()}}
                            disabled={disabled}
                    />
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           step={splits}
                           value={item.quantityTo}
                           onBlur={()=>{validateInputs()}}
                           onChange={(e)=>handleChange(e, index, 'quantityTo')}
                           disabled={disabled}
                           />
                </td>
                <td>
                    <input type='number'
                           className='tieredPricing'
                           value={item.price}
                           onBlur={()=>{validateInputs()}}
                           onChange={(e)=>handleChange(e, index, 'price')}
                           disabled={disabled}
                           
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



    return (
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
                {renderIncrementalPricing()}
            </tbody>
        </table>
    </div>
    );
};

export default IncrementalPricing;
