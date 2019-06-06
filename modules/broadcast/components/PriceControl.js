import React, {Component} from 'react'
import pt from 'prop-types'
import {Input, Radio} from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'

export default class PriceControl extends Component {

  static propTypes = {
    disabled: pt.bool
  }

  defaultProps = {
    disabled: false
  }

  state = {
    value: '',
    type: ''
  }

  constructor(props) {
    super(props)

    this.onChange = _.debounce(props.onChange, 300)
  }

  componentWillMount() {
    const { node: { model } } = this.props
    this.setState({
      type: model.priceAddition > 0 ? 'addition' : model.priceMultiplier > 0 ? 'multiplier' : '',
      value: model.priceAddition > 0 ? model.priceAddition : model.priceMultiplier > 0 ? model.priceMultiplier : ''
    })
  }

  componentWillReceiveProps({ node: { model } }) {
    // console.log('receive props:', model)

    this.setState({
      //type: model.priceAddition > 0 ? 'addition' : model.priceMultiplier > 0 ? 'multiplier' : '',
      value: model.priceAddition > 0 ? model.priceAddition : model.priceMultiplier > 0 ? model.priceMultiplier : ''
    })
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault()
    e.stopPropagation()

    const { node: { model }, node, disabled } = this.props

    this.setState({ [name]: value }, () => {
      const { value, type } = this.state

      if (type === 'addition') {
        model.priceAddition = value ? parseInt(value, 10) : 0
        model.priceMultiplier = 0
        
        this.onChange(node, { priceAddition: TreeModel.priceAddition })
      } else if (type === 'multiplier') {
        model.priceMultiplier = value ? parseInt(value, 10) : 0
        model.priceAddition = 0
        
        this.onChange(node, { priceMultiplier: model.priceMultiplier })
      }
    })

    return false
  }

  render() {
    const { node: { model }, disabled } = this.props
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