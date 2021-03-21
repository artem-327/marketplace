import { Component } from 'react'
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
import {getSafe} from "../../../../utils/functions";


class TableHandler extends Component {
  state = {
    location: '',
    SearchByNamesAndTags: null
  }

  /* used with <InputSearch/>
  const debounceSetQuery = useCallback(
    debounce(filter => this.props?.datagrid?.setSearch(filter, true, 'pageFilters'), 500), //
    []
  )
  */

  componentDidMount() {
    const { sharedListingsFilters } = this.props

    if (sharedListingsFilters) {
      this.setState(sharedListingsFilters)
      if (sharedListingsFilters) {
        this.props.datagrid.clear()
        this.handleFiltersValue(sharedListingsFilters)
      }
    } else {
      this.props.datagrid.clear()
      this.handleFiltersValue(this.state)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('sharedListingsFilters', this.state)
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  SearchByNamesAndTagsChanged = data => {
    this.setState(
      { SearchByNamesAndTags: data },
      () => {
        this.handleFiltersValue(this.state)
      }
    )
  }

  handleLocationChanged = data => {
    this.setState(
      { location: data?.value },
      () =>
        this.handleFiltersValue(this.state)
      )
  }

  render() {
    const {
      sharedListingsFilters
    } = this.props

    const { location } = this.state

    return (
      <DivTableHandler>
        <DivCustomSearchNameTags>
          <SearchByNamesAndTags
            onChange={this.SearchByNamesAndTagsChanged}
            initFilterState={getSafe(() => sharedListingsFilters.SearchByNamesAndTags, null)}
            filterApply={false}
          />
          {/* <InputSearch
          fluid
          icon='search'
          name='searchInput'
          value={searchValue}
          placeholder={this.props?.intl?.formatMessage({
            id: 'settings.tables.products.search',
            defaultMessage: 'Search product by name, code'
          })}
          onChange={(event, data) => {
            setSearchValue(data?.value)
            debounceSetQuery(data?.value) //FIXME prepare value for setSearch in datagrid
          }}
        /> */}
        </DivCustomSearchNameTags>
        <DivTableHandlerColumn>
          <DropdownType
            name='location'
            value={location}
            placeholder={this.props?.intl?.formatMessage({
              id: 'sharedListings.chooseLocation',
              defaultMessage: 'Choose Location'
            })}
            selection
            options={[
              //FIXME
              {
                key: 'ALL',
                text: 'Any Location',
                value: ''
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
            onChange={(event, data) => this.handleLocationChanged(data)}
          />
        </DivTableHandlerColumn>
      </DivTableHandler>
    )
  }
}

TableHandler.propTypes = {}

function mapStateToProps(store) {
  return {
    sharedListingsFilters: store.simpleAdd.sharedListingsFilters
  }
}

export default injectIntl(connect(mapStateToProps, Actions)(TableHandler))