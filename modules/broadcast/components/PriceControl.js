import React, { Component } from 'react'
import pt from 'prop-types'
import { Input, Radio } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'
import { FormattedNumber } from 'react-intl'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

export default class PriceControl extends Component {
  static propTypes = {
    disabled: pt.bool
  }

  static defaultProps = {
    disabled: false
  }

  state = {
    type: 'multiplier'
  }

  componentDidMount() {}

  handleChange = (e, { name, value }) => {
    e.preventDefault()
    e.stopPropagation()

    // helper
    const asignValues = (values, rule) => {
      Object.keys(values).forEach(key => {
        rule[key] = values[key]
      })
    }

    let { item } = this.props

    let {
      model: { rule }
    } = item

    let type = name === 'type' ? value : this.state.type
    let val = rule.priceAddition !== 0 ? rule.priceAddition : rule.priceMultiplier !== 0 ? rule.priceMultiplier : ''

    let minimum = name === 'type' ? this.calculateMinimum(value) : this.calculateMinimum(type)

    if (this.state.type !== type) this.setState({ type })

    let values = {}
    if (name === 'value' && value < minimum) value = minimum
    if (name === 'type' && val < minimum) value = minimum

    if (name === 'type') {
      if (type === 'multiplier' && rule.priceMultiplier) return
      values = {
        priceAddition: rule.priceMultiplier,
        priceMultiplier: rule.priceAddition
      }
    } else {
      if (type === 'addition') {
        values = { priceAddition: value ? parseFloat(value, 10) : 0, priceMultiplier: 0 }
      } else {
        values = { priceMultiplier: value ? parseFloat(value, 10) : 0, priceAddition: 0 }
      }
    }

    asignValues(values, rule)

    if (item.hasChildren()) {
      item.walk(n => {
        if (!n.model.rule.priceOverride) asignValues(values, n.model.rule)
      })
      // Same hack as in RuleItem.handleChange
      item.model.rule.elements.forEach(el => {
        if (!el.priceOverride) asignValues(values, el)
      })
    }

    this.props.onChange(item)
    return false
  }

  calculateMinimum = type => {
    const { offer } = this.props
    if (type === 'multiplier') {
      return -99.9
    } else if (offer.pricingTiers[this.props.offer.pricingTiers.length - 1] && type !== 'multiplier') {
      return -1 * this.props.offer.pricingTiers[this.props.offer.pricingTiers.length - 1].pricePerUOM + 0.001
    } else {
      return
    }
    // return type === 'multiplier'
    //   ? -99.9
    //   : -1 * this.props.offer.pricingTiers[this.props.offer.pricingTiers.length - 1].pricePerUOM + 0.001
  }

  getPrices = () => {
    const { offer, item, rootRule } = this.props
    const {
      model: { rule }
    } = item

    const r = rule //rootRule || rule
    const calc = p => p + p * (getSafe(() => r.priceMultiplier, 0) / 100) + getSafe(() => r.priceAddition, 0)

    let high = calc(getSafe(() => offer.pricingTiers[0].pricePerUOM, null)),
      low = calc(getSafe(() => offer.pricingTiers[offer.pricingTiers.length - 1].pricePerUOM, null))

    return {
      highStr: <FormattedNumber style='currency' currency={currency} value={high ? high : 0} />,
      lowStr: <FormattedNumber style='currency' currency={currency} value={low ? low : 0} />,
      low,
      high
    }
  }

  render() {
    const { disabled, offer, item, hideFobPrice } = this.props
    const {
      model: { rule }
    } = item

    const prices = hideFobPrice ? null : this.getPrices()
    let type = rule.priceAddition ? 'addition' : this.state.type

    let value = rule.priceAddition !== 0 ? rule.priceAddition : rule.priceMultiplier !== 0 ? rule.priceMultiplier : ''

    return (
      <Box>
        <PriceInput
          className='price-input'
          disabled={disabled}
          name='value'
          type='number'
          min={hideFobPrice ? null : this.calculateMinimum(type)}
          value={value}
          step={type === 'multiplier' ? 0.1 : 0.001}
          onClick={e => {
            e.stopPropagation()
          }}
          onChange={this.handleChange}
          size='small'
          data-test='broadcast_price_control_price_inp'
        />
        <ControlBox>
          <Radio
            disabled={disabled}
            label='%'
            checked={type === 'multiplier'}
            onClick={e => this.handleChange(e, { name: 'type', value: 'multiplier' })}
            data-test='broadcast_price_control_multiplier_rad'
          />
          <Radio
            disabled={disabled}
            label='$'
            checked={type === 'addition'}
            onClick={e => this.handleChange(e, { name: 'type', value: 'addition' })}
            data-test='broadcast_price_control_addition_rad'
          />
        </ControlBox>
        {!hideFobPrice && (
          <ControlBox>
            <FobPrice disabled={disabled}>{prices.lowStr} -</FobPrice>
            <FobPrice disabled={disabled}>{prices.highStr}</FobPrice>
          </ControlBox>
        )}
      </Box>
    )
  }
}

const PriceInput = styled(Input)`
  padding: 8px;
  width: 110px;
`

const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  
  .ui.radio.checkbox input:focus:checked ~ label:after,
  .ui.radio.checkbox input:checked ~ label:after {
    background-color: #2599d5;
  }
`
const FobPrice = styled.label`
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: normal;
  padding: 0 0 0 10px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`

const Box = styled.div`
  flex: 0 0 220px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 10px;
`
