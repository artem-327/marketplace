import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Menu, Button, Input, Grid, GridRow, GridColumn, Dropdown } from 'semantic-ui-react'
import { debounce } from 'lodash'
import styled from 'styled-components'

import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { openImportPopup } from '~/modules/settings/actions'
import { CustomRowDiv } from '~/modules/companies/constants'
import { CornerLeftDown, PlusCircle } from 'react-feather'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const DivColumn = styled.div`
  margin-right: 9px !important;
`

const textsTable = {
  'cas-products': {
    BtnAddText: 'products.casProducts.buttonAdd',
    SearchText: 'products.casProducts.search'
  },
  'product-catalog': {
    BtnAddText: 'products.productCatalog.buttonAdd',
    SearchText: 'products.productCatalog.search'
  },
  'product-groups': {
    BtnAddText: 'products.productGroups.buttonAdd',
    SearchText: 'products.productGroups.search'
  }
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { tableHandlersFilters, currentTab, datagrid } = this.props

    datagrid.clear()
    if (tableHandlersFilters) {
      this.setState(tableHandlersFilters)
      if (currentTab) {
        const filter = tableHandlersFilters[currentTab]
        if (filter) {
          this.handleFiltersValue(filter)
        } else {
          this.handleFiltersValue(null)
        }
      }
    } else {
      if (currentTab) {
        const filter = this.state[currentTab]
        if (filter) {
          this.handleFiltersValue(filter)
        } else {
          this.handleFiltersValue(null)
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFilters', this.state)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentTab !== prevProps.currentTab) {
      const { currentTab } = this.props
      this.props.datagrid.clear()
      const filter = this.state[currentTab]
      if (filter) {
        this.handleFiltersValue(filter)
      } else {
        this.handleFiltersValue(null)
      }
    }
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

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
      openPopup,
      intl: { formatMessage },
      openImportPopup,
      handleFilterChange
    } = this.props

    const item = textsTable[currentTab]
    const filterValue = this.state[currentTab]

    return (
      <CustomRowDiv>
        <div>
          <div className='column'>
            {item.SearchText && (
              <Input
                style={{ width: 340 }}
                icon='search'
                name='searchInput'
                value={filterValue && filterValue.searchInput ? filterValue.searchInput : ''}
                placeholder={formatMessage({
                  id: item.SearchText,
                  defaultMessage: 'Search CAS product by name or number '
                })}
                onChange={this.handleFilterChangeInputSearch}
              />
            )}
          </div>
        </div>
        <div>
          {currentTab === 'product-catalog' ? (
            <div className='column'>
              <Button size='large' onClick={() => openImportPopup()} data-test='products_import_btn'>
                <CornerLeftDown />
                {formatMessage({ id: 'myInventory.import', defaultMessage: 'Import' })}
              </Button>
            </div>
          ) : null}
          {item.BtnAddText && (
            <DivColumn className='column'>
              <Button fluid primary onClick={() => openPopup()} data-test='products_open_popup_btn'>
                <PlusCircle />
                <FormattedMessage id={item.BtnAddText}>{text => text}</FormattedMessage>
              </Button>
            </DivColumn>
          )}
          <ColumnSettingButton divide={true} />
        </div>
      </CustomRowDiv>
    )
  }

  render() {
    return <PositionHeaderSettings>{this.renderHandler()}</PositionHeaderSettings>
  }
}

const mapStateToProps = state => {
  return {
    currentTab: getSafe(() => state.productsAdmin.currentTab.type, ''),
    tableHandlersFilters: state.productsAdmin.tableHandlersFilters,
    searchedCompanies: state.productsAdmin.searchedCompanies.map(d => ({
      key: d.id,
      value: d.id,
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    })),
    searchedCompaniesByName: state.productsAdmin.searchedCompanies.map(d => ({
      key: d.id,
      value: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, ''),
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    })),
    searchedCompaniesLoading: state.productsAdmin.searchedCompaniesLoading,
    companyProductUnmappedOnly: state.productsAdmin.companyProductUnmappedOnly
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, openImportPopup })(injectIntl(TablesHandlers)))
