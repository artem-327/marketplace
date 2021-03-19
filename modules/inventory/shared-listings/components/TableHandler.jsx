import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
//Styles
import { InputSearch, DropdownType, DivTableHandler } from './SharedListings.styles'

const TableHandler = props => {
  const [searchValue, setSearchValue] = useState('')
  const [location, setLocation] = useState('')
  const debounceSetQuery = useCallback(
    debounce(filter => props?.datagrid?.setSearch(filter, true, 'pageFilters'), 500), //
    []
  )

  return (
    <DivTableHandler>
      <InputSearch
        fluid
        icon='search'
        name='searchInput'
        value={searchValue}
        placeholder={props?.intl?.formatMessage({
          id: 'settings.tables.products.search',
          defaultMessage: 'Search product by name, code'
        })}
        onChange={(event, data) => {
          setSearchValue(data?.value)
          debounceSetQuery(data?.value) //FIXME prepare value for setSearch in datagrid
        }}
      />
      <DropdownType
        name='location'
        value={location}
        placeholder={props?.intl?.formatMessage({
          id: 'sharedListings.chooseLocation',
          defaultMessage: 'Choose Location'
        })}
        selection
        options={[
          //FIXME
          {
            key: 'ALL',
            text: 'Any Location',
            value: 'ALL'
          },
          {
            key: 'SOME',
            text: 'Some Location',
            value: 'SOME'
          },
          {
            key: 'USA',
            text: 'USA Location',
            value: 'USA'
          }
        ]}
        onChange={(event, data) => {
          setLocation(data?.value)
          props?.datagrid?.setSearch(data?.value, true, 'pageFilters') //FIXME prepare value for setSearch in datagrid
        }}
      />
    </DivTableHandler>
  )
}

TableHandler.propTypes = {}

export default TableHandler
