import { Fragment, useState } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ProdexTable from '../../../../components/table'
import RowDetail from './RowDetail'
// Services
import { columns, getRows } from './ShippingQuoteRequestsTable.services'

const ShippingQuoteRequestsTable = props => {
  const [expandedRowIds, setExpandedRowIds] = useState([])

  const { intl, datagrid } = props

  return (
    <Fragment>
      <div className='flex stretched table-detail-rows-wrapper notifications-wrapper notifications-admin-wrapper'>
        <ProdexTable
          tableName='operations_shipping_quote_requests}'
          {...datagrid.tableProps}
          loading={datagrid.loading}
          columnReordering={false}
          groupBy={['timeGroup']}
          getChildGroups={rows => {
            return _(rows)
              .groupBy('timeGroup')
              .map(v => {
                return {
                  key: `${v[0].timeGroup}`,
                  childRows: v,
                  groupLength: v.length
                }
              })
              .value()
          }}
          renderGroupLabel={({ row: { value }, groupLength }) => null}
          hideGroupCheckboxes={true}
          columns={columns}
          isToggleCellComponent={false}
          isBankTable={true}
          rowDetailType={true}
          rows={getRows(props, expandedRowIds, setExpandedRowIds)}
          rowDetail={({ row }) => <RowDetail row={row.rawData} />}
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={expandedRowIds => setExpandedRowIds(expandedRowIds)}
          rowSelection={false}
          lockSelection={false}
          showSelectAll={false}
          estimatedRowHeight={1000} // to fix virtual table for large rows - hiding them too soon and then hiding the whole table
          defaultSorting={{ columnName: 'time', sortPath: 'Message.createdAt', direction: 'DESC' }}
        />
      </div>
    </Fragment>
  )
}

ShippingQuoteRequestsTable.propTypes = {
  rows: PropTypes.array,
  intl: PropTypes.object, 
  datagrid: PropTypes.object
}

ShippingQuoteRequestsTable.defaultValues = {
  rows: [],
  intl: {}, 
  datagrid: {}
}

export default injectIntl(ShippingQuoteRequestsTable)
