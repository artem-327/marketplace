import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import { Button, Image } from 'semantic-ui-react'
import { Layers } from 'react-feather'

import { ERROR_STATUSES } from '../constants'

import GatewayTimeoutSvg from '~/images/gateway-timeout-icon-multi.svg'
import ForbiddenSvg from '~/images/forbidden-icon-multi.svg'
import NotFoundSvg from '~/images/not-found-icon-multi.svg'
import Logo from '~/assets/images/nav/logo-echosystem.png'

import styled from 'styled-components'

const ErrorImg = styled.img`
  width: 18vw;
`
const PageError = styled.div`
  height: 100vw;
  text-align: center;
  background: #f8f9fb !important;
`

const Header = styled.div`
  height: 6vw;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  background-color: #ffffff;
`

const DivImage = styled.div`
  padding-top: 1.3vw;
  padding-left: 3vw;
`

const LogoImage = styled(Image)`
  width: 177px;
`

const DivIconError = styled.div`
  padding-top: 10vw;
`

const Subtitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #1b3454;
  padding-top: 3vw;
`

const Content = styled.div`
  font-size: 18px;
  text-align: center;
  color: #848893;
  padding-top: 2vw;
`

const ButtonDiv = styled.div`
  padding-top: 8vw;
  display: flex;
  justify-content: center;
`

const CustomButton = styled(Button)`
  display: flex !important;
  align-items: center !important;
  background-color: #2599d5 !important;
  color: #ffffff !important;
`

const ButtonContent = styled.div`
  padding-left: 1vw;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
`

class ErrorPage extends Component {
  state = {
    errorSvg: '',
    errorType: '',
    errorStatus: ''
  }

  componentDidMount() {
    let errorSvg = GatewayTimeoutSvg //504
    let errorType = 'gatewayTimeout' //504
    const errorStatus = typeof window !== 'undefined' ? window.localStorage.getItem('errorStatus') : null

    switch (errorStatus) {
      case ERROR_STATUSES.INTERNATL_SERVER_ERROR: //500
        errorSvg = NotFoundSvg
        errorType = 'serverError'
        break
      case ERROR_STATUSES.FORBIDDEN: //403
        errorSvg = ForbiddenSvg
        errorType = 'forbidden'
        break
      case ERROR_STATUSES.NOT_FOUND: //404
        errorSvg = NotFoundSvg
        errorType = 'notFound'
        break
      default:
        break
    }
    this.setState({ errorSvg, errorType, errorStatus })
  }

  componentWillUnmount() {
    window.localStorage.removeItem('errorStatus')
  }

  render() {
    const { errorSvg, errorType, errorStatus } = this.state
    const isUnathorized = errorStatus === ERROR_STATUSES.INTERNATL_SERVER_ERROR

    return (
      <PageError>
        <DivIconError>
          <ErrorImg src={errorSvg} />
        </DivIconError>
        <Subtitle>
          <FormattedMessage id={`error.${errorType}.title`} defaultMessage='ERROR' />
        </Subtitle>
        <Content>
          <FormattedMessage
            id={`error.${errorType}.content`}
            defaultMessage='The system is currently undergoing maintenance. Please, check back soon.'
          />
        </Content>
        <ButtonDiv>
          <CustomButton
            type='button'
            onClick={() => (isUnathorized ? Router.push('/auth/logout?auto=true') : Router.back())}>
            <div>
              <Layers size={22} />
            </div>
            <ButtonContent>
              <FormattedMessage
                id={isUnathorized ? 'error.logout' : 'error.bringMeBack'}
                defaultMessage='Bring me back to last page'>
                {text => text}
              </FormattedMessage>
            </ButtonContent>
          </CustomButton>
        </ButtonDiv>
      </PageError>
    )
  }
}

export default ErrorPage
