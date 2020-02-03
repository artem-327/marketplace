import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getMyHolds } from '~/modules/marketplace/holds/actions'
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
  componentDidMount() {
    this.props.getMyHolds()
  }

  render() {
    const { numberHolds } = this.props
    return (
      <Icon.Group>
        <HoldClockIcon />
        <CircularLabel circular color='orange'>
          {numberHolds}
        </CircularLabel>
      </Icon.Group>
    )
  }
}

const stateToProps = state => {
  return {
    numberHolds: getSafe(() => state.holds.holds.length, 0)
  }
}

export default connect(stateToProps, { getMyHolds })(HoldIcon)
