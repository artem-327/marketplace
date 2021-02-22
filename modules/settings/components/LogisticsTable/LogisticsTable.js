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
import { chatWidgetVerticalMoved } from '../../../chatWidget/actions'

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
    try {
      this.props.getLogisticsAccounts()
    } catch (error) {
      console.error(error)
    }
  }

  getActions = () => {
    const {
      openSidebar,
      chatWidgetVerticalMoved,
      intl: { formatMessage },
      deleteLogisticsAccount,
      datagrid
    } = this.props

    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => {
          openSidebar(row)
          chatWidgetVerticalMoved(true)
        }
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

    return getSafe(() => logisticsAccounts.length, false)
      ? logisticsAccounts.map(acc => {
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
                onContentClick={() => {
                  this.props.openSidebar(acc)
                  this.props.chatWidgetVerticalMoved(true)
                }}
              />
            )
          }
        })
      : []
  }

  render() {
    const {
      loading,
      filterValue,
      editedId,
      intl: { formatMessage },
      isThirdPartyConnectionException
    } = this.props

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexTable
          messages={
            isThirdPartyConnectionException
              ? {
                  noData: formatMessage({
                    id: 'settings.logistics.difficulties',
                    defaultMessage: 'Logistics cannots be rettrived at the moment. Please try again later.'
                  })
                }
              : null
          }
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
  deleteLogisticsAccount,
  chatWidgetVerticalMoved
}

const mapStateToProps = ({
  settings: {
    loading,
    logisticsAccounts,
    deleteLogisticsAccount,
    logisticsFilter,
    editedId,
    isThirdPartyConnectionException
  }
}) => {
  return {
    loading,
    editedId,
    logisticsAccounts,
    deleteLogisticsAccount,
    filterValue: logisticsFilter,
    isThirdPartyConnectionException
  }
}

export default withDatagrid(withToastManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LogisticsTable))))
