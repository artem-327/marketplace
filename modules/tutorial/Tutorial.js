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

let tutorialTabs = [
  'branches',
  'users',
  'warehouses',
  'products',
  'inventory',
  'marketplace',
  'registerAccount',
  'addAccount'
]

let urlTabs = [
  '/settings?type=branches',
  '/settings?type=users',
  '/settings?type=warehouses',
  '/settings?type=products',
  '/inventory/my',
  '/settings?type=global-broadcast',
  '/settings?type=bank-accounts',
  '/settings?type=bank-accounts'
]

class Tutorial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tutorialTab: ''
    }
  }

  componentDidMount() {
    const { tutorialTab } = this.state
    const { isCompanyAdmin, isClientCompanyAdmin, isProductCatalogAdmin, isProductOfferManager } = this.props
    if (!isCompanyAdmin) {
      let tutorials = []
      let urls = []
      if (isClientCompanyAdmin) {
        tutorials.push('branches', 'users', 'warehouses', 'marketplace', 'registerAccount', 'addAccount')
        urls.push(
          '/settings?type=branches',
          '/settings?type=users',
          '/settings?type=warehouses',
          '/settings?type=global-broadcast',
          '/settings?type=bank-accounts',
          '/settings?type=bank-accounts'
        )
      }
      if (isProductCatalogAdmin) {
        tutorials.push('products')
        urls.push('/settings?type=products')
      }
      if (isProductOfferManager) {
        tutorials.push('inventory', 'marketplace')
        urls.push('/inventory/my', '/settings?type=global-broadcast')
      }
      tutorialTabs = [...new Set(tutorials)]
      urlTabs = [...new Set(urls)]
    }

    if (!tutorialTab) {
      this.setState({ tutorialTab: this.getNextTab() })
    }
  }

  getNextTab = () => {
    const cookieTutorialTabs = cookies.get('tutorial')
    let nextTab = tutorialTabs[0] // 'branches'
    if (cookieTutorialTabs && cookieTutorialTabs.length) {
      nextTab = tutorialTabs[cookieTutorialTabs.length]
    }
    return nextTab
  }

  handleSetCookies = async (e, skip) => {
    e.preventDefault()
    const { toastManager, updateMyProfile, name, tabChanged } = this.props
    // array of tabsNames converted to Map
    let tabsNamesMap = new Map()
    if (defaultTabs && defaultTabs.length) {
      for (let i in defaultTabs) {
        tabsNamesMap.set(defaultTabs[i].type, defaultTabs[i])
      }
    }

    const cookieTutorialTabs = cookies.get('tutorial')

    if (cookieTutorialTabs && cookieTutorialTabs.length) {
      // if completed all tutorial tabs (index is more than 7)
      if (!tutorialTabs[cookieTutorialTabs.length + 1]) {
        const requestBody = { name, tutorialCompleted: true }
        try {
          await updateMyProfile(requestBody)
          cookies.remove('tutorial', { path: '/' })
          toastManager.add(
            generateToastMarkup(
              <FormattedMessage id='tutorial.congratulation.title' defaultMessage='Congratulations!' />,
              <FormattedMessage
                id='tutorial.congratulation.content'
                defaultMessage='Congratulations, you have finished the setup!'
              />
            ),
            {
              appearance: 'success'
            }
          )
        } catch (error) {
          console.error(error)
        }
      } else {
        !skip && Router.push(urlTabs[cookieTutorialTabs.length])
        const tabType = urlTabs[cookieTutorialTabs.length].split('=')[1]
        !skip && tutorialTabs[cookieTutorialTabs.length] !== 'inventory' && tabChanged(tabsNamesMap.get(tabType))

        cookies.set('tutorial', [...cookieTutorialTabs, this.getNextTab()], { path: '/' }) // set all existing cookies + next checked tab
        this.setState({ tutorialTab: tutorialTabs[cookieTutorialTabs.length + 1] }) // set another tutorial tab for show correct content and icons in tab
      }
    } else {
      !skip && Router.push(urlTabs[0])
      !skip && tabChanged(tabsNamesMap.get(tutorialTabs[0]))
      cookies.set('tutorial', [this.getNextTab()], { path: '/' }) // set first checked tab 'branches'
      this.setState({ tutorialTab: tutorialTabs[1] }) // set second tutorial tab after checked first tab
    }
  }

  getIcons = () => {
    const cookieTutorialTabs = cookies.get('tutorial')
    const arrayTabs = []

    for (let tab of tutorialTabs) {
      if (cookieTutorialTabs && cookieTutorialTabs.length) {
        let tabObject = null
        for (let cookie of cookieTutorialTabs) {
          if (tab === cookie) {
            tabObject = { id: tab, check: 2 }
          } else if (tab === this.state.tutorialTab) {
            tabObject = { id: tab, check: 1 }
          }
        }
        if (tabObject) {
          arrayTabs.push(tabObject)
        } else {
          arrayTabs.push({ id: tab, check: 0 })
        }
      } else {
        if (tab === this.state.tutorialTab) {
          arrayTabs.push({ id: tab, check: 1 })
        } else {
          arrayTabs.push({ id: tab, check: 0 })
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
    const { tutorialTab } = this.state
    const {
      marginMarketplace,
      marginHolds,
      marginOrders,
      marginWantedBoard,
      isMerchant,
      isClientCompanyManager,
      isOrderProcessing
    } = this.props

    let margin = '15px 32px 15px 32px'
    if (marginMarketplace) margin = '10px 0'
    if (marginHolds) margin = '0 0 14px 0'
    if (marginOrders) margin = '20px 32px 0 32px'
    if (marginWantedBoard) margin = '15px 0 15px 0'

    const theme = {
      margin
    }
    return isMerchant || isClientCompanyManager || isOrderProcessing ? null : (
      <>
        {tutorialTab ? (
          <ThemeProvider theme={theme}>
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

                <CustomSkipButton type='button' onClick={e => this.handleSetCookies(e, true)}>
                  <FormattedMessage id='"global.skip"' defaultMessage='Skip' />
                </CustomSkipButton>
                <CustomButton type='button' onClick={e => this.handleSetCookies(e, false)}>
                  <FormattedMessage id={`tutorial.${tutorialTab}.button`} defaultMessage='Button' />
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
    isClientCompanyAdmin: getSafe(() => state.auth.identity.isClientCompanyAdmin, false),
    isMerchant: getSafe(() => state.auth.identity.isMerchant, false),
    isClientCompanyManager: getSafe(() => state.auth.identity.isClientCompanyManager, false),
    isOrderProcessing: getSafe(() => state.auth.identity.isOrderProcessing, false),
    isProductCatalogAdmin: getSafe(() => state.auth.identity.isProductCatalogAdmin, false),
    isProductOfferManager: getSafe(() => state.auth.identity.isProductOfferManager, false),
    isCompanyAdmin: getSafe(() => state.auth.identity.isCompanyAdmin, false)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withToastManager(Tutorial)))
