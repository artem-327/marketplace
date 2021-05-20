import { Fragment, Component } from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import ProdexTable from '~/components/table'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'

import { COLUMNS } from './Table.constants'

import { getRows, getRowDetail, toggleCellComponent } from './Table.services'


const Table = props => {
  const { intl, datagrid, markSeenSending, selectedRows } = props
  const { formatMessage } = intl

  const [expandedRowIds, setExpandedRowIds] = useState([])
  const state = { expandedRowIds, setExpandedRowIds }

  return (
    <Fragment>
      <div className={'flex stretched table-detail-rows-wrapper notifications-wrapper notifications-admin-wrapper'}>
        <ProdexTable
          tableName={'notifications_table'}
          {...datagrid.tableProps}
          loading={datagrid.loading || markSeenSending}
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
          columns={COLUMNS}
          isBankTable={true}
          rowDetailType={true}
          rows={getRows(state, props)}
          rowDetail={row => getRowDetail(row, state)}
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={expandedRowIds => setExpandedRowIds(expandedRowIds)}
          rowSelection={true}
          lockSelection={false}
          showSelectAll={false}
          toggleCellComponent={compProps => toggleCellComponent(compProps, props)}
          isToggleCellComponent={true}
          selectedRows={selectedRows}
          onSelectionChange={selectedRows => {
            props.onSelectionChange(selectedRows)
          }}
          estimatedRowHeight={1000} // to fix virtual table for large rows - hiding them too soon and then hiding the whole table
          defaultSorting={{ columnName: 'time', sortPath: 'Message.createdAt', direction: 'DESC' }}
        />
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state, { datagrid }) => {
  const { alerts } = state
  return {
    ...alerts,
    rows: datagrid.rows.map(r => {
      return {
        ...r,
        rawData: r,
        notificationType: r.category.replace(/_/g, ' '),
        nameOfUser: getSafe(() => r.info.requestedBy.name, ''),
        usersCompany: getSafe(() => r.info.requestedBy.company.cfDisplayName, '')
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(withToastManager(Table))))
