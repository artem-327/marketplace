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
      filterFieldCurrentValue: 'None',
      filterValue: ''
    }

    this.handleChange = debounce(this.handleChange, 300)
  }

  componentDidUpdate(prevProps) {
    let { filterValueKey } = this.state

    if (prevProps.filterValue && this.props.filterValue === '') {
      this.setState({
        filterValueKey: ++filterValueKey
      })
    } if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '' })
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

  handleChange = (value) => {
    this.props.handleFiltersValue(this.props, value)
  }

  render() {
    const {
      currentTab,
      openPopup
    } = this.props


    // if (currentTab === 'Manufactures' || currentTab === 'CAS Products' || currentTab === 'Companies') var onChange = this.debouncedOnChange
    // else var onChange = this.handleChange

    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as='h1' size='medium'>{currentTab}</Header>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Input style={{ width: 340 }} size="large" icon='search' placeholder={config[currentTab].searchText}
              onChange={(e, { value }) => {
                this.setState({ filterValue: value })
                this.handleChange(value)
              }} value={this.state.filterValue} />
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

  }
}

const mapDispatchToProps = {
  openPopup,
  handleFiltersValue
}

export default connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)