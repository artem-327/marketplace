import React from 'react'
import './Pricing.scss'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

const IncrementalPricing = props => {
  const calculateGrossMargin = index => {
    const { cost, incrementalPricing } = props
    const margin = ((incrementalPricing[index].price - parseInt(cost, 10)) / parseInt(cost, 10)) * 100
    if (isNaN(margin) || incrementalPricing[index].price === '') {
      return ''
    }

    return margin.toFixed(3)
  }

  const renderIncrementalPricing = () => {
    const {
      addNewIncrementalPricing,
      calculateMargin,
      cost,
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
      const lastPriceLevel = index === incrementalPricing.length - 1
      const plusButton =
        item.quantityTo !== '' && item.price !== '' && lastPriceLevel && grossMargin !== ' ' ? (
          <button
            onClick={e => addNewIncrementalPricing(e, index)}
            className='incremental-button add'
            data-test={`add_inventory_add_${index}_btn`}>
            +
          </button>
        ) : null
      const minusButton =
        index !== 0 ? (
          <button
            onClick={e => removeIncrementalPricing(e, index)}
            className='incremental-button remove'
            data-test={`add_inventory_remove_${index}_btn`}>
            -
          </button>
        ) : null

      if (typeof item.margin === 'undefined' && item.price) {
        item.margin = calculateMargin(item.price, cost)
      }

      const quantityFrom = (
        <input
          className='tieredPricing'
          type='number'
          step={splits}
          value={item.quantityFrom}
          min={minimum}
          onChange={e => handleChange(e, index, 'quantityFrom')}
          onBlur={validateInputs}
          disabled={disabled}
        />
      )

      const quantityTo = (
        <input
          type='number'
          className='tieredPricing'
          step={splits}
          value={lastPriceLevel ? '' : item.quantityTo}
          title={lastPriceLevel ? 'There is no upper limit.' : ''}
          onBlur={validateInputs}
          onChange={e => handleChange(e, index, 'quantityTo')}
          disabled={lastPriceLevel ? true : false}
        />
      )

      const price = (
        <input
          type='number'
          className='tieredPricing'
          value={item.price}
          onBlur={validateInputs}
          onChange={e => handlePrice(e, index)}
          disabled={disabled}
          step='0.001'
        />
      )

      const margin = (
        <input
          type='number'
          className={classnames({ inRed: grossMargin < 0 })}
          // defaultValue={grossMargin}
          value={item.margin}
          onChange={e => handleMargin(e, index)}
          disabled={disabled}
          step='0.001'
        />
      )

      return (
        <tr key={index}>
          {/*<td><span className='incremental-index'><span>{index + 1}</span></span></td>*/}
          <td data-test={`add_inventory_quantityFrom_${index}_inp`}>{quantityFrom}</td>
          <td data-test={`add_inventory_quantityTo_${index}_inp`}>{quantityTo}</td>
          <td data-test={`add_inventory_price_${index}_inp`}>{price}</td>
          <td data-test={`add_inventory_margin_${index}_inp`}>{margin}</td>

          <td>{minusButton}</td>
          <td>{plusButton}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h4>
        <FormattedMessage id='addInventory.tieredPricing' defaultMessage='TIERED PRICING' />
      </h4>
      <table className='incremental-pricing-table'>
        <thead>
          <tr>
            <th>
              <FormattedMessage id='addInventory.quantityFrom' defaultMessage='Quantity From' />
            </th>
            <th>
              <FormattedMessage id='addInventory.quantityTo' defaultMessage='Quantity To' />
            </th>
            <th>{props.pricePer}</th>
            <th>
              <FormattedMessage id='addInventory.grossMargin' defaultMessage='Gross Margin %' />
            </th>
          </tr>
        </thead>
        <tbody>{renderIncrementalPricing()}</tbody>
      </table>
    </div>
  )
}

export default IncrementalPricing

IncrementalPricing.propTypes = {
  addNewIncrementalPricing: PropTypes.func,
  cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  splits: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validateInputs: PropTypes.func
}
