import { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
// Components
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'
import { DateInput } from '../../../components/custom-formik'
// Services
import { getStringISODate } from '../../../components/date-format'
import { getSafe } from '../../../utils/functions'
import { withDatagrid } from '../../datagrid'
import { validationSchema } from './Orders.service'
// Constants
import { filters } from '../constants'
// Styles
import {
  PositionHeaderSettings,
  CustomRowDiv
} from './Orders.styles'

const TablesHandlers = props => {
  const [state, setState] = useState({
    purchase: {
      status: 'all',
      orderId: '',
      dateFrom: '',
      dateTo: ''
    },
    sales: {
      status: 'all',
      orderId: '',
      dateFrom: '',
      dateTo: ''
    }
  })

  let formikProps = {}

  useEffect(() => {
    const { tableHandlersFilters, currentTab } = props
    if (currentTab === '') return

    if (tableHandlersFilters) {
      initFilterValues(tableHandlersFilters)
    } else {
      let allFilters = state

      const statusSales = localStorage['orders-status-filter-sales']
      const statusPurchase = localStorage['orders-status-filter-purchase']

      allFilters = {
        ...allFilters,
        purchase: {
          ...allFilters.purchase,
          status: statusPurchase ? statusPurchase : allFilters.purchase.status
        },
        sales: {
          ...allFilters.sales,
          status: statusSales ? statusSales : allFilters.sales.status
        }
      }

      setState(allFilters)
      handleFiltersValue(allFilters[currentTab])
    }

    return props.saveFilters(state)
  }, [])

  useEffect(() => {
    const { currentTab } = props
    if (currentTab === '') return

    let filterValue = state[currentTab]
    const status = localStorage[`orders-status-filter-${currentTab}`]
    filterValue = {
      ...filterValue,
      status: status ? status : filterValue.status
    }
    
    if(Object.keys(formikProps).length > 0) {
      const { setValues, setFieldTouched } = formikProps
      setValues({
        dateFrom: filterValue.dateFrom,
        dateTo: filterValue.dateTo,
        orderId: filterValue.orderId
      })
      setFieldTouched('dateFrom', true, true)

      setState({ ...state, [currentTab]: filterValue })
    }    

    props.datagrid.clear()
    handleFiltersValue(filterValue)
  }, [props.currentTab])

  const initFilterValues = initTableHandlersFilters => {
    const { currentTab } = props
    if (currentTab === '') return
    const statusSales = localStorage['orders-status-filter-sales']
    const statusPurchase = localStorage['orders-status-filter-purchase']

    const tableHandlersFilters = {
      ...initTableHandlersFilters,
      purchase: {
        ...initTableHandlersFilters.purchase,
        status: statusPurchase ? statusPurchase : initTableHandlersFilters.purchase.status
      },
      sales: {
        ...initTableHandlersFilters.sales,
        status: statusSales ? statusSales : initTableHandlersFilters.sales.status
      }
    }
    setState(tableHandlersFilters)

    if(Object.keys(formikProps).length > 0) {
      const { setValues, setFieldTouched } = formikProps

      setValues({
        dateFrom: tableHandlersFilters[currentTab].dateFrom,
        dateTo: tableHandlersFilters[currentTab].dateTo,
        orderId: tableHandlersFilters[currentTab].orderId
      })
      setFieldTouched('dateFrom', true, true)
    }

    handleFiltersValue(tableHandlersFilters[currentTab])
  }

  const handleFiltersValue = value => {
    const { datagrid } = props
    const orderIdError = getSafe(() => formikProps.errors.orderId, false)
    const dateFromError = getSafe(() => formikProps.errors.dateFrom, false)

    let filterValue = {
      status: getSafe(() => filters[value.status].filters, ''),
      orderId: !orderIdError && value.orderId ? value.orderId : '',
      dateFrom: value.dateFrom && !dateFromError ? getStringISODate(value.dateFrom) : '',
      dateTo: value.dateTo ? moment(getStringISODate(value.dateTo)).endOf('day').format() : ''
    }
    datagrid.setSearch(filterValue, true, 'pageFilters')
  }

  const handleFilterChange = (e, data) => {
    const { currentTab } = props
    if (currentTab === '') return

    setState({
      ...state,
      [currentTab]: {
        ...state[currentTab],
        [data.name]: data.value
      }
    })
    if (data.name === 'status') localStorage[`orders-status-filter-${currentTab}`] = data.value

    const filter = {
      ...state[currentTab],
      [data.name]: data.value
    }
    handleFiltersValue(filter)
  }

  const renderHandler = () => {
    const {
      currentTab,
      intl: { formatMessage }
    } = props
    const filterValue = state[currentTab]

    return (
      <Formik
        initialValues={{ dateFrom: '', dateTo: '', orderId: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
        validateOnChange={true}
        render={formikProps => {
          formikProps = formikProps

          return (
            <>
              <div>
                <div className='column'>
                  <Input
                    name='orderId'
                    inputProps={{
                      style: { width: '200px' },
                      placeholder: formatMessage({
                        id: 'orders.searchByOrderID',
                        defaultMessage: 'Search By Order ID'
                      }),
                      icon: 'search',
                      onChange: handleFilterChange
                    }}
                  />
                </div>
                <div className='column'>
                  <Dropdown
                    style={{ width: '170px' }}
                    name='status'
                    selection
                    value={filterValue.status}
                    options={Object.keys(filters).map((name, index) => ({
                      key: index,
                      text: formatMessage({ id: `orders.statusOptions.${name}` }),
                      value: name
                    }))}
                    onChange={handleFilterChange}
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
                      style: { width: '150px' },
                      maxDate: moment(),
                      clearable: true,
                      placeholder: formatMessage({
                        id: 'global.from',
                        defaultMessage: 'From'
                      }),
                      onChange: handleFilterChange
                    }}
                  />
                </div>
                <div className='column' style={{ marginRight: '10px' }}>
                  <DateInput
                    name='dateTo'
                    inputProps={{
                      style: { width: '150px' },
                      maxDate: moment(),
                      clearable: true,
                      placeholder: formatMessage({
                        id: 'global.to',
                        defaultMessage: 'To'
                      }),
                      onChange: handleFilterChange
                    }}
                  />
                </div>
                <ColumnSettingButton divide={true} />
              </div>
            </>
          )
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
  tableHandlersFilters: PropTypes.object,
  currentTab: PropTypes.string,
  datagrid: PropTypes.object,
  intl: PropTypes.object
}

TablesHandlers.defaultValues = {
  tableHandlersFilters: {},
  currentTab: '',
  datagrid: {},
  intl: {}
}

export default withDatagrid(injectIntl(TablesHandlers))
