import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import ProdexTable from '~/components/table'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import confirm from '~/components/Confirmable/confirm'

export default class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'code',
          title: (
            <FormattedMessage id='global.code' defaultMessage='Code'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'NmfcNumber.prefix',
          actions: this.getActions()
        },
        {
          name: 'description',
          title: (
            <FormattedMessage id='global.description' defaultMessage='Description'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'NmfcNumber.description'
        }
      ]
    }
  }

  getActions = () => {
    const {
      config,
      intl: { formatMessage },
      openEditPopup,
      deleteNmfcNumber,
      datagrid
    } = this.props

    const { formattedMessageName } = config

    return [
      { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openEditPopup(row) },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({
              id: `confirm.delete${formattedMessageName}.title`,
              defaultMessage: 'Delete NMFC Number'
            }),
            formatMessage(
              {
                id: `confirm.delete${formattedMessageName}.content`,
                defaultMessage: `Do you really want to delete NMFC Number with code: ${row.code}?`
              },
              { code: row.code }
            )
          ).then(async () => {
            try {
              await deleteNmfcNumber(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  render() {
    const { config, loading, datagrid, filterValue } = this.props

    const { tableName } = config

    return (
      <ProdexTable
        tableName={tableName}
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={this.state.columns}
        columnActions='code'
      />
    )
  }
}
