import { Component } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import Router from 'next/router'
import IdleTimer from 'react-idle-timer'
import { refreshToken } from '~/utils/auth'
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
    remainingTime: WARNING_OFFSET,
    timeout: null,
    loading: false
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
      warningOpen: true
    }))

    if (this.state.remainingTime < 1) {
      clearInterval(this.checkTimeInterval)
      Router.push(`/auth/logout?auto=true`)
    }
  }

  handleIdle = () => {
    console.log('handleIdle')
    this.checkTimeInterval = setInterval(this.checkTime, 1000)
  }

  handleAction = () => {
    refreshToken()
  }

  resetIdleTimer = async () => {
    this.setState({ loading: true })
    await refreshToken()

    clearInterval(this.checkTimeInterval)
    this.setState({
      remainingTime: WARNING_OFFSET,
      warningOpen: false
    })
    this.setIdleTimeout()
    this.idleTimer && this.idleTimer.reset()

    this.setState({ loading: false })
  }

  setIdleTimeout = () => {
    let ttl = window.localStorage.getItem('ttl')
    let date = new Date(parseInt(ttl, 10))

    this.setState({ timeout: moment(date).diff(moment()) })
  }

  componentDidMount() {
    this.setIdleTimeout()
  }

  render() {
    const { warningOpen, timeout } = this.state

    if (!timeout) return null

    return (
      <>
        <IdleTimer
          ref={r => (this.idleTimer = r)}
          timeout={timeout - WARNING_OFFSET}
          onIdle={this.handleIdle}
          // onAction={this.handleAction}
          // debounce={10000}
          // throttle={(10 * 1000)}
          // debounce={(1000)}
          stopOnIdle={true}
        />
        <Modal
          open={warningOpen}
          closeIcon
          onClose={this.resetIdleTimer}
          size='tiny'
          style={{ width: 400 }}
          centered={false}>
          <Modal.Header>
            <FormattedMessage id='auth.sessionTimeout.modalHeader' defaultMessage='SESSION TIMEOUT' />
          </Modal.Header>
          <Modal.Content>
            <h4>
              <FormattedMessage id='auth.sessionTimeout.title' defaultMessage='Your session will timeout in: ' />
            </h4>
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
            <Button
              basic
              data-test='logout_timeout_logout_btn'
              color='blue'
              onClick={() => Router.push(`/auth/logout`)}>
              <FormattedMessage id='auth.sessionTimeout.buttonLogOut' defaultMessage='Log Out' />
            </Button>
            <Button
              loading={this.state.loading}
              primary
              data-test='logout_timeout_keep_working_btn'
              onClick={this.resetIdleTimer}>
              <FormattedMessage id='auth.sessionTimeout.buttonKeepWorking' defaultMessage='Keep Working'>
                {text => text}
              </FormattedMessage>
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}
