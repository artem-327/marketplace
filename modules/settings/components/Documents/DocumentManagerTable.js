import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'

import { openPopup } from '~/modules/settings/actions'
import { removeAttachment } from '~/modules/inventory/actions'
import Router from 'next/router'
import { getSafe } from '~/utils/functions'
import moment from 'moment'

const columns = [ // TODO - check en.json for those ids
  { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage> },
  { name: 'documentTypeName', title: <FormattedMessage id='global.docType' defaultMessage='Document Type'>{text => text}</FormattedMessage> },
  { name: 'linkCount', title: <FormattedMessage id='global.linkCount' defaultMessage='Links Count'>{text => text}</FormattedMessage> },
]

class DocumentManager extends Component {


  render() {
    const { datagrid, rows, openPopup, removeAttachment, loading } = this.props
    console.log({ datagrid })
    return (
      <ProdexGrid
        tableName='settings_documents'
        {...datagrid.tableProps}
        columns={columns}
        rows={rows}
        loading={datagrid.loading || loading}
        style={{ marginTop: '5px' }}
        rowActions={[
          { text: 'Edit', callback: row => openPopup(row) },
          { text: 'Download', callback: row => Router.push('/download/attachments/2') },
          {
            text: 'Delete', callback: async row => {
              await removeAttachment(row.id)
              datagrid.removeRow(row.id)
            }
          },
        ]}
      />

    )
  }
}

const mapStateToProps = (store, { datagrid }) => {
  return {
    loading: store.settings.loading,
    rows: datagrid.rows.map((row) => ({
      ...row,
      documentTypeName: getSafe(() => row.documentType.name, ''),
      expirationDate: row.expirationDate && moment(row.expirationDate).format('YYYY-MM-DD')
    }))
  }
}

const mapDispatchToProps = {
  openPopup, removeAttachment
}


export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(DocumentManager))