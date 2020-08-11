import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Grid, Input, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { debounce } from 'lodash'
//components
import { Datagrid } from '~/modules/datagrid'
import { withDatagrid } from '~/modules/datagrid'
import { uniqueArrayByKey, getSafe } from '~/utils/functions'
//actions
import { searchTags, searchProductOffersInventory } from '../actions'
//stylesheet
import styled from 'styled-components'

const DivRectangleTag = styled.div`
  height: 20px;
  border-radius: 2px;
  background-color: #edeef2;
  padding: 4px;
  margin: 4px;
`

const DivItem = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DivSearchTitleInOption = styled.div`
  padding: 6px 16px;
  color: #848893;
`

const DivTags = styled.div`
  padding: 2px 12px;
`

class SearchByNamesAndTags extends Component {
  state = {
    filterName: '',
    filterTags: [],
    filterTagsValues: [],
    active: null
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

  handleSearchChange = debounce((_, { searchQuery }) => {
    try {
      this.props.searchProductOffersInventory(searchQuery)
      this.props.searchTags(searchQuery)
    } catch (error) {
      console.error(error)
    }
  }, 150)

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

  handleChange = (value, options) => {
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

  handleClickItem = (e, data) => {
    this.setState({ active: data.value })
  }

  render() {
    const {
      tags: searchedTags,
      productOffers: searchedProductOffers,
      loading,
      intl: { formatMessage }
    } = this.props
    const { filterName, filterTags, filterTagsValues, active } = this.state

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
            loading={loading}
            search
            icon='search'
            selection
            placeholder={formatMessage({
              id: 'global.selectTags',
              defaultMessage: 'Select tags'
            })}
            noResultsMessage={formatMessage({
              id: 'global.startTypingToSearch',
              defaultMessage: 'Start typing to begin search'
            })}
            onSearchChange={this.handleSearchChange}>
            <Dropdown.Menu>
              <Dimmer inverted active={loading}>
                <Loader />
              </Dimmer>
              {getSafe(() => searchedProductOffers.length, '')
                ? searchedProductOffers.map((option, i) => {
                    return option && option.text ? (
                      <Dropdown.Item
                        key={option.key}
                        text={option.text}
                        value={option.value}
                        active={active === option.value}
                        onClick={(e, data) => this.handleClickItem(e, data)}
                      />
                    ) : null
                  })
                : null}
              <Dropdown.Divider />
              <DivSearchTitleInOption>Show all product by tag:</DivSearchTitleInOption>
              <DivTags>
                <DivItem>
                  {searchedTags.map(tag => (
                    <DivRectangleTag>{tag.text}</DivRectangleTag>
                  ))}
                </DivItem>
              </DivTags>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Fragment>
    )
  }
}

SearchByNamesAndTags.propTypes = {
  loading: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired,
  productOffers: PropTypes.array,
  searchTags: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  filterApply: PropTypes.bool
}

SearchByNamesAndTags.defaultProps = {
  loading: false,
  tags: [],
  productOffers: [],
  searchTags: () => {},
  onChange: () => {},
  filterApply: true
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  tags: getSafe(() => state.search.tags.length, '')
    ? state.search.tags.map(tag => {
        return {
          key: tag.id,
          text: tag.name,
          value: tag.id
        }
      })
    : [],
  productOffers: getSafe(() => state.search.productOffers.length, '')
    ? uniqueArrayByKey(
        state.search.productOffers.map(offer => offer.companyProduct),
        'id'
      ).map(product => ({
        key: product.id,
        text: getSafe(() => product.intProductName, ''),
        value: product.id
      }))
    : []
})

export default withDatagrid(
  connect(mapStateToProps, { searchTags, searchProductOffersInventory })(injectIntl(SearchByNamesAndTags))
)
