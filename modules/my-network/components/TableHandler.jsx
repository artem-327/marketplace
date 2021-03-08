import { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { debounce } from 'lodash'
//Components
import { withDatagrid } from '../../datagrid'
//Styles
import { ContainerCustom, InputSearch, DropdownType } from '../MyNetwork.styles'
//Constants
import { NETWORK_TYPES } from '../constants'
import { Key } from 'react-feather'

/**
 * Shows input and dropdown for search connection or filter by type of connectin
 * @category My Network
 * @component
 */
const TableHandler = props => {
  const [searchValue, setSearchValue] = useState('')
  const [networkStatus, setNetworkStatus] = useState('')
  const debounceSetQuery = useCallback(
    debounce((val, key) => props.datagrid.setQuery({ [key]: val }), 500),
    []
  )

  const status = props?.datagrid?.query?.status

  useEffect(() => {
    if (status !== networkStatus) {
      setNetworkStatus(status)
    }
  }, [status, networkStatus, setNetworkStatus])

  return (
    <>
      <InputSearch
        fluid
        icon='search'
        name='searchInput'
        value={searchValue}
        placeholder={props.intl.formatMessage({
          id: 'myNetworks.search',
          defaultMessage: 'Search your connection'
        })}
        onChange={(event, data) => {
          setSearchValue(data.value)
          debounceSetQuery(data.value, 'companyName')
        }}
      />

      <DropdownType
        name='networkStatus'
        value={networkStatus}
        placeholder={props.intl.formatMessage({
          id: 'myNetworks.filterByType',
          defaultMessage: 'Filter by type'
        })}
        selection
        options={NETWORK_TYPES}
        onChange={(event, data) => {
          setNetworkStatus(data.value)
          props.datagrid.setQuery({ status: data.value })
        }}
      />
    </>
  )
}

TableHandler.propTypes = {
  datagrid: PropTypes.object
}
TableHandler.defaultProps = {
  datagrid: null
}

export default withDatagrid(injectIntl(TableHandler))
