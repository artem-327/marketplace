import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import moment from 'moment'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import ProdexTable from '~/components/table'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import styled from 'styled-components'
import { Label } from 'semantic-ui-react'

const StyledStatusLabel = styled(Label)`
  font-size: 12px !important;
  height: 22px !important;
  font-weight: normal !important;
  font-stretch: normal;
  font-style: normal;
  border-radius: 11px !important;
  padding: 0.3333em 1.16667em 0.16667em 1.16667em !important;
  cursor: pointer;

  &.read {
    color: #848893;
    border: solid 1px #dee2e6;
    background-color: #edeef2;
  }
  &.unread {
    color: #ffffff;
    background-color: #2599d5 !important;
  }
`

class TagsTable extends Component {
  state = {
    columns: [
      {
        name: 'notification',
        title: (
          <FormattedMessage id='alerts.column.notifications' defaultMessage='Notifications'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'Message.text',
        width: 720,
      },
      {
        name: 'readStatus',
        title: (
          <FormattedMessage id='alerts.column.readStatus' defaultMessage='Read Status'>
            {text => text}
          </FormattedMessage>
        ),
        //sortPath: '',
        align: 'center',
        width: 130,
      },
      {
        name: 'timeCreated',
        title: (
          <FormattedMessage id='alerts.column.timeCreated' defaultMessage='Time Created'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'Message.createdAt',
        width: 160,
      },
      {
        name: 'timeRead',
        title: (
          <FormattedMessage id='alerts.column.timeRead' defaultMessage='Time Read'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'Message.readAt',
        width: 160,
      },
    ]
  }

  statusLabel = (row, val) => {
    const read = val === 'read'
    return <StyledStatusLabel
      className={val}
      onClick={() => {
        if (read) this.handleClickOnRead(row)
        else this.handleClickOnUnread(row)
      }}
    >
      {read
        ? <FormattedMessage id='alerts.status.read' defaultMessage='Read' />
        : <FormattedMessage id='alerts.status.unread' defaultMessage='Unread' />
      }
    </StyledStatusLabel>
  }

  notificationText = (row) => {
    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          if (row.read) this.handleClickOnRead(row)
          else this.handleClickOnUnread(row)
        }}
      >
        {row.text}
      </div>
    )
  }

  getRows = () => {
    return this.props.rows.map(r => {
      const read = r.read ? 'read' : 'unread'
      return ({
        ...r,
        clsName: read,
        notification: this.notificationText(r.rawData),
        readStatus: this.statusLabel(r.rawData, read),
      })
    })
  }

  handleClickOnUnread = async row => {
    const { datagrid, getCategories, markSeen } = this.props
    try {
      await markSeen(row.id)
      datagrid.updateRow(row.id, () => ({
        ...row,
        read: true,
        readAt: moment().format()
      }))
      getCategories()
    } catch (e) {
      console.log(e)
    }
  }

  handleClickOnRead = async row => {
    const { datagrid, getCategories, markUnseen } = this.props
    try {
      await markUnseen(row.id)
      datagrid.updateRow(row.id, () => ({
        ...row,
        read: false,
        readAt: null
      }))
      getCategories()
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const {
      intl,
      datagrid,
      markSeenSending,
    } = this.props

    const { formatMessage } = intl
    const { columns } = this.state

    return (
      <React.Fragment>
        <ProdexTable
          tableName={'operations_tag'}
          {...datagrid.tableProps}
          loading={datagrid.loading || markSeenSending}
          columns={columns}
          rows={this.getRows()}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, { datagrid }) => {
  const { alerts } = state
  return {
    ...alerts,
    rows: datagrid.rows.map(r => {
      const createdAt = r.createdAt && moment(r.createdAt)
      const readAt = r.readAt && moment(r.readAt)
      return ({
        ...r,
        rawData: r,
        timeCreated: createdAt ? createdAt.fromNow() : 'N/A',
        timeRead: readAt ? readAt.fromNow() : '-'
      })
    }),
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(withToastManager(TagsTable))))