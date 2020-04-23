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
    or: '',
    and: []
  }

  componentDidMount() {
    try {
      this.props.searchTags('')
    } catch (error) {
      console.error(error)
    }
  }

  handleFiltersValue = debounce(filters => {
    if (Datagrid.isReady()) Datagrid.setSearch(filters)
  }, 250)

  handleTagsSearchChange = debounce((_, { searchQuery }) => {
    this.props.searchTags(searchQuery)
  }, 250)

  handleFilterChange = (e, { value }) => {
    this.setState({ or: value })
    const filters = {
      or: value,
      and: this.state.and.length > 0 ? this.state.and.map(option => option.key) : [null]
    }
    this.handleFiltersValue(filters)
  }

  handleTagsChange = (value, options) => {
    const selectedTags = options.length > 0 ? options.filter(el => value.some(v => el.value === v)) : []
    this.setState({ and: selectedTags })
    const filters = {
      or: this.state.or,
      and: selectedTags.length > 0 ? selectedTags.map(option => option.key) : [null]
    }
    this.handleFiltersValue(filters)
  }

  render() {
    const {
      tags,
      loading,
      intl: { formatMessage }
    } = this.props
    const { or, and } = this.state

    const allTagsOptions = uniqueArrayByKey(tags.concat(and), 'key')

    return (
      <Fragment>
        <Grid.Column width={4} style={{ paddingTop: '9px' }}>
          <Input
            fluid
            icon='search'
            value={or}
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
  searchTags: PropTypes.func.isRequired
}

SearchByNamesAndTags.defaultProps = {
  loading: false,
  tags: [],
  searchTags: () => {}
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
