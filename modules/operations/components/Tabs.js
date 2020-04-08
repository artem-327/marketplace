import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Menu, Dropdown } from 'semantic-ui-react'
import Link from 'next/link'

import { handleActiveTab } from '../actions'
import PerfectScrollbar from 'react-perfect-scrollbar'

const MenuLink = ({ active, children, onClick, className, dataTest }) => {
  return (
    <Menu.Item as='a' active={active} data-test={dataTest} onClick={onClick} className={className}>
      {children}
    </Menu.Item>
  )
}

function TabsOperations(props) {
  const {
    tabsNames,
    handleActiveTab,
    currentTab,
    intl: { formatMessage }
  } = props

  return (
    <Dropdown.Menu data-test='navigation_menu_operations_drpdn'>
      <PerfectScrollbar>
        {tabsNames.map((tab, i) => (
          <Dropdown.Item
            as={MenuLink}
            key={tab.id}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              handleActiveTab(tab)
            }}
            active={currentTab.name === tab.name}
            dataTest={`tabs_menu_item_${tab.name.toLowerCase()}`}
            tab={tab.id}>
            {formatMessage({ id: `navigation.${tab.name}`, defaultMessage: `${tab.name}` })}
          </Dropdown.Item>
        ))}
      </PerfectScrollbar>
    </Dropdown.Menu>
  )
}

const mapStateToProps = state => {
  return {
    tabsNames: state.operations.tabsNames,
    currentTab: state.operations.currentTab
  }
}

const mapDispatchToProps = {
  handleActiveTab
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TabsOperations))
