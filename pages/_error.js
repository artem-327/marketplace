import React from 'react'
import BackgroundImage from '~/images/background.svg'
import Layout from '~/components/LayoutUnauthorized'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import Router from 'next/router'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <Layout>
        <PageWrapper>
          <Background src={BackgroundImage} />
          <Message>
            <h1>
              {this.props.statusCode
                ? `An ${this.props.statusCode || 'unexpected'} error occurred.`
                : 'An error occurred on client.'}<br />
              We apologize for inconvinience.
            </h1><br />
            <Button size="massive" primary onClick={() => Router.push('/')}>Back to Echo Exchange</Button>
          </Message>
        </PageWrapper>
      </Layout>
    )
  }
}

const PageWrapper = styled.div`
  position: relative;
  min-height: 50vh;
  color: #5B5E63;
`
const Message = styled.div`
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  text-align: center;

  h1 {
    padding: 20px;
    background-color: #FFF;
    display: inline-block;
    font-weight: lighter;
  }
`
const Background = styled.img`
  width: 100%;
`