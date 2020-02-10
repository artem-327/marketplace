import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Dropdown } from 'semantic-ui-react'

import { handleActiveTab } from '../actions'

function Tabs(props) {
  const {
    tabsNames,
    handleActiveTab,
    currentTab,
    intl: { formatMessage }
  } = props

  return (
    <Dropdown.Menu data-test='navigation_menu_admin_drpdn'>
      {tabsNames.map((tab, i) => (
        <Dropdown.Item
          key={tab.id}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            handleActiveTab(tab)
          }}
          active={currentTab.name === tab.name}
          data-test={`tabs_menu_item_${tab.id}`}
          tab={tab.id}>
          {formatMessage({ id: `navigation.${tab.name}`, defaultMessage: `${tab.name}` })}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  )
}

const mapStateToProps = state => {
  return {
    tabsNames: state.admin.tabsNames,
    currentTab: state.admin.currentTab,
    editPopupBoolean: state.admin.editPopupBoolean,
    addNewPopup: state.admin.addNewPopup
  }
}

const mapDispatchToProps = {
  handleActiveTab
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Tabs))
