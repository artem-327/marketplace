import { createRef, Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { debounce } from 'lodash'
import { uniqueArrayByKey, getSafe } from '../../../utils/functions'
import * as Actions from '../actions'
import styled from 'styled-components'
import { Header } from 'semantic-ui-react'

const DivSearchTitleInOption = styled.div`
  padding: 6px 16px;
  color: #848893;
`

const StyledDropdown = styled(Dropdown)`
  z-index: 501 !important;
  height: auto !important;
  min-height: 40px !important;
  input.search {
    height: auto !important;
  }
`

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.refDropdownMenu = createRef()
    this.state = {
      filterProductName: '',
      filterCasProduct: [],
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

  handleSearchChange = (e, data) => {
    this.setState({ searchQuery: data.searchQuery })
    this.handleSearchQuery(e, data)
  }

  handleSearchQuery = debounce((e, { searchQuery }) => {
    e && e.persist()
    try {
      this.props.componentSearchProduct(searchQuery)
      this.props.componentSearchCas(searchQuery)
    } catch (error) {
      console.error(error)
    }
    if (searchQuery.trim() === '') {
      this.refDropdownMenu.current.close()
    }
  }, 150)

  handleClick = (e, data, typeCas = false) => {
    const { products, casProducts } = this.props
    if (!data) return
    e && e.persist()

    let active = this.state.active.slice()
    active.push(data.value)

    let usedOptions = this.state.usedOptions.slice()
    if (typeCas) {
      const option = casProducts.find(option => option.value === data.value)
      if (option) usedOptions.push(option)
    } else {
      const option = products.find(option => option.value === data.value)
      if (option) usedOptions.push(option)
    }

    let filterProductName = [],
      filterCasProduct = []
    active.forEach(val => {
      if (val.charAt(0) === 'p') filterProductName.push(parseInt(val.substring(2)))
      if (val.charAt(0) === 'c') filterCasProduct.push(parseInt(val.substring(2)))
    })

    const filters = { filterProductName, filterCasProduct }

    this.props.onChange({
      filters,
      active,
      usedOptions
    })
    this.setState({ active, usedOptions })
  }

  handleDeleteClick = (e, data) => {
    const { usedOptions } = this.state
    let newUsedOptions = []

    usedOptions.forEach(el => {
      if (data.value.some(val => val === el.value)) newUsedOptions.push(el)
    })

    let filterProductName = [],
      filterCasProduct = []
    data.value.forEach(val => {
      if (val.charAt(0) === 'p') filterProductName.push(val.substring(2))
      if (val.charAt(0) === 'c') filterCasProduct.push(parseInt(val.substring(2)))
    })

    const filters = { filterProductName, filterCasProduct }

    this.props.onChange({
      filters,
      active: data.value,
      usedOptions: newUsedOptions
    })

    this.setState({ active: data.value, usedOptions: newUsedOptions })
  }

  render() {
    const {
      casProducts,
      products,
      loading,
      intl: { formatMessage }
    } = this.props
    const { active, usedOptions, searchQuery } = this.state

    const searchedCasProducts = casProducts
      .slice()
      .filter(el => !active.length || !active.some(opt => opt === el.value))

    const searchedProducts = products.slice().filter(el => !active.length || !active.some(opt => opt === el.value))

    const allOptions = uniqueArrayByKey(products.concat(casProducts).concat(usedOptions), 'key')

    return (
      <Fragment>
        <StyledDropdown
          fluid
          name='products'
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
            id: 'wantedBoard.searchByProductName',
            defaultMessage: 'Search by product name...'
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
            {getSafe(() => searchedProducts.length, '')
              ? searchedProducts.map(option => {
                  return option && option.text ? (
                    <Dropdown.Item
                      key={option.key}
                      text={option.text}
                      value={option.value}
                      active={active.some(val => val === option.value)}
                      onClick={(e, data) => this.handleClick(e, data, false)}
                    />
                  ) : null
                })
              : null}
            <Dropdown.Divider />
            <DivSearchTitleInOption>
              {formatMessage({ id: 'wantedBoard.showByCasProduct', defaultMessage: 'Show by CAS Product:' })}
            </DivSearchTitleInOption>
            {searchedCasProducts.map(option => {
              return (
                <Dropdown.Item
                  key={option.key}
                  text={option.text}
                  value={option.value}
                  content={option.content}
                  active={active.some(val => val === option.value)}
                  onClick={(e, data) => this.handleClick(e, data, true)}
                />
              )
            })}
          </Dropdown.Menu>
        </StyledDropdown>
      </Fragment>
    )
  }
}

SearchInput.propTypes = {
  onChange: PropTypes.func,
  filterApply: PropTypes.bool
}

SearchInput.defaultProps = {
  onChange: () => {},
  filterApply: true
}

const mapStateToProps = state => {
  return {
    loading: state.wantedBoard.componentSearchProductsLoading || state.wantedBoard.componentSearchCasLoading,
    products: getSafe(() => state.wantedBoard.componentSearchProducts.length, '')
      ? state.wantedBoard.componentSearchProducts.map(product => {
          return {
            key: `p_${product.id}`,
            text: product.name,
            value: `p_${product.id}`
          }
        })
      : [],
    casProducts: getSafe(() => state.wantedBoard.componentSearchCas.length, '')
      ? state.wantedBoard.componentSearchCas.map(cas => {
          const casIndexName = getSafe(() => cas.casIndexName, '')
          const casNumber = getSafe(() => cas.casNumber, '')
          return {
            key: `c_${cas.id}`,
            text: `${casNumber ? casNumber + ' ' : ''} ${casIndexName}`,
            value: `c_${cas.id}`,
            content: <Header content={casNumber} subheader={casIndexName} style={{ fontSize: '1em' }} />
          }
        })
      : []
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(SearchInput))
