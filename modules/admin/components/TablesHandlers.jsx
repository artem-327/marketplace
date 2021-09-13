import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { Button, Input } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { PlusCircle } from 'react-feather'
import PropTypes from 'prop-types'
// Components
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'
// Constants
import { config } from '../constants'
// Hooks
import { usePrevious } from '../../../hooks'
// Styles
import { PositionHeaderSettings, DivCustomRow } from '../styles'

/**
 * Handle Filter Value Change
 * @category Admin Settings
 * @method
 */
const handleFiltersValue = debounce((filter, props) => {
  const { datagrid } = props
  datagrid.setSearch(filter, true, 'pageFilters')
  props.handleVariableSave('tableHandlersFilters', { [props.currentTab]: filter })
}, 300)

/**
 * TablesHandlers Component
 * @category Admin Settings
 * @components
 */
const TablesHandlers = props => {
  const [state, setState] = useState({})
  const prevCurrentTab = usePrevious(props.currentTab)

  useEffect(() => {
    const { tableHandlersFilters, currentTab, datagrid } = props

    datagrid.clear()
    if (tableHandlersFilters) {
      setState(tableHandlersFilters)
      if (currentTab) {
        const filter = tableHandlersFilters[currentTab]
        if (filter) {
          handleFiltersValue(filter, props)
        } else {
          handleFiltersValue(null, props)
        }
      }
    } else {
      if (currentTab) {
        const filter = state[currentTab]
        if (filter) {
          handleFiltersValue(filter, props)
        } else {
          handleFiltersValue(null, props)
        }
      }
    }

    return () => props.handleVariableSave('tableHandlersFilters', state)
  }, [])

  useEffect(() => {
    if (typeof prevCurrentTab !== 'undefined') {
      const { currentTab } = props
      props.datagrid.clear()
      const filter = state[currentTab]
      if (filter) {
        handleFiltersValue(filter, props)
      } else {
        handleFiltersValue(null, props)
      }
    }
  }, [props.currentTab])

  /**
   * Handle Filter Value Change in Input Search
   * @category Admin Settings
   * @method
   */
  const handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = props
    if (currentTab === '') return

    const filter = {
      ...state[currentTab],
      [data.name]: data.value
    }
    setState({ [currentTab]: filter })
    handleFiltersValue(filter, props)
  }

  const { currentTab, openPopup, intl } = props

  const { formatMessage } = intl
  const filterValue = state[currentTab]

  return (
    <PositionHeaderSettings>
      <DivCustomRow>
        <div>
          <div className='column'>
            <Input
              style={{ width: 340 }}
              icon='search'
              name='searchInput'
              placeholder={formatMessage({ id: config[currentTab].searchText })}
              onChange={handleFilterChangeInputSearch}
              value={filterValue && filterValue.searchInput ? filterValue.searchInput : ''}
            />
          </div>
        </div>
        <div>
          <div className='column'>
            <Button size='large' data-test='admin_table_add_btn' primary onClick={() => openPopup()}>
              <PlusCircle />
              <FormattedMessage id='global.add' defaultMessage='Add' />
              &nbsp;
              {config[currentTab].addEditText}
            </Button>
          </div>
          {
            currentTab !== 'manufacturers' && 
            currentTab !== 'grades' && 
            currentTab !== 'forms' && 
            currentTab !== 'conditions' && 
            currentTab !== 'associations' && 
            <ColumnSettingButton divide={true} />
          }
        </div>
      </DivCustomRow>
    </PositionHeaderSettings>
  )
}

TablesHandlers.propTypes = {
  currentTab: PropTypes.string,
  tableHandlersFilters: PropTypes.object,
  datagrid: PropTypes.object,
  handleVariableSave: PropTypes.func,
  openPopup: PropTypes.func,
  intl: PropTypes.object
}

TablesHandlers.defaultValues = {
  currentTab: '',
  tableHandlersFilters: null,
  datagrid: {},
  handleVariableSave: () => {},
  openPopup: () => {},
  intl: {}
}

export default TablesHandlers
