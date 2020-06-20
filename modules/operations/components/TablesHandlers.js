import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Menu, Button, Input, Grid, GridRow, GridColumn, Dropdown } from 'semantic-ui-react'
import { DateInput } from '~/components/custom-formik'
import moment from 'moment'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { errorMessages, dateValidation, dateBefore } from '~/constants/yupValidation'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { debounce } from 'lodash'
import styled from 'styled-components'
import { OrdersFilters } from '../constants'

import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe, uniqueArrayByKey } from '~/utils/functions'

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
  },
  orders: {
    SearchText: 'operations.tables.orders.search'
  },
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'shipping-quotes': {
        searchInput: ''
      },
      'tags': {
        searchInput: ''
      },
      'company-product-catalog': {
        searchInput: '',
        company: ''
      },
      'company-inventory': {
        searchInput: ''
      },
      'orders': {
        company: ''
      }
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
    const { datagrid } = this.props
    datagrid.setSearch(value, true, 'pageFilters')
  }

  handleFilterChangeMappedUnmapped = (e, { value }) => {
    this.props.setProductMappedUnmaped(value)
    this.handleFiltersValue({
      filterValue: this.state.filterValue,
      company: this.state.company
    })
  }





  handleFilterChangeInputSearch = (e, data) => {
    console.log('!!!!!!!!!! handleFilterChangeInputSearch data', data)
    const { currentTab } = this.props
    if (currentTab === '') return

    this.setState({
      [currentTab]: {
        ...this.state[currentTab],
        [data.name]: data.value
      }
    })

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
    }
    console.log('!!!!!!!!!! handleFilterChangeInputSearch filter', filter)
    this.handleFiltersValue(filter)
  }

  handleFilterChangeCompany = (e, data) => {
    console.log('!!!!!!!!!! handleFilterChangeCompany data', data)
    const { currentTab } = this.props
    if (currentTab === '') return

    this.setState({
      [currentTab]: {
        ...this.state[currentTab],
        [data.name]: data.value
      }
    })

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
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
      searchedCompaniesByName,
      companyProductUnmappedOnly
    } = this.props

    const item = textsTable[currentTab]

    const filterValue = this.state[currentTab]

    //const companiesOptions = uniqueArrayByKey(searchedCompanies.concat(), 'key')
    // ! ! tady pokracovat


    console.log('!!!!!!!!!! render currentTab', currentTab)
    console.log('!!!!!!!!!! render this.state', this.state)

    switch (currentTab) {
      case 'company-product-catalog':
        return (
          <CustomGridRow>
            <CustomMenuItemLeft>
              <Input
                style={{ width: 340 }}
                name='searchInput'
                icon='search'
                value={filterValue.searchInput}
                placeholder={formatMessage({
                  id: item.SearchText,
                  defaultMessage: 'Select Credit Card'
                })}
                onChange={this.handleFilterChangeInputSearch}
              />
            </CustomMenuItemLeft>
            <CustomMenuItemLeft>
              <Dropdown
                style={{ width: 340 }}
                name='company'
                placeholder={formatMessage({
                  id: item.SearchCompanyText,
                  defaultMessage: 'Search product catalog by company'
                })}
                icon='search'
                selection
                clearable
                options={searchedCompanies}
                search={options => options}
                value={filterValue.company}
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
                name='mappedUnmapped'
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
                    value: 'ALL'
                  },
                  {
                    key: 1,
                    text: formatMessage({ id: 'operations.unmapped', defaultMessage: 'Unmapped Only' }),
                    value: 'UNMAPPED'
                  },
                  {
                    key: 2,
                    text: formatMessage({ id: 'operations.mappedOnly', defaultMessage: 'Mapped Only' }),
                    value: 'MAPPED'
                  }
                ]}
                value={companyProductUnmappedOnly}
                onChange={this.handleFilterChangeMappedUnmapped}
              />
            </CustomMenuItemLeft>
          </CustomGridRow>
        )

      case 'orders':
        return (
          <CustomGridRow>
            <CustomMenuItemLeft>
              <Dropdown
                style={{ width: 340 }}
                name='company'
                placeholder={formatMessage({
                  id: item.SearchText,
                  defaultMessage: 'Search orders by company'
                })}
                icon='search'
                selection
                clearable
                options={searchedCompaniesByName}
                search={options => options}
                value={filterValue.company}
                loading={searchedCompaniesLoading}
                onSearchChange={(e, { searchQuery }) => {
                  searchQuery.length > 0 && this.searchCompanies(searchQuery)
                }}
                onChange={this.handleFilterChangeCompany}
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
                  name='searchInput'
                  icon='search'
                  value={filterValue.searchInput}
                  placeholder={formatMessage({
                    id: item.SearchText,
                    defaultMessage: 'Select Credit Card'
                  })}
                  onChange={this.handleFilterChangeInputSearch}
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
    currentTab: getSafe(() => state.operations.currentTab.type, ''),
    searchedCompanies: state.operations.searchedCompanies.map(d => ({
      key: d.id,
      value: JSON.stringify(d),
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    })),
    searchedCompaniesByName: state.operations.searchedCompanies.map(d => ({
      key: d.id,
      value: JSON.stringify(d),
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    })),
    searchedCompaniesLoading: state.operations.searchedCompaniesLoading,
    companyProductUnmappedOnly: state.operations.companyProductUnmappedOnly
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
