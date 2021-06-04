import { debounce } from 'lodash'

/**
 * Applies filter value to datagrid.
 * @category Alerts
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
 * Set the data table filter values.
 * @category Alerts
 * @method
 * @param {object} data filter name/value
 * @param {object} state object with state values and set state Hook functions
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const handleFilterChangeInputSearch = (e, data, state, props) => {
  const { currentTab } = props
  const { filtersValues, setFiltersValues } = state
  if (currentTab === '') return

  const filter = {
    ...filtersValues[currentTab],
    [data.name]: data.value
  }
  setFiltersValues({
    ...filtersValues,
    [currentTab]: filter
  })
  handleFiltersValue({ ...filter, category: currentTab }, props)
}

/**
 * Set the data table filter values.
 * @category Alerts
 * @method
 * @param {object} value filter value
 * @param {object} state object with state values and set state Hook functions
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const handleButtonsChange = (value, state, props) => {
  handleFilterChangeInputSearch(
    null,
    {
      name: 'switchButtonsValue',
      value
    },
    state,
    props
  )
  if (props.onDatagridUpdate) props.onDatagridUpdate([])
}

/**
 * Updates the notification message status.
 * @category Alerts
 * @method
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const handleMarkAsSeen = async props => {
  const { datagrid, selectedRows, onDatagridUpdate, markSeenArray } = props
  try {
    await markSeenArray({ messages: selectedRows })
    if (onDatagridUpdate) onDatagridUpdate([])
    datagrid.loadData()
  } catch (err) {
    console.error(err)
  }
}

/**
 * Deletes notification message.
 * @category Alerts
 * @method
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const handleDelete = async props => {
  const { datagrid, selectedRows, onDatagridUpdate, deleteArray } = props
  try {
    await deleteArray({ messages: selectedRows })
    if (onDatagridUpdate) onDatagridUpdate([])
    datagrid.loadData()
  } catch (err) {
    console.error(err)
  }
}





