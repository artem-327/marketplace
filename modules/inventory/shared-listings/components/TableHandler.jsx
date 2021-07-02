import { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { injectIntl } from 'react-intl'

//Styles
import {
  InputSearch,
  DropdownType,
  DivTableHandler,
  DivCustomSearchNameTags,
  DivTableHandlerColumn
} from './SharedListings.styles'
//Components
import SearchByNamesAndTags from '../../../search'
import { getSafe } from '../../../../utils/functions'

const TableHandler = props => {
  const [state, setState] = useState({
    SearchByNamesAndTags: null
  })

  useEffect(() => {
    const { sharedListingsFilters } = props

    if (sharedListingsFilters) {
      setState(sharedListingsFilters)
      if (sharedListingsFilters) {
        props.datagrid.clear()
        handleFiltersValue(sharedListingsFilters)
      }
    } else {
      props.datagrid.clear()
      handleFiltersValue(state)
    }

    return () => props.handleVariableSave('sharedListingsFilters', state)
  }, [])

  const handleFiltersValue = debounce(filter => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  const SearchByNamesAndTagsChanged = data => {
    setState({ SearchByNamesAndTags: data })
    handleFiltersValue({ SearchByNamesAndTags: data })
  }

  const { sharedListingsFilters } = props

  return (
    <DivTableHandler>
      <DivCustomSearchNameTags>
        <SearchByNamesAndTags
          onChange={SearchByNamesAndTagsChanged}
          initFilterState={getSafe(() => sharedListingsFilters.SearchByNamesAndTags, null)}
          filterType='sharedListings'
          filterApply={false}
        />
      </DivCustomSearchNameTags>
    </DivTableHandler>
  )
}

TableHandler.propTypes = {}

function mapStateToProps(store) {
  return {
    sharedListingsFilters: store.simpleAdd.sharedListingsFilters
  }
}

export default injectIntl(connect(mapStateToProps, Actions)(TableHandler))
