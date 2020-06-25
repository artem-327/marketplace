import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { debounce } from 'lodash'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import { withRouter } from 'next/router'
import { DateInput } from '~/components/custom-formik'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { currency } from '~/constants/index'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import moment from 'moment'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { errorMessages, dateValidation, dateBefore } from '~/constants/yupValidation'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'

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
  
  input, .ui.dropdown {
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
    dateFrom: values.dateFrom && values.dateTo && Yup.string().test(
      'is-before',
      <FormattedMessage
        id='orders.dateMustBeSameOrBefore'
        defaultMessage={`Date must be same or before ${values.dateTo}`}
        values={{ date: values.dateTo }}
      />,
      function () {
        let parsedDate = moment(this.parent['dateFrom'], getLocaleDateFormat())
        let parsedBeforeDate = moment(this.parent['dateTo'], getLocaleDateFormat())
        return (!parsedBeforeDate.isValid()) || parsedDate.isSameOrBefore(parsedBeforeDate)
      }
    ),
    orderId: values.orderId && Yup.number()
      .typeError(errorMessages.mustBeNumber)
      .test('int', errorMessages.integer, val => {
        return val % 1 === 0
      })
      .positive(errorMessages.positive)
      .test(
        'numbers',
        errorMessages.mustBeNumber,
        value => /^[0-9]*$/.test(value)
      )
  }
  return Yup.object().shape({ ...validationObject })
})

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: {
        status: 'all',
        orderId: '',
        dateFrom: '',
        dateTo: ''
      }
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 250)
  }

  componentDidMount() {
    const { tableHandlersFilters } = this.props
    const status = localStorage['orders-status-filter']

    if (tableHandlersFilters) {
      this.initFilterValues({
        ...tableHandlersFilters,
        status: status ? status : tableHandlersFilters.status
      })
    } else {
      const filterValue = {
        ...this.state.filterValue,
        status: status ? status : this.state.filterValue.status
      }
      this.setState({ filterValue })
      this.handleFiltersValue(filterValue)
    }
  }

  componentWillUnmount() {
    this.props.saveFilters(this.state.filterValue)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.queryType !== this.props.queryType) {
      this.props.datagrid.clear()
      this.handleFiltersValue(this.state.filterValue)
    }
  }

  initFilterValues = tableHandlersFilters => {
    const { setValues, setFieldTouched } = this.formikProps
    this.setState({ filterValue: tableHandlersFilters })

    setValues({
      dateFrom: tableHandlersFilters.dateFrom,
      dateTo: tableHandlersFilters.dateTo,
      orderId: tableHandlersFilters.orderId
    })
    setFieldTouched('dateFrom', true, true)
    this.handleFiltersValue(tableHandlersFilters)
  }

  handleFiltersValue = value => {
    const { datagrid } = this.props
    const orderIdError = getSafe(() => this.formikProps.errors.orderId, false)
    const dateFromError = getSafe(() => this.formikProps.errors.dateFrom, false)

    let filterValue = {
      status: getSafe(() => filters[value.status].filters, ''),
      orderId: !orderIdError && value.orderId ? value.orderId : '',
      dateFrom: value.dateFrom && !dateFromError ? getStringISODate(value.dateFrom) : '',
      dateTo: value.dateTo ? moment(getStringISODate(value.dateTo)).endOf('day').format() : ''
    }
    datagrid.setSearch(filterValue, true, 'pageFilters')
  }

  handleFilterChange = (e, value) => {
    const filterValue = {
      ...this.state.filterValue,
      [value.name]: value.value
    }
    if (value.name === 'status') localStorage['orders-status-filter'] = value.value

    this.setState({ filterValue })
    this.handleFiltersValue(filterValue)
  }

  handleDateFilterChange = (e, value) => {
    const filterValue = {
      ...this.state.filterValue,
      [value.name]: value.value
    }
    this.setState({ filterValue })
    this.handleFiltersValue(filterValue)
  }

  renderHandler = () => {
    const {
      intl: {formatMessage}
    } = this.props

    const {filterValue} = this.state

    return (
      <Formik
        initialValues={{ dateFrom: '', dateTo: '', orderId: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
        validateOnChange={true}
        render={(formikProps) => {
          this.formikProps = formikProps

          return (
            <>
              <div>
                <div className='column'>
                  <Dropdown
                    style={{ width: '220px' }}
                    name='status'
                    selection
                    value={filterValue.status}
                    options={Object.keys(filters).map((name, index) => ({
                      key: index,
                      text: formatMessage({ id: `orders.statusOptions.${name}` }),
                      value: name
                    }))}
                    onChange={this.handleFilterChange}
                  />
                </div>
                <div className='column'>
                  <Input
                    name='orderId'
                    inputProps={{
                      style: { width: '370px' },
                      placeholder: formatMessage({
                        id: 'orders.searchByOrderID',
                        defaultMessage: 'Search By Order ID...'
                      }),
                      icon: 'search',
                      onChange: this.handleFilterChange
                    }}
                  />
                </div>
              </div>
              <div>
                <div className='column' style={{ paddingTop: '10px' }}>
                  <FormattedMessage id='orders.orderDate' defaultMessage='Order Date'/>
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
                      onChange: this.handleDateFilterChange
                    }}
                  />
                </div>
                <div className='column'>
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
                      onChange: this.handleDateFilterChange
                    }}
                  />
                </div>
              </div>
            </>
          )
        }}
      />
    )
  }

  render() {
    return (
      <PositionHeaderSettings>
        <CustomRowDiv>
          {this.renderHandler()}
        </CustomRowDiv>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = (state, { router } )=> {
  const query = router ? router.query : { type: 'sales' }
  const { type } = query

  return {
    ...state,
    queryType: type,
    tableHandlersFilters: state.orders.tableHandlersFilters
  }
}

export default withDatagrid(
  withDatagrid(withToastManager(withRouter(
    connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
  ))
)