import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import styled from 'styled-components'

import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'

import { openPopup } from '~/modules/settings/actions'
import { removeAttachment } from '~/modules/inventory/actions'
import { getSafe } from '~/utils/functions'
import { bool, array } from 'prop-types'

const BasicLink = styled.a`
  color: black !important;
  text-decoration: none !important;
  &:hover {
    color: black !important;
    text-decoration: none !important;    
  }
`


const columns = [ // TODO - check en.json for those ids
  { name: 'name', title: <FormattedMessage id='global.name' defaultMessage='Name'>{text => text}</FormattedMessage> },
  { name: 'documentTypeName', title: <FormattedMessage id='global.docType' defaultMessage='Document Type'>{text => text}</FormattedMessage> },
  { name: 'linkCount', title: <FormattedMessage id='global.linkCount' defaultMessage='Links Count'>{text => text}</FormattedMessage> },
  { name: 'expirationDate', title: <FormattedMessage id='global.expirationDate' defaultMessage='Expiration Date'>{text => text}</FormattedMessage> }
]

class DocumentManager extends Component {
  getRows = data => (
    data.map((row) => ({
      ...row,
      documentTypeName: getSafe(() => row.documentType.name, ''),
      expirationDate: row.expirationDate && moment(row.expirationDate).format('YYYY-MM-DD'),
      customName: getSafe(() => row.customName, row.name),
    }))
  )

  render() {
    const {
      datagrid,
      openPopup, removeAttachment,
      edit, download, deletable,
      loading } = this.props

    let rows = this.getRows(this.props.items ? this.props.items : this.props.rows)


    return (
      <ProdexGrid
        tableName='settings_documents'
        {...datagrid.tableProps}
        columns={columns}
        rows={rows}
        loading={datagrid.loading || loading}
        style={{ marginTop: '5px' }}
        rowActions={[
          ...edit ? [{
            text: <FormattedMessage id='global.edit' defaultMessage='Edit'>{text => text}</FormattedMessage>,
            callback: row => openPopup(row)
          }] : [],
          ...download ? [{
            text: row => <BasicLink target='_blank' href={`/download/attachments/${row.id}`}>
              <FormattedMessage id='global.download' defaultMessage='Download'>{text => text}</FormattedMessage>
            </BasicLink>,
            callback: () => { }
          }] : [],
          ...deletable ? [{
            text: <FormattedMessage id='global.delete' defaultMessage='Delete'>{text => text}</FormattedMessage>, callback: async row => {
              await removeAttachment(row.id)
              datagrid.removeRow(row.id)
            }
          }] : [],
        ]}
      />

    )
  }
}

DocumentManager.propTypes = {
  edit: bool,
  download: bool,
  delete: bool,
  items: array
}

DocumentManager.defaultProps = {
  edit: true,
  download: true,
  deletable: true,
}

const mapStateToProps = (store, { datagrid }) => {
  return {
    loading: store.settings.loading,
    rows: datagrid.rows
  }
}

const mapDispatchToProps = {
  openPopup, removeAttachment
}


export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(DocumentManager))