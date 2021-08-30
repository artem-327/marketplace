import { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { withToastManager } from 'react-toast-notifications'
// Components
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'
import { DateInput } from '../../../components/custom-formik'
// Services
import { getStringISODate } from '../../../components/date-format'
import { getSafe, generateToastMarkup } from '../../../utils/functions'
import { validationSchema } from './Orders.service'
import { getLocaleDateFormat } from '../../../components/date-format'
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

  let formikPropsNew

  useEffect(() => {
    const { tableHandlersFilters, currentTab } = props
    if (currentTab === '') return

    props.datagrid.clear()
    if (tableHandlersFilters) {
      setState(tableHandlersFilters)
      let filterValue = tableHandlersFilters[currentTab]
      
      if(formikPropsNew && Object.keys(formikPropsNew).length > 0) {
        const { setValues, setFieldTouched } = formikPropsNew
        setValues({
          dateFrom: filterValue.dateFrom,
          dateTo: filterValue.dateTo,
          orderId: filterValue.orderId
        })
        setFieldTouched('dateFrom', true, true)
      }    

      handleFiltersValue(tableHandlersFilters[currentTab])
    } else {
      handleFiltersValue(state[currentTab])
    }
  }, [])

  const handleFiltersValue = value => {
    const { datagrid } = props
    const orderIdError = getSafe(() => formikPropsNew.errors.orderId, false)
    const dateFromError = getSafe(() => formikPropsNew.errors.dateFrom, false)

    let filterValue = {
      status: getSafe(() => filters[value.status].filters, ''),
      orderId: !orderIdError && value.orderId ? value.orderId : '',
      dateFrom: value.dateFrom && !dateFromError ? getStringISODate(value.dateFrom) : '',
      dateTo: value.dateTo ? moment(getStringISODate(value.dateTo)).endOf('day').format() : ''
    }
    datagrid.setSearch(filterValue, true, 'pageFilters')
  }

  const handleFilterChange = debounce((e, data) => {
    const { currentTab } = props
    if (currentTab === '') return

    if(data.name === 'dateFrom' || data.name === 'dateTo') {
      //Gets separator (character) from getLocaleDateFormat.
      let separator = [...getLocaleDateFormat()].find(
        char => char !== 'M' && char !== 'D' && char !== 'Y'
      )
      // Checks and adds space if is space after dot.
      separator = getLocaleDateFormat().search(' ') > 0 ? `${separator} ` : separator

      const dateValue = data.value
      if(dateValue.length === 0 || dateValue.length > 9) {
        const dateFromArray = data.name === 'dateFrom' ? dateValue.split(separator) : formikPropsNew?.values?.dateFrom?.split(separator)
        const dateToArray = data.name === 'dateTo' ? dateValue.split(separator) : formikPropsNew?.values?.dateTo?.split(separator)
        let dateFrom = !!dateFromArray[0] ? new Date(dateFromArray[2], dateFromArray[0] - 1, dateFromArray[1]) : ''
        let dateTo = !!dateToArray[0] ? new Date(dateToArray[2], dateToArray[0] - 1, dateToArray[1]) : ''
        const { toastManager } = props

        if ( (dateFrom === '' || !!dateFrom && Object.prototype.toString.call(dateFrom) === "[object Date]" && !isNaN(dateFrom.getTime())) &&
            (dateTo === '' || !!dateTo && Object.prototype.toString.call(dateTo) === "[object Date]" && !isNaN(dateTo.getTime())) &&
            (getStringISODate(dateValue) !== 'Invalid date')
          ) {
          if(dateFrom !== '' && dateTo !=='' && dateFrom > dateTo) {
            toastManager.add(
              generateToastMarkup(
                <FormattedMessage
                  id='global.error'
                  defaultMessage='Error!'
                />,
                <FormattedMessage
                  id='orders.fromDateMustBeSameOrBeforeToDate'
                  defaultMessage={`From date must be same or before To date, please fix this issue first!`}
                />
              ),
              {
                appearance: 'error',
                pauseOnHover: true
              }
            )
          } else {
            setState({
              ...state,
              [currentTab]: {
                ...state[currentTab],
                [data.name]: data.value
              }
            })
        
            props.saveFilters({
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
            handleFiltersValue(filter)
          }
        } else {
          toastManager.add(
            generateToastMarkup(
              <FormattedMessage
                id='global.error'
                defaultMessage='Error!'
              />,
              <FormattedMessage
                id='orders.pleaseEnterTheValidDate'
                defaultMessage={`Please enter the valid date!`}
              />
            ),
            {
              appearance: 'error',
              pauseOnHover: true
            }
          )
        }
      }
    } else {
      setState({
        ...state,
        [currentTab]: {
          ...state[currentTab],
          [data.name]: data.value
        }
      })
  
      props.saveFilters({
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
      handleFiltersValue(filter)
    }
  }, 500)

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
          formikPropsNew = formikProps

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
                  <FormattedMessage id='orders.orderDate' defaultMessage='Order Date: ' />
                </div>
                <div className='column' style={{ paddingTop: '10px' }}>
                  <FormattedMessage id='global.from' defaultMessage='From' />
                </div>
                <div className='column'>
                  <DateInput
                    name='dateFrom'
                    inputProps={{
                      style: { width: '150px' },
                      maxDate: moment(),
                      clearable: true,
                      onChange: handleFilterChange
                    }}
                  />
                </div>
                <div className='column' style={{ paddingTop: '10px' }}>
                  <FormattedMessage id='global.to' defaultMessage='To' />
                </div>
                <div className='column' style={{ marginRight: '10px' }}>
                  <DateInput
                    name='dateTo'
                    inputProps={{
                      style: { width: '150px' },
                      maxDate: moment(),
                      clearable: true,
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

export default injectIntl(withToastManager(TablesHandlers))
