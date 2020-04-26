import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import Router, { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Grid, Input, Dropdown } from 'semantic-ui-react'
import { debounce } from 'lodash'
//components
import { Datagrid } from '~/modules/datagrid'
import { withDatagrid } from '~/modules/datagrid'
import { getSafe, uniqueArrayByKey } from '~/utils/functions'
//actions
import { searchTags, applyDatagridFilter } from '../actions'

class SearchByNamesAndTags extends Component {
  state = {
    searchValue: '',
    selectedTags: []
  }

  componentDidMount() {
    try {
      this.props.searchTags('')
    } catch (error) {
      console.error(error)
    }
  }

  handleFiltersValue = debounce(filters => {
    if (Datagrid.isReady()) {
      Datagrid.setSearch(filters, true, 'searchByNamesAndTags')
    } else this.props.applyDatagridFilter(filters)
  }, 250)

  handleSearchViaPattern = debounce((filters, isEmptyTag) => {
    if (!filters) return
    if (Datagrid.isReady()) {
      Datagrid.setSearchPattern(filters.or)
      isEmptyTag && Datagrid.setSearch(this.state.searchValue, true, 'searchByNamesAndTags')
    }
  }, 250)

  handleFilterChange = (e, { value }) => {
    this.setState({ searchValue: value })
    const filters = {
      or: value,
      and: this.state.selectedTags.length > 0 ? this.state.selectedTags.map(option => option.key) : []
    }
    getSafe(() => Router.router.pathname === '/wanted-board/wanted-board', false)
      ? this.handleSearchViaPattern(filters)
      : this.handleFiltersValue(filters)
  }

  handleTagsSearchChange = debounce((_, { searchQuery }) => {
    this.props.searchTags(searchQuery)
  }, 250)

  handleTagsChange = (value, options) => {
    const newOptions = options.length > 0 ? options.filter(el => value.some(v => el.value === v)) : []
    this.setState({ selectedTags: newOptions })
    const filters = {
      or: this.state.searchValue,
      and: newOptions.length > 0 ? newOptions.map(option => option.key) : []
    }
    getSafe(() => Router.router.pathname === '/wanted-board/wanted-board', false) && !filters.and.length
      ? this.handleSearchViaPattern(filters, true)
      : this.handleFiltersValue(filters)
  }

  render() {
    const {
      tags,
      loading,
      intl: { formatMessage }
    } = this.props
    const { searchValue, selectedTags } = this.state

    const allTagsOptions = uniqueArrayByKey(tags.concat(selectedTags), 'key')

    return (
      <Fragment>
        <Grid.Column width={4} style={{ paddingTop: '9px' }}>
          <Input
            fluid
            icon='search'
            value={searchValue}
            onChange={this.handleFilterChange}
            placeholder={formatMessage({
              id: 'myInventory.searchByProductName',
              defaultMessage: 'Search by product name...'
            })}
          />
        </Grid.Column>
        <Grid.Column width={4} style={{ paddingTop: '9px' }}>
          <Dropdown
            style={{ zIndex: '501' }}
            fluid
            name='tags'
            options={allTagsOptions}
            loading={loading}
            search
            icon='search'
            selection
            multiple
            placeholder={formatMessage({
              id: 'global.selectTags',
              defaultMessage: 'Select tags'
            })}
            noResultsMessage={formatMessage({
              id: 'global.startTypingToSearch',
              defaultMessage: 'Start typing to begin search'
            })}
            onSearchChange={this.handleTagsSearchChange}
            onChange={(_, { value }) => this.handleTagsChange(value, allTagsOptions)}
          />
        </Grid.Column>
      </Fragment>
    )
  }
}

SearchByNamesAndTags.propTypes = {
  loading: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  applyDatagridFilter: PropTypes.func.isRequired,
  Datagrid: PropTypes.object.isRequired,
  searchTags: PropTypes.func.isRequired,
  datagridFilterUpdate: PropTypes.bool.isRequired,
  datagridFilter: PropTypes.object.isRequired
}

SearchByNamesAndTags.defaultProps = {
  loading: false,
  datagridFilterUpdate: false,
  tags: [],
  applyDatagridFilter: () => {},
  searchTags: () => {},
  Datagrid: {},
  datagridFilter: {}
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  tags: state.search.tags.map(d => {
    return {
      key: d.id,
      text: d.name,
      value: d.id
    }
  }),
  datagridFilterUpdate: state.search.datagridFilterUpdate,
  datagridFilter: state.search.datagridFilter
})

export default withRouter(
  withDatagrid(connect(mapStateToProps, { searchTags, applyDatagridFilter })(injectIntl(SearchByNamesAndTags)))
)
