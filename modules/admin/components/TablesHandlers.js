import React, {Component} from 'react'
import {connect} from 'react-redux'
import {config} from '../config'
import {debounce} from 'lodash'

import {Header, Menu, Button, Input, Dropdown} from 'semantic-ui-react'
import {FormattedMessage, injectIntl} from 'react-intl'

import {openPopup, handleFiltersValue} from '../actions'
import {openImportPopup} from '~/modules/settings/actions'
import {Datagrid} from '~/modules/datagrid'

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
    let {filterValueKey} = this.state

    if (prevProps.filterValue && this.props.filterValue === '') {
      this.setState({
        filterValueKey: ++filterValueKey
      })
    }
    if (prevProps.currentTab.id !== this.props.currentTab.id) {
      this.setState({filterValue: ''})
      this.props.handleFiltersValue(this.props, '')
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

  handleChange = value => {
    Datagrid.setSearch(value)
    // if (Datagrid.isReady()) Datagrid.setSearch(value)
    // else this.props.handleFiltersValue(this.props, value)
  }

  render() {
    const {currentTab, openPopup, openImportPopup, intl} = this.props

    const {formatMessage} = intl

    // if (currentTab === 'Manufactures' || currentTab === 'CAS Products' || currentTab === 'Companies') var onChange = this.debouncedOnChange
    // else var onChange = this.handleChange

    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as='h1' size='medium'>
            {currentTab.name}
          </Header>
        </Menu.Item>
        {!currentTab.hideHandler && (
          <Menu.Menu position='right'>
            <Menu.Item data-test='admin_table_search_inp'>
              <Input
                style={{width: 340}}
                size='large'
                icon='search'
                placeholder={formatMessage({id: config[currentTab.name].searchText})}
                onChange={(e, {value}) => {
                  this.setState({filterValue: value})
                  this.handleChange(value)
                }}
                value={this.state.filterValue}
              />
            </Menu.Item>
            <Menu.Item>
              <Button size='large' data-test='admin_table_add_btn' primary onClick={() => openPopup()}>
                <FormattedMessage id='global.add' defaultMessage='Add'>
                  {text => `${text} `}
                </FormattedMessage>
                {config[currentTab.name].addEditText}
              </Button>
            </Menu.Item>
            {currentTab.name === 'Product Catalog' ? (
              <Menu.Item>
                <Button size='large' primary onClick={() => openImportPopup()} data-test='admin_import_btn'>
                  {formatMessage({id: 'myInventory.import', defaultMessage: 'Import'})}
                </Button>
              </Menu.Item>
            ) : null}
          </Menu.Menu>
        )}
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.admin.currentTab,
    casListDataRequest: state.admin.casListDataRequest,
    companyListDataRequest: state.admin.companyListDataRequest
  }
}

const mapDispatchToProps = {
  openPopup,
  openImportPopup,
  handleFiltersValue
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TablesHandlers))
