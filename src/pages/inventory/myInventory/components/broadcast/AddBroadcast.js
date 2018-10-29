import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form } from "react-redux-form";
import { bindActionCreators } from "redux";
import BroadcastField from "./BroadcastField";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Spinner from "../../../../../components/Spinner/Spinner";
import PopupComponent from "../../../../../components/PopUp/PopupComponent";
import { removePopup } from "../../../../../modules/popup";
import { fetchRegions, fetchStates, fetchStateDetail } from "../../../../../modules/location";
import { fetchAll as fetchCompanies } from "../../../../../modules/companies"; //TODO
import { required } from "../../../../../utils/validation";
import RemoteComboBoxRedux from "../../../../../components/ComboBox/RemoteComboBoxRedux";
import "./AddBroadcast.css";
import { actions } from 'react-redux-form';

class AddBroadcast extends Component {
  state = {
    isList: true,
    categoryFilter: false,
    isExpanded: false
  };

  componentDidMount() { //TODO fetch after selection!
    this.props.fetchRegions()
    this.props.fetchCompanies()
    this.props.fetchStates()
  }


  componentDidUpdate(prevProps) {
    const {dispatch, storedCompanies, storedStates, stateDetail, searchedItem } = this.props
      if (storedCompanies && stateDetail.companies || storedStates !== prevProps.storedStates) { 
      // storedCompanies are all companies (from different states, but with unique id) in broadcastRules store
      // stateDetail.companies are all companies of selected State
      
      const companiesValues = storedCompanies && Object.values(storedCompanies) 
      const companiesKeys = storedCompanies && Object.keys(storedCompanies)
      const companies = storedCompanies && companiesValues.map((item, index) => ({...item, id: parseInt(companiesKeys[index], 10)})) 
      //transform storedCompanies from object of objects to array of objects (the former object key is now id property)
      
      const companiesFiltered = storedCompanies && companies.filter(obj => stateDetail.companies.find(obj2 => obj.id === obj2.id)) //from storedCompanies filter only those companies that are also in the selected State
      const areAllBroadcasted = storedCompanies && companiesFiltered.length === stateDetail.companies.length; //check that all companies from selected state has a broadcast rule

      const allCompaniesInclude = areAllBroadcasted && companiesFiltered.every(i => i.include === true) //also check if every company broadcast-include rule is set to true
      const allCompaniesChecked = areAllBroadcasted && companiesFiltered.every(i => i.anonymous === true) //also check if every company broadcast-anonymous rule is set to true
      const allCompaniesUnitSame = (priceUnit) => areAllBroadcasted && companiesFiltered.every(i => i.priceUnit === priceUnit) 
      const allValuesEqual = arr => arr.every(i => i.priceValue === arr[0].priceValue )
      const allCompaniesValueSame = areAllBroadcasted && allValuesEqual(companiesFiltered) 

      const statesValues = storedStates && Object.values(storedStates) 
      const statesKeys = storedStates && Object.keys(storedStates)
      const states = storedStates && statesValues.map((item, index) => ({...item, id: parseInt(statesKeys[index], 10)})) 
      const currentState = storedStates && states.find(i => i.id === stateDetail.id)
      if(this.state.isExpanded && currentState && (storedStates !== prevProps.storedStates || !prevProps.storedStates)) {
        if(currentState.include) stateDetail.companies.forEach(i => dispatch(actions.change(`forms.broadcastRules.company.${i.id}.include`, true)))
        if(currentState.anonymous) stateDetail.companies.forEach(i => dispatch(actions.change(`forms.broadcastRules.company.${i.id}.anonymous`, true)))
        if(currentState.priceUnit === "%") stateDetail.companies.forEach(i => dispatch(actions.change(`forms.broadcastRules.company.${i.id}.priceUnit`, "%")))
        if(currentState.priceUnit === "$") stateDetail.companies.forEach(i => dispatch(actions.change(`forms.broadcastRules.company.${i.id}.priceUnit`, "$")))
        if(currentState.priceValue) stateDetail.companies.forEach(i => dispatch(actions.change(`forms.broadcastRules.company.${i.id}.priceValue`, currentState.priceValue)))
      }

      if (storedCompanies !== prevProps.storedCompanies) { // manipulate with state broadcast rules on the base of companies broadcast rules
        if (allCompaniesInclude)  dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.include`, true));
        if (!allCompaniesInclude)  dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.include`, false));
        if (allCompaniesChecked) dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.anonymous`, true));
        if (!allCompaniesChecked) dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.anonymous`, false));
        if (allCompaniesUnitSame("%")) dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.priceUnit`, "%"));
        if (allCompaniesUnitSame("$")) dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.priceUnit`, "$"));
        if (!allCompaniesUnitSame("$") && !allCompaniesUnitSame("%")) dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.priceUnit`, ""));
        if (allCompaniesValueSame) dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.priceValue`, (companiesFiltered[0].priceValue)));
        if (!allCompaniesValueSame) dispatch(actions.change(`forms.broadcastRules.state.${stateDetail.id}.priceValue`, ""));
      }
    }


    if (searchedItem && Object.keys(searchedItem).length !== 0) {
      if (!prevProps.searchedItem || searchedItem.id !== prevProps.searchedItem.id) {
          this.setState({isExpanded: false}, () => fetchStateDetail(searchedItem.id)); //fetch new state detail after the new search entry
      }
    } 
  }

  handleContinue = () => {
    console.log("aplikuje se broadcast"); //TODO
    removePopup();
  };

  switchToList = () => {
    this.setState({ isList: true });
  };

  switchToPrice = () => {
    this.setState({ isList: false });
  };

  showSubordinateItems = () => {
    const {searchedItem, stateDetail, fetchStateDetail} = this.props;
    if (searchedItem.type === "state" && searchedItem.id === stateDetail.id) return
    if (searchedItem.type === "state") { 
      fetchStateDetail(searchedItem.id);
    }
    this.setState({isExpanded: true})
  }

  renderSearchField = () => {
    const {regions, states, companies, fetchRegions, isFetching, dispatch } = this.props
    const {categoryFilter} = this.state;
    switch(categoryFilter){
        case 'regions': return <RemoteComboBoxRedux
        items={regions}
        api={text => fetchRegions(text)}
        limit={20}
        label="Search In the Regions"
        placeholder="Search For a Region"
        isFetching={isFetching}
        saveObj={obj => {return {type: "region", ...obj}}}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.broadcastRules.search"
      />;
        case 'states': return <RemoteComboBoxRedux
        items={states}
        api={text => fetchStates(text)}
        limit={20}
        label="Search In the States"
        placeholder="Search For a State"
        isFetching={isFetching}
        saveObj={obj => {return {type: "state", ...obj}}}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.broadcastRules.search"
      />;
        case 'companies': return <RemoteComboBoxRedux
        items={companies}
        api={text => fetchCompanies(text)}
        limit={20}
        label="Search In the Companies"
        placeholder="Search For a Company"
        isFetching={isFetching}
        saveObj={obj => {return {type: "company", ...obj}}}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.broadcastRules.search"
      />;
        default: return <RemoteComboBoxRedux
        disabled
        items={[]}
        limit={20}
        label="Please Select the Category Filter First"
        placeholder="Search"
        model="forms.broadcastRules.search"
      />;
    }
  }

  render() {
    const { removePopup, dispatch } = this.props;
    console.log(this.props, this.state)
    const { isList } = this.state;
    const categoryFilterOptions = [
      { name: "Regions", id: "regions" },
      { name: "States", id: "states" },
      { name: "Companies", id: "companies" }
    ];
    const templatesOptions = [] //TODO
    if (false) return <Spinner />; //TODO
    return (
      <PopupComponent
        handleContinue={this.handleContinue}
        removePopup={removePopup}
        headerTitle="Broadcast control"
      >
        <div className="add-broadcast">
          <div className="broadcast-nav">
            <div className={isList ? "active" : ""} onClick={this.switchToList}>
              Client List
            </div>
            <div
              className={!isList ? "active" : ""}
              onClick={this.switchToPrice}
            >
              Client Price
            </div>
          </div>

          <div className="broadcast-filter">
            <div className="broadcasting-info">
              <i className="fas fa-info-circle" />
              <span>
                Broadcasting to: <b>85/260</b>
              </span>
            </div>
            <div className="group-item-wr">
              <label>Category Filter</label>
              <Dropdown
                opns={categoryFilterOptions}
                placeholder="Select Category Filter"
                onChange={value => this.setState({categoryFilter: value})}
              />
            </div>
            <div className="group-item-wr">
              {this.renderSearchField()}
            </div>
            <hr />
            <div className="group-item-wr">
              <label>Templates ({templatesOptions.length})</label>
              <Dropdown opns={[]} placeholder="Select Template" disabled={templatesOptions.length === 0 ? true : false}/>
            </div>
          </div>

          <div className="broadcast-filter-nav">
            <div className="field-name">Name {this.state.categoryFilter && `(${this.state.categoryFilter})`}</div>
            {isList ? (
              <div className="list-rules">
                <div>Include</div>
                <div>Anonymous</div>
              </div>
            ) : (
              <div>Mark-up/down</div>
            )}
          </div>

          <div className="broadcast-main">
          <Form model="forms.broadcastRules" onSubmit={v => console.log(v)}>
          {this.props.searchedItem && <BroadcastField
              name={this.props.searchedItem.name}
              type={this.props.searchedItem.type}
              showSubordinateItems={this.showSubordinateItems}
              dispatch={dispatch}
              isList={isList}
              id={this.props.searchedItem.id}
              isExpanded={this.state.isExpanded}
            />}
          {this.props.stateDetail && this.state.isExpanded && this.state.categoryFilter==="states" && this.props.stateDetail.companies && this.props.stateDetail.companies.map(i => {
            return <BroadcastField
            name={i.name}
            type="company"
            dispatch={dispatch}
            isList={isList}
            id={i.id}
            key={i.id}
          />
          })}
           { false && !this.props.searchedItem && <div><BroadcastField
              name="Asia"
              type="region"
              dispatch={dispatch}
              isList={isList}
              id={1}
            />
            <BroadcastField
              name="Europe"
              type="region"
              dispatch={dispatch}
              isList={isList}
              id={2}
            />
            <BroadcastField
              name="State A"
              type="state"
              dispatch={dispatch}
              isList={isList}
              id={1}
            />
            <BroadcastField
              name="Company A"
              type="company"
              dispatch={dispatch}
              isList={isList}
              id={1}
            />
            <BroadcastField
              name="Company B"
              type="company"
              dispatch={dispatch}
              isList={isList}
              id={2}
            />
            <BroadcastField
              name="Company C"
              type="company"
              dispatch={dispatch}
              isList={isList}
              id={3}
            />
            <BroadcastField
              name="Company D"
              type="company"
              dispatch={dispatch}
              isList={isList}
              id={4}
            /></div>}
            </Form>
          </div>
        </div>
      </PopupComponent>
    );
  }
}

AddBroadcast.propTypes = {
  isFetching: PropTypes.bool,
  removePopup: PropTypes.func
};

const mapStateToProps = store => {
  return {
    isFetching: store.location.isFetching,

    //companiesOfState: [{id: 1, name: "Company A", include: false, anonymous: false},{id: 2, name: "Company B", include: false, anonymous: false}],
    //companiesOfState: store.location.stateDeatil.companies,
    stateDetail: store.location.stateDetail,
    regions: store.location.regions,
    states: store.location.states,
    companies: store.companies.data,

    searchedItem: store.forms.broadcastRules.search,
    storedCompanies: store.forms.broadcastRules.company,
    storedStates: store.forms.broadcastRules.state
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removePopup, fetchRegions, fetchStates, fetchCompanies, fetchStateDetail, dispatch }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBroadcast);


