import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Grid, Input, Dropdown } from 'semantic-ui-react'
import { debounce } from 'lodash'
//components
import { Datagrid } from '~/modules/datagrid'
import { withDatagrid } from '~/modules/datagrid'
import { uniqueArrayByKey } from '~/utils/functions'
//actions
import { searchTags } from '../actions'

class SearchByNamesAndTags extends Component {
  state = {
    filterName: '',
    filterTags: [],
    filterTagsValues: [],
  }

  componentDidMount() {
    const { initFilterState } = this.props
    // ! ! console.log('!!!!!!!!!! SearchByNamesAndTags componentDidMount this.props', this.props)
    if (initFilterState) {
      this.setState(initFilterState.state)
      if (this.props.filterApply) this.handleFiltersValue(initFilterState.filters)
    }
    try {
      this.props.searchTags('')
    } catch (error) {
      console.error(error)
    }
  }

  handleFiltersValue = debounce(filters => {
    if (Datagrid.isReady()) Datagrid.setSearch(filters, true, 'searchByNamesAndTags')
  }, 250)

  handleTagsSearchChange = debounce((_, { searchQuery }) => {
    this.props.searchTags(searchQuery)
  }, 250)

  handleInputFilterChange = (e, { value }) => {
    const filterTagsValues = this.state.filterTags.length > 0 ? this.state.filterTags.map(option => option.key) : []
    this.setState({ filterName: value, filterTagsValues })
    const filters = {
      filterName: value,
      filterTags: filterTagsValues
    }
    if (this.props.filterApply) this.handleFiltersValue(filters)
    this.props.onChange({
      state: {
        ...this.state,
        filterName: value,
        filterTagsValues
      },
      filters
    })
  }

  handleTagsChange = (value, options) => {
    const selectedTags = options.length > 0 ? options.filter(el => value.some(v => el.value === v)) : []
    const filterTagsValues = selectedTags.length > 0 ? selectedTags.map(option => option.key) : []
    this.setState({ filterTags: selectedTags, filterTagsValues })
    const filters = {
      filterName: this.state.filterName,
      filterTags: selectedTags.length > 0 ? selectedTags.map(option => option.key) : []
    }
    if (this.props.filterApply) this.handleFiltersValue(filters)
    this.props.onChange({
      state: {
        ...this.state,
        filterTags: selectedTags,
        filterTagsValues
      },
      filters
    })
  }

  render() {
    const {
      tags: searchedTags,
      loading,
      intl: { formatMessage }
    } = this.props
    const { filterName, filterTags, filterTagsValues } = this.state

    const allTagsOptions = uniqueArrayByKey(searchedTags.concat(filterTags), 'key')

    return (
      <Fragment>
        <Grid.Column width={4} style={{ paddingTop: '9px' }}>
          <Input
            fluid
            icon='search'
            value={filterName}
            onChange={this.handleInputFilterChange}
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
            value={filterTagsValues}
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
  searchTags: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  filterApply: PropTypes.bool
}

SearchByNamesAndTags.defaultProps = {
  loading: false,
  tags: [],
  searchTags: () => {},
  onChange: () => {},
  filterApply: true
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  tags: state.search.tags.map(d => {
    return {
      key: d.id,
      text: d.name,
      value: d.id
    }
  })
})

export default withDatagrid(connect(mapStateToProps, { searchTags })(injectIntl(SearchByNamesAndTags)))
