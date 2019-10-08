import { Component } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import Router from 'next/router'
import IdleTimer from 'react-idle-timer'
import { IDLE_TIMEOUT, refreshToken } from '~/utils/auth'
import moment from 'moment'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const WARNING_OFFSET = 3 * 60 * 1000

const TimeTitle = styled.p`
  font-size: 150%;
  font-weight: lighter;
`

export default class TimeoutWarning extends Component {

  state = {
    warningOpen: false,
    remainingTime: WARNING_OFFSET
  }

  componentWillUnmount() {
    this.checkTimeInterval && clearInterval(this.checkTimeInterval)
  }

  getRemainingTimeString = () => {
    const d = moment.duration(this.state.remainingTime)
    return `${d.minutes()} minutes ${d.seconds()} seconds`
  }

  checkTime = () => {

    this.setState(s => ({
      remainingTime: s.remainingTime - 1000,
      warningOpen: true,
    }))

    if (this.state.remainingTime < 1) {
      clearInterval(this.checkTimeInterval)
      Router.push(`/auth/logout?auto=true`)
    }
  }

  handleIdle = () => {
    this.checkTimeInterval = setInterval(this.checkTime, 1000)
  }

  handleAction = () => {
    refreshToken()
  }

  resetIdleTimer = () => {
    refreshToken()
    this.idleTimer.reset()
    clearInterval(this.checkTimeInterval)
    this.setState({
      remainingTime: WARNING_OFFSET,
      warningOpen: false
    })
  }

  render() {
    const { warningOpen } = this.state

    return (
      <>
        <IdleTimer
          ref={r => this.idleTimer = r}
          timeout={IDLE_TIMEOUT - WARNING_OFFSET}
          onIdle={this.handleIdle}
          onAction={this.handleAction}
          // debounce={10000}
          // throttle={15 * (60 * 1000)}
          debounce={15 * (60 * 1000)}
          stopOnIdle={true}
        />
        <Modal open={warningOpen} closeIcon onClose={() => Router.push(`/auth/logout`)} size='tiny' style={{ width: 400 }} centered={false}>
          <Modal.Header>
            <FormattedMessage id='auth.sessionTimeout.modalHeader' defaultMessage='SESSION TIMEOUT' />
          </Modal.Header>
          <Modal.Content>
            <h4><FormattedMessage id='auth.sessionTimeout.title' defaultMessage='Your session will timeout in: ' /></h4>
            <TimeTitle>{this.getRemainingTimeString()}</TimeTitle>
            <p>
              <FormattedMessage
                id='auth.sessionTimeout.note'
                defaultMessage={`
                  If you'd like to keep working press "Keep Working" below,
                  to log out press "Log Out". By doing nothing you will automatically be
                  asked to login after this session expires.
                `}
              />
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic data-test='logout_timeout_logout_btn' color='blue' onClick={() => Router.push(`/auth/logout`)}>
              <FormattedMessage id='auth.sessionTimeout.buttonLogOut' defaultMessage='Log Out' />
            </Button>
            <Button primary data-test='logout_timeout_keep_working_btn' onClick={this.resetIdleTimer}>
              <FormattedMessage id='auth.sessionTimeout.buttonKeepWorking' defaultMessage='Keep Working'>{text => text}</FormattedMessage>
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    )
  }

}