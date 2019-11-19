import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getBroadcast, postBroadcast} from '../../../../../modules/broadcast'
import {removePopup} from '../../../../../modules/popup'
import AddBroadcast from './AddBroadcast'

const mapStateToProps = store => ({
  broadcastIsFetching: store.brcRules.isFetching,
  broadcastData: store.brcRules.broadcastData,

  storedOffices: store.forms.brcRules.office,
  storedCompanies: store.forms.brcRules.company,
  storedStates: store.forms.brcRules.state,
  storedRegions: store.forms.brcRules.region,
  storedRoot: store.forms.brcRules.root
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removePopup,
      dispatch,
      getBroadcast,
      postBroadcast
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(AddBroadcast)
