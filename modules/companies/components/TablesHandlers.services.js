import { debounce } from 'lodash'

/**
 * Set the initial data table filter values.
 * @category Companies
 * @method
 * @param {object} tableHandlersFilters filter value
 * @param {object} state object with state values
 * @param {object} setState object with set state Hook functions
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const initFilterValues = (tableHandlersFilters, state, setState, props) => {
  const { currentTab } = props
  if (currentTab === '') return

  setState(tableHandlersFilters)
  handleFiltersValue(tableHandlersFilters[currentTab], props)
}

/**
 * Applies filter value to datagrid.
 * @category Companies
 * @method
 * @param {object} filter filter value
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const handleFiltersValue = debounce((filter, props) => {
  const { datagrid } = props
  datagrid.setSearch(filter, true, 'pageFilters')
}, 300)

/**
 * Set the data table filter values ('Search User' field value).
 * @category Companies
 * @method
 * @param {object} data filter name/value
 * @param {object} state object with state values
 * @param {function} setState object with set state Hook functions
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
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

  props.saveFilters({
    ...state,
    [currentTab]: {
      ...state[currentTab],
      [data.name]: data.value
    }
  })
  handleFiltersValue(filter, props)
}

/**
 * Set the data table filter values ('Search by Company' field value).
 * @category Companies
 * @method
 * @param {object} data filter name/value
 * @param {object} state object with state values
 * @param {function} setState object with set state Hook functions
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const handleFilterChangeCompany = (e, data, state, setState, props) => {
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

  props.saveFilters({
    ...state,
    [currentTab]: {
      ...state[currentTab],
      [data.name]: data.value
    }
  })

  handleFiltersValue(filter, props)
}

/**
 * Search company handling.
 * @category Companies
 * @method
 * @param {string} text filter value
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const searchCompanies = debounce((text, props) => {
  props.searchCompanyFilter(text, 5)
}, 300)