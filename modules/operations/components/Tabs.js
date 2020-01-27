import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

import { tabChanged } from '../actions'

class Tabs extends Component {
  handleTabClick = tab => {
    let { currentTab, tabChanged } = this.props
    if (tab.type !== currentTab.type) {
      tabChanged(tab)
    }
  }

  render() {
    const { tabsNames, currentTab } = this.props
    return (
      <Menu pointing secondary vertical fluid>
        {tabsNames.map((tab, i) => (
          <Link href={`/operations?type=${tab.type}`} key={i}>
            <Menu.Item
              onClick={() => this.handleTabClick(tab)}
              name={tab.name.toUpperCase()}
              active={currentTab.type === tab.type}
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
    tabsNames: state.operations.tabsNames,
    currentTab: state.operations.currentTab
  }
}

const mapDispatchToProps = {
  tabChanged
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs))
