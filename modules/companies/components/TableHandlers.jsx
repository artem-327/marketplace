/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createRef } from 'react'
import { connect } from 'react-redux'
import { CornerLeftDown, PlusCircle } from 'react-feather'
import { Header, Menu, Button, Input, Dropdown, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe, uniqueArrayByKey } from '~/utils/functions'
import { openSidebar, searchCompanyFilter, saveFilters } from '../actions'
import { openImportPopup } from '~/modules/settings/actions'
import { withDatagrid } from '~/modules/datagrid'
import ProductImportPopup from '~/modules/inventory/my-products/components/ProductImportPopup'
import { CustomRowDiv } from '../constants'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'


//Hooks
import { usePrevious } from '../../../hooks'

import { TEXTS_TABLE } from './TablesHandlers.constants'

import { PositionHeaderSettings } from './TablesHandlers.styles'

import {
  handleFilterChangeCompany,
  handleFilterChangeInputSearch,
  handleFiltersValue,
  initFilterValues,
  searchCompanies
} from './TablesHandlers.services'

const stateValueRef = createRef() // Needed ref for useEffect/return function to access the latest state

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
    searchedCompaniesFilter
  } = props

  const prevCurrentTab = usePrevious(currentTab)

  stateValueRef.current = state     // Needed ref for useEffect/return function to access the latest state

  useEffect(() => {
    const { tableHandlersFilters, currentTab } = props
    if (currentTab === '') return
    if (tableHandlersFilters) {
      initFilterValues(tableHandlersFilters, state, setState, props)
    } else {
      let filterValue = state[currentTab]
      handleFiltersValue(filterValue, props)
    }

    return () => {
      // Needed to use ref here to access the latest state
      props.saveFilters(stateValueRef.current)
    }
  }, [])

  useEffect(() => {
    if (typeof prevCurrentTab !== 'undefined') {  // To avoid call on 'componentDidMount'
      const { currentTab } = props
      if (currentTab === '') return

      let filterValue = state[currentTab]
      handleFiltersValue(filterValue, props)
    }
  }, [currentTab])

  const { formatMessage } = intl
  const { selectedCompanyOption } = state
  const item = TEXTS_TABLE[currentTab]

  let allCompanyOptions
  if (selectedCompanyOption) {
    allCompanyOptions = uniqueArrayByKey(searchedCompaniesFilter.concat([selectedCompanyOption]), 'key')
  } else {
    allCompanyOptions = searchedCompaniesFilter
  }

  const filterValue = state[currentTab]

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
                  searchQuery.length > 0 && searchCompanies(searchQuery)
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
              <FormattedMessage id={item.BtnAddText} defaultMessage='Add'>
                {text => `${text} `}
              </FormattedMessage>
            </Button>
          </div>
          <ColumnSettingButton divide={true} />
        </div>
      </CustomRowDiv>
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
