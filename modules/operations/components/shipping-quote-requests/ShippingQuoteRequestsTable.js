import { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { getSafe } from '~/utils/functions'
import ProdexTable from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'
import { Label, Popup, Checkbox } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser'
import { FormattedDateTime } from '~/components/formatted-messages/'
import { ChevronUp, ChevronDown, Check } from 'react-feather'
import { UserImage, UserName, UserCompany, StyledNotification, CheckIcon } from './styles'
import RowDetail from './RowDetail'

class ShippingQuoteRequestsTable extends Component {
  state = {
    columns: [
      {
        name: 'user',
        title: <div></div>,
        width: 200,
        disabled: false
      },
      {
        name: 'notification',
        title: <div></div>,
        width: 720,
        maxWidth: 2000,
        disabled: false
      },
      {
        name: 'time',
        title: <div></div>,
        sortPath: 'Message.createdAt',
        width: 160,
        disabled: false
      },
      {
        name: 'timeGroup',
        disabled: true
      },
      {
        name: 'expand',
        title: <div></div>,
        caption: (
          <FormattedMessage id='alerts.column.expand' defaultMessage='Expand'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'center',
        width: 50,
        disabled: true
      }
    ],
    expandedRowIds: []
  }

  toggleDetail = rowId => {
    let { expandedRowIds } = this.state
    if (expandedRowIds.length) {
      let found = false
      let rows = expandedRowIds.reduce((result, id) => {
        if (id === rowId) {
          found = true
          return result
        } else {
          result.push(id)
          return result
        }
      }, [])
      if (!found) {
        rows.push(rowId)
      }
      this.setState({ expandedRowIds: rows })
    } else {
      this.setState({ expandedRowIds: [rowId] })
    }
  }

  getRows = () => {
    return this.props.rows.map(r => {
      const open = this.state.expandedRowIds.some(id => id === r.id)
      const recent =
        moment(r.createdAt).isSame(moment(), 'day') || moment(r.createdAt).isSame(moment().subtract(1, 'days'), 'day')

      return {
        ...r,
        user: (
          <>
            {getSafe(() => r.relatedCompany.avatarUrl, false) && (
              <UserImage src={r.relatedCompany.avatarUrl} bordered />
            )}
            <UserName as='h3'>{r.nameOfUser}</UserName>
            <UserCompany as='h4'>
              {getSafe(() => r.info.requestedBy.company.cfDisplayName, false) ||
                getSafe(() => r.info.buyerCompanyName, false)}
            </UserCompany>
          </>
        ),
        notification: (
          <StyledNotification
            onClick={() => {
              if (r.info) this.toggleDetail(r.id)
            }}>
            {ReactHtmlParser(r.text)}
            {r.read && (
              <CheckIcon>
                <Check />
              </CheckIcon>
            )}
          </StyledNotification>
        ),
        clsName: 'unread' + (open ? ' open' : '') + (recent ? ' recent' : ''),
        time: r.createdAt ? (
          <Popup
            size='small'
            inverted
            style={{
              fontSize: '12px',
              color: '#cecfd4',
              opacity: '0.9'
            }}
            header={
              <div style={{ color: '#cecfd4', fontSize: '12px' }}>{moment(r.createdAt).toDate().toLocaleString()}</div>
            }
            trigger={<div style={{ color: '#848893' }}>{moment(r.createdAt).fromNow()}</div>}
          />
        ) : (
          'N/A'
        ),
        timeGroup: r.createdAt
          ? moment(r.createdAt).isSame(moment(), 'day')
            ? 'Today'
            : moment(r.createdAt).isSame(moment().subtract(1, 'days'), 'day')
            ? 'Yesterday'
            : moment(r.createdAt).isSame(moment(), 'week')
            ? 'This Week'
            : moment(r.createdAt).isSame(moment(), 'month')
            ? 'This Month'
            : 'Older'
          : '',
        expand: r.info ? (
          open ? (
            <ChevronUp size={16} onClick={() => this.toggleDetail(r.id)} style={{ cursor: 'pointer' }} />
          ) : (
            <ChevronDown size={16} onClick={() => this.toggleDetail(r.id)} style={{ cursor: 'pointer' }} />
          )
        ) : null
      }
    })
  }

  getRowDetail = ({ row }) => {
    return <RowDetail row={row.rawData} />
  }

  render() {
    const { intl, datagrid } = this.props
    const { formatMessage } = intl
    const { columns, expandedRowIds } = this.state

    return (
      <Fragment>
        <div className='flex stretched table-detail-rows-wrapper notifications-wrapper notifications-admin-wrapper'>
          <ProdexTable
            tableName='operations_shipping_quote_requests}'
            {...datagrid.tableProps}
            loading={datagrid.loading}
            columnReordering={false}
            groupBy={['timeGroup']}
            getChildGroups={rows => {
              return _(rows)
                .groupBy('timeGroup')
                .map(v => {
                  return {
                    key: `${v[0].timeGroup}`,
                    childRows: v,
                    groupLength: v.length
                  }
                })
                .value()
            }}
            renderGroupLabel={({ row: { value }, groupLength }) => null}
            hideGroupCheckboxes={true}
            columns={columns}
            isToggleCellComponent={false}
            isBankTable={true}
            rowDetailType={true}
            rows={this.getRows()}
            rowDetail={({ row }) => <RowDetail row={row.rawData} />}
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={expandedRowIds => this.setState({ expandedRowIds })}
            rowSelection={false}
            lockSelection={false}
            showSelectAll={false}
            estimatedRowHeight={1000} // to fix virtual table for large rows - hiding them too soon and then hiding the whole table
            defaultSorting={{ columnName: 'time', sortPath: 'Message.createdAt', direction: 'DESC' }}
          />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map(r => {
      return {
        ...r,
        rawData: r,
        notificationType: r.category.replace(/_/g, ' '),
        nameOfUser: getSafe(() => r.info.requestedBy.name, ''),
        usersCompany: getSafe(() => r.info.requestedBy.company.cfDisplayName, '')
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, {})(injectIntl(ShippingQuoteRequestsTable)))
