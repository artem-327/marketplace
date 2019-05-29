import React from 'react'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

function Tabs(props) {
  const { tabsNames, currentTab, router } = props

  return (
    <Menu pointing secondary vertical fluid>
      {tabsNames.map((tab, i) => (
        <Link href={`/settings?type=${tab.type}`} key={i}>
          <Menu.Item
            name={tab.name.toUpperCase()}
            active={currentTab.type === tab.type}
          />
        </Link>
      ))}
    </Menu>
  )
}


const mapStateToProps = state => {
  return {
    tabsNames: state.settings.tabsNames,
    editPopupBoolean: state.settings.editPopupBoolean,
    addNewWarehousePopup: state.settings.addNewWarehousePopup,
  }
}

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tabs))
