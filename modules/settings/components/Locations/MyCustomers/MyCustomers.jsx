/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe, getFormattedPhone } from '~/utils/functions'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import ActionCell from '~/components/table/ActionCell'

// Constants
import { COLUMNS } from './MyCustomers.constants'

// Components
import BasicButton from '../../../../../components/buttons/BasicButton'

//import ErrorFocus from '../../../components/error-focus'


// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import { CustomerName, SubrowButtons, ChevronDownStyled, ChevronUpStyled } from './MyCustomers.styles'

// Services
import {
} from './MyCustomers.services'
import * as Actions from '../../../actions'

import confirm from '~/components/Confirmable/confirm'

const getWarehouseActions = (row, war, props) => {
  const { datagrid, intl, openCustomerWarehouse, deleteCustomerWarehouse } = props
  const { formatMessage } = intl

  return [
    {
      text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
      callback: () => {
        openCustomerWarehouse(
          { customerId: row.id, customerName: row.name },
          { ...war, rawData: war },
          props.datagrid
        )
      }
    },
    {
      text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
      callback: () =>
        confirm(
          formatMessage({ id: 'confirm.deleteWarehouse.title', defaultMessage: 'Delete Warehouse?' }),
          formatMessage(
            {
              id: 'confirm.deleteWarehouse.content',
              defaultMessage: `Do you really want to delete '${war.addressName}' Warehouse?`
            },
            { name: war.addressName }
          )
        ).then(async () => {
          try {
            await deleteCustomerWarehouse(row.id, war.id)
            datagrid.loadData()
            //datagrid.removeRow(war.id) // ! ! tohle nefunguje, musely by se prekopat data v rows
          } catch (e) {
            console.error(e)
          }
        })
    }
  ]
}

const getCustomersActions = (row, props) => {
  const { datagrid, intl, openSidebar, deleteCustomer } = props
  const { formatMessage } = intl

  return [
    {
      text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
      callback: () => openSidebar(row)
    },
    {
      text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
      callback: () =>
        confirm(
          formatMessage({ id: 'confirm.deleteCustomer.title', defaultMessage: 'Delete Customer?' }),
          formatMessage(
            {
              id: 'confirm.deleteCustomer.content',
              defaultMessage: `Do you really want to delete '${row.name}' Customer?`
            },
            { name: row.name }
          )
        ).then(async () => {
          try {
            await deleteCustomer(row.id)
            datagrid.loadData()
            datagrid.removeRow(row.id)
          } catch (e) {
            console.error(e)
          }
        })
    }
  ]
}

export const getRows = (rows, state, props) => {
  const { countryCodes, actions} = props
  const { expandedRowIds, setExpandedRowIds, expandedRowIdsSecondary, setExpandedRowIdsSecondary } = state

  return rows.map(row => {
    const warehouses = getSafe(() => row.warehouseAddresses.length > 0, false) ? row.warehouseAddresses.map(war => {
      return ({
        id: `${row.id}_${war.id}`,
        rawData: war,
        clsName: 'tree-table nested-row',
        actions, // ?
        customerId: row.id,
        customerName: row.name,
        //name: war.addressName,
        name: (
          <ActionCell
            row={row}
            getActions={() => getWarehouseActions(row, war, props)}
            content={war.addressName}
            onContentClick={() => {
              props.openCustomerWarehouse(
                { customerId: row.id, customerName: row.name },
                { ...war, rawData: war },
                props.datagrid
              )
            }}
          />
        ),
        streetAddress: war?.address?.streetAddress,
        city: war?.address?.city,
        provinceName: war?.address?.province?.name,
        countryName: war?.address?.country?.name,
        contactName: war?.contactName,
        contactEmail: war?.contactEmail,
        phoneFormatted: getFormattedPhone(war?.contactPhone, countryCodes)
      })
    }) : [{
      id: `${row.id}_0`,
      clsName: 'tree-table empty-row hidden-row',
      actions
    }]

    if (expandedRowIds.includes(row.id) && expandedRowIdsSecondary.length) {
      const lastWarehouseId = warehouses.length && warehouses[warehouses.length - 1].id
      if (lastWarehouseId && lastWarehouseId !== expandedRowIdsSecondary[0]) {
        setExpandedRowIdsSecondary([lastWarehouseId])
      }
    }

    return {
      //...row,
      clsName: `tree-table root-row${expandedRowIds.includes(row.id) ? ' opened' : ''}`,
      rawData: row,
      root: true,
      treeRoot: true,
      id: row.id,
      name: (
        <ActionCell
          row={row}
          getActions={() => getCustomersActions(row, props)}
          content={row.name}
          onContentClick={e => {
            e.stopPropagation()
            e.preventDefault()
            props.openSidebar(row)
          }}
        />
      ),
      customerId: row.id,
      customerName: row.name,
      chevron: expandedRowIds.includes(row.id)
        ? (<ChevronDownStyled size={20} />)
        : (<ChevronUpStyled size={20} />),
      warehouses
    }
  })
}

const getRowDetail = (row, props) => {
  return (
    <div>
      <SubrowButtons>
        <BasicButton floatRight={true}
                     onClick={() => props.openCustomerWarehouse(row, null, props.datagrid)}>
          <FormattedMessage id='global.addNew' defaultMessage='Add New' />
        </BasicButton>
      </SubrowButtons>
    </div>
  )
}

const MyCustomers = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const [expandedRowIdsSecondary, setExpandedRowIdsSecondary] = useState([])

  const state = { expandedRowIds, setExpandedRowIds, expandedRowIdsSecondary, setExpandedRowIdsSecondary }

  const {
    datagrid,
    loading,
    countryCodes,
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])

  return (
    <div className={`flex stretched customers-warehouses-wrapper tree-wrapper${expandedRowIds.length ? ' opened-rows' : ''}`}>
      <ProdexGrid
        tableName='locations_my_customers'
        {...datagrid.tableProps}
        loading={datagrid.loading || loading}
        columns={COLUMNS}
        rows={getRows(datagrid.rows, state, props)}
        rowSelection={false}
        showSelectionColumn={false}
        treeDataType={true}
        tableTreeColumn={'name'}

        rowDetail={({ row })=> getRowDetail(row, props)}
        rowDetailTypeSecondary={true}
        hideGroupCheckboxes={true}
        isToggleCellComponent={false}
        expandedRowIdsSecondary={expandedRowIdsSecondary}

        getChildRows={(row, rootRows) => {
          return row ? row.warehouses : rootRows
        }}
        onRowClick={(_, row) => {
          if (row.root && getSafe(() => row.warehouses.length, 0)) {
            if (expandedRowIds.includes(row.id)) {
              setExpandedRowIds([])
            }
            else {
              setExpandedRowIds([row.id])
              if (row.warehouses.length) {
                // ! ! add getSafe
                setExpandedRowIdsSecondary([row.warehouses[row.warehouses.length - 1].id])
              }
            }
          }
        }}
        expandedRowIds={expandedRowIds}
        onExpandedRowIdsChange={expandedRowIds => setExpandedRowIds(expandedRowIds)}
      />
    </div>
  )
}

function mapStateToProps(store) {
  return {
    countryCodes: store.phoneNumber.phoneCountryCodes,
    loading: store.settings.loading
  }
}

//export default injectIntl(MyCustomers)
export default withDatagrid(injectIntl(connect(mapStateToProps, Actions)(MyCustomers)))