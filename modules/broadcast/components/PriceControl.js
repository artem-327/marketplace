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
    //funkce u Broadcast.js
    const { changeInModel } = this.props

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
    // type jsou type (procenta "multiplier" nebo cash "addition", toggle) nebo value (to je input hodnota)
    let type = name === 'type' ? value : this.state.type
    // z rule se vytáhne hodnota z procent (multiplier) nebo cash ( priceAddition)
    let val = rule.priceAddition !== 0 ? rule.priceAddition : rule.priceMultiplier !== 0 ? rule.priceMultiplier : ''
    // hodnota pro validaci, vypočítá se jaké minimum je přípustné zadat
    let minimum = name === 'type' ? this.calculateMinimum(value) : this.calculateMinimum(type)

    console.log('PriceControl===name, type, val, minimum====================================')
    console.log({ name, type, val, minimum })
    console.log('====================================')
    // pokud došlo ke změně ve statu type tak uložit do statu (vyvolá znovu render)
    if (this.state.type !== type) this.setState({ type })

    let values = {}
    // validace a auto korekce hodnoty
    if (name === 'value' && value < minimum) value = minimum
    if (name === 'type' && val < minimum) value = minimum

    if (name === 'type') {
      // pokud není změna v type, tak se nepokračuje
      if (type === 'multiplier' && rule.priceMultiplier) return
      // prohodí se hodnoty pokud je změna v type (multiplier, addition)
      values = {
        priceAddition: rule.priceMultiplier,
        priceMultiplier: rule.priceAddition
      }
    } else {
      if (type === 'addition') {
        // zapíše se hodnota do proměnné pro multiplier i pro addition
        // záleží který typ je vybrán
        // parseFloat se mi nezdá že by mělo 2 parametry (smazat 10)
        values = { priceAddition: value ? parseFloat(value, 10) : 0, priceMultiplier: 0 }
      } else {
        values = { priceMultiplier: value ? parseFloat(value, 10) : 0, priceAddition: 0 }
      }
    }
    console.log('PriceControl===values====================================')
    console.log({ values })
    console.log('====================================')
    // zapíšou se hodnoty do item (rule)
    asignValues(values, rule)
    // zkontroluje jestli má item potomky a projde všechny
    // pokud nemají atribut priceOverride, tak všem zapíše dané hodnoty z values
    if (item.hasChildren()) {
      item.walk(n => {
        if (!n.model.rule.priceOverride) asignValues(values, n.model.rule)
      })
      // projde pole všech children (elements), ale jen 2 úrovně a dosadí values (priceAddition, priceMultiplier) do daného elementu
      // nejsme si jist čemu ten hack má pomoct a myslím si že částečně nahradil changeInModel()
      // changeInModel funkce se volá sama opakovaně na základě toho jestli tam ještě existují
      // další children (elements) a proto tenhle blok kodu mi nedává nějak smysl a spíše bych tu použil
      // changeInModel(item.model.rule.elements, values)
      // Same hack as in RuleItem.handleChange
      item.model.rule.elements.forEach(el => {
        if (!el.priceOverride) asignValues(values, el)
        if (getSafe(() => el.elements.length, 0) > 0) {
          el.elements.forEach(e => {
            if (!e.priceOverride) asignValues(values, e)
          })
        }
      })
    }
    // tohle tu myslím nemusí vůbec být, protože měníme celou dobu samotný item
    let copy = _.cloneDeep(item)

    // to by mělo být pravděpodobně použito výše
    // changeInModel(copy.model.rule.elements, values)

    console.log('PriceControl===item===updated=================================')
    console.log(item)
    console.log('====================================')
    // zde jde upravený node do Broadcast.js do funkce handlePriceChange
    this.props.onChange(item)
    // proč se vrací false?
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
      highStr: (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={high ? high : 0}
        />
      ),
      lowStr: (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={low ? low : 0}
        />
      ),
      low,
      high
    }
  }

  render() {
    const { disabled, offer, item, hideFobPrice, filter, asSidebar } = this.props
    const {
      model: { rule }
    } = item

    const prices = hideFobPrice ? null : this.getPrices()
    let type = rule.priceAddition ? 'addition' : this.state.type

    let value =
      !getSafe(() => rule.priceAddition, false) && !getSafe(() => rule.priceMultiplier, false)
        ? ''
        : rule.priceAddition !== 0
        ? rule.priceAddition
        : rule.priceMultiplier !== 0
        ? rule.priceMultiplier
        : ''

    return (
      <Box asSidebar={asSidebar}>
        <PriceInput
          asSidebar={asSidebar}
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
        <ControlBox asSidebar={asSidebar}>
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
          <ControlBox asSidebar={asSidebar}>
            <FobPrice disabled={disabled}>{prices.lowStr} -</FobPrice>
            <FobPrice disabled={disabled}>{prices.highStr}</FobPrice>
          </ControlBox>
        )}
      </Box>
    )
  }
}

const PriceInput = styled(Input)`
  width: ${props => (props.asSidebar ? '138px' : '110px')};
  margin-right: 10px;
  border-right: 1px solid #dee2e6;
  padding: 8px;
`

const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  ${props => !props.asSidebar && 'max-width: 60px;'}

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
  flex: 0 0 276px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 10px;
  ${props => !props.asSidebar && 'max-width: 170px;'}
`
