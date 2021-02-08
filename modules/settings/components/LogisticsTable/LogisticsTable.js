import { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { openSidebar, getLogisticsAccounts, deleteLogisticsAccount } from '~/modules/settings/actions'
import { array } from 'prop-types'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup, getSafe } from '~/utils/functions'
import confirm from '~/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import { ArrayToFirstItem } from '~/components/formatted-messages/'
import { withDatagrid } from '~/modules/datagrid'
import ActionCell from '~/components/table/ActionCell'

class LogisticsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        { name: 'logisticsProviderNameForSearch', disabled: true },
        { name: 'usernameForSearch', disabled: true },
        {
          name: 'logisticsProviderName',
          title: (
            <FormattedMessage id='logistics.label.logisticsProvider' defaultMessage='Logistics Provider'>
              {text => text}
            </FormattedMessage>
          ),
          width: 300,
          allowReordering: false
        },
        {
          name: 'username',
          title: (
            <FormattedMessage id='logistics.label.username' defaultMessage='User Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 300
        }
      ]
    }
  }
  componentDidMount() {
    this.props.getLogisticsAccounts()
  }

  getActions = () => {
    const {
      openSidebar,
      intl: { formatMessage },
      deleteLogisticsAccount,
      datagrid
    } = this.props

    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openSidebar(row)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row => {
          confirm(
            formatMessage({ id: 'confirm.logisticsAccount.title', defaultMessage: 'Delete Logistics Account' }),
            formatMessage(
              {
                id: 'confirm.logisticsAccount.content',
                defaultMessage: `Do you really want to delete '${row.provider.name}'?`
              },
              { name: row.provider.name }
            )
          )
            .then(async () => {
              try {
                await deleteLogisticsAccount(row.id)
                datagrid.removeRow(row.id)
              } catch (e) {
                console.error(e)
              }
            })
            .catch(() => {})
        },
        disabled: row => this.props.editedId === row.id
      }
    ]
  }

  getRows = () => {
    const { logisticsAccounts, loading, filterValue, editedId } = this.props

    return logisticsAccounts.map(acc => {
      return {
        ...acc,
        stringName: acc.provider.name,
        username: <ArrayToFirstItem values={acc.accountInfos && acc.accountInfos.map(d => d.username)} />,
        logisticsProviderNameForSearch: acc.provider.name,
        usernameForSearch: acc.accountInfos && acc.accountInfos.map(d => d.username),
        logisticsProviderName: (
          <ActionCell
            row={acc}
            getActions={this.getActions}
            content={acc.provider.name}
            onContentClick={() => this.props.openSidebar(acc)}
          />
        )
      }
    })
  }

  render() {
    const { loading, filterValue, editedId } = this.props

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexTable
          tableName='settings_logistics_table'
          columns={this.state.columns}
          filterValue={filterValue}
          rows={this.getRows()}
          loading={loading}
          editingRowId={editedId}
        />
      </div>
    )
  }
}

LogisticsTable.propTypes = {
  logisticAccounts: array
}

LogisticsTable.defaultProps = {
  logisticAccounts: []
}

const mapDispatchToProps = {
  openSidebar,
  getLogisticsAccounts,
  deleteLogisticsAccount
}

const mapStateToProps = ({
  settings: { loading, logisticsAccounts, deleteLogisticsAccount, logisticsFilter, editedId }
}) => {
  return {
    loading,
    editedId,
    logisticsAccounts,
    deleteLogisticsAccount,
    filterValue: logisticsFilter
  }
}

export default withDatagrid(withToastManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LogisticsTable))))
