import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getCountUnseen } from '~/modules/alerts/actions'
import { Icon, Label } from 'semantic-ui-react'
import { Bell } from 'react-feather'
import { getSafe } from '~/utils/functions'

const IconBell = styled(Bell)`
  width: 22px;
  height: 22px;
  color: #20273a !important;
`
const CircularLabel = styled(Label)`
  position: absolute;
  top: 3px;
  left: auto;
  right: 5px;
  bottom: auto;
  width: 8px;
  height: 8px;
  padding: 0 !important;
  box-shadow: 0 0 0 2px #ffffff !important;
  font-size: 0px !important;
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
