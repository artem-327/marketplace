import { createRef, Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Grid, Input, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { debounce } from 'lodash'
//components
import { Datagrid } from '../../datagrid'
import { withDatagrid } from '../../datagrid'
import { uniqueArrayByKey, getSafe } from '../../../utils/functions'
//actions
import { searchTags, searchProductOffersInventory, clearProductOffers } from '../actions'
//stylesheet
import styled from 'styled-components'

const DivRectangleTag = styled.div`
  //height: 20px;
  border-radius: 2px;
  background-color: #edeef2;
  padding: 4px;
  margin: 4px;
  cursor: pointer;
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

const StyledDropdown = styled(Dropdown)`
  z-index: 501 !important;
  height: auto !important;
  min-height: 40px !important;
  input.search {
    height: auto !important;
  }
`

class SearchByNamesAndTags extends Component {
  constructor(props) {
    super(props)
    this.refDropdownMenu = createRef()
    this.state = {
      filterName: '',
      filterTags: [],
      filterTagsValues: [],
      active: [],
      usedOptions: [],
      searchQuery: ''
    }
  }

  componentDidMount() {
    const { initFilterState } = this.props
    if (initFilterState) {
      this.setState({
        active: initFilterState.active,
        usedOptions: initFilterState.usedOptions
      })
    }
  }

  componentWillUnmount() {
    this.props.clearProductOffers()
  }

  handleSearchChange = (e, data) => {
    this.setState({ searchQuery: data.searchQuery })
    this.handleSearchQuery(e, data)
  }

  handleSearchQuery = debounce((e, { searchQuery }) => {
    e && e.persist()
    try {
      this.props.searchProductOffersInventory(searchQuery, this.props.filterType)
      this.props.searchTags(searchQuery)
    } catch (error) {
      console.error(error)
    }
    if (searchQuery.trim() === '') {
      this.refDropdownMenu.current.close()
    }
  }, 150)

  handleClick = (e, data, typeTag = false) => {
    const { productOffers, tags } = this.props
    if (!data) return
    e && e.persist()
    //this.refDropdownMenu.current.close()
    //this.refDropdownMenu.current.state.searchQuery = data.text
    //this.refDropdownMenu.current.props.onSearchChange(null, { searchQuery: data.text })

    let active = this.state.active.slice()
    active.push(data.value)

    let usedOptions = this.state.usedOptions.slice()
    if (typeTag) {
      const option = tags.find(option => option.value === data.value)
      if (option) usedOptions.push(option)
    } else {
      const option = productOffers.find(option => option.value === data.value)
      if (option) usedOptions.push(option)
    }

    let filterName = [],
      filterTags = []
    active.forEach(val => {
      if (val.charAt(0) === 'p') filterName.push(val.substring(2))
      if (val.charAt(0) === 't') filterTags.push(parseInt(val.substring(2)))
    })

    const filters = { filterName, filterTags }

    this.props.onChange({
      filters,
      active,
      usedOptions
    })
    this.setState({ active, usedOptions, searchQuery: '' })
  }

  handleDeleteClick = (e, data) => {
    const { usedOptions } = this.state
    let newUsedOptions = []

    usedOptions.forEach(el => {
      if (data.value.some(val => val === el.value)) newUsedOptions.push(el)
    })

    let filterName = [],
      filterTags = []
    data.value.forEach(val => {
      if (val.charAt(0) === 'p') filterName.push(val.substring(2))
      if (val.charAt(0) === 't') filterTags.push(parseInt(val.substring(2)))
    })

    const filters = { filterName, filterTags }

    this.props.onChange({
      filters,
      active: data.value,
      usedOptions: newUsedOptions
    })

    this.setState({ active: data.value, usedOptions: newUsedOptions })
  }

  render() {
    const {
      tags,
      productOffers,
      loading,
      intl: { formatMessage }
    } = this.props
    const { active, usedOptions, searchQuery } = this.state

    const searchedTags = tags.slice().filter(el => !active.length || !active.some(opt => opt === el.value))

    const searchedProductOffers = productOffers
      .slice()
      .filter(el => !active.length || !active.some(opt => opt === el.value))

    const allOptions = uniqueArrayByKey(productOffers.concat(tags).concat(usedOptions), 'key')

    return (
      <Fragment>
        <Grid.Column width={4} style={{ paddingTop: '9px' }}>
          <StyledDropdown
            fluid
            name='tags'
            loading={loading}
            search
            icon='search'
            selection
            options={allOptions}
            value={active}
            multiple
            searchQuery={searchQuery}
            clearable
            ref={this.refDropdownMenu}
            placeholder={formatMessage({
              id: 'myInventory.searchByProductOrTagName',
              defaultMessage: 'Search by product or tag name'
            })}
            noResultsMessage={formatMessage({
              id: 'global.startTypingToSearch',
              defaultMessage: 'Start typing to begin search'
            })}
            onChange={(e, data) => this.handleDeleteClick(e, data)}
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
                        active={active.some(val => val === option.value)}
                        onClick={(e, data) => this.handleClick(e, data)}
                      />
                    ) : null
                  })
                : null}
              <Dropdown.Divider />
              <DivSearchTitleInOption>Show all product by tag:</DivSearchTitleInOption>
              <DivTags>
                <DivItem>
                  {searchedTags.map(tag => (
                    <DivRectangleTag
                      key={tag.value}
                      onClick={e => this.handleClick(e, { value: tag.value, text: tag.text }, true)}>
                      {tag.text}
                    </DivRectangleTag>
                  ))}
                </DivItem>
              </DivTags>
            </Dropdown.Menu>
          </StyledDropdown>
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
  clearProductOffers: PropTypes.func,
  filterApply: PropTypes.bool,
  filterType: PropTypes.string
}

SearchByNamesAndTags.defaultProps = {
  loading: false,
  tags: [],
  productOffers: [],
  searchTags: () => {},
  onChange: () => {},
  clearProductOffers: () => {},
  filterApply: true,
  filterType: ''
}

const mapStateToProps = state => ({
  loading: state.search.loadingNames || state.search.loadingTags,
  tags: getSafe(() => state.search.tags.length, '')
    ? state.search.tags.map(tag => {
        return {
          key: `t_${tag.id}`,
          text: tag.name,
          value: `t_${tag.id}`
        }
      })
    : [],
  productOffers: getSafe(() => state.search.productOffers.length, '')
    ? uniqueArrayByKey(
        state.search.productOffers.map(offer => offer.companyProduct),
        'id'
      ).map(product => {
        return {
          key: `p_${product.id}`,
          text: getSafe(() => product.intProductName, ''),
          value: `p_${getSafe(() => product.intProductName, '')}`
        }
      })
    : []
})

export default withDatagrid(
  connect(mapStateToProps, { searchTags, searchProductOffersInventory, clearProductOffers })(
    injectIntl(SearchByNamesAndTags)
  )
)
