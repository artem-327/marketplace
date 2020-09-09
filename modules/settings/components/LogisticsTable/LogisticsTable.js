import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { openSidebar, getLogisticsAccounts, deleteLogisticsAccount } from '~/modules/settings/actions'
import { array } from 'prop-types'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import { ArrayToFirstItem } from '~/components/formatted-messages/'

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
          actions: this.getActions()
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
      deleteLogisticsAccount
    } = this.props

    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openSidebar(row.rawData)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row => {
          confirm(
            formatMessage({ id: 'confirm.logisticsAccount.title', defaultMessage: 'Delete Logistics Account' }),
            formatMessage(
              {
                id: 'confirm.logisticsAccount.content',
                defaultMessage: `Do you really want to delete '${row.stringName}'?`
              },
              { name: row.stringName }
            )
          )
            .then(async () => {
              try {
                await deleteLogisticsAccount(row.id)
              } catch {}
            })
            .catch(() => {})
        }
      }
    ]
  }

  render() {
    const { logisticsAccounts, loading, filterValue } = this.props

    return (
      <ProdexTable
        tableName='settings_logistics_table'
        columns={this.state.columns}
        filterValue={filterValue}
        rows={logisticsAccounts.map(acc => ({
          ...acc,
          rawData: acc,
          stringName: acc.provider.name,
          logisticsProviderName: (
            <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.provider.name}</div>
          ),
          username: <ArrayToFirstItem values={acc.accountInfos && acc.accountInfos.map(d => d.username)} />,
          logisticsProviderNameForSearch: acc.provider.name,
          usernameForSearch: acc.accountInfos && acc.accountInfos.map(d => d.username)
        }))}
        loading={loading}
        columnActions='logisticsProviderName'
      />
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

const mapStateToProps = ({ settings: { loading, logisticsAccounts, deleteLogisticsAccount, logisticsFilter } }) => {
  return {
    loading,
    logisticsAccounts,
    deleteLogisticsAccount,
    filterValue: logisticsFilter
  }
}

export default withToastManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LogisticsTable)))
