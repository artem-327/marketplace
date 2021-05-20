import { connect } from 'react-redux'
import { useEffect, useState, createRef } from 'react'
import { Popup } from 'semantic-ui-react'
import BasicButton from '../../../components/buttons/BasicButton'
import { debounce } from 'lodash'
import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { injectIntl, FormattedMessage } from 'react-intl'
import { getSafe } from '~/utils/functions'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import { Mail } from '@material-ui/icons'
import { Trash2 } from 'react-feather'

//Hooks
import { usePrevious } from '../../../hooks'

import { DivHeaderRow, DivHeaderSection, DivHeaderColumn, InputSearch } from './TablesHandlers.styles'

import {
  handleFiltersValue,
  handleFilterChangeInputSearch,
  handleButtonsChange,
  handleMarkAsSeen,
  handleDelete
} from './TablesHandlers.services'

const filtersValuesRef = createRef() // Needed ref for useEffect/return function to access the latest state

const TablesHandlers = props => {
  // Stores previos values for comparing with 'undefined' type to
  const prevCurrentTab = usePrevious(props.currentTab)
  const [filtersValues, setFiltersValues] = useState({})
  filtersValuesRef.current = filtersValues  // Needed ref for useEffect/return function to access the latest state

  const state = { filtersValues, setFiltersValues }

  const {
    intl: { formatMessage },
    currentTab,
    selectedRows
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    const { tableHandlersFilters, currentTab } = props
    handleFiltersValue({ category: currentTab }, props)

    if (tableHandlersFilters) {
      setFiltersValues(tableHandlersFilters)
      if (currentTab) {
        const filter = tableHandlersFilters[currentTab]
        if (filter) {
          handleFiltersValue({ ...filter, category: currentTab }, props)
        } else {
          handleFiltersValue({ category: currentTab }, props)
        }
      }
    } else {
      if (currentTab) {
        const filter = filtersValues[currentTab]
        if (filter) {
          handleFiltersValue({ ...filter, category: currentTab }, props)
        } else {
          handleFiltersValue({ category: currentTab }, props)
        }
      }
    }

    return () => {
      // Needed to use ref here to access the latest state
      props.handleVariableSave('tableHandlersFilters', filtersValuesRef.current)
    }

  }, [])  // If [] is empty then is similar as componentDidMount.

  useEffect(() => {
    if (typeof prevCurrentTab !== 'undefined') {  // To avoid call on 'componentDidMount'
      const filter = filtersValues[currentTab]
      if (filter) {
        handleFiltersValue({ ...filter, category: currentTab }, props)
      } else {
        handleFiltersValue({ category: currentTab }, props)
      }
    }
  }, [currentTab])

  const filterValue = filtersValues[currentTab]

  return (
    <DivHeaderRow>
      <DivHeaderSection>
        <DivHeaderColumn>
          <InputSearch
            icon='search'
            name='searchInput'
            value={filterValue && filterValue.searchInput ? filterValue.searchInput : ''}
            placeholder={formatMessage({
              id: 'alerts.searchNotification',
              defaultMessage: 'Search Notification'
            })}
            onChange={(e, data) => handleFilterChangeInputSearch(e, data, state, props)}
          />
        </DivHeaderColumn>
        <DivHeaderColumn>
          {!filterValue || filterValue.switchButtonsValue !== 'unread' ? (
            <BasicButton
              className='font-medium'
              active={filterValue && filterValue.switchButtonsValue === 'unread'}
              onClick={() => handleButtonsChange('unread', state, props)}>
              {formatMessage({ id: 'alerts.button.unread', defaultMessage: 'Unread' })}
            </BasicButton>
          ) : (
            <BasicButton
              active={!filterValue || !filterValue.switchButtonsValue}
              onClick={() => handleButtonsChange('', state, props)}>
              {formatMessage({ id: 'alerts.button.all', defaultMessage: 'All' })}
            </BasicButton>
          )}
        </DivHeaderColumn>
      </DivHeaderSection>
      <DivHeaderSection>
        <DivHeaderColumn>
          <Popup
            content={<FormattedMessage id='alerts.dropdown.markAsRead' defaultMessage='Mark as Read' />}
            trigger={
              <BasicButton
                icon={<Mail />}
                className={!selectedRows.length && 'disabled-style'}
                onClick={() => selectedRows.length && handleMarkAsSeen(props)}
              />
            }
            position='top center'
            inverted
            size='tiny'
          />
          <Popup
            content={<FormattedMessage id='alerts.dropdown.delete' defaultMessage='Delete' />}
            trigger={
              <BasicButton
                icon={<Trash2 />}
                className={!selectedRows.length && 'disabled-style'}
                onClick={() => selectedRows.length && handleDelete(props)}
              />
            }
            position='top center'
            inverted
            size='tiny'
          />
        </DivHeaderColumn>
      </DivHeaderSection>
    </DivHeaderRow>
  )
}

const mapStateToProps = ({ auth, alerts }) => {
  return {
    ...alerts,
    currentTab: alerts.topMenuTab
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
