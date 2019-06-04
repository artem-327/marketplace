import React, { Component } from "react"
import { connect } from "react-redux"
import { config } from '../config'

import { Header, Menu, Button, Input, Dropdown } from 'semantic-ui-react'

import { openPopup, handleFiltersValue } from '../actions'

class TablesHandlers extends Component {
  state = {
    filterValueKey: 0,
    filterTimeout: null,
    filterFieldCurrentValue: 'None'
  }

  componentDidUpdate(prevProps) {
    let { filterValueKey } = this.state
    if (prevProps.filterValue && this.props.filterValue === '') {
      this.setState({
        filterValueKey: ++filterValueKey
      })
    }
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

  handleFiltersValueWithTimeout = (value) => {
    let { props } = this

    if (this.state.filterTimeout)
      clearTimeout(this.state.filterTimeout)

    this.setState({
      filterTimeout: setTimeout(() => {
        props.handleFiltersValue(props, value)
      }, 1000)
    })
  }

  render() {
    const {
      handleFiltersValue,
      currentTab,
      openPopup
    } = this.props

    const {
      filterValueKey,
      filterFieldCurrentValue
    } = this.state


    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as='h1' size='medium'>{currentTab}</Header>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input key={filterValueKey}
                   style={{ width: 340 }}
                   size="large"
                   icon='search'
                   placeholder={config[currentTab].searchText}
                   onChange={e => this.handleFiltersValueWithTimeout(e.target.value)} />
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
    casListDataRequest: state.admin.casListDataRequest,
    companyListDataRequest: state.admin.companyListDataRequest,
    filterValue: state.admin.filterValue
  }
}

const mapDispatchToProps = {
  openPopup,
  handleFiltersValue
}

export default connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)