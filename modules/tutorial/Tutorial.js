import { Component } from 'react'
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
import { tabChanged, handleLocationsTab } from '~/modules/settings/actions'
import { defaultTabs } from '~/modules/settings/contants'
import get from 'lodash/get'

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

const DivEstimated = styled.div`
  color: #848893;
  font-size: 12px;
`

const CustomBeginNowButton = styled(Button)`
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  color: #20273a !important;
  letter-spacing: normal !important;
  margin-right: 15px !important;
  font-weight: bold !important;
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

const DivBottomBusinessVerification = styled.div`
  display: flex;
  align-items: center;
`

const cookies = new Cookies()

let tutorialTabs = [
  'locations',
  'users',
  'pickup',
  'products',
  'inventory',
  'marketplace',
  'registerAccount',
  'addAccount'
]

let urlTabs = [
  '/settings/locations',
  '/settings/users',
  '/settings/locations',
  '/inventory/my-products',
  '/inventory/my-listings',
  '/settings/global-broadcast',
  '/settings/bank-accounts',
  '/settings/bank-accounts'
]

class Tutorial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tutorialTab: '',
      isLoading: true
    }
  }

  componentDidMount() {
    const { tutorialTab } = this.state
    const { isCompanyAdmin, isProductCatalogAdmin, isProductOfferManager, isAdmin } = this.props
    if (!isCompanyAdmin) {
      let tutorials = []
      let urls = []
      if (isProductCatalogAdmin) {
        tutorials.push('products')
        urls.push('/inventory/my-products')
      }
      if (isProductOfferManager) {
        tutorials.push('inventory', 'marketplace')
        urls.push('/inventory/my-listings', '/settings/global-broadcast')
      }
      tutorialTabs = [...new Set(tutorials)]
      urlTabs = [...new Set(urls)]
    }

    if (!tutorialTab) {
      this.setState({ tutorialTab: this.getNextTab(), isLoading: false })
    }
  }

  getNextTab = () => {
    const cookieTutorialTabs = cookies.get('tutorial')
    let nextTab = tutorialTabs[0] // 'locations'
    if (cookieTutorialTabs && cookieTutorialTabs.length) {
      nextTab = tutorialTabs[cookieTutorialTabs.length]
    }
    return nextTab
  }

  handleSetCookies = async (e, skip) => {
    e.preventDefault()
    const { toastManager, updateMyProfile, name, tabChanged, handleLocationsTab } = this.props
    // array of tabsNames converted to Map
    let tabsNamesMap = new Map()
    if (defaultTabs && defaultTabs.length) {
      for (let i in defaultTabs) {
        tabsNamesMap.set(defaultTabs[i].type, defaultTabs[i])
      }
    }

    const cookieTutorialTabs = cookies.get('tutorial')

    const isSettings = getSafe(() => Router.router.pathname.includes('settings'), false)

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
        if (tutorialTabs[cookieTutorialTabs.length] === 'pickup') {
          handleLocationsTab('pick-up-locations')
        }
        const tabType = urlTabs[cookieTutorialTabs.length].split('=')[1]

        !skip && isSettings && tabType && tabChanged(tabsNamesMap.get(tabType))
        !skip && Router.push(urlTabs[cookieTutorialTabs.length])

        cookies.set('tutorial', [...cookieTutorialTabs, this.getNextTab()], { path: '/' }) // set all existing cookies + next checked tab
        this.setState({ tutorialTab: tutorialTabs[cookieTutorialTabs.length + 1] }) // set another tutorial tab for show correct content and icons in tab
      }
    } else {
      cookies.set('tutorial', [this.getNextTab()], { path: '/' }) // set first checked tab 'locations'
      this.setState({ tutorialTab: tutorialTabs[1] }) // set second tutorial tab after checked first tab
      !skip && isSettings && (await tabChanged(tabsNamesMap.get(tutorialTabs[0])))
      !skip && (await Router.push(urlTabs[0]))
      if (tutorialTabs[0] === 'locations') {
        !skip && (await handleLocationsTab('branches'))
      }
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
    const { tutorialTab, isLoading } = this.state
    const {
      marginMarketplace,
      marginHolds,
      marginOrders,
      marginWantedBoard,
      isMerchant,
      isOrderProcessing,
      isAdmin,
      isCompanyAdmin,
      isBusinessVerification,
      isTutorial,
      vellociBusinessId,
      marginGlobalPrice,
      systemCompanyName
    } = this.props

    let margin = '15px 32px 15px 32px'
    if (marginMarketplace) margin = '10px 0'
    if (marginHolds) margin = '0 0 14px 0'
    if (marginOrders) margin = '20px 32px 0 32px'
    if (marginWantedBoard) margin = '15px 0 15px 0'
    if (marginGlobalPrice) margin = '0px 32px 15px 32px'

    const theme = {
      margin
    }

    if (!(isCompanyAdmin || tutorialTab) || isLoading) {
      return null
    } else if (!isLoading && tutorialTab && !isBusinessVerification && isTutorial) {
      return (
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
      )
    } else if (!isLoading && !isAdmin && !vellociBusinessId && isBusinessVerification && !isTutorial) {
      return (
        <ThemeProvider theme={theme}>
          <Rectangle>
            <div>
              <Title>
                <FormattedMessage id='tutorial.businessVerification.title' defaultMessage='Business Verification'>
                  {text => text}
                </FormattedMessage>
              </Title>
              <Content>
                <FormattedMessage
                  id='tutorial.businessVerification.content'
                  defaultMessage='{companyName} is a secure marketplace where each participant is vetted and approved prior to being activated. Since the system can facilitate transactions over $6,000, {companyName} must comply with the anti-money laundering provisions outlined in the US Patriot Act. For these reasons, each participant company must pass our business verification requirements.'
                  values={{
                    companyName: systemCompanyName
                  }}
                >
                  {text => text}
                </FormattedMessage>
              </Content>
              <DivBottomBusinessVerification>
                <CustomBeginNowButton type='button' onClick={e => Router.push('/onboarding')}>
                  <FormattedMessage id='tutorial.businessVerification.beginNow' defaultMessage='Begin now' />
                </CustomBeginNowButton>
                <DivEstimated>
                  <FormattedMessage
                    id={'tutorial.businessVerification.estimated'}
                    defaultMessage='Estimated time ~ 10 minutes'
                  />
                </DivEstimated>
              </DivBottomBusinessVerification>
            </div>
          </Rectangle>
        </ThemeProvider>
      )
    } else {
      return null
    }
  }
}

const mapDispatchToProps = {
  updateMyProfile,
  tabChanged,
  handleLocationsTab
}

const mapStateToProps = state => {
  const company = get(state, 'auth.identity.company', null)

  return {
    systemCompanyName: state?.auth?.identity?.appInfo?.systemCompanyName,
    vellociBusinessId: getSafe(() => company.vellociBusinessId, false),
    name: getSafe(() => state.auth.identity.name, ''),
    isMerchant: getSafe(() => state.auth.identity.isMerchant, false),
    isOrderProcessing: getSafe(() => state.auth.identity.isOrderProcessing, false),
    isProductCatalogAdmin: getSafe(() => state.auth.identity.isProductCatalogAdmin, false),
    isProductOfferManager: getSafe(() => state.auth.identity.isProductOfferManager, false),
    isAdmin: getSafe(() => state.auth.identity.isAdmin, false),
    isCompanyAdmin: getSafe(() => state.auth.identity.isCompanyAdmin, false)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withToastManager(Tutorial)))
