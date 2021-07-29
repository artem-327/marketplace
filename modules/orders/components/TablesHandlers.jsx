import { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
// Components
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'
import { DateInput } from '../../../components/custom-formik'
// Services
import { getStringISODate } from '../../../components/date-format'
import { getSafe } from '../../../utils/functions'
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
      if(dateValue.length === 0 || 
        dateValue.length === 10 && dateValue[2] === separator && dateValue[5] === separator || 
        dateValue.length === 12 && dateValue[2] === separator.split('')[0] && dateValue[6] === separator.split('')[0]) {
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

export default injectIntl(TablesHandlers)
