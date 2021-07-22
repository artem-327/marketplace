/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createRef } from 'react'
import { connect } from 'react-redux'
import { CornerLeftDown, PlusCircle } from 'react-feather'
import { Header, Menu, Button, Input, Dropdown, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'

// Services
import { getSafe, uniqueArrayByKey } from '../../../utils/functions'
import {
  handleFilterChangeCompany,
  handleFilterChangeInputSearch,
  handleFiltersValue,
  initFilterValues,
  searchCompanies
} from './TablesHandlers.services'

// Actions
import { openSidebar, searchCompanyFilter, saveFilters } from '../actions'
import { openImportPopup } from '../../settings/actions'

// Components
import { withDatagrid } from '../../datagrid'
import ProductImportPopup from '../../inventory/my-products/components/ProductImportPopupContainer'
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'

//Hooks
import { usePrevious } from '../../../hooks'

// Constants
import { TEXTS_TABLE } from './TablesHandlers.constants'

// Styles
import { PositionHeaderSettings, DivCustomRow } from './TablesHandlers.styles'

const TablesHandlers = props => {
  const [state, setState] = useState(
    {
      companies: {
        searchInput: ''
      },
      users: {
        searchInput: '',
        company: ''
      },
      selectedCompanyOption: []
    }
  )

  const {
    openSidebar,
    openImportPopup,
    intl,
    isOpenImportPopup,
    currentTab,
    searchedCompaniesFilterLoading,
    searchedCompaniesFilter,
    tableHandlersFilters
  } = props

  const prevCurrentTab = usePrevious(currentTab)
  const prevTableHandlersFilters = usePrevious(tableHandlersFilters)
  const prevSearchedCompaniesFilter = usePrevious(searchedCompaniesFilter)

  useEffect(() => {
    if (currentTab === '') return
    if (tableHandlersFilters) {
      initFilterValues(tableHandlersFilters, state, setState, props)
    } else {
      let filterValue = state[currentTab]
      handleFiltersValue(filterValue, props)
    }
  }, [])

  useEffect(() => {
    if (typeof prevTableHandlersFilters !== 'undefined') {
      if (currentTab === '') return
      if (tableHandlersFilters) {
        setState(tableHandlersFilters)
        let filterValue = tableHandlersFilters[currentTab]
        handleFiltersValue(filterValue, props)
      } else {
        setState(
          {
            ...state,
            companies: {
              searchInput: ''
            },
            users: {
              searchInput: '',
              company: ''
            }
          }
        )
      }
    }
  }, [tableHandlersFilters])

  useEffect(() => {
    if (typeof prevCurrentTab !== 'undefined') {
      if (currentTab === '') return
      let filterValue = state[currentTab]
      handleFiltersValue(filterValue, props)
    }
  }, [currentTab])

  useEffect(() => {
    if (typeof prevSearchedCompaniesFilter !== 'undefined') {
      if(searchedCompaniesFilter.length) {
        setState({...state, selectedCompanyOption: searchedCompaniesFilter})
      }
    }
  }, [searchedCompaniesFilter])

  const { formatMessage } = intl
  const item = TEXTS_TABLE[currentTab]
  const filterValue = state[currentTab]
  const { selectedCompanyOption } = state

  return (
    <PositionHeaderSettings>
      <DivCustomRow>
        {isOpenImportPopup && <ProductImportPopup companies={true} />}
        <div>
          <div className='column'>
            <Input
              style={{ width: 340 }}
              name='searchInput'
              icon='search'
              placeholder={formatMessage({ id: item.SearchText })}
              onChange={(e, data) => handleFilterChangeInputSearch(e, data, state, setState, props)}
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
                options={selectedCompanyOption}
                search={options => options}
                value={filterValue.company}
                loading={searchedCompaniesFilterLoading}
                onSearchChange={(e, { searchQuery }) => {
                  searchQuery.length > 0 && searchCompanies(searchQuery, props)
                }}
                onChange={(e, data) => handleFilterChangeCompany(e, data, state, setState, props)}
              />
            </div>
          )}
        </div>
        <div>
          {currentTab === 'companies' && (
            <div className='column'>
              <Button size='large' onClick={() => openImportPopup()} data-test='companies_import_btn'>
                <CornerLeftDown />
                {formatMessage({ id: 'myInventory.import', defaultMessage: 'Import' })}
              </Button>
            </div>
          )}
          <div className='column'>
            <Button
              size='large'
              data-test='companies_table_add_btn'
              primary onClick={() => openSidebar(null, currentTab)}
            >
              <PlusCircle />
              <FormattedMessage id={item.BtnAddText} defaultMessage='Add' />
            </Button>
          </div>
          <ColumnSettingButton divide={true} />
        </div>
      </DivCustomRow>
    </PositionHeaderSettings>
  )
}

const mapStateToProps = state => {
  return {
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
