import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getCart } from '~/modules/purchase-order/actions'
import { Icon, Label } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'

const IconCart = styled(Icon)`
  color: #848893 !important;
`
const CircularLabel = styled(Label)`
  position: absolute;
  top: -0.7em;
  left: auto;
  right: -0.7em;
  bottom: auto;
  font-size: 0.7142857rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
`

class MiniCart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const { cartItems } = this.props

    return (
      <Icon.Group>
        <IconCart name='shopping cart' color='white' size='large' />
        {cartItems
          ? (
            <CircularLabel circular color='orange'>
              {cartItems}
            </CircularLabel>
          ) : null}
      </Icon.Group>
    )
  }
}

const stateToProps = state => {
  return {
    cartItems: getSafe(() => state.cart.cart.cartItems.length, 0)
  }
}

export default connect(stateToProps, { getCart })(MiniCart)
