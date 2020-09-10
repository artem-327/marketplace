import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Header, Menu, Button, Checkbox, Input, Dropdown, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { debounce } from 'lodash'
import Router from 'next/router'
import styled from 'styled-components'
import TreeModel from 'tree-model'
import { withToastManager } from 'react-toast-notifications'

import * as Actions from '../../actions'
import { openGlobalBroadcast, saveRules, initGlobalBroadcast } from '~/modules/broadcast/actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedNumber, FormattedMessage, injectIntl } from 'react-intl'
import { currency } from '~/constants/index'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { PlusCircle, UploadCloud, CornerLeftDown } from 'react-feather'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 5px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }

  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #848893;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #f8f9fb;
      color: #20273a;
    }
    &:active {
      background-color: #edeef2;
      color: #20273a;
    }

    svg {
      width: 18px;
      height: 20px;
      margin-right: 10px;
      vertical-align: top;
      color: inherit;
    }

    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }

    &.primary {
      box-shadow: none;
      border: none;
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }
`

const CustomLabel = styled.div`
  height: 32px;
  border-radius: 16px;
  background-color: #e5efd8;
  font-size: 14px;
  text-align: center;
  color: #84c225;
  padding: 0 17px;
  display: flex;
  align-items: center;
`

const ButtonAdd = styled(Button)`
  margin-right: 9px !important;
`

const textsTable = {
  'delivery-locations': {
    BtnAddText: 'settings.tables.deliveryAddresses.buttonAdd',
    SearchText: 'settings.tables.deliveryAddresses.search'
  },
  'pick-up-locations': {
    BtnAddText: 'settings.tables.warehouses.buttonAdd',
    SearchText: 'settings.tables.warehouses.search'
  },
  branches: {
    BtnAddText: 'settings.tables.branches.buttonAdd',
    SearchText: 'settings.tables.branches.search'
  }
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'delivery-locations': {
        searchInput: ''
      },
      'pick-up-locations': {
        searchInput: ''
      },
      branches: {
        searchInput: ''
      }
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidMount() {
    const { tableHandlersFilters, currentTab } = this.props
    if (currentTab === '') return
    if (tableHandlersFilters) {
      this.setState(tableHandlersFilters)
      this.handleFiltersValue(tableHandlersFilters[currentTab])
    } else {
      this.handleFiltersValue(this.state[currentTab])
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      const { currentTab } = this.props
      if (currentTab === '') return
      this.props.datagrid.clear()
      this.handleFiltersValue(this.state[currentTab])
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersLocations', this.state)
  }

  handleFiltersValue = filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }

  handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
    }
    this.setState({ [currentTab]: filter })
    this.handleFiltersValue(filter)
  }

  renderHandler = () => {
    const {
      currentTab,
      openSidebar,
      intl: { formatMessage }
    } = this.props

    const filterValue = this.state[currentTab]

    return (
      <>
        <div>
          <div className='column'>
            <Input
              style={{ width: '370px' }}
              name='searchInput'
              icon='search'
              value={filterValue.searchInput}
              placeholder={formatMessage({
                id: textsTable[currentTab].SearchText,
                defaultMessage: 'Search Address'
              })}
              onChange={this.handleFilterChangeInputSearch}
            />
          </div>
        </div>
        <div className='column'>
          <ButtonAdd primary onClick={() => openSidebar()} data-test='settings_open_popup_btn'>
            <PlusCircle />
            <FormattedMessage id={textsTable[currentTab].BtnAddText}>{text => text}</FormattedMessage>
          </ButtonAdd>
          <ColumnSettingButton divide={true} />
        </div>
      </>
    )
  }

  render() {
    return (
      <PositionHeaderSettings>
        <CustomRowDiv>{this.renderHandler()}</CustomRowDiv>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    currentTab: state.settings.locationsTab,
    tableHandlersFilters: state.settings.tableHandlersFiltersLocations,
    deliveryAddressesFilter: state.settings.deliveryAddressesFilter,
    filterValue: state.settings.filterValue
  }
}

export default withDatagrid(withToastManager(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers))))
