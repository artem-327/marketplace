import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

import { tabChanged } from '../actions'
import { getSafe } from '~/utils/functions'

class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsNames: []
    }
  }

  componentDidMount() {
    const { isProductCatalogAdmin, isUserAdmin, tabsNames, isCompanyAdmin } = this.props

    let newTabs
    // array of tabsNames converted to Map
    let tabsNamesMap = new Map()
    for (let i in tabsNames) {
      tabsNamesMap.set(tabsNames[i].type, tabsNames[i])
    }
    // added tabs based on role of user
    if (isCompanyAdmin) {
      newTabs = tabsNames
    } else if (isProductCatalogAdmin && !isUserAdmin) {
      newTabs = [tabsNamesMap.get('products')]
    } else if (isUserAdmin && !isProductCatalogAdmin) {
      newTabs = [tabsNamesMap.get('users')]
    } else if (isProductCatalogAdmin && isUserAdmin) {
      newTabs = [tabsNamesMap.get('products'), tabsNamesMap.get('users')]
    } else {
      newTabs = tabsNames
    }

    this.setState({ tabsNames: newTabs })
  }

  handleTabClick = tab => {
    let { currentTab, tabChanged } = this.props
    if (tab.type !== currentTab.type) {
      tabChanged(tab)
    }
  }

  render() {
    const { tabsNames } = this.state
    const { currentTab } = this.props

    return (
      <Menu pointing secondary vertical fluid>
        {tabsNames &&
          tabsNames.map((tab, i) => (
            <Link href={`/settings?type=${tab.type}`} key={i}>
              <Menu.Item
                onClick={() => this.handleTabClick(tab)}
                name={tab.name.toUpperCase()}
                active={currentTab && currentTab.type === tab.type}
                data-test='tabs_tab_click'
              />
            </Link>
          ))}
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    tabsNames: state.settings.tabsNames,
    editPopupBoolean: state.settings.editPopupBoolean,
    addNewWarehousePopup: state.settings.addNewWarehousePopup,
    currentTab: state.settings.currentTab,
    isProductCatalogAdmin: getSafe(() => state.auth.identity.isProductCatalogAdmin, false),
    isUserAdmin: getSafe(() => state.auth.identity.isUserAdmin, false),
    isCompanyAdmin: getSafe(() => state.auth.identity.isCompanyAdmin, false)
  }
}

const mapDispatchToProps = {
  tabChanged
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs))
