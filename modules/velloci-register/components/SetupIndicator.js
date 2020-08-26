import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { setupPages } from '../constants'

const Rectangle = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin: 32px;
  padding: 15px 20px 15px 20px;
  display: flex;
  justify-content: space-between;
  height: 80px;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #20273a;
  margin-bottom: 3px;
`

const Content = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #848893;
  margin-bottom: 17px;
`

const OvalEmpty = styled.div`
  width: 18px;
  height: 18px;
  border: solid 2px #dee2e6;
  background-color: #f8f9fb;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  border-radius: 9px;
  margin-left: 10px;
`

const OvalFocus = styled.div`
  width: 18px;
  height: 18px;
  border: solid 2px #2599d5;
  background-color: #2599d5;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  border-radius: 9px;
  box-shadow: inset 0 0 0 2px #f8f9fb;
  margin-left: 10px;
`

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

class SetupIndicator extends Component {
  getIcons = () => {
    const { activeStep } = this.props

    return (
      <Icons>
        {setupPages.map((_, index) => {
          if (index <= activeStep) {
            return <OvalFocus />
          } else {
            return <OvalEmpty />
          }
        })}
      </Icons>
    )
  }

  render() {
    const { activeStep = 0 } = this.props
    if (!setupPages.length) return
    else {
      return (
        <Rectangle>
          <div>
            <Title>
              <FormattedMessage
                id={setupPages ? setupPages[activeStep].title : 'global.title'}
                defaultMessage={'Title'}>
                {text => text}
              </FormattedMessage>
            </Title>
            <Content>
              <FormattedMessage id={setupPages[activeStep].content} defaultMessage={'Content'}>
                {text => text}
              </FormattedMessage>
            </Content>
          </div>
          {this.getIcons()}
        </Rectangle>
      )
    }
  }
}

export default SetupIndicator
