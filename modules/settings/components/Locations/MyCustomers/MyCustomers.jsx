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
import { CustomerName, SubrowButtons } from './MyCustomers.styles'

// Services
import {
} from './MyCustomers.services'
import * as Actions from '../../../actions'
import { chatWidgetVerticalMoved } from '../../../../chatWidget/actions'



export const getRows = (rows, countryCodes, actions) => {
  return rows.map(row => {
    const warehouses = getSafe(() => row.warehouseAddresses.length > 0, false) ? row.warehouseAddresses.map(war => {
      return ({
        id: `${row.id}_${war.id}`,
        clsName: 'tree-table nested-row',
        actions,
        name: war.addressName,
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

    /*
    if (warehouses.length) {
      warehouses.push({
        id: row.id + '__0',
        clsName: 'tree-table nested-row button-row',

        name: (
          <div style={{ width: '100%', right: '0' }}>
            'Add New button
          </div>
        )

      })
    }
    */

    return {
      //...row,
      clsName: 'tree-table root-row',
      rawData: row,
      root: true,

      treeRoot: true, // ?
      offer: false,   // ?


      id: row.id,
      name: (
        <CustomerName>
          <div>
            {row.id + ' strasne dlouhe jmeno ktere se nevejde do sloupce'}
          </div>
          <div>
            ikony
          </div>
        </CustomerName>
      ),
      warehouses
    }
  })
}


const getRowDetail = ({ row }) => {
  const { actions } = row
  console.log('AAA', actions)
  return (
    <div>
      <SubrowButtons>
        <BasicButton floatRight={true}
                     onClick={() => {
                       actions.openCustomerWarehouse({ id: row.id.split("_")[0] }, actions.datagrid)
                       actions.chatWidgetVerticalMoved(true)
                     }}>
          <FormattedMessage id='global.addNew' defaultMessage='Add New' />
        </BasicButton>
      </SubrowButtons>
    </div>
  )
}

const MyCustomers = props => {
  const [tmp, set ] = useState(false) // ! !
  const [expandedRowIds, setExpandedRowIds] = useState([])
  const [expandedRowIdsSecondary, setExpandedRowIdsSecondary] = useState([])

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
    <div className='flex stretched tree-wrapper'>
      <ProdexGrid
        tableName='locations_my_customers'
        {...datagrid.tableProps}
        loading={datagrid.loading || loading}
        columns={COLUMNS}
        rows={getRows(datagrid.rows, countryCodes, {openCustomerWarehouse: props.openCustomerWarehouse, chatWidgetVerticalMoved: props.chatWidgetVerticalMoved, datagrid})}
        rowSelection={false}
        showSelectionColumn={false}
        treeDataType={true}
        tableTreeColumn={'name'}

        rowDetail={getRowDetail}
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
    countryCodes: store.phoneNumber.phoneCountryCodes
  }
}

//export default injectIntl(MyCustomers)
export default withDatagrid(injectIntl(connect(mapStateToProps, { ...Actions, chatWidgetVerticalMoved })(MyCustomers)))