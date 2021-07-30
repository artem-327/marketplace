import { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Container, Input } from 'semantic-ui-react'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
// Components
import ProdexGrid from '../../../../components/table'
import Tutorial from '../../../tutorial/Tutorial'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
// Constants
import { groupActionsMarketplace } from '../../../company-product-info/constants'
// Styles
import { HoldDropdown, CustomRowDiv } from '../../styles'
// Services
import { handleFiltersValue, handleFilterChange, getRows, getColumns } from './Holds.services'

/**
 * Holds Component
 * @category Marketplace - Holds
 * @components
 */
const Holds = props => {
  const [state, setState] = useState({
    selectedRows: [],
    open: false,
    filterValue: {
      searchInput: '',
      holdDropdown: 'My Holds'
    }
  })

  useEffect(() => {
    const { tableHandlersFiltersHolds } = props

    if (tableHandlersFiltersHolds) {
      setState({ ...state, filterValue: tableHandlersFiltersHolds })
      handleFiltersValue(tableHandlersFiltersHolds, props)
    } else {
      handleFiltersValue(state.filterValue, props)
    }

    return props.handleVariableSave('tableHandlersFiltersHolds', state.filterValue)
  }, [])

  const { rows, datagrid, intl, toggleHolds } = props
  const { filterValue } = state

  let { formatMessage } = intl

  return (
    <Container fluid style={{ padding: '10px 30px' }} className='flex stretched'>
      {<Tutorial marginHolds isTutorial={false} isBusinessVerification={true} />}
      <div style={{ padding: '10px 0' }}>
        <CustomRowDiv>
          <div>
            <div className='column'>
              <Input
                fluid
                icon='search'
                name='searchInput'
                value={filterValue.searchInput}
                onChange={(e, data) => handleFilterChange(data, props, state, setState)}
                placeholder={formatMessage({
                  id: 'myInventory.searchByProductName',
                  defaultMessage: 'Search by product name'
                })}
                style={{ width: '370px' }}
              />
            </div>
            <div className='column'>
              <HoldDropdown
                options={[
                  {
                    key: 1,
                    value: 'My Holds',
                    text: 'My Holds'
                  },
                  {
                    key: 2,
                    value: 'Requested Holds',
                    text: 'Requested Holds'
                  }
                ]}
                value={filterValue.holdDropdown}
                selection
                onChange={(event, data) => {
                  if (data.value === 'My Holds') {
                    toggleHolds('my')
                  } else if (data.value === 'Requested Holds') {
                    toggleHolds('foreign')
                  }
                  handleFilterChange(data, props, state, setState)
                }}
                name='holdDropdown'
                placeholder={formatMessage({ id: 'hold.selectHolds', defaultMessage: 'Select Holds' })}
              />
            </div>
            <ColumnSettingButton />
          </div>
        </CustomRowDiv>
      </div>
      <div className='flex stretched listings-wrapper' style={{ padding: '10px 0' }}>
        <ProdexGrid
          groupActions={row => {
            let values = row.key.split('_')
            return groupActionsMarketplace(rows, values[values.length - 1], props.openPopup).map(a => ({
              ...a,
              text: <FormattedMessage {...a.text} />
            }))
          }}
          tableName='marketplace_hold_grid'
          {...datagrid.tableProps}
          rows={getRows(rows, props, state)}
          columns={getColumns()}
          rowSelection
          onSelectionChange={selectedRows => setState({ ...state, selectedRows })}
          getChildGroups={rows =>
            _(rows)
              .groupBy('productName')
              .map(v => ({
                key: `${v[0].productName}_${v.length}_${v[0].id}`,
                childRows: v
              }))
              .value()
          }
          data-test='marketplace_holds_row_action'
        />
      </div>
    </Container>
  )
}

Holds.propTypes = {
  tableHandlersFiltersHolds: PropTypes.object,
  datagrid: PropTypes.object,
  intl: PropTypes.object,
  rows: PropTypes.array,
  handleVariableSave: PropTypes.func,
  toggleHolds: PropTypes.func,
  openPopup: PropTypes.func,
  approveHold: PropTypes.func,
  rejectHold: PropTypes.func,
  cancelHold: PropTypes.func,
  toCartHold: PropTypes.func,
  isMerchant: PropTypes.bool,
  isCompanyAdmin: PropTypes.bool,
  isProductOfferManager: PropTypes.bool
}

Holds.defaultProps = {
  tableHandlersFiltersHolds: {},
  datagrid: {},
  intl: {},
  rows: [],
  handleVariableSave: () => {},
  toggleHolds: () => {},
  openPopup: () => {},
  approveHold: () => {},
  rejectHold: () => {},
  cancelHold: () => {},
  toCartHold: () => {},
  isMerchant: false,
  isCompanyAdmin: false,
  isProductOfferManager: false
}

export default withRouter(injectIntl(Holds))
