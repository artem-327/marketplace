import { Component } from 'react'
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
    const { associationFilter, filter, treeData, changeInModel } = this.props

    // helper writes values
    const asignValues = (values, rule) => {
      Object.keys(values).forEach(key => {
        rule[key] = values[key]
      })
    }
    // helper loop through elements
    const changeInElements = (elementsParam, values, id) => {
      if (getSafe(() => elementsParam.length, false)) {
        elementsParam.forEach(element => {
          if (!element.hidden) {
            if (!element.priceOverride && (element.id === id || !id)) asignValues(values, element)
          }
          if (getSafe(() => element.elements.length, '') > 0) changeInElements(element.elements, values, id)
        })
      }
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
    let idCompanies = []
    let foundAllNodes = []
    if (item.hasChildren()) {
      if ((item.isRoot() && associationFilter === 'ALL' && !filter.search) || !item.isRoot()) {
        // it writes value to the model
        // its not sufficient for display all values in all levels in FE inputs
        item.walk(n => {
          if (!n.model.rule.priceOverride && !n.model.rule.hidden) asignValues(values, n.model.rule)
        })

        //find all parents (state) of branches when change whole company
        let copyTreeData = treeData
        if (
          rule.type !== 'root' &&
          this.props.filter.category === 'branch' &&
          item.model.children.length > item.model.rule.elements.length
        ) {
          foundAllNodes = copyTreeData.all(
            n => n.model.id === item.model.rule.id && n.model.type === item.model.rule.type
          )
          foundAllNodes.forEach(nod => {
            nod.walk(no => {
              if (!getSafe(() => no.model.rule, '') && !no.model.priceOverride && !no.model.hidden) {
                no.model.rule = { ...no.model, ...asignValues(values, no.model) }
                if (getSafe(() => no.model.rule.elements.length, 0) > 0) {
                  Object.keys(values).forEach(key => {
                    changeInModel(no.model.rule.elements, { key, value: values[key] })
                  })
                }
              }
            })
          })
        }
        // it writes value to the elements
        changeInElements(item.model.rule.elements, values)
      } else if (item.isRoot() && (associationFilter !== 'ALL' || filter.search)) {
        //write changes to the filtered model
        item.walk(n => {
          if (filter.category === 'branch') {
            if (!n.model.rule.priceOverride && n.model.rule.type === 'branch' && !n.model.rule.hidden) {
              // it writes value to the filtered model (branches)
              // its sufficient for display value in inputs of branches
              asignValues(values, n.model.rule)
              if (
                !n.parent.model.rule.priceOverride &&
                n.parent.model.rule.type === 'company' &&
                !n.parent.model.rule.hidden
              ) {
                // it writes value to the parent (company) to the model
                // but for some reasons its not sufficient for display value in inputs
                asignValues(values, n.parent.model.rule)
                // here are collected ids of filtered companies
                idCompanies.push(n.parent.model.rule.id)
              }
            }
          }
        })
        // Value for company will be displayed in company input when we write value to the elements
        if (idCompanies.length) {
          idCompanies = _.uniqBy(idCompanies)
          //write changes to the correct elements (parent = company of branche)
          idCompanies.forEach(id => {
            changeInElements(item.model.rule.elements, values, id)
          })
        }
      }
    }
    this.props.onChange(item, foundAllNodes)
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
          minimumFractionDigits={3}
          maximumFractionDigits={3}
          style='currency'
          currency={currency}
          value={high ? high : 0}
        />
      ),
      lowStr: (
        <FormattedNumber
          minimumFractionDigits={3}
          maximumFractionDigits={3}
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
    const { disabled, offer, item, hideFobPrice, filter, asModal, treeData } = this.props
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
      <Box asModal={asModal}>
        <PriceInput
          asModal={asModal}
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
          treeData={treeData}
        />
        <ControlBox asModal={asModal}>
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
          <ControlBox asModal={asModal}>
            <FobPrice disabled={disabled}>{prices.lowStr} -</FobPrice>
            <FobPrice disabled={disabled}>{prices.highStr}</FobPrice>
          </ControlBox>
        )}
      </Box>
    )
  }
}

const PriceInput = styled(Input)`
  width: ${props => (props.asModal ? '70px' : '100px')};
  margin-right: 10px;
  padding: 8px;
  input {
    background: #fdfdfd !important;
  }
`

const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  ${props => !props.asModal && 'max-width: 60px;'}

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
  ${props => (!props.asModal ? 'max-width: 170px;' : 'max-width: 180px;')}
`
