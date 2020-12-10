import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getCartCountItems } from '~/modules/purchase-order/actions'
import { Icon, Label } from 'semantic-ui-react'
import { ShoppingCart } from 'react-feather'
import { getSafe } from '~/utils/functions'

const IconCart = styled(ShoppingCart)`
  width: 24px;
  height: 25px;
  color: #20273a !important;
`
const CircularLabel = styled(Label)`
  position: absolute;
  top: -0.75em;
  left: auto;
  right: -1em;
  bottom: auto;
  font-size: 0.7142857rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
`

class MiniCart extends Component {
  componentDidMount() {
    try {
      this.props.getCartCountItems()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { cartItems } = this.props

    return (
      <Icon.Group>
        <IconCart name='shopping cart' size='large' />
        {cartItems ? (
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
    cartItems: getSafe(() => state.cart.cartItemsCount, 0)
  }
}

export default connect(stateToProps, { getCartCountItems })(MiniCart)
