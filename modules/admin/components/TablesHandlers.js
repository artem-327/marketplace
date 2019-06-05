import React, { Component } from "react"
import { connect } from "react-redux"
import { config } from '../config'
import { debounce } from 'lodash'

import { Header, Menu, Button, Input, Dropdown } from 'semantic-ui-react'

import { openPopup, handleFiltersValue } from '../actions'

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterFieldCurrentValue: 'None'
    }

    this.debouncedOnChange = debounce(this.handleChange, 250)
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

  handleChange = (e, { value }) => {
    this.props.handleFiltersValue(this.props, value)
  }

  render() {
    const {
      currentTab,
      openPopup,
    } = this.props


    if (currentTab === 'Manufactures' || currentTab === 'CAS Products') var onChange = this.debouncedOnChange
    else var onChange = this.handleChange

    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as='h1' size='medium'>{currentTab}</Header>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input style={{ width: 340 }} size="large" icon='search' placeholder={config[currentTab].searchText}
              onChange={onChange} />
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