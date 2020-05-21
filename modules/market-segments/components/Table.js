import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import { getDataRequest, openEditPopup, closeConfirmPopup, deleteConfirmation } from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage } from 'react-intl'

const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    sortPath: 'MarketSegment.name'
  }
]
class Table extends Component {
  render() {
    const { intl, loading, rows, datagrid, filterValue, openEditPopup, deleteConfirmation } = this.props

    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexTable
          tableName='admin_market_segments'
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={columns}
          rows={rows}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openEditPopup(row) },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({
                    id: `confirm.deleteMarketSegments.title`,
                    defaultMessage: `Delete Market Segment`
                  }),
                  formatMessage(
                    {
                      id: `confirm.deleteMarketSegments.content`,
                      defaultMessage: `Do you really want to delete '${row.name}' market segment?`
                    },
                    { name: row.name }
                  )
                ).then(() => deleteConfirmation(row.id))
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openEditPopup,
  deleteConfirmation
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows,
    filterValue: state.admin.filterValue,
    loading: state.marketSegments.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Table)))
