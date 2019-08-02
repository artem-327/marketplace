import React, { Component } from 'react'
import pt from 'prop-types'
import { Input, Radio } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'
import { FormattedNumber } from 'react-intl'

export default class PriceControl extends Component {

  static propTypes = {
    disabled: pt.bool
  }

  static defaultProps = {
    disabled: false
  }

  state = {
    value: '',
    type: ''
  }

  constructor(props) {
    super(props)

    this.onChange = _.debounce(props.onChange, 250)
  }

  componentWillMount() {
    const { rule } = this.props

    this.setState({
      type: rule.priceAddition !== 0 ? 'addition' : rule.priceMultiplier !== 0 ? 'multiplier' : 'multiplier',
      value: rule.priceAddition !== 0 ? rule.priceAddition : rule.priceMultiplier !== 0 ? rule.priceMultiplier : ''
    })
  }

  componentWillReceiveProps({ rule }) {
    this.setState({
      //type: model.priceAddition > 0 ? 'addition' : model.priceMultiplier > 0 ? 'multiplier' : '',
      value: rule.priceAddition !== 0 ? rule.priceAddition : rule.priceMultiplier !== 0 ? rule.priceMultiplier : ''
    })
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault()
    e.stopPropagation()

    const { rule } = this.props

    this.setState({ [name]: value }, () => {
      const { value, type } = this.state

      if (type === 'addition') {
        rule.priceAddition = value !== 0 ? parseInt(value, 10) : 0
        rule.priceMultiplier = 0

        this.onChange(rule)
      } else if (type === 'multiplier') {
        rule.priceMultiplier = value !== 0 ? parseInt(value, 10) : 0
        rule.priceAddition = 0

        this.onChange(rule)
      }
    })

    return false
  }

  getPrices = () => {
    const { offer, rule, rootRule } = this.props

    const r = rootRule || rule
    const calc = (p) => (p * (r.priceMultiplier + 100) / 100) + r.priceAddition

    return {
      high: <FormattedNumber style='currency' currency={offer.currency || 'USD'} value={calc(offer.pricingTiers[0].price)} />,
      low: <FormattedNumber style='currency' currency={offer.currency || 'USD'} value={calc(offer.pricingTiers[offer.pricingTiers.length - 1].price)} />
    }
  }

  render() {
    const { disabled } = this.props
    const { type, value } = this.state
    const prices = this.getPrices()

    return (
      <Box>
        <PriceInput
          disabled={disabled}
          name='value'
          type='number'
          value={value}
          onClick={e => { e.preventDefault(); e.stopPropagation() }}
          onChange={this.handleChange}
          size='small'
          data-test='broadcast_price_control_price_inp'
        />
        <ControlBox>
          <Radio disabled={disabled} label='%' checked={type === 'multiplier'} onClick={(e) => this.handleChange(e, { name: 'type', value: 'multiplier' })} data-test='broadcast_price_control_multiplier_rad'/>
          <Radio disabled={disabled} label='$' checked={type === 'addition'} onClick={(e) => this.handleChange(e, { name: 'type', value: 'addition' })} data-test='broadcast_price_control_addition_rad'/>
        </ControlBox>
        <ControlBox>
          <FobPrice disabled={disabled}>{prices.low} -</FobPrice>
          <FobPrice disabled={disabled}>{prices.high}</FobPrice>
        </ControlBox>
      </Box>
    )
  }

}

const PriceInput = styled(Input)`
  padding: 5px;
  width: 80px;
`

const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
`
const FobPrice = styled.label`
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: normal;
  padding: 0 0 0 10px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`

const Box = styled.div`
  flex: 0 0 220px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 10px;
`