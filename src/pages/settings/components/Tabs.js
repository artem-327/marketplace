import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Router from 'next/router'

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
          onClick={() => Router.push('/settings/'+tab.type)/*handleActiveTab(tab)*/}
          active={currentTab.type === tab.type}
        />
      ))}      
    </Menu>
  )
}


const mapStateToProps = state => {
  return {
    tabsNames: state.settings.tabsNames,
    editPopupBoolean: state.settings.editPopupBoolean,
    addNewWarehousePopup: state.settings.addNewWarehousePopup,
    currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0]
  }
}

const mapDispatchToProps = {   
  handleActiveTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
