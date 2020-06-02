import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Menu, Button, Input, Grid, GridRow, GridColumn, Dropdown } from 'semantic-ui-react'
import { debounce } from 'lodash'
import styled from 'styled-components'

import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { openImportPopup } from '~/modules/settings/actions'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomGridRow = styled(GridRow)`
  padding: 0 !important;
  margin: 10px 0 10px 4px !important;
`

const CustomMenuItemLeft = styled(Menu.Item)`
  margin-left: 0 !important;
  margin-right: 0 !important;
`

const CustomMenuItemRight = styled(Menu.Item)`
  margin-left: 0 !important;
  margin-right: 0 !important;
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
    this.state = {
      filterValue: ''
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '' })
      this.handleFiltersValue('')
    }
  }

  handleFiltersValue = value => {
    // this condition must be ready evrytimes if you inicializate datagridProvider
    if (Datagrid.isReady()) Datagrid.setSearch(value, true, 'pageFilters')
  }

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })

    this.handleFiltersValue(value)
  }

  renderHandler = () => {
    const {
      currentTab,
      openPopup,
      intl: { formatMessage },
      openImportPopup
    } = this.props

    const { filterValue } = this.state

    const item = textsTable[currentTab.type]

    return (
      <CustomGridRow>
        {item.SearchText && (
          <CustomMenuItemLeft position='left'>
            <Input
              style={{ width: 340 }}
              icon='search'
              value={filterValue}
              placeholder={formatMessage({
                id: item.SearchText,
                defaultMessage: 'Select Credit Card'
              })}
              onChange={this.handleFilterChange}
            />
          </CustomMenuItemLeft>
        )}
        {item.BtnAddText && (
          <CustomMenuItemRight position='right'>
            <Button fluid primary onClick={() => openPopup()} data-test='products_open_popup_btn'>
              <FormattedMessage id={item.BtnAddText}>{text => text}</FormattedMessage>
            </Button>
          </CustomMenuItemRight>
        )}
        {currentTab.type === 'product-catalog' ? (
          <CustomMenuItemRight>
            <Button size='large' primary onClick={() => openImportPopup()} data-test='products_import_btn'>
              {formatMessage({ id: 'myInventory.import', defaultMessage: 'Import' })}
            </Button>
          </CustomMenuItemRight>
        ) : null}
      </CustomGridRow>
    )
  }

  render() {
    return (
      <PositionHeaderSettings>
        <Grid as={Menu} secondary verticalAlign='middle' className='page-part'>
          {this.renderHandler()}
        </Grid>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.productsAdmin.currentTab,
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
