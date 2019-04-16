import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import { Header, Menu, Button, Input, Dropdown } from 'semantic-ui-react'

import { openPopup, handleFiltersValue } from '../actions'
import unitedStates from '../../../components/unitedStates'

const textsTable = {
  Users: {
    BtnAddText: 'Add User',
    SearchText: 'Search user by name, title or branch ...'
  },
  Branches: {
    BtnAddText: 'Add Branch',
    SearchText: 'Search branch by name, address or contact ...'
  },
  Warehouses: {
    BtnAddText: 'Add Warehouse',
    SearchText: 'Search warehouse by name, address or contact ...'
  },
  'Product catalog': {
    BtnAddText: 'Add Product Catalog',
    SearchText: 'Search product catalog by name, number ...'
  },
  'Global Broadcast': {
    BtnAddText: 'Add Global Broadcast',
    SearchText: 'Search global broadcast by name ...'
  },
  'Credit cards': {
    BtnAddText: 'Add Credit Card',
    SearchText: 'Search credit card ...'
  },
  'Bank accounts': {
    BtnAddText: 'Add Bank Account',
    SearchText: 'Search bank account ...'
  }
}

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

  currentTabTitle = currentTab => {
    console.log(currentTab)
    switch (currentTab) {
      case 'Users':
        return 'User'
        break
      case 'Branches':
        return 'Branch'
        break
      case 'Warehouses':
        return 'Warehouse'
        break
      case 'Product catalog':
        return 'Product catalog'
        break
      default:
        null
    }
  }

  render() {
    const { handleFiltersValue, currentTab, openPopup } = this.props

    const { filterFieldCurrentValue } = this.state

    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as="h1" size="medium">
            {currentTab}
          </Header>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              style={{ width: 340 }}
              size="large"
              icon="search"
              placeholder={textsTable[currentTab].SearchText}
              onChange={e => handleFiltersValue(e.target.value)}
            />
          </Menu.Item>
          <Menu.Item>
            <Button size="large" primary onClick={() => openPopup()}>
              Add {this.currentTabTitle(currentTab)}
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.settings.currentTab
  }
}

const mapDispatchToProps = {
  openPopup,
  handleFiltersValue
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablesHandlers)
