import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getCartCountItems } from '~/modules/purchase-order/actions'
import { Icon, Label } from 'semantic-ui-react'
import { Truck } from 'react-feather'
import { getSafe } from '~/utils/functions'

const IconCart = styled(Truck)`
  width: 22px;
  height: 22px;
  color: #20273a !important;
`
const CircularLabel = styled(Label)`
  position: absolute;
  top: -0.3em;
  left: auto;
  right: -0.1em;
  bottom: auto;
  border-radius: 6px !important;
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
