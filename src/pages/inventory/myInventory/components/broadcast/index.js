import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import { fetchRegions, fetchRegionDetail, fetchStates, fetchStateDetail } from "../../../../../modules/location";
import { fetchBroadcast } from "../../../../../modules/broadcast";
import { fetchAll as fetchCompanies } from "../../../../../modules/companies"; //TODO
import {removePopup} from "../../../../../modules/popup";
import AddBroadcast from "./AddBroadcast";

const mapStateToProps = store => ({
    broadcastIsFetching: store.brcRules.isFetching,
    broadcastData: store.brcRules.broadcastData,

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

    searchedItem: store.forms.brcRules.search,

    storedOffices: store.forms.brcRules.office,
    storedCompanies: store.forms.brcRules.company,
    storedStates: store.forms.brcRules.state,
    storedRegions: store.forms.brcRules.region, 
    storedRoot: store.forms.brcRules.root, 
});

const mapDispatchToProps = dispatch => (bindActionCreators({ 
    removePopup, fetchRegions, fetchRegionDetail, fetchStates, fetchCompanies, fetchStateDetail, dispatch, fetchBroadcast
}, dispatch));


export default connect(mapStateToProps, mapDispatchToProps)(AddBroadcast);
