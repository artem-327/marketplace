import React from 'react'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'
import { Button } from 'semantic-ui-react'
import { Layers } from 'react-feather'
import { withToastManager } from 'react-toast-notifications'

import GatewayTimeoutSvg from '~/images/gateway-timeout-icon-multi.svg'
import styled from 'styled-components'

const ErrorImg = styled.img`
  width: 18vw;
`
const PageError = styled.div`
  text-align: center;
  padding-top: 8vw;
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
  padding-top: 4vw;
  text-align: -webkit-center;
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

const GatewayTimeout = () => {
  return (
    <PageError>
      <div>
        <ErrorImg src={GatewayTimeoutSvg} />
      </div>
      <Subtitle>
        <FormattedMessage id='error.gatewayTimeout.subtitle' defaultMessage='504 GATEWAY TIMEOUT' />
      </Subtitle>
      <Content>
        <FormattedMessage
          id='error.gatewayTimeout.content'
          defaultMessage='The system is currently undergoing maintenance. Please, check back soon.'
        />
      </Content>
      <ButtonDiv>
        <CustomButton type='button' onClick={() => Router.push('/inventory/my')}>
          <div>
            <Layers size={22} />
          </div>
          <ButtonContent>
            <FormattedMessage id='error.bringToInventory' defaultMessage='Bring me to My Inventory'>
              {text => text}
            </FormattedMessage>
          </ButtonContent>
        </CustomButton>
      </ButtonDiv>
    </PageError>
  )
}

export default withToastManager(GatewayTimeout)
