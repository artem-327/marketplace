import React, {Component} from 'react'
import pt from 'prop-types'
import {Input, Radio} from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'

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
      type: rule.priceAddition > 0 ? 'addition' : rule.priceMultiplier > 0 ? 'multiplier' : 'multiplier',
      value: rule.priceAddition > 0 ? rule.priceAddition : rule.priceMultiplier > 0 ? rule.priceMultiplier : ''
    })
  }

  componentWillReceiveProps({ rule }) {
    // console.log('receive props:', model)

    this.setState({
      //type: model.priceAddition > 0 ? 'addition' : model.priceMultiplier > 0 ? 'multiplier' : '',
      value: rule.priceAddition > 0 ? rule.priceAddition : rule.priceMultiplier > 0 ? rule.priceMultiplier : ''
    })
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault()
    e.stopPropagation()

    const { rule } = this.props

    this.setState({ [name]: value }, () => {
      const { value, type } = this.state

      if (type === 'addition') {
        rule.priceAddition = value ? parseInt(value, 10) : 0
        rule.priceMultiplier = 0
        
        this.onChange(rule)
      } else if (type === 'multiplier') {
        rule.priceMultiplier = value ? parseInt(value, 10) : 0
        rule.priceAddition = 0
        
        this.onChange(rule)
      }
    })

    return false
  }

  render() {
    const { disabled } = this.props
    const { type, value } = this.state

    return (
      <Box>
        <PriceInput 
          disabled={disabled}
          name="value" 
          type="number" 
          value={value} 
          onClick={e => {e.preventDefault(); e.stopPropagation()}}
          onChange={this.handleChange} 
          size='small'
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Radio disabled={disabled} label='%' checked={type === 'multiplier'} onClick={(e) => this.handleChange(e, { name: 'type', value: 'multiplier' })} />
          <Radio disabled={disabled} label='$' checked={type === 'addition'} onClick={(e) => this.handleChange(e, { name: 'type', value: 'addition' })} />
        </div>
      </Box>
    )
  }

}

const PriceInput = styled(Input)`
  padding: 5px;
  width: 80px;
`

const Box = styled.div`
  flex: 0 0 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`