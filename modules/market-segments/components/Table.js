import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { getDataRequest, openEditPopup, closeConfirmPopup, deleteConfirmation } from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage } from 'react-intl'

class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'MarketSegment.name',
          allowReordering: false
        }
      ]
    }
  }

  getActions = () => {
    const { intl, openEditPopup, deleteConfirmation, datagrid } = this.props

    const { formatMessage } = intl
    return [
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
          ).then(async () => {
            try {
              await deleteConfirmation(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        name: (
          <ActionCell
            row={row}
            getActions={this.getActions}
            content={row.name}
            onContentClick={() => this.props.openEditPopup(row)}
          />
        )
      }
    })
  }

  render() {
    const { loading, rows, datagrid, filterValue } = this.props

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexTable
          tableName='admin_market_segments'
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={this.state.columns}
          rows={this.getRows(rows)}
        />
      </div>
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
