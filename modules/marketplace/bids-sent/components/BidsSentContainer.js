import { connect } from 'react-redux'
// Components
import BidsSent from './BidsSent'
// Actions
import * as Actions from '../../actions'
// Services
import { withDatagrid } from '../../../../modules/datagrid'

const makeMapStateToProps = () => {
  const mapStateToProps = (store, { datagrid }) => {
    return {
      ...store.marketplace,
      rows: datagrid?.rows,
    }
  }
  return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, { ...Actions })(BidsSent))
