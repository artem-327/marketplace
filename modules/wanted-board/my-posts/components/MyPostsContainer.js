import { connect } from 'react-redux'
import moment from 'moment'
import { withDatagrid } from '../../../datagrid'
import * as Actions from '../../actions'
import MyPosts from './MyPosts'
import { getLocaleDateFormat } from '../../../../components/date-format'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.wantedBoard,
    rows: datagrid.rows.map(row => {
      let province = row?.deliveryCountry?.hasProvinces ? row?.deliveryProvince?.name : null
      let country = row?.deliveryCountry?.name
      return {
        id: row.id,
        rawData: row,
        productName: row?.productSearchPattern || row?.element?.productGroup?.name || row?.element?.casProduct?.name || row?.element?.casProduct?.casIndexName,
        quantity: `${row?.quantity} ${row?.unit?.nameAbbreviation}`,
        shippingLocation: province ? province + ", " + country : country ? country : "",
        conforming: row?.conforming ? 'Yes' : 'No',
        postExpiry: moment(row.expiresAt).format(getLocaleDateFormat())
      }
    })
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions
  })(MyPosts)
)
