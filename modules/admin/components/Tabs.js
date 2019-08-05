import React from 'react'
import { connect } from 'react-redux'
import { handleActiveTab } from "../actions"
import { Menu } from 'semantic-ui-react'


function Tabs(props) {
  const { tabsNames, handleActiveTab, currentTab } = props

  return (
    <Menu pointing secondary vertical fluid>
      {tabsNames.map((tab, i) => (
        <Menu.Item
          name={tab.name.toUpperCase()}
          key={tab.id}
          onClick={() => handleActiveTab(tab.name)}
          active={currentTab === tab.name}
          data-test={`tabs_menu_item_${tab.id}`}
        />
      ))}
    </Menu>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)