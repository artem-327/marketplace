import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import { Button } from 'semantic-ui-react'
import { Check } from 'react-feather'
import Cookies from 'universal-cookie'
import Router from 'next/router'
import { withToastManager } from 'react-toast-notifications'
import styled, { ThemeProvider } from 'styled-components'
import { updateMyProfile } from '~/modules/profile/actions'
import { tabChanged } from '~/modules/settings/actions'
import { defaultTabs } from '~/modules/settings/contants'

import { generateToastMarkup, getSafe } from '~/utils/functions'

const Rectangle = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin: ${props => props.theme.margin};
  padding: 15px 20px 15px 20px;
  display: flex;
  justify-content: space-between;
`

Rectangle.defaultProps = {
  theme: {
    margin: '15px 32px 15px 32px'
  }
}

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

const CustomSkipButton = styled(Button)`
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  color: #848893 !important;
  font-weight: 500 !important;
  letter-spacing: normal !important;
  margin-right: 10px !important;
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

const cookies = new Cookies()

export const tutorialTabs = [
  'branches',
  'users',
  'warehouses',
  'products',
  'inventory',
  'marketplace',
  'registerAccount',
  'addAccount'
]

const urlTabs = [
  '/settings?type=branches',
  '/settings?type=users',
  '/settings?type=warehouses',
  '/settings?type=products',
  '/inventory/my',
  '/settings?type=global-broadcast',
  '/settings?type=bank-accounts',
  '/settings?type=bank-accounts'
]

export const setTutorialCookies = async changeTutorialTab => {
  console.log('setTutorialCookies====================================')
  const cookies = new Cookies()
  const cookieTutorialTabs = cookies.get('tutorial')
  let leng = 0
  let tabs = [tutorialTabs[leng]]
  if (cookieTutorialTabs) {
    leng = cookieTutorialTabs.length
    tabs = [...cookieTutorialTabs, tutorialTabs[leng]]
  }
  // if (!tutorialTabs[leng]) {
  //   const requestBody = { name, tutorialCompleted: true }
  //   try {
  //     await updateMyProfile(requestBody)
  //     cookies.remove('tutorial', { path: '/' })
  //     toastManager.add(
  //       generateToastMarkup(
  //         <FormattedMessage id='tutorial.congratulation.title' defaultMessage='Congratulations!' />,
  //         <FormattedMessage
  //           id='tutorial.congratulation.content'
  //           defaultMessage='Congratulations, you have finished the setup!'
  //         />
  //       ),
  //       {
  //         appearance: 'success'
  //       }
  //     )
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  if (tabs && tabs.length) {
    console.log('tabs====================================')
    console.log(tabs)
    console.log('====================================')
    cookies.set('tutorial', tabs, { path: '/' }) // set all existing cookies + next checked tab
    await changeTutorialTab()
  }
}

class Tutorial extends Component {
  state = {
    tab: ''
  }

  componentDidMount() {
    const cookieTutorialTabs = cookies.get('tutorial')
    const tab =
      cookieTutorialTabs && cookieTutorialTabs.length ? tutorialTabs[cookieTutorialTabs.length] : tutorialTabs[0]

    if (tab !== this.state.tab) {
      this.setState({ tab })
    }
  }

  componentDidUpdate() {
    const cookieTutorialTabs = cookies.get('tutorial')
    const tab =
      cookieTutorialTabs && cookieTutorialTabs.length ? tutorialTabs[cookieTutorialTabs.length] : tutorialTabs[0]

    if (tab !== this.state.tab) {
      this.setState({ tab })
    }
  }

  goToPage = async e => {
    e.preventDefault()
    const { tabChanged } = this.props
    // array of tabsNames converted to Map
    let tabsNamesMap = new Map()
    if (defaultTabs && defaultTabs.length) {
      for (let i in defaultTabs) {
        tabsNamesMap.set(defaultTabs[i].type, defaultTabs[i])
      }
    }
    const cookieTutorialTabs = cookies.get('tutorial')
    if (cookieTutorialTabs && cookieTutorialTabs.length) {
      Router.push(urlTabs[cookieTutorialTabs.length])
      const tabType = urlTabs[cookieTutorialTabs.length].split('=')[1]
      tutorialTabs[cookieTutorialTabs.length] !== 'inventory' && tabChanged(tabsNamesMap.get(tabType))
    } else {
      Router.push(urlTabs[0])
      tabChanged(tabsNamesMap.get('branches'))
    }
  }

  getIcons = () => {
    const cookieTutorialTabs = cookies.get('tutorial')
    const arrayTabs = []
    for (let i = 0; i < tutorialTabs.length; i++) {
      if (cookieTutorialTabs && cookieTutorialTabs.length) {
        let tabObject = null
        for (let cookie of cookieTutorialTabs) {
          if (tutorialTabs[i] === cookie) {
            tabObject = { id: tutorialTabs[i], check: 2 }
          }
        }

        if (tabObject) {
          arrayTabs.push(tabObject)
        } else {
          arrayTabs.push({ id: tutorialTabs[i], check: 0 })
        }
        if (tutorialTabs[i] === cookieTutorialTabs[cookieTutorialTabs.length - 1]) {
          arrayTabs.push({ id: tutorialTabs[i + 1], check: 1 })
        }
      } else {
        if (i === 0) {
          arrayTabs.push({ id: tutorialTabs[0], check: 1 })
        } else {
          arrayTabs.push({ id: tutorialTabs[i], check: 0 })
        }
      }
    }

    if (!arrayTabs) return
    return (
      <Icons>
        {arrayTabs &&
          arrayTabs.length &&
          arrayTabs.map(tab => {
            if (!tab) return
            if (tab.check === 2) {
              return (
                <OvalCheck>
                  <CustomCheck strokeWidth={4} />
                </OvalCheck>
              )
            } else if (tab.check === 1) {
              return <OvalFocus />
            } else if (tab.check === 0) {
              return <OvalEmpty />
            }
          })}
      </Icons>
    )
  }

  render() {
    const { marginMarketplace, marginHolds } = this.props
    const { tab } = this.state

    let margin = '15px 32px 15px 32px'
    if (marginMarketplace) margin = '10px 0'
    if (marginHolds) margin = '0 0 14px 0'

    const theme = {
      margin
    }
    return (
      <>
        {tab ? (
          <ThemeProvider theme={theme}>
            <Rectangle>
              <div>
                <Title>
                  <FormattedMessage id={`tutorial.${tab}.title`} defaultMessage={'Title'}>
                    {text => text}
                  </FormattedMessage>
                </Title>
                <Content>
                  <FormattedMessage id={`tutorial.${tab}.content`} defaultMessage={'Content'}>
                    {text => text}
                  </FormattedMessage>
                </Content>

                {/* <CustomSkipButton type='button' onClick={e => this.handleSetCookies(e, true)}>
                  <FormattedMessage id='"global.skip"' defaultMessage='Skip' />
                </CustomSkipButton> */}
                <CustomButton type='button' onClick={e => this.goToPage(e)}>
                  <FormattedMessage id={`tutorial.${tab}.button`} defaultMessage='Button' />
                </CustomButton>
              </div>
              {this.getIcons()}
            </Rectangle>
          </ThemeProvider>
        ) : null}
      </>
    )
  }
}

const mapDispatchToProps = {
  updateMyProfile,
  tabChanged
}

const mapStateToProps = state => {
  return {
    name: getSafe(() => state.auth.identity.name, ''),
    isChangedTutorial: getSafe(() => state.tutorial.isChangedTutorial, '')
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withToastManager(Tutorial)))
