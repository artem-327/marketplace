import { connect } from 'react-redux'
import ShippingQuoteRequestsTable from './ShippingQuoteRequestsTable'
import { withDatagrid } from '../../../datagrid'
import { getSafe } from '../../../../utils/functions'

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
  
  export default withDatagrid(connect(mapStateToProps, {})(ShippingQuoteRequestsTable))
  