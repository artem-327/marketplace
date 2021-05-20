import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Header, Menu, Button, Input, Grid, GridRow, GridColumn, Dropdown } from 'semantic-ui-react'
import { debounce } from 'lodash'
import { CornerLeftDown, PlusCircle } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
// Components
import ColumnSettingButton from '../../../components/table/ColumnSettingButton'
import { CustomRowDiv } from '../../companies/constants'
// Services
import { withDatagrid } from '../../datagrid'
// Styles
import { PositionHeaderSettings, DivColumn } from '../styles'
// Constants
import { textsTable } from '../constants'

/**
 * @Component
 * @category Products - Components / TablesHandlers
 */
const TablesHandlers = props => {
  const [state, setState] = useState({})

  useEffect(() => {
    const { tableHandlersFilters, currentTab, datagrid } = props

    datagrid.clear()
    if (tableHandlersFilters) {
      setState(tableHandlersFilters)
      if (currentTab) {
        const filter = tableHandlersFilters[currentTab]
        if (filter) {
          handleFiltersValue(filter)
        } else {
          handleFiltersValue(null)
        }
      }
    } else {
      if (currentTab) {
        const filter = state[currentTab]
        if (filter) {
          handleFiltersValue(filter)
        } else {
          handleFiltersValue(null)
        }
      }
    }
  }, [])

  useEffect(() => {
    props.handleVariableSave('tableHandlersFilters', state)
    props.datagrid.clear()
    const filter = state[props.currentTab]
    if (filter) {
      handleFiltersValue(filter)
    } else {
      handleFiltersValue(null)
    }
  }, [state, props.currentTab])

  const handleFiltersValue = debounce(filter => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  const handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = props
    if (currentTab === '') return

    const filter = {
      ...state[currentTab],
      [data.name]: data.value
    }
    setState({ [currentTab]: filter })
    handleFiltersValue(filter)
  }

  const renderHandler = () => {
    const {
      currentTab,
      openPopup,
      intl: { formatMessage },
      openImportPopup
    } = props

    const item = textsTable[currentTab]
    const filterValue = state[currentTab]

    return (
      <CustomRowDiv>
        <div>
          <div className='column'>
            {item.SearchText && (
              <Input
                style={{ width: 340 }}
                icon='search'
                name='searchInput'
                value={filterValue && filterValue.searchInput ? filterValue.searchInput : ''}
                placeholder={formatMessage({
                  id: item.SearchText,
                  defaultMessage: 'Search CAS product by name or number '
                })}
                onChange={handleFilterChangeInputSearch}
              />
            )}
          </div>
        </div>
        <div>
          {currentTab === 'product-catalog' ? (
            <div className='column'>
              <Button size='large' onClick={() => openImportPopup()} data-test='products_import_btn'>
                <CornerLeftDown />
                {formatMessage({ id: 'myInventory.import', defaultMessage: 'Import' })}
              </Button>
            </div>
          ) : null}
          {item.BtnAddText && (
            <DivColumn className='column'>
              <Button
                fluid
                primary
                onClick={() => openPopup()}
                data-test='products_open_popup_btn'>
                <PlusCircle />
                <FormattedMessage id={item.BtnAddText} />
              </Button>
            </DivColumn>
          )}
          <ColumnSettingButton divide={true} />
        </div>
      </CustomRowDiv>
    )
  }

  return <PositionHeaderSettings>{renderHandler()}</PositionHeaderSettings>  
}

TablesHandlers.propTypes = {
  currentTab: PropTypes.string,
  tableHandlersFilters: PropTypes.object,
  datagrid: PropTypes.object,
  handleVariableSave: PropTypes.func,
  openPopup: PropTypes.func,
  isOpenImportPopup: PropTypes.bool,
  intl: PropTypes.object
}

TablesHandlers.defaultProps = {
  currentTab: '',
  tableHandlersFilters: null,
  datagrid: {},
  handleVariableSave: () => {},
  openPopup: () => {},
  isOpenImportPopup: false,
  intl: {}
}

export default withDatagrid(injectIntl(TablesHandlers))
