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
      regulatoryDeaListAuthorized: store.auth?.identity?.regulatoryDeaListAuthorized,
      regulatoryDhsCoiAuthorized: store.auth?.identity?.regulatoryDhsCoiAuthorized,
      isBroker: store.auth?.identity?.company?.type === 'BROKER'
    }
  }
  return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, { ...Actions })(BidsSent))
