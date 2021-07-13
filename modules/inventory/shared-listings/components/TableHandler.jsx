import { useEffect } from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
// Styles
import {
  DivTableHandler,
  DivCustomSearchNameTags
} from './SharedListings.styles'
// Components
import SearchByNamesAndTags from '../../../search'
import { getSafe } from '../../../../utils/functions'

/**
 * TableHandler Component
 * @category Inventory - Shared Listings
 * @components
 */
const TableHandler = props => {
  const [state, setState] = useState({
    SearchByNamesAndTags: null
  })

  useEffect(() => {
    const { sharedListingsFilters } = props

    if (sharedListingsFilters) {
      setState(sharedListingsFilters)
      props.datagrid.clear()
      handleFiltersValue(sharedListingsFilters)
    } else {
      props.datagrid.clear()
      handleFiltersValue(state)
    }
  }, [])

  const handleFiltersValue = debounce(filter => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  const SearchByNamesAndTagsChanged = data => {
    setState({ SearchByNamesAndTags: data })
    props.handleVariableSave('sharedListingsFilters', { SearchByNamesAndTags: data })
    handleFiltersValue({ SearchByNamesAndTags: data })
  }

  return (
    <DivTableHandler>
      <DivCustomSearchNameTags>
        <SearchByNamesAndTags
          onChange={SearchByNamesAndTagsChanged}
          initFilterState={getSafe(() => props.sharedListingsFilters.SearchByNamesAndTags, null)}
          filterType='sharedListings'
          filterApply={false}
        />
      </DivCustomSearchNameTags>
    </DivTableHandler>
  )
}

TableHandler.propTypes = {
  sharedListingsFilters: PropTypes.object,
  datagrid: PropTypes.object,
  handleVariableSave: PropTypes.func
}

TableHandler.defaultProps = {
  sharedListingsFilters: {},
  datagrid: {},
  handleVariableSave: () => {}
}

export default TableHandler
