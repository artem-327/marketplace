import React, { Component } from "react"
import { connect } from "react-redux"
import { config } from '../config'

import { Header, Menu, Button, Input, Dropdown } from 'semantic-ui-react'

import { openPopup, handleFiltersValue } from '../actions'
import unitedStates from '../../../components/unitedStates'

class TablesHandlers extends Component {
  state = {
    filterFieldCurrentValue: 'None'
  }

  handleChangeSelectField = (event, value) => {
    this.setState({
      filterFieldCurrentValue: value
    })
  }

  handleChangeFieldsCurrentValue = fieldStateName => event => {
    this.setState({
      [fieldStateName]: event.target.value
    })
  }

  render() {
    const {
      handleFiltersValue,
      currentTab,
      openPopup,
    } = this.props

    const {
      filterFieldCurrentValue
    } = this.state


    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as='h1' size='medium'>{currentTab}</Header>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input style={{ width: 340 }} size="large" icon='search' placeholder={config[currentTab].searchText}
              onChange={e => handleFiltersValue(this.props, e.target.value)} />
          </Menu.Item>
          <Menu.Item>
            <Button size="large" primary onClick={() => openPopup()}>
              Add {config[currentTab].addEditText}
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.admin.currentTab,
    casListDataRequest: state.admin.casListDataRequest
  }
}

const mapDispatchToProps = {
  openPopup,
  handleFiltersValue
}

export default connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)