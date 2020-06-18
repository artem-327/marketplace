import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { openPopup, getLogisticsAccounts, deleteLogisticsAccount } from '~/modules/settings/actions'
import { array } from 'prop-types'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import { ArrayToFirstItem } from '~/components/formatted-messages/'

const columns = [
  { name: 'logisticsProviderNameForSearch', disabled: true },
  { name: 'usernameForSearch', disabled: true },
  {
    name: 'logisticsProviderName',
    title: (
      <FormattedMessage id='logistics.label.logisticsProvider' defaultMessage='Logistics Provider'>
        {text => text}
      </FormattedMessage>
    ),
    width: 300
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

class LogisticsTable extends Component {
  componentDidMount() {
    this.props.getLogisticsAccounts()
  }

  render() {
    const {
      openPopup,
      logisticsAccounts,
      loading,
      intl: { formatMessage },
      deleteLogisticsAccount,
      toastManager,
      filterValue
    } = this.props

    return (
      <ProdexTable
        columns={columns}
        filterValue={filterValue}
        rows={logisticsAccounts.map(acc => ({
          ...acc,
          logisticsProviderName: (
            <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.provider.name}</div>
          ),
          username: <ArrayToFirstItem values={acc.accountInfos && acc.accountInfos.map(d => d.username)} />,
          logisticsProviderNameForSearch: acc.provider.name,
          usernameForSearch: acc.accountInfos && acc.accountInfos.map(d => d.username)
        }))}
        loading={loading}
        rowActions={[
          {
            text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
            callback: row => openPopup(row)
          },
          {
            text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
            callback: row => {
              confirm(
                formatMessage({ id: 'confirm.logisticsAccount.title', defaultMessage: 'Delete Logistics Account' }),
                formatMessage(
                  {
                    id: 'confirm.logisticsAccount.content',
                    defaultMessage: `Do you really want to delete ${row.logisticsProviderName}?`
                  },
                  { name: row.logisticsProviderName }
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
        ]}
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
  openPopup,
  getLogisticsAccounts,
  deleteLogisticsAccount
}

const mapStateToProps = ({ settings: { loading, logisticsAccounts, deleteLogisticsAccount, filterValue } }) => {
  return {
    loading,
    logisticsAccounts,
    deleteLogisticsAccount,
    filterValue
  }
}

export default withToastManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LogisticsTable)))
