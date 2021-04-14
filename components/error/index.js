import { connect } from 'react-redux'
import { Component } from 'react'
import { number } from 'prop-types'

import BackgroundImage from '~/images/background.svg'
import Layout from '~/components/LayoutUnauthorized'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import Router from 'next/router'
import { FormattedMessage } from 'react-intl'
import { getSafe } from '../../utils/functions'

const PageWrapper = styled.div`
  position: relative;
  min-height: 50vh;
  color: #5b5e63;
`
const Message = styled.div`
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  text-align: center;

  h1 {
    padding: 20px;
    // background-color: #fff;
    display: inline-block;
    font-weight: lighter;
  }
`
const Background = styled.img`
  width: 100%;
`
const Footer = styled.p`
  text-align: center;
  font-size: 120%;
  margin: 40px 0 30px 0 !important;
`

class ErrorComponent extends Component {
  render() {
    return (
      <Layout>
        <PageWrapper>
          <Background src={BackgroundImage} />
          <Message>
            <h1>
              {this.props.statusCode ? (
                <FormattedMessage id='error.server' values={{ error: this.props.statusCode || 'unexpected' }} />
              ) : (
                <FormattedMessage id='error.client' />
              )}
              <br />
              <FormattedMessage id='error.apologize' />
            </h1>
            <br />
            <Button size='massive' primary onClick={() => Router.push('/auth/login')} data-test='error_back_btn'>
              <FormattedMessage id='error.backButtonText' values={{
                companyName: getSafe(() => this.props.appInfo.systemCompanyName, '')
              }}>{text => text}</FormattedMessage>
            </Button>
          </Message>
          <Footer>
            <FormattedMessage
              id='error.footer'
              values={{
                email: this.props?.appInfo?.supportEmail ? <a href={`mailto:${this.props.appInfo.supportEmail}`}>{this.props.appInfo.supportEmail}</a> : ''
              }}
            />
          </Footer>
        </PageWrapper>
      </Layout>
    )
  }
}

ErrorComponent.propTypes = {
  statusCode: number
}

ErrorComponent.defaultProps = {
  statusCode: null
}

const mapStateToProps = (state, props) => {
  return {
    appInfo: state.auth?.identity?.appInfo,
    statusCode: props?.statusCode ? props.statusCode : null
  }
}

export default connect(mapStateToProps, {})(ErrorComponent)
