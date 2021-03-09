import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Dimmer, Loader } from 'semantic-ui-react'
import { func, bool, array } from 'prop-types'
import { withDatagrid } from '~/modules/datagrid'
// Services
import { injectIntl, FormattedMessage } from 'react-intl'
import ProdexTable from "../../../components/table"
import { groupActions } from "../../company-product-info/constants"
import {
  postNewWarehouseRequest,
  putEditWarehouse
} from "../../settings/actions"
import { getSafe } from "../../../utils/functions"
// Constants
import { columns } from './WarehouseCredentials.constants'
// Styles


const WarehouseCredentialsContainer = props => {

  const {
    datagrid,
    intl: { formatMessage },
    rows
  } = props

  return (
    <>
      <div className='flex stretched warehouse-credentials-wrapper listings-wrapper' style={{ padding: '10px 30px' }}>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='warehouse_credentials_grid'
          columns={columns}
          rows={rows}
          hideCheckboxes
          loading={datagrid.loading}
        />
      </div>
    </>
  )
}

const mapDispatchToProps = {
  postNewWarehouseRequest,
  putEditWarehouse
}

const mapStateToProps = (state, { datagrid }) => {
  console.log('ROWS', datagrid.rows)
  return {
    rows: datagrid.rows.length ? datagrid.rows.map(r => {
      console.log('RRRRRRRRR', r)
      return {
        warehouseName: r.name
      }
    }) : [{ name: 'Test'}]
  }
}

WarehouseCredentialsContainer.propTypes = {
  rows: array
}

WarehouseCredentialsContainer.defaultProps = {
  rows: []
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(WarehouseCredentialsContainer)))
