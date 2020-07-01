import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { CornerLeftDown, PlusCircle } from 'react-feather'
import { Header, Menu, Button, Input, Dropdown, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe, uniqueArrayByKey } from '~/utils/functions'
import { openSidebar, searchCompanyFilter, saveFilters } from '../actions'
import { openImportPopup } from '~/modules/settings/actions'
import { withDatagrid } from '~/modules/datagrid'
import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'
import styled from 'styled-components'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px;
  flex-wrap: wrap;
  
  > div {
    align-items: top;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .column {
    margin: 5px;
  }
  
  input, .ui.dropdown {
    height: 40px;
  }
  
  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-size: 14px;
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
      companies: {
        searchInput: ''
      },
      users: {
        searchInput: '',
        company: ''
      },
      selectedCompanyOption: ''
    }

    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidMount() {
    const { tableHandlersFilters, currentTab } = this.props
    if (currentTab === '') return
    if (tableHandlersFilters) {
      this.initFilterValues(tableHandlersFilters)
    } else {
      let filterValue = this.state[currentTab]
      this.handleFiltersValue(filterValue)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      const { currentTab } = this.props
      if (currentTab === '') return

      let filterValue = this.state[currentTab]
      this.handleFiltersValue(filterValue)
    }
  }

  componentWillUnmount() {
    this.props.saveFilters(this.state)
  }

  initFilterValues = tableHandlersFilters => {
    const { currentTab } = this.props
    if (currentTab === '') return

    this.setState(tableHandlersFilters)
    this.handleFiltersValue(tableHandlersFilters[currentTab])
  }

  handleFiltersValue = filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }

  handleFilterChangeInputSearch = (e, data) => {
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

  handleFilterChangeCompany = (e, data) => {
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

    const { selectedCompanyOption } = this.state

    const item = textsTable[currentTab]

    let allCompanyOptions
    if (selectedCompanyOption) {
      allCompanyOptions = uniqueArrayByKey(searchedCompaniesFilter.concat([selectedCompanyOption]), 'key')
    } else {
      allCompanyOptions = searchedCompaniesFilter
    }

    const filterValue = this.state[currentTab]

    return (
      <PositionHeaderSettings>
        <CustomRowDiv>
          {isOpenImportPopup && <ProductImportPopup companies={true} />}
          <div>
            <div className='column'>
              <Input
                style={{ width: 340 }}
                name='searchInput'
                icon='search'
                placeholder={formatMessage({ id: item.SearchText })}
                onChange={this.handleFilterChangeInputSearch}
                value={filterValue.searchInput}
              />
            </div>
            {currentTab === 'users' && (
              <div className='column'>
                <Dropdown
                  style={{ width: 340, zIndex: 501 }}
                  name='company'
                  placeholder={formatMessage({
                    id: 'myInventory.exportInventorySearchText',
                    defaultMessage: 'Search by Company'
                  })}
                  icon='search'
                  selection
                  clearable
                  options={allCompanyOptions}
                  search={options => options}
                  value={filterValue.company}
                  loading={searchedCompaniesFilterLoading}
                  onSearchChange={(e, { searchQuery }) => {
                    searchQuery.length > 0 && this.searchCompanies(searchQuery)
                  }}
                  onChange={this.handleFilterChangeCompany}
                />
              </div>
            )}
          </div>
          <div>
            {currentTab === 'companies' && (
              <div className='column'>
                <Button
                  size='large'
                  onClick={() => openImportPopup()}
                  data-test='companies_import_btn'
                >
                  <CornerLeftDown />
                  {formatMessage({ id: 'myInventory.import', defaultMessage: 'Import' })}
                </Button>
              </div>
            )}
            <div className='column'>
              <Button
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
            </div>
          </div>
        </CustomRowDiv>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: getSafe(() => state.companiesAdmin.currentTab.type, ''),
    tableHandlersFilters: state.companiesAdmin.tableHandlersFilters,
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
  searchCompanyFilter,
  saveFilters
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)))
