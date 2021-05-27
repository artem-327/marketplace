import { debounce } from 'lodash'


export const initFilterValues = (tableHandlersFilters, state, setState, props) => {
  const { currentTab } = props
  if (currentTab === '') return

  setState(tableHandlersFilters)
  handleFiltersValue(tableHandlersFilters[currentTab], props)
}

export const handleFiltersValue = debounce((filter, props) => {
  const { datagrid } = props
  datagrid.setSearch(filter, true, 'pageFilters')
}, 300)

export const handleFilterChangeInputSearch = (e, data, state, setState, props) => {
  const { currentTab } = props
  if (currentTab === '') return

  setState({
    ...state,
    [currentTab]: {
      ...state[currentTab],
      [data.name]: data.value
    }
  })

  const filter = {
    ...state[currentTab],
    [data.name]: data.value
  }
  handleFiltersValue(filter, props)
}

export const handleFilterChangeCompany = (e, data, state, setState, props) => {
  const { currentTab } = props
  if (currentTab === '') return

  setState({
    ...state,
    [currentTab]: {
      ...this.state[currentTab],
      [data.name]: data.value
    }
  })

  const filter = {
    ...state[currentTab],
    [data.name]: data.value
  }
  handleFiltersValue(filter, props)
}

export const searchCompanies = debounce(text => {
  props.searchCompanyFilter(text, 5)
}, 300)