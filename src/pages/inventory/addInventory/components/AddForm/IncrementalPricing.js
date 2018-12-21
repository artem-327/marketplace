import React from 'react';
import './Pricing.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const IncrementalPricing = (props) => {

    const calculateGrossMargin = index => {
        const {cost, incrementalPricing} = props
        const margin = ((incrementalPricing[index].price - parseInt(cost, 10)) / parseInt(cost, 10) * 100);
        if (isNaN(margin) || incrementalPricing[index].price === '') {   
            return '';
        }
        
        return margin.toFixed(3);
      }

      const renderIncrementalPricing = () => {
        const {
          addNewIncrementalPricing, 
          disabled, 
          handleChange,
          handlePrice,
          handleMargin, 
          incrementalPricing, 
          minimum, 
          removeIncrementalPricing,  
          splits, 
          validateInputs
        } = props
        
        return incrementalPricing.map((item, index) => {
            const grossMargin = calculateGrossMargin(index)
            const lastPriceLevel = index === incrementalPricing.length-1
            const plusButton = (item.quantityTo !== '' && item.price !== '' && lastPriceLevel) && grossMargin !== ' ' 
              ? <button onClick={e => addNewIncrementalPricing(e, index)} className='incremental-button add'>+</button> 
              : null
            const minusButton = (index !== 0) 
              ? <button onClick={e => removeIncrementalPricing(e, index)} className='incremental-button remove'>-</button> 
              : null


            const quantityFrom = 

              <input className='tieredPricing'
                     type='number'
                     step={splits}
                     value={item.quantityFrom}
                     min={minimum}
                     onChange={e => handleChange(e, index, 'quantityFrom')}
                     onBlur={validateInputs}
                     disabled={disabled}/>

            const quantityTo =
               
              <input type='number'
                     className='tieredPricing'
                     step={splits}
                     value={lastPriceLevel ? "" : item.quantityTo}
                     title={lastPriceLevel ? "There is no upper limit." : ""}
                     onBlur={validateInputs}
                     onChange={e => handleChange(e, index, 'quantityTo')}
                     disabled={lastPriceLevel ? true : false}/>

              const price = 

                <input type='number'
                      className='tieredPricing'
                      value={item.price}
                      onBlur={validateInputs}
                      onChange={e => handlePrice(e, index)}
                      disabled={disabled}/>

              const margin = 

                <input type='number'
                       className={classnames({inRed:grossMargin < 0})}
                       defaultValue={grossMargin}
                       value={item.margin}
                       onChange={e => handleMargin(e, index)}
                       disabled={disabled}
                       />

            return <tr key={index}>

                {/*<td><span className='incremental-index'><span>{index + 1}</span></span></td>*/}
                <td>
                  {quantityFrom}
                </td>
                <td>
                  {quantityTo}
                </td>
                <td>
                  {price}
                </td>
                <td>
                  {margin}
                </td>

                <td>{minusButton}</td>
                <td>{plusButton}</td>
            </tr>
        })
    }

    return (
      <div>
        <h4>TIERED PRICING</h4>
        <table className='incremental-pricing-table'>
          <thead>
            <tr>
              <th>Quantity From</th>
              <th>Quantity To</th>
              <th>Price per lb</th>
              <th>Gross Margin %</th>
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


IncrementalPricing.propTypes = {
  addNewIncrementalPricing: PropTypes.func,
  cost: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  handlePrice: PropTypes.func,
  handleMargin: PropTypes.func,
  incrementalPricing: PropTypes.arrayOf(PropTypes.object),
  minimum: PropTypes.oneOfType([
    PropTypes.string, //initial state is string, but input value is a number
    PropTypes.number
  ]),
  removeIncrementalPricing: PropTypes.func,
  splits: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  validateInputs: PropTypes.func
};