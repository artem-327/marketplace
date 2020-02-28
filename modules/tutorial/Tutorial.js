import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Button } from 'semantic-ui-react'
import { Check } from 'react-feather'
import Cookies from 'universal-cookie'

const Rectangle = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin: 15px 32px 15px 32px;
  padding: 15px 20px 15px 20px;
  display: flex;
  justify-content: space-between;
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

const CustomButton = styled(Button)`
  border: solid 1px #2599d5 !important;
  background-color: #ddf1fc !important;
  color: #2599d5 !important;
  font-weight: 500 !important;
  letter-spacing: normal !important;
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

const OvalCheck = styled.div`
  display: flex;
  align-items: center;
  width: 18px;
  height: 18px;
  border: solid 2px #2599d5;
  background-color: #2599d5;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  border-radius: 9px;
  margin-left: 10px;
`

const CustomCheck = styled(Check)`
  color: white;
`

const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
//TODO adjust to class
export const Tutorial = () => {
  const cookies = new Cookies()

  const cookieTutorialTabs = cookies.get('tutorial')

  const tutorialTabs = [
    {
      branches: {
        titleId: 'tutorial.branches.title',
        contentId: 'tutorial.branches.content',
        buttonId: 'tutorial.branches.button',
        url: '/settings?type=branches'
      }
    },
    {
      users: {
        titleId: 'tutorial.users.title',
        contentId: 'tutorial.users.content',
        buttonId: 'tutorial.users.button',
        url: '/settings?type=users'
      }
    }
  ]

  const getTutorialTab = () => {
    if (cookieTutorialTabs && cookieTutorialTabs.length) {
      cookieTutorialTabs.forEach(cookie => {
        return tutorialTabs.find(tab => !tab[cookie])
      })
    }
  }

  const tutorialTab = getTutorialTab()

  const handleClick = e => {
    e.preventDefault()
    console.log('tutorialTab====================================')
    console.log(tutorialTab)
    console.log('====================================')
    console.log('cookieTutorialTabs====================================')
    console.log(cookieTutorialTabs)
    console.log('====================================')
    //Router.push()
    //cookies.set('tutorial', [...cookieTutorialTabs, tutorialTab])
  }

  return (
    <Rectangle>
      <div>
        <Title>
          <FormattedMessage id={`tutorial.${tutorialTab}.title`} defaultMessage={'Title'}>
            {text => text}
          </FormattedMessage>
        </Title>
        <Content>
          <FormattedMessage id={`tutorial.${tutorialTab}.content`} defaultMessage={'Content'}>
            {text => text}
          </FormattedMessage>
        </Content>

        <Button basic type='button' onClick={() => cookies.set('tutorial', [...cookieTutorialTabs, tutorialTab])}>
          <FormattedMessage id='"global.skip"' defaultMessage='Skip' />
        </Button>
        <CustomButton type='button' onClick={e => handleClick(e)}>
          <FormattedMessage id={`tutorial.${tutorialTab}.button`} defaultMessage='Button' />
        </CustomButton>
      </div>
      <Icons>
        <OvalCheck>
          <CustomCheck strokeWidth={4} />
        </OvalCheck>
        <OvalFocus />
        <OvalEmpty />
        <OvalEmpty />
        <OvalEmpty />
        <OvalEmpty />
        <OvalEmpty />
        <OvalEmpty />
      </Icons>
    </Rectangle>
  )
}
