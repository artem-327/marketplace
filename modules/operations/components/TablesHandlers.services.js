import * as Yup from 'yup'
import moment from 'moment'
import { debounce } from 'lodash'
// Services
import { getLocaleDateFormat, getStringISODate } from '../../../components/date-format'
import { getSafe } from '../../../utils/functions'
// Constants
import { errorMessages, dateValidation } from '../../../constants/yupValidation'
import { OrdersFilters } from '../constants'

export const validationSchema = Yup.lazy(values => {
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


export const initFilterValues = (initTableHandlersFilters, props, formikProps, setState) => {
    const { currentTab } = props
    if (currentTab === '') return
    const status = localStorage['operations-orders-status-filter']

    const tableHandlersFilters = {
    ...initTableHandlersFilters,
    orders: {
        ...initTableHandlersFilters.orders,
        status: status ? status : initTableHandlersFilters.orders.status
    }
    }
    setState({ ...tableHandlersFilters })

    if(formikProps) {
    const { setValues, setFieldTouched } = formikProps

    setValues({
        dateFrom: tableHandlersFilters.orders.dateFrom,
        dateTo: tableHandlersFilters.orders.dateTo,
        orderId: tableHandlersFilters.orders.orderId
    })
    setFieldTouched('dateFrom', true, true)
    }

    handleFiltersValue(tableHandlersFilters[currentTab], props, formikProps)
}

export const handleFiltersValue = debounce((value, props, formikProps) => {
    const { datagrid, currentTab } = props

    const orderIdError = getSafe(() => formikProps.errors.orderId, false)
    const dateFromError = getSafe(() => formikProps.errors.dateFrom, false)

    let filter = value
    if (currentTab === 'orders') {
    filter = {
        ...value,
        status: getSafe(() => OrdersFilters[value.status].filters, ''),
        orderId: !orderIdError && value.orderId ? value.orderId : '',
        dateFrom: value.dateFrom && !dateFromError ? getStringISODate(value.dateFrom) : '',
        dateTo: value.dateTo ? moment(getStringISODate(value.dateTo)).endOf('day').format() : ''
    }
    }
    datagrid.setSearch(filter, true, 'pageFilters')
}, 500)

export const handleFilterChangeMappedUnmapped = (value, props, formikProps, state) => {
    const { currentTab } = props
    if (currentTab === '') return
    props.setProductMappedUnmaped(value)
    handleFiltersValue(state[currentTab], props, formikProps)
}

export const handleFilterChangeInputSearch = (data, props, formikProps, state, setState) => {
    const { currentTab } = props
    if (currentTab === '') return

    setState({
    ...state,
    [currentTab]: {
        ...state[currentTab],
        [data.name]: data.value
    }
    })

    if (currentTab === 'orders' && data.name === 'status') {
    localStorage['operations-orders-status-filter'] = data.value
    }

    const filter = {
    ...state[currentTab],
    [data.name]: data.value
    }
    handleFiltersValue(filter, props, formikProps)
}

export const handleFilterChangeCompany = (data, props, formikProps, state, setState) => {
    const { currentTab } = props
    if (currentTab === '') return

    setState({
    ...state,
    [currentTab]: {
        ...state[currentTab],
        [data.name]: data.value
    }
    })

    const filter = {
    ...state[currentTab],
    [data.name]: data.value
    }
    handleFiltersValue(filter, props, formikProps)
}

export const searchCompanies = debounce((text, props) => {
    props.searchCompany(text, 5)
}, 250)
