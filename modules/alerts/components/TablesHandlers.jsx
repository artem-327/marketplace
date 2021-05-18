import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Input, Dropdown, Popup } from 'semantic-ui-react'
import BasicButton from '../../../components/buttons/BasicButton'
import { debounce } from 'lodash'
import styled from 'styled-components'

import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { injectIntl, FormattedMessage } from 'react-intl'
import { getSafe } from '~/utils/functions'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import { Drafts, Mail, DeleteForever } from '@material-ui/icons'
import { Trash2 } from 'react-feather'

//Hooks
import { usePrevious } from '../../../hooks'

const CustomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: center;
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

const TablesHandlers = props => {
  // Stores previos values for compating with current value
  const prevCurrentTab = usePrevious(props.currentTab)

  const [filtersValues, setFiltersValues ] = useState({})
  const {
    intl: { formatMessage },
    currentTab,
    selectedRows
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    const { tableHandlersFilters } = props
    let { currentTab } = props

    currentTab = null
    handleFiltersValue({ category: currentTab })

    if (tableHandlersFilters) {
      setFiltersValues(tableHandlersFilters)
      if (currentTab) {
        const filter = tableHandlersFilters[currentTab]
        if (filter) {
          handleFiltersValue({ ...filter, category: currentTab })
        } else {
          handleFiltersValue({ category: currentTab })
        }
      }
    } else {
      if (currentTab) {
        const filter = filtersValues[currentTab]
        if (filter) {
          handleFiltersValue({ ...filter, category: currentTab })
        } else {
          handleFiltersValue({ category: currentTab })
        }
      }
    }

    return () => {
      console.log('!!!!!!!!!! return componentDidMount')
    }

  }, [])  // If [] is empty then is similar as componentDidMount.

  /*
  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFilters', this.state)
  }
  */

  useEffect(() => {
    console.log('!!!!!!!!!! useEffect filtersValues')

    return () => {
      console.log('!!!!!!!!!! useEffect filtersValues return', filtersValues)
    }
  }, [filtersValues])

  useEffect(() => {
    if (typeof prevCurrentTab !== 'undefined') {  // To avoid call on 'componentDidMount'
      const filter = filtersValues[currentTab]
      if (filter) {
        handleFiltersValue({ ...filter, category: currentTab })
      } else {
        handleFiltersValue({ category: currentTab })
      }
    }
  }, [currentTab])


  const handleFiltersValue = debounce(filter => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  const handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = props
    if (currentTab === '') return

    const filter = {
      ...filtersValues[currentTab],
      [data.name]: data.value
    }
    setFiltersValues({
      ...filtersValues,
      [currentTab]: filter
    })
    handleFiltersValue({ ...filter, category: currentTab })
  }

  const handleButtonsChange = value => {
    handleFilterChangeInputSearch(null, {
      name: 'switchButtonsValue',
      value
    })
    if (props.onDatagridUpdate) props.onDatagridUpdate([])
  }

  const handleMarkAsSeen = async () => {
    const { datagrid, selectedRows, onDatagridUpdate, markSeenArray } = props
    try {
      await markSeenArray({ messages: selectedRows })
      if (onDatagridUpdate) onDatagridUpdate([])
      datagrid.loadData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleMarkAsUnseen = async () => {
    const { datagrid, selectedRows, onDatagridUpdate, markUnseenArray } = props
    try {
      await markUnseenArray({ messages: selectedRows })
      if (onDatagridUpdate) onDatagridUpdate([])
      datagrid.loadData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    const { datagrid, selectedRows, onDatagridUpdate, deleteArray } = props
    try {
      await deleteArray({ messages: selectedRows })
      if (onDatagridUpdate) onDatagridUpdate([])
      datagrid.loadData()
    } catch (err) {
      console.error(err)
    }
  }

  const filterValue = filtersValues[currentTab]

  console.log('!!!!!!!!!! render filtersValues', filtersValues)

  return (
    <CustomDiv>
      <div>
        <div className='column'>
          <Input
            style={{ width: 370 }}
            icon='search'
            name='searchInput'
            value={filterValue && filterValue.searchInput ? filterValue.searchInput : ''}
            placeholder={formatMessage({
              id: 'alerts.searchNotification',
              defaultMessage: 'Search Notification'
            })}
            onChange={handleFilterChangeInputSearch}
          />
        </div>
        <div className='column'>
          {!filterValue || filterValue.switchButtonsValue !== 'unread' ? (
            <BasicButton
              className='font-medium'
              active={filterValue && filterValue.switchButtonsValue === 'unread'}
              onClick={() => handleButtonsChange('unread')}>
              {formatMessage({ id: 'alerts.button.unread', defaultMessage: 'Unread' })}
            </BasicButton>
          ) : (
            <BasicButton
              active={!filterValue || !filterValue.switchButtonsValue}
              onClick={() => handleButtonsChange('')}>
              {formatMessage({ id: 'alerts.button.all', defaultMessage: 'All' })}
            </BasicButton>
          )}
        </div>
      </div>
      <div>
        <div className='column'>
          <Popup
            content={<FormattedMessage id='alerts.dropdown.markAsRead' defaultMessage='Mark as Read' />}
            trigger={
              <BasicButton
                icon={<Mail />}
                className={!selectedRows.length && 'disabled-style'}
                onClick={() => selectedRows.length && handleMarkAsSeen()}
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
                onClick={() => selectedRows.length && handleDelete()}
              />
            }
            position='top center'
            inverted
            size='tiny'
          />
        </div>
      </div>
    </CustomDiv>
  )
}

const mapStateToProps = ({ auth, alerts }) => {
  return {
    ...alerts,
    currentTab: alerts.topMenuTab
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
