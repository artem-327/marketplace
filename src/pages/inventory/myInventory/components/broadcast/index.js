import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import { fetchRegions, fetchRegionDetail, fetchStates, fetchStateDetail } from "../../../../../modules/location";
import { fetchBroadcast } from "../../../../../modules/broadcast";
import { fetchAll as fetchCompanies } from "../../../../../modules/companies"; //TODO
import {removePopup} from "../../../../../modules/popup";
import AddBroadcast from "./AddBroadcast";

const mapStateToProps = store => ({
    broadcastIsFetching: store.broadcastRules.isFetching,
    broadcastData: store.broadcastRules.broadcastData,

    companiesAreFetching: store.companies.isFetching,
    isFetching: store.location.isFetching,
    stateDetailIsFetching: store.location.stateDetailIsFetching,
    regionDetailIsFetching: store.location.regionDetailIsFetching,
    regionsAreFetching: store.location.regionsAreFetching,
    statesAreFetching: store.location.statesAreFetching,
    
    stateDetail: store.location.stateDetail,
    regionDetail: store.location.regionDetail,
    regions: store.location.regions,
    states: store.location.states,
    companies: store.companies.data,

    searchedItem: store.forms.broadcastRules.search,
    
    storedOffices: store.forms.broadcastRules.office,
    storedCompanies: store.forms.broadcastRules.company,
    storedStates: store.forms.broadcastRules.state,
    storedRegions: store.forms.broadcastRules.region, 
    storedRoot: store.forms.broadcastRules.root, 
});

const mapDispatchToProps = dispatch => (bindActionCreators({ 
    removePopup, fetchRegions, fetchRegionDetail, fetchStates, fetchCompanies, fetchStateDetail, dispatch, fetchBroadcast
}, dispatch));


export default connect(mapStateToProps, mapDispatchToProps)(AddBroadcast);
