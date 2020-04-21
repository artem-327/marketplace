import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Menu, Button, Input, Grid, GridRow, GridColumn, Dropdown } from 'semantic-ui-react'
import { debounce } from 'lodash'
import styled from 'styled-components'

import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

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
  'shipping-quotes': {
    BtnAddText: 'operations.tables.shippingQuotes.buttonAdd',
    SearchText: 'operations.tables.shippingQuotes.search'
  },
  tags: {
    BtnAddText: 'operations.tables.tags.buttonAdd',
    SearchText: 'operations.tables.tags.search'
  },
  'company-product-catalog': {
    SearchText: 'operations.tables.companyProductCatalog.search',
    SearchCompanyText: 'operations.tables.companyProductCatalog.SearchCompanyText',
    MappedText: 'operations.tables.companyProductCatalog.MappedText'
  },
  'company-inventory': {
    SearchText: 'operations.tables.companyInventory.search'
  }
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: '',
      company: ''
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '', company: '' })
      this.handleFiltersValue('')
    }
  }

  handleFiltersValue = value => {
    const { handleFiltersValue } = this.props
    //TODO temporary - missing filter path in BE for carrierName (shipment/manual-quotes)
    if (Datagrid.isReady()) {
      Datagrid.setSearch(value)
    }
    else {
      //handleFiltersValue(value) <- this is not working, but why Datagrid.isReady() returns false?
      Datagrid.setSearch(value)
    }
  }

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })
    const filter = {
      filterValue: value,
      company: this.state.company
    }
    this.handleFiltersValue(filter)
  }

  renderHeader = () => (
    <GridColumn widescreen={2} computer={3} tablet={3}>
      <Header as='h1' size='medium'>
        {this.props.currentTab.name}
      </Header>
    </GridColumn>
  )

  handleFilterChangeMappedUnmapped = (e, { value }) => {
    this.props.setProductMappedUnmaped(value)
    this.handleFiltersValue({
      filterValue: this.state.filterValue,
      company: this.state.company
    })
  }

  handleFilterChangeCompany = (e, { value }) => {
    this.setState({ company: value })
    const filter = {
      filterValue: this.state.filterValue,
      company: value
    }
    this.handleFiltersValue(filter)
  }

  searchCompanies = debounce(text => {
    this.props.searchCompany(text, 5)
  }, 250)

  renderHandler = () => {
    const {
      currentTab,
      openPopup,
      intl: { formatMessage },
      searchedCompaniesLoading,
      searchedCompanies,
      companyProductUnmappedOnly
    } = this.props

    const { filterValue, company } = this.state

    const item = textsTable[currentTab.type]

    switch (currentTab.type) {
      case 'company-product-catalog':
        return (
          <CustomGridRow>
            <CustomMenuItemLeft>
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
            <CustomMenuItemLeft>
              <Dropdown
                style={{ width: 340 }}
                placeholder={formatMessage({
                  id: item.SearchCompanyText,
                  defaultMessage: 'Search product catalog by company'
                })}
                icon='search'
                selection
                clearable
                options={searchedCompanies}
                search={options => options}
                value={company}
                loading={searchedCompaniesLoading}
                onSearchChange={(e, { searchQuery }) => {
                  searchQuery.length > 0 && this.searchCompanies(searchQuery)
                }}
                onChange={this.handleFilterChangeCompany}
              />
            </CustomMenuItemLeft>
            <CustomMenuItemLeft>
              <Dropdown
                style={{ width: 250 }}
                placeholder={formatMessage({
                  id: item.MappedText,
                  defaultMessage: 'Select mapped/unmapped only'
                })}
                fluid
                selection
                options={[
                  {
                    key: 0,
                    text: formatMessage({ id: 'operations.noSelection', defaultMessage: 'All' }),
                    value: false
                  },
                  {
                    key: 1,
                    text: formatMessage({ id: 'operations.unmapped', defaultMessage: 'Unmapped Only' }),
                    value: true
                  }
                ]}
                value={companyProductUnmappedOnly}
                onChange={this.handleFilterChangeMappedUnmapped}
              />
            </CustomMenuItemLeft>
          </CustomGridRow>
        )

      default:
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
                <Button fluid primary onClick={() => openPopup()} data-test='operations_open_popup_btn'>
                  <FormattedMessage id={item.BtnAddText}>{text => text}</FormattedMessage>
                </Button>
              </CustomMenuItemRight>
            )}
          </CustomGridRow>
        )
    }
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
    currentTab: state.operations.currentTab,
    filterValue: state.operations.filterValue,
    searchedCompanies: state.operations.searchedCompanies.map(d => ({
      key: d.id,
      value: d.id,
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    })),
    searchedCompaniesLoading: state.operations.searchedCompaniesLoading,
    companyProductUnmappedOnly: state.operations.companyProductUnmappedOnly
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
