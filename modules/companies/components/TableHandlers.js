import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { CornerLeftDown, PlusCircle } from 'react-feather'

import { Header, Menu, Button, Input, Dropdown, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe, uniqueArrayByKey } from '~/utils/functions'
import { openSidebar, handleFiltersValue, searchCompanyFilter } from '../actions'
import { openImportPopup } from '~/modules/settings/actions'
import { Datagrid } from '~/modules/datagrid'
import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'

import styled from 'styled-components'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomMenuItemLeft = styled(Menu.Item)`
  margin-left: -5px !important;
  padding-left: 0px !important;
  .dropdown, .input {
    margin: 0 5px !important;
    height: 40px;
  }
`

const CustomMenuItemRight = styled(Menu.Item)`
  margin-right: -5px !important;
  padding-right: 0px !important;
 
  .ui.button {
    margin: 0 5px !important;
    height: 40px;
    border-radius: 3px;
    font-weight: 500;   
    display: flex;
    align-items: center;

    svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
      }
    
    &.blue {
      color: #ffffff;
      background-color: #2599d5;
    }
    &.white {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      color: #848893;
      background-color: #ffffff;
    }
  }  
`

const CustomGrid = styled(Grid)`
  margin-top: 10px !important;
`

const textsTable = {
  'companies': {
    BtnAddText: 'admin.addCompany',
    SearchText: 'admin.searchCompany'
  },
  'users': {
    BtnAddText: 'admin.addUser',
    SearchText: 'admin.searchUser'
  }
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: '',
      company: '',
      selectedCompanyOption: ''
    }

    this.handleChange = debounce(this.handleChange, 300)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '' })
      this.handleChange('')
    }
  }

  handleChange = value => {
    Datagrid.setSearch(value)
  }

  handleFilterChangeCompany = (e, { value }) => {
    let selectedCompanyOption = ''

    if (value !== '' ) {
      selectedCompanyOption = this.props.searchedCompaniesFilter.find(c => value === c.value)
    }

    this.setState({ company: value, selectedCompanyOption })
    this.handleChange(
      { company: value, input: this.state.filterValue },
      true,
      'companyFilter'
    )
  }

  searchCompanies = debounce(text => {
    this.props.searchCompanyFilter(text, 5)
  }, 300)

  render() {
    const {
      openSidebar,
      openImportPopup,
      intl,
      isOpenImportPopup,
      currentTab,
      searchedCompaniesFilterLoading,
      searchedCompaniesFilter
    } = this.props
    const { formatMessage } = intl

    const { company, selectedCompanyOption } = this.state

    const item = textsTable[currentTab.type]

    let allCompanyOptions
    if (selectedCompanyOption) {
      allCompanyOptions = uniqueArrayByKey(searchedCompaniesFilter.concat([selectedCompanyOption]), 'key')
    } else {
      allCompanyOptions = searchedCompaniesFilter
    }

    return (
      <PositionHeaderSettings>
        {isOpenImportPopup && <ProductImportPopup companies={true} />}
        <CustomGrid as={Menu} secondary verticalAlign='middle' className='page-part'>
          <CustomMenuItemLeft position='left' data-test='admin_table_search_inp'>
            <Input
              style={{ width: 340 }}
              icon='search'
              placeholder={formatMessage({ id: item.SearchText })}
              onChange={(e, { value }) => {
                this.setState({ filterValue: value })
                this.handleChange(
                  { input: value, company },
                  true,
                  'handlersFilter'
                )
              }}
              value={this.state.filterValue}
            />
            {currentTab.type === 'users' && (

              <Dropdown
                style={{ width: 340, zIndex: 501 }}
                placeholder={formatMessage({
                  id: 'myInventory.exportInventorySearchText',
                  defaultMessage: 'Search by Company'
                })}
                icon='search'
                selection
                clearable
                options={allCompanyOptions}
                search={options => options}
                value={company}
                loading={searchedCompaniesFilterLoading}
                onSearchChange={(e, { searchQuery }) => {
                  searchQuery.length > 0 && this.searchCompanies(searchQuery)
                }}
                onChange={this.handleFilterChangeCompany}
              />
            )}
          </CustomMenuItemLeft>
          <CustomMenuItemRight position='right'>
            {currentTab.type === 'companies' && (
              <Button
                className='white'
                size='large'
                primary
                onClick={() => openImportPopup()}
                data-test='companies_import_btn'
              >
                <CornerLeftDown />
                {formatMessage({ id: 'myInventory.import', defaultMessage: 'Import' })}
              </Button>
            )}
            <Button
              className='blue'
              size='large'
              data-test='companies_table_add_btn'
              primary
              onClick={() => openSidebar()}
            >
              <PlusCircle />
              <FormattedMessage id={item.BtnAddText} defaultMessage='Add'>
                {text => `${text} `}
              </FormattedMessage>
            </Button>
          </CustomMenuItemRight>

        </CustomGrid>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.companiesAdmin.currentTab,
    isOpenImportPopup: state.settings.isOpenImportPopup,
    searchedCompaniesFilterLoading: state.companiesAdmin.searchedCompaniesFilterLoading,
    searchedCompaniesFilter: state.companiesAdmin.searchedCompaniesFilter.map(d => ({
      key: d.id,
      value: d.id,
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    }))
  }
}

const mapDispatchToProps = {
  openSidebar,
  openImportPopup,
  handleFiltersValue,
  searchCompanyFilter
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TablesHandlers))
