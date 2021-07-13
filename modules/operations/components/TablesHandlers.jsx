import { useEffect, useState } from 'react'
import { Button, Input, Dropdown } from 'semantic-ui-react'
import { Input as FormikInput } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { PlusCircle } from 'react-feather'
import moment from 'moment'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
// Components
import { DateInput } from '../../../components/custom-formik'
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'
// Hooks
import { usePrevious } from '../../../hooks'
// Styles
import { PositionHeaderSettings, CustomRowDiv, DivColumn } from '../styles'
// Services
import { withDatagrid } from '../../datagrid'
import { getSafe, uniqueArrayByKey } from '../../../utils/functions'
import { 
  validationSchema, 
  initFilterValues, 
  handleFiltersValue, 
  handleFilterChangeMappedUnmapped, 
  handleFilterChangeInputSearch,
  handleFilterChangeCompany,
  searchCompanies
} from './TablesHandlers.services'
// Constants
import { OrdersFilters } from '../constants'
import { textsTable } from '../constants'

/**
 * TablesHanders Component
 * @category Operations
 * @components
 */
const TablesHandlers = props => {
  let formikPropsNew
  const prevCurrentTab = usePrevious(props.currentTab)
  
  const [state, setState] = useState({
    'shipping-quotes': {
      searchInput: ''
    },
    'shipping-quote-requests': {
      searchInput: ''
    },
    tags: {
      searchInput: ''
    },
    'company-product-catalog': {
      searchInput: '',
      company: ''
    },
    'company-inventory': {
      searchInput: ''
    },
    orders: {
      status: 'all',
      orderId: '',
      company: '',
      dateFrom: '',
      dateTo: ''
    },
    'company-generic-products': {
      searchInput: ''
    }
  })

  useEffect(() => {
    const { tableHandlersFilters, currentTab } = props
    if (currentTab === '') return
    if (tableHandlersFilters) {
      initFilterValues(tableHandlersFilters, props, formikPropsNew, setState)
    } else {
      let filterValue = state[currentTab]
      handleFiltersValue(filterValue, props, formikPropsNew)
    }
  }, [])

  useEffect(() => {
    if (typeof prevCurrentTab !== 'undefined') {
      const { currentTab } = props
      if (currentTab === '') return

      let filterValue = state[currentTab]
      handleFiltersValue(filterValue, props, formikProps)
    }
  }, [props.currentTab])

  const renderHandler = () => {
    const {
      currentTab,
      openPopup,
      intl: { formatMessage },
      searchedCompaniesLoading,
      searchedCompanies,
      searchedCompaniesByName,
      companyProductUnmappedOnly
    } = props

    let companiesOptions, companiesOptionsByName

    const item = textsTable[currentTab]

    const filterValue = state[currentTab]

    if (filterValue && filterValue.company) {
      const d = JSON.parse(filterValue.company)
      companiesOptions = uniqueArrayByKey(
        searchedCompanies.concat([
          {
            key: d.id,
            value: filterValue.company,
            text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
          }
        ]),
        'key'
      )

      companiesOptionsByName = uniqueArrayByKey(
        searchedCompaniesByName.concat([
          {
            key: d.id,
            value: filterValue.company,
            text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
          }
        ]),
        'key'
      )
    } else {
      companiesOptions = searchedCompanies
      companiesOptionsByName = searchedCompaniesByName
    }

    return (
      <Formik
        initialValues={{ dateFrom: '', dateTo: '', orderId: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
        validateOnChange={true}
        render={formikProps => {
          formikPropsNew = formikProps

          switch (currentTab) {
            case 'company-product-catalog':
              return (
                <>
                  <div>
                    <div className='column'>
                      <Input
                        style={{ width: 340 }}
                        name='searchInput'
                        icon='search'
                        value={filterValue.searchInput}
                        placeholder={formatMessage({
                          id: item.SearchText,
                          defaultMessage: 'Select Credit Card'
                        })}
                        onChange={(e, data) => { handleFilterChangeInputSearch(data, props, formikProps, state, setState) }}
                      />
                    </div>
                    <div className='column'>
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
                        options={companiesOptions}
                        search={options => options}
                        value={filterValue.company}
                        loading={searchedCompaniesLoading}
                        onSearchChange={(e, { searchQuery }) => {
                          searchQuery.length > 0 && searchCompanies(searchQuery, props)
                        }}
                        onChange={(e, data) => { handleFilterChangeCompany(data, props, formikProps, state, setState) }}
                      />
                    </div>
                    <DivColumn className='column'>
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
                        onChange={(e, { value }) => { handleFilterChangeMappedUnmapped(value, props, formikProps, state) }}
                      />
                    </DivColumn>
                    <ColumnSettingButton divide={true} />
                  </div>
                </>
              )

            case 'orders':
              return (
                <>
                  <div>
                    <div className='column'>
                      <Dropdown
                        style={{ width: '220px' }}
                        name='status'
                        selection
                        value={filterValue.status}
                        options={Object.keys(OrdersFilters).map((name, index) => ({
                          key: index,
                          text: formatMessage({ id: `orders.statusOptions.${name}` }),
                          value: name
                        }))}
                        onChange={(e, data) => { handleFilterChangeInputSearch(data, props, formikProps, state, setState) }}
                      />
                    </div>
                    <div className='column'>
                      <FormikInput
                        name='orderId'
                        inputProps={{
                          style: { width: '370px' },
                          placeholder: formatMessage({
                            id: 'orders.searchByOrderID',
                            defaultMessage: 'Search By Order ID'
                          }),
                          icon: 'search',
                          onChange: (e, data) => { handleFilterChangeInputSearch(data, props, formikProps, state, setState) }
                        }}
                      />
                    </div>
                    <div className='column'>
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
                        options={companiesOptionsByName}
                        search={options => options}
                        value={filterValue.company}
                        loading={searchedCompaniesLoading}
                        onSearchChange={(e, { searchQuery }) => {
                          searchQuery.length > 0 && searchCompanies(searchQuery, props)
                        }}
                        onChange={(e, data) => { handleFilterChangeCompany(data, props, formikProps, state, setState) }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className='column' style={{ paddingTop: '10px' }}>
                      <FormattedMessage id='orders.orderDate' defaultMessage='Order Date' />
                    </div>
                    <div className='column'>
                      <DateInput
                        name='dateFrom'
                        inputProps={{
                          style: { width: '220px' },
                          maxDate: moment(),
                          clearable: true,
                          placeholder: formatMessage({
                            id: 'global.from',
                            defaultMessage: 'From'
                          }),
                          onChange: (e, data) => { handleFilterChangeInputSearch(data, props, formikProps, state, setState) }
                        }}
                      />
                    </div>
                    <DivColumn className='column'>
                      <DateInput
                        name='dateTo'
                        inputProps={{
                          style: { width: '220px' },
                          maxDate: moment(),
                          clearable: true,
                          placeholder: formatMessage({
                            id: 'global.to',
                            defaultMessage: 'To'
                          }),
                          onChange: (e, data) => { handleFilterChangeInputSearch(data, props, formikProps, state, setState) }
                        }}
                      />
                    </DivColumn>
                    <ColumnSettingButton divide={true} />
                  </div>
                </>
              )

            default:
              return (
                <>
                  <div>
                    {item.SearchText && (
                      <div className='column'>
                        <Input
                          style={{ width: 340 }}
                          name='searchInput'
                          icon='search'
                          value={filterValue.searchInput}
                          placeholder={formatMessage({
                            id: item.SearchText,
                            defaultMessage: 'Select Credit Card'
                          })}
                          onChange={(e, data) => { handleFilterChangeInputSearch(data, props, formikProps, state, setState) }}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {item.BtnAddText && (
                      <DivColumn className='column'>
                        <Button fluid primary onClick={() => openPopup()} data-test='operations_open_popup_btn'>
                          <PlusCircle />
                          <FormattedMessage id={item.BtnAddText} />
                        </Button>
                      </DivColumn>
                    )}
                    {currentTab === 'tags' ? <></> : <ColumnSettingButton divide={currentTab === 'company-generic-products' ? false : true} /> }
                  </div>
                </>
              )
          }
        }}
      />
    )
  }

  return (
    <PositionHeaderSettings>
      <CustomRowDiv>{renderHandler()}</CustomRowDiv>
    </PositionHeaderSettings>
  )
}

TablesHandlers.propTypes = {
  currentTab: PropTypes.string,
  tableHandlersFilters: PropTypes.object,
  saveFilters: PropTypes.func,
  openPopup: PropTypes.func,
  intl: PropTypes.object,
  searchedCompaniesLoading: PropTypes.bool,
  searchedCompanies: PropTypes.array,
  searchedCompaniesByName: PropTypes.array,
  companyProductUnmappedOnly: PropTypes.string,
  datagrid: PropTypes.object,
  setSearch: PropTypes.func,
  setProductMappedUnmaped: PropTypes.func,
  searchCompany: PropTypes.func
}

TablesHandlers.defaultValues = {
  currentTab: '',
  tableHandlersFilters: null,
  saveFilters: () => {},
  openPopup: () => {},
  intl: {},
  searchedCompaniesLoading: false,
  searchedCompanies: [],
  searchedCompaniesByName: [],
  companyProductUnmappedOnly: 'ALL',
  datagrid: {},
  setSearch: () => {},
  setProductMappedUnmaped: () => {},
  searchCompany: () => {}
}

export default withDatagrid(injectIntl(TablesHandlers))
