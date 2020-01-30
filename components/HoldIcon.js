import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getHolds } from '~/modules/purchase-order/actions'
import { Icon, Label } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'
import { Clock } from 'react-feather'

const HoldClockIcon = styled(Clock)`
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

class HoldIcon extends Component {
  //TODO
  componentDidMount() {
    //this.props.getHolds()
  }

  render() {
    //TODO
    //const { holdItems } = this.props
    //TODO
    return (
      <Icon.Group>
        <HoldClockIcon />
        <CircularLabel circular color='orange'>
          2{/* až bude funkční getHolds tak číslo výše smazat a odkomentovat vše s  holdItems a getHolds {holdItems} */}
        </CircularLabel>
      </Icon.Group>
    )
  }
}

const stateToProps = state => {
  return {
    //TODO
    holdItems: getSafe(() => state.cart.cart.holdItems.length, 0)
  }
}

export default connect(stateToProps, { getHolds })(HoldIcon)
