import { debounce } from 'lodash'

export const handleFiltersValue = debounce((filter, props) => {
  const { datagrid } = props
  datagrid.setSearch(filter, true, 'pageFilters')
}, 300)

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





