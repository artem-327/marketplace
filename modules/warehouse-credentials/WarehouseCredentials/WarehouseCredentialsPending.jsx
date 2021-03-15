import { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Dimmer, Loader, Popup } from 'semantic-ui-react'
import { func, bool, array, string } from 'prop-types'
import { withDatagrid } from '~/modules/datagrid'
import moment from 'moment'
// Services
import { injectIntl, FormattedMessage } from 'react-intl'
import ProdexTable from '../../../components/table'
import { groupActions } from '../../company-product-info/constants'
import {
  postNewWarehouseRequest,
  putEditWarehouse
} from '../../settings/actions'
import { getSafe } from '../../../utils/functions'
// Constants
import { pendingColumns as columns } from './WarehouseCredentials.constants'
import { UserCompany, UserImage, UserName } from '../../alerts/components/layout'
// Styles


class WarehouseCredentialsPending extends Component {

  componentDidMount() {
    this.props.datagrid.loadData()
  }

  getRows = () => {
    const { rows } = this.props

    console.log('RRRRRRRRRR', rows)

    return rows.map(r => ({
      ...r,
      user: (
        <>
          {getSafe(() => r.info.requestedBy.avatar, false) && (
            <UserImage>
              <img src={r.info.requestedBy.avatar} />
            </UserImage>
          )}
          <UserName as='h3'>{r.name}</UserName>
          <UserCompany as='h4'>{getSafe(() => r.cfDisplayName, false)}</UserCompany>
        </>
      ),
      description: r.description,
      date: r.createdAt ? (
        <Popup
          size='small'
          inverted
          style={{
            fontSize: '12px',
            color: '#cecfd4',
            opacity: '0.9'
          }}
          header={
            <div style={{ color: '#cecfd4', fontSize: '12px' }}>
              {moment(r.createdAt)
                .toDate()
                .toLocaleString()}
            </div>
          }
          trigger={<div style={{ color: r.read || this.props.isAdmin ? '#848893' : '#20273a' }}>{moment(r.createdAt).fromNow()}</div>}
        />
      ) : (
        'N/A'
      )
    }))
  }

  render() {
    const {
      datagrid,
      intl: { formatMessage },
      rows
    } = this.props

    return (
      <>
        <div className='flex stretched warehouse-credentials-wrapper listings-wrapper' style={{padding: '10px 30px'}}>
          <ProdexTable
            {...datagrid.tableProps}
            tableName='warehouse_credentials_grid'
            columns={columns}
            rows={this.getRows()}
            hideCheckboxes
            loading={datagrid.loading}
          />
        </div>
      </>
    )
  }
}

const mapDispatchToProps = {
  postNewWarehouseRequest,
  putEditWarehouse
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map(r => {
      return {
        ...r,
        rawData: r,
        id: r.id,
        user: r.name,
        description: r.name
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(WarehouseCredentialsPending)))
