import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { openPopup, getLogisticsAccounts, deleteLogisticsAccount } from '~/modules/settings/actions'
import { array } from 'prop-types'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'

const columns = [
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
      toastManager
    } = this.props

    return (
      <ProdexTable
        columns={columns}
        rows={logisticsAccounts.map(acc => ({
          ...acc,
          provider: acc.provider.id,
          logisticsProviderName: acc.provider.name,
          username: acc.username
        }))}
        loading={loading}
        rowActions={[
          {
            text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
            callback: row => openPopup(row),
            hidden: () => true
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

const mapStateToProps = ({ settings: { loading, logisticsAccounts, deleteLogisticsAccount } }) => {
  return ({
  loading,
  logisticsAccounts,
  deleteLogisticsAccount
})}

export default withToastManager(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LogisticsTable)))
