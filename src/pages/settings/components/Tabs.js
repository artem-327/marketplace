import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { handleActiveTab } from '../actions'

import {Menu} from 'semantic-ui-react'

function Tabs(props) {
  const { tabsNames, handleActiveTab, currentTab } = props
  
  return (					
    <Menu pointing secondary vertical fluid>
      {tabsNames.map((tab,i) => (
        <Menu.Item 
          name={tab.name.toUpperCase()}
          key={tab.id}
          onClick={() => handleActiveTab(tab.name)}
          active={currentTab === tab.name}
        />
      ))}      
    </Menu>
  )
}


const mapStateToProps = state => {
  return {
    tabsNames: state.settings.tabsNames,
    currentTab: state.settings.currentTab,
    editPopupBoolean: state.settings.editPopupBoolean,
    addNewWarehousePopup: state.settings.addNewWarehousePopup
  }
}

const mapDispatchToProps = {   
  handleActiveTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
