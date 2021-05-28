import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { debounce } from 'lodash'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import { DateInput } from '../../../components/custom-formik'
import * as Actions from '../actions'
import { withDatagrid } from '../../datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { generateToastMarkup, getSafe } from '../../../utils/functions'
import moment from 'moment'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { errorMessages, dateValidation, dateBefore } from '../../../constants/yupValidation'
import { getLocaleDateFormat, getStringISODate } from '../../../components/date-format'
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: top;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 5px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }
`

const filters = {
  all: {
    filters: []
  },
  draft: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Draft`]
      }
    ]
  },
  pending: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Pending`]
      }
    ]
  },
  inTransit: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`In Transit`]
      }
    ]
  },
  review: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Review`]
      }
    ]
  },
  credit: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Credit`]
      }
    ]
  },
  completed: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Completed`]
      }
    ]
  },
  toShip: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`To Ship`]
      }
    ]
  },
  returned: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Returned`]
      }
    ]
  },
  declined: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Declined`]
      }
    ]
  },
  cancelled: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Cancelled`]
      }
    ]
  },
  toReturn: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`To Return`]
      }
    ]
  },
  confirmed: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Confirmed`]
      }
    ]
  }
}

const validationSchema = Yup.lazy(values => {
  let validationObject = {
    dateFrom:
      values.dateFrom &&
      values.dateTo &&
      dateValidation(false).concat(
        Yup.string().test(
          'is-before',
          <FormattedMessage
            id='orders.dateMustBeSameOrBefore'
            defaultMessage={`Date must be same or before ${values.dateTo}`}
            values={{ date: values.dateTo }}
          />,
          function () {
            let parsedDate = moment(this.parent['dateFrom'], getLocaleDateFormat())
            let parsedBeforeDate = moment(this.parent['dateTo'], getLocaleDateFormat())
            return !parsedBeforeDate.isValid() || parsedDate.isSameOrBefore(parsedBeforeDate)
          }
        )
      ),
    orderId:
      values.orderId &&
      Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .test('int', errorMessages.integer, val => {
          return val % 1 === 0
        })
        .positive(errorMessages.positive)
        .test('numbers', errorMessages.mustBeNumber, value => /^[0-9]*$/.test(value))
  }
  return Yup.object().shape({ ...validationObject })
})

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

const mapStateToProps = state => {
  return {
    ...state,
    tableHandlersFilters: state.orders.tableHandlersFilters
  }
}

export default withDatagrid(
  withDatagrid(withToastManager(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers))))
)
