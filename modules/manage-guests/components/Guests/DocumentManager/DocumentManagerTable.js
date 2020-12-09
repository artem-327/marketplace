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
import { MoreVertical } from 'react-feather'
import { Dropdown } from 'semantic-ui-react'

const BasicLink = styled.a`
  color: black !important;
  text-decoration: none !important;
  &:hover {
    color: white !important;
    text-decoration: none !important;
  }
`

const DivRow = styled.div`
  display: flex !important;

  > div {
    flex-grow: 0;
    flex-shrink: 0;
  }

  > span {
    flex-grow: 1;
    flex-shrink: 1;
  }
`

const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }
`

const RowDropdown = styled(Dropdown)`
  display: block !important;
  height: 100% !important;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
`

const RowDropdownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 8px 2px -4px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
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
          allowReordering: false
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

  getActionItems = (actions = [], row) => {
    if (!getSafe(() => actions.length, false)) return
    return actions.map((a, i) =>
      'hidden' in a && typeof a.hidden === 'function' && a.hidden(row) ? null : (
        <Dropdown.Item
          data-test={`action_${row.id}_${i}`}
          key={i}
          text={typeof a.text !== 'function' ? a.text : a.text(row)}
          disabled={getSafe(() => a.disabled(row), false)}
          onClick={() => a.callback(row)}
        />
      )
    )
  }

  getRows = (data = []) =>
    data.map(row => ({
      rawData: row,
      id: row.id,
      name: (
        <DivRow>
          <RowDropdown
            trigger={
              <RowDropdownIcon>
                <MoreVertical />
              </RowDropdownIcon>
            }>
            <Dropdown.Menu>{this.getActionItems(this.getActionsByRow(row), row)}</Dropdown.Menu>
          </RowDropdown>
          <SpanText onClick={() => this.props.openPopup(row)}>
            {row.name}
          </SpanText>
        </DivRow>
        ),
      documentTypeName: getSafe(() => row.documentType.name, ''),
      expirationDate: row.expirationDate && moment(row.expirationDate).format(getLocaleDateFormat()),
      broadcast: 'TBD',
      issuedAt: row.issuedAt && moment(row.issuedAt).format(getLocaleDateFormat()),
      customName: getSafe(() => row.customName, row.name),
      linkCount: row.linkCount
    }))

  getActionsByRow = () => {
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
        callback: row => openPopup(row),
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
                defaultMessage: `Do you really want to delete ${row.name} document?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await removeAttachment(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        hidden: () => documentManagerDatagridSharedWithMe,
        disabled: row => this.props.editedId === row.id
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
      rows, datagrid, editedId, updatingDatagrid
    } = this.props

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexGrid
          tableName='manage_guests_documents'
          {...datagrid.tableProps}
          columns={this.state.columns}
          rows={this.getRows(rows)}
          loading={datagrid.loading || updatingDatagrid}
          style={{ marginTop: '5px' }}
          editingRowId={editedId}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ manageGuests, simpleAdd }, { datagrid }) => {
  return {
    ...manageGuests,
    updatingDatagrid: simpleAdd.updatingDatagrid,
    rows: datagrid.rows
  }
}

export default withDatagrid(connect(
  mapStateToProps,
  { ...Actions, removeAttachment }
)(injectIntl(DocumentManagerTable)))














