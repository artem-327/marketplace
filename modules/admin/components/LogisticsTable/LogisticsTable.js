import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { deleteLogisticsProvider, openPopup } from '../../actions'
import { withDatagrid } from '~/modules/datagrid'
import { ArrayToFirstItem, FormattedPhone } from '~/components/formatted-messages/'
import moment from 'moment'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

class LogisticsTable extends Component {
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
          width: 300,
          allowReordering: false
        },
        {
          name: 'identifierType',
          title: (
            <FormattedMessage id='logistics.identifierType' defaultMessage='Identifier Type'>
              {text => text}
            </FormattedMessage>
          ),
          width: 300
        },
        {
          name: 'identifierValue',
          title: (
            <FormattedMessage id='logistics.identifierValue' defaultMessage='Identifier Value'>
              {text => text}
            </FormattedMessage>
          ),
          width: 300
        },
        {
          name: 'reinvoice',
          title: (
            <FormattedMessage id='logistics.reinvoice' defaultMessage='Re-Invoice'>
              {text => text}
            </FormattedMessage>
          ),
          width: 120
        },
        {
          name: 'email',
          title: (
            <FormattedMessage id='global.email' defaultMessage='Email'>
              {text => text}
            </FormattedMessage>
          ),
          width: 200
        }
      ]
    }
  }

  getActions = () => {
    const {
      datagrid,
      openPopup,
      intl: { formatMessage },
      deleteLogisticsProvider
    } = this.props

    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openPopup(row.rawData)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({
              id: 'confirm.admin.deleteLogisticProvider.title',
              defaultMessage: 'Delete Logistic Provider'
            }),
            formatMessage({
              id: 'confirm.admin.deleteLogisticProvider.content',
              defaultMessage: "Do you really want to delete '{name}' logistic provider?"
            }, { name: row.rawData.name })
          ).then(async () => {
            try {
              await deleteLogisticsProvider(row.id)
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
            onContentClick={() => this.props.openPopup(row.rawData)}
          />
        )
      }
    })
  }

  render() {
    const {
      loading,
      rows,
      datagrid,
      filterValue
    } = this.props

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexTable
          tableName='admin_logistics_providers'
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
  deleteLogisticsProvider,
  openPopup
}

const mapStateToProps = (state, { datagrid }) => {

  return {
    rows: datagrid.rows.map(row => {
      return {
        ...row,
        rawData: row,
        name: (
          <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</div>
        ),
        reinvoice: row.reinvoice
          ? <FormattedMessage id='global.yes' defaultMessage='Yes'/>
          : <FormattedMessage id='global.no' defaultMessage='No'/>
      }
    }),
    editId: state.admin.popupValues && state.admin.popupValues.id,
    filterValue: state.admin.filterValue,
    loading: state.admin.loading,
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LogisticsTable)))