import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import styled from 'styled-components'

import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import * as Actions from '../../../actions'
import { openPopup } from '~/modules/settings/actions'
import { removeAttachment } from '~/modules/inventory/actions'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'
import { injectIntl } from 'react-intl'
import confirm from '~/src/components/Confirmable/confirm'

const BasicLink = styled.a`
  color: black !important;
  text-decoration: none !important;
  &:hover {
    color: black !important;
    text-decoration: none !important;
  }
`

class DocumentManagerTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.docName' defaultMessage='Document Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'Attachment.name',
          width: 620,
          maxWidth: 2000,
          actions: this.getActions()

        },
        {
          name: 'documentTypeName',
          title: (
            <FormattedMessage id='global.docType' defaultMessage='Document Type'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'Attachment.documentType.name',
          width: 180
        },
        {
          name: 'broadcast',
          title: (
            <FormattedMessage id='global.broadcast' defaultMessage='Broadcast'>
              {text => text}
            </FormattedMessage>
          ),
          //sortPath: 'Attachment.broadcast',
          width: 110
        },
        {
          name: 'expirationDate',
          title: (
            <FormattedMessage id='global.expirationDate' defaultMessage='Expiration Date'>
              {text => text}
            </FormattedMessage>
          ),
          //sortPath: 'Attachment.expirationDate',
          width: 140
        },
        {
          name: 'linkCount',
          title: (
            <FormattedMessage id='global.links' defaultMessage='Links'>
              {text => text}
            </FormattedMessage>
          ),
          //sortPath: 'Attachment.links',
          width: 80
        }
      ]
    }
  }

  getRows = (data = []) =>
    data.map(row => ({
      rawData: row,
      id: row.id,
      name: <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</div>,
      documentTypeName: getSafe(() => row.documentType.name, ''),
      expirationDate: row.expirationDate && moment(row.expirationDate).format(getLocaleDateFormat()),
      broadcast: 'TBD',
      issuedAt: row.issuedAt && moment(row.issuedAt).format(getLocaleDateFormat()),
      customName: getSafe(() => row.customName, row.name),
      linkCount: row.linkCount
    }))

  getActions = () => {
    const {
      datagrid, openPopup, intl, removeAttachment, documentManagerDatagridSharedWithMe
    } = this.props
    const { formatMessage } = intl

    return [
      {
        text: (
          <FormattedMessage id='global.edit' defaultMessage='Edit'>
            {text => text}
          </FormattedMessage>
        ),
        callback: row => openPopup(row.rawData),
        hidden: () => documentManagerDatagridSharedWithMe
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteDocument.title', defaultMessage: 'Delete Document' }),
            formatMessage(
              {
                id: 'confirm.deleteDocument.content',
                defaultMessage: `Do you really want to delete ${row.rawData.name} document?`
              },
              { name: row.rawData.name }
            )
          ).then(async () => {
            try {
              removeAttachment(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        hidden: () => documentManagerDatagridSharedWithMe
      },
      {
        text: row => (
          <BasicLink target='_blank' href={`/download/attachments/${row.id}`}>
            <FormattedMessage id='global.download' defaultMessage='Download'>
              {text => text}
            </FormattedMessage>
          </BasicLink>
        ),
        callback: () => {}
      }
    ]
  }

  render() {
    const {
      rows, datagrid
    } = this.props

    return (
      <ProdexGrid
        tableName='manage_guests_documents'
        {...datagrid.tableProps}
        columns={this.state.columns}
        rows={this.getRows(rows)}
        loading={datagrid.loading}
        style={{ marginTop: '5px' }}
        columnActions={'name'}
      />
    )
  }
}

const mapStateToProps = ({ manageGuests }, { datagrid }) => {
  return {
    loading: manageGuests.loading,
    rows: datagrid.rows,
    documentManagerDatagridSharedWithMe: manageGuests.documentManagerDatagridSharedWithMe
  }
}

export default withDatagrid(connect(
  mapStateToProps,
  { ...Actions, removeAttachment }
)(injectIntl(DocumentManagerTable)))














