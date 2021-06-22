import { useEffect, useState } from 'react'
import { config } from '../config'
import { debounce } from 'lodash'
import { Button, Input } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { PlusCircle } from 'react-feather'
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'
// Hooks
import { usePrevious } from '../../../hooks'
// Styles
import { PositionHeaderSettings, DivCustomRow } from '../styles'

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
          handleFiltersValue(filter)
        } else {
          handleFiltersValue(null)
        }
      }
    } else {
      if (currentTab) {
        const filter = state[currentTab]
        if (filter) {
          handleFiltersValue(filter)
        } else {
          handleFiltersValue(null)
        }
      }
    }

    return () => { props.handleVariableSave('tableHandlersFilters', state) }
  }, [])

  useEffect(() => {
    if (typeof prevCurrentTab !== 'undefined') {
      const { currentTab } = props
      props.datagrid.clear()
      const filter = state[currentTab]
      if (filter) {
        handleFiltersValue(filter)
      } else {
        handleFiltersValue(null)
      }
    }
  }, [props.currentTab])

  const handleFiltersValue = debounce(filter => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  const handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = props
    if (currentTab === '') return

    const filter = {
      ...state[currentTab],
      [data.name]: data.value
    }
    setState({ [currentTab]: filter })
    handleFiltersValue(filter)
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
              {config[currentTab].addEditText}
            </Button>
          </div>
          <ColumnSettingButton divide={true} />
        </div>
      </DivCustomRow>
    </PositionHeaderSettings>
  )
}

export default TablesHandlers
