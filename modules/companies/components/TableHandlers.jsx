/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CornerLeftDown, PlusCircle } from 'react-feather'
import { Button, Input, Dropdown } from 'semantic-ui-react'
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
      selectedCompanyOption: ''
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
    if (typeof prevCurrentTab !== 'undefined') {
      if (currentTab === '') return
      let filterValue = state[currentTab]
      handleFiltersValue(filterValue, props)
    }
  }, [currentTab])

  const { formatMessage } = intl
  const item = TEXTS_TABLE[currentTab]
  const filterValue = state[currentTab]
  const { selectedCompanyOption } = state

  let allCompanyOptions
  if (selectedCompanyOption) {
    allCompanyOptions = uniqueArrayByKey(searchedCompaniesFilter.concat([selectedCompanyOption]), 'key')
  } else {
    allCompanyOptions = searchedCompaniesFilter
  }

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
                options={allCompanyOptions}
                search={options => options}
                value={filterValue.company}
                loading={searchedCompaniesFilterLoading}
                onSearchChange={(e, { searchQuery }) => {
                  searchQuery.length > 0 && searchCompanies(searchQuery, props)
                }}
                onChange={(e, data) => handleFilterChangeCompany(e, data, allCompanyOptions, state, setState, props)}
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

TablesHandlers.propTypes = {
  openSidebar: PropTypes.func,
  openImportPopup: PropTypes.func,
  intl: PropTypes.object,
  isOpenImportPopup: PropTypes.bool,
  currentTab: PropTypes.number,
  searchedCompaniesFilterLoading: PropTypes.bool,
}

TablesHandlers.defaultProps = {
  openSidebar: () => { },
  openImportPopup: () => { },
  intl: {},
  isOpenImportPopup: false,
  currentTab: 0,
  searchedCompaniesFilterLoading: false,
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)))
