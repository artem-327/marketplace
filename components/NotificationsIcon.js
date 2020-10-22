import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getCountUnseen } from '~/modules/alerts/actions'
import { Icon, Label } from 'semantic-ui-react'
import { Bell } from 'react-feather'
import { getSafe } from '~/utils/functions'

const IconBell = styled(Bell)`
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

class NotificationsIcon extends Component {
  componentDidMount() {
    this.props.getCountUnseen()
  }

  render() {
    const { countUnseen } = this.props

    return (
      <Icon.Group>
        <IconBell />
        {countUnseen ? (
          <CircularLabel circular color='orange'>
            {countUnseen}
          </CircularLabel>
        ) : null}
      </Icon.Group>
    )
  }
}

const stateToProps = state => {
  return {
    countUnseen: getSafe(() => state.alerts.countUnseen, 0)
  }
}

export default connect(stateToProps, { getCountUnseen })(NotificationsIcon)