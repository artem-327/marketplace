import { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import Router from 'next/router'
import { refreshToken } from '../../utils/auth'
import moment from 'moment'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import api from '../../modules/settings/api'

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
    this.checkTimeInterval = setInterval(this.checkTime, 1000)
  }

  handleAction = () => {
    refreshToken()
  }

  resetIdleTimer = async () => {
    this.setState({ loading: true })
    await refreshToken()

    this.checkTimeInterval && clearInterval(this.checkTimeInterval)
    this.setState({
      remainingTime: WARNING_OFFSET,
      warningOpen: false
    })
    this.setIdleTimeout()
    this.setState({ loading: false })
  }

  preSetIdleTimeout = (preTime) => {
    if (preTime < 2147483647) {
      this.timeoutInterval = setTimeout(this.handleIdle, preTime);
      return;
    }
    setTimeout(() => {
      this.preSetIdleTimeout((preTime - 2147483647))
    }, 2147483647);
  }
  setIdleTimeout = async () => {
    let settings = await api.getSettings('user')
    if (settings && settings.length > 1) {
      let newsettings = settings[1].settings
      let autoLogOutSettings = newsettings.filter(s => s.code === "USER_AUTO_LOGOUT_MINUTES")    
      let timeout = parseInt(autoLogOutSettings[0].value)
      let timediff = timeout * 60 * 1000 - WARNING_OFFSET
      this.setState({ timeout })
      this.preSetIdleTimeout(timediff)
    }
  }

  componentDidMount() {
    this.setIdleTimeout()
  }

  render() {
    const { warningOpen, timeout } = this.state
    if (!timeout) return null

    return (
      <>
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
            <Button data-test='logout_timeout_logout_btn' onClick={() => Router.push(`/auth/logout`)}>
              <FormattedMessage id='auth.sessionTimeout.buttonLogOut' defaultMessage='Log Out' />
            </Button>
            <Button
              loading={this.state.loading}
              primary
              data-test='logout_timeout_keep_working_btn'
              onClick={this.resetIdleTimer}>
              <FormattedMessage id='auth.sessionTimeout.buttonKeepWorking' defaultMessage='Keep Working' />
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}
