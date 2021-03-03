/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import ActionCell from '~/components/table/ActionCell'


// Constants
import { COLUMNS } from './MyCustomers.constants'

// Components
//import ErrorFocus from '../../../components/error-focus'


// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import {
} from './MyCustomers.styles'

// Services
import {
} from './MyCustomers.services'
import * as Actions from '../../../actions'



export const getRows = rows => {
  return rows.map(row => {



    const warehouses = row.id & 1 ? rows.map(war => { // ! ! tmp values

      return ({
        id: row.id + '_' + war.id,
        clsName: 'tree-table nested-row',

        name: 'war name ' + war.id, // ! ! tmp
      })
    }) : []

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
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', right: '0' }}>
            {row.id + ' strasne dlouhe jmeno ktere se nevejde do sloupce'}
          </div>
          <div>
            ikony
          </div>
        </div>
      ),


      warehouses
    }
  })
}


const getRowDetail = ({ row }) => {
  return (
    <div>
      <div style={{ marginLeft: 'auto' }}>
        'Add New' button
      </div>
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



  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])

  console.log('!!!!!!!!!! aaaaa expandedRowIds', expandedRowIds)

  return (
    <div className='flex stretched tree-wrapper'>
      <ProdexGrid
        tableName='locations_my_customers'
        {...datagrid.tableProps}
        loading={datagrid.loading || loading}
        columns={COLUMNS}
        rows={getRows(datagrid.rows)}
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
          if (row.root && row.warehouses.length) {
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

  }
}

//export default injectIntl(MyCustomers)
export default withDatagrid(injectIntl(connect(mapStateToProps, Actions)(MyCustomers)))