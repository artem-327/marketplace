import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "react-redux-form";
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";
import RegionBroadcastField from "./RegionBroadcastField";
import {RegionsSearchBox, StatesSearchBox, CompaniesSearchBox, DefaultSearchBox} from "./BroadcastSearchBoxes";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import PopupComponent from "../../../../../components/PopUp/PopupComponent";

import "./AddBroadcast.css";
import { actions } from 'react-redux-form';

class AddBroadcast extends Component {
  state = {
    isList: true,
    categoryFilter: false,
    regionIsExpanded: false,
    stateIsExpanded: false,
  };

  componentDidMount() {
    this.props.fetchRegions()
  }

  //transform storedStates/storedCompanies/storedRegions from object of objects to array of objects (the former object key is now id property)
  convertObjectToArray = (storedObject) => {
    if (!storedObject) return;
    const storedValues = Object.values(storedObject) 
    const storedKeys = Object.keys(storedObject)
    const newArray = storedValues.map((item, index) => ({...item, id: parseInt(storedKeys[index], 10)}))
    return newArray;
  }

  checkUpToDownBroadcasts = (storedParent, parentDetail, children, child, dispatch) => {
    const parent = this.convertObjectToArray(storedParent)
    const currentParrent = storedParent && parent.find(i => i.id === parentDetail.id)
    // manipulate with companies broadcast rules based on state broadcast rule
      if(currentParrent) {
        if(currentParrent.include) parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.include`, true)))
        if(currentParrent.anonymous) parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.anonymous`, true)))
        if(currentParrent.priceUnit === "%") parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.priceUnit`, "%")))
        if(currentParrent.priceUnit === "$") parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.priceUnit`, "$")))
        if(currentParrent.priceValue) parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.priceValue`, currentParrent.priceValue)))
      }
  }

  checkDownToUpBroadcasts = (storedChildren, parentDetail, dispatch, parentsChildren, parent) => {
    const children = this.convertObjectToArray(storedChildren) 
    const childrenFiltered = storedChildren && children.filter(obj => parentDetail[parentsChildren].find(obj2 => obj.id === obj2.id)) //from storedChildren filter only those companies that are also in the selected State
    const areAllBroadcasted = storedChildren && childrenFiltered.length === parentDetail[parentsChildren].length; //check that all companies from selected state has a broadcast rule

    const allChildrenInclude = areAllBroadcasted && childrenFiltered.every(i => i.include === true) //also check if every company broadcast-include rule is set to true
    const allChildrenChecked = areAllBroadcasted && childrenFiltered.every(i => i.anonymous === true) //also check if every company broadcast-anonymous rule is set to true
    const allChildrenUnitSame = (priceUnit) => areAllBroadcasted && childrenFiltered.every(i => i.priceUnit === priceUnit) 
    const allValuesEqual = arr => arr.every(i => i.priceValue === arr[0].priceValue )
    const allChildrenValueSame = areAllBroadcasted && allValuesEqual(childrenFiltered) 

    if (allChildrenInclude) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.include`, true));
    if (!allChildrenInclude) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.include`, false));
    if (allChildrenChecked) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.anonymous`, true));
    if (!allChildrenChecked) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.anonymous`, false));
    if (allChildrenUnitSame("%")) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceUnit`, "%"));
    if (allChildrenUnitSame("$")) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceUnit`, "$"));
    if (!allChildrenUnitSame("$") && !allChildrenUnitSame("%")) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceUnit`, ""));
    if (allChildrenValueSame) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceValue`, (childrenFiltered[0].priceValue)));
    if (!allChildrenValueSame) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceValue`, ""));
  }

  componentDidUpdate(prevProps, prevState) {
    const {fetchStateDetail, fetchRegionDetail, dispatch, storedCompanies, storedStates, stateDetail, regionDetail, storedRegions, searchedItem } = this.props
    const {stateIsExpanded, regionIsExpanded} = this.state;
      // manipulate companies broadcast rules based on state broadcast rule
      if (this.props.stateDetailIsFetching !== prevProps.stateDetailIsFetching || stateIsExpanded !== prevState.stateIsExpanded) {
        this.checkUpToDownBroadcasts(storedStates, stateDetail, "companies", "company", dispatch)
      }
      // manipulate states broadcast rules based on region broadcast rule
      if (this.props.regionDetailIsFetching !== prevProps.regionDetailIsFetching || regionIsExpanded !== prevState.regionIsExpanded) {
          this.checkUpToDownBroadcasts(storedRegions, regionDetail, "countries", "state", dispatch)
      }

      if ((storedCompanies && stateDetail.companies) || storedStates !== prevProps.storedStates) { 
        // manipulate companies broadcast rules based on state broadcast rule
        if(stateIsExpanded && (storedStates !== prevProps.storedStates || !prevProps.storedStates)) {
          this.checkUpToDownBroadcasts(storedStates, stateDetail, "companies", "company", dispatch)
        }
        // manipulate state broadcast rules on the base of companies broadcast rules
        if (storedCompanies !== prevProps.storedCompanies) {
          this.checkDownToUpBroadcasts(storedCompanies, stateDetail, dispatch, "companies", "state")
        }
      }

      if(regionDetail.countries && (storedRegions !== prevProps.storedRegions || storedStates !== prevProps.storedStates)) {
        // manipulate with region broadcast rules on the base of states broadcast rules
        if (storedStates !== prevProps.storedStates) { 
          this.checkDownToUpBroadcasts(storedStates, regionDetail, dispatch, "countries", "region")
        }
        // manipulate states broadcast rules based on region broadcast rule
        if(regionIsExpanded && (storedRegions !== prevProps.storedRegions || !prevProps.storedRegions)) {
          this.checkUpToDownBroadcasts(storedRegions, regionDetail, "countries", "state", dispatch)
        }
      }

      // fetch new detail after the click on broadcast-rule
      if (searchedItem && Object.keys(searchedItem).length !== 0) {
        if (!prevProps.searchedItem || searchedItem.id !== prevProps.searchedItem.id || searchedItem.type !== prevProps.searchedItem.type) {
            this.setState({stateIsExpanded: false}, () => fetchStateDetail(searchedItem.id)); //fetch new state detail after the new search entry
            this.setState({regionIsExpanded: false}, () => fetchRegionDetail(searchedItem.id)); //fetch new state detail after the new search entry
          }
      } 
  }

  handleContinue = () => {
    console.log("broadcast was applied"); //TODO
    this.props.removePopup();
  };

  switchToList = () => {
    this.setState({ isList: true });
  };

  switchToPrice = () => {
    this.setState({ isList: false });
  };

  showSubordinateItems = (e) => {
    const typeOfClickedItem = e.target.getAttribute('name');
    const idOfClickedItem = parseInt(e.target.id, 10);
    const {
      fetchRegionDetail, fetchStateDetail,
    } = this.props;

    if (typeOfClickedItem === "company") return

    if (typeOfClickedItem === "state") { 
      fetchStateDetail(idOfClickedItem);
      this.setState({stateIsExpanded: idOfClickedItem})
    }

    if (typeOfClickedItem === "region") { 
      fetchRegionDetail(idOfClickedItem);
      this.setState({regionIsExpanded: idOfClickedItem})
    }
  }

  renderSearchField = () => {
    const {regions, states, companies, fetchStates, fetchCompanies, fetchRegions, dispatch, companiesAreFetching, statesAreFetching, regionsAreFetching } = this.props
    const {categoryFilter} = this.state;
    switch(categoryFilter){
        case 'region': return <RegionsSearchBox 
          regions={regions} 
          fetchRegions={fetchRegions} 
          isFetching={regionsAreFetching} 
          dispatch={dispatch}
      />;
        case 'state': return <StatesSearchBox
          states={states} 
          fetchStates={fetchStates} 
          isFetching={statesAreFetching} 
          dispatch={dispatch}
      />;
        case 'company': return <CompaniesSearchBox
          companies={companies} 
          fetchCompanies={fetchCompanies} 
          isFetching={companiesAreFetching} 
          dispatch={dispatch}
      />;
        default: return <DefaultSearchBox
      />;
    }
  }

  render() {
    const { removePopup, dispatch, stateDetail, searchedItem, regionDetail, regionDetailIsFetching, stateDetailIsFetching } = this.props;
    const { isList, categoryFilter, regionIsExpanded, stateIsExpanded } = this.state;
    console.log(this.props, this.state)

    const categoryFilterOptions = [
      { name: "Regions", id: "region" },
      { name: "States", id: "state" },
      { name: "Companies", id: "company" }
    ];
    const templatesOptions = [] //TODO

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
            <div className="field-name">Name {categoryFilter && `(${categoryFilter})`}</div>
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
            {searchedItem && searchedItem.type === "region" && categoryFilter === "region" && <RegionBroadcastField
              regionDetail={regionDetail}
              regionDetailIsFetching={regionDetailIsFetching}
              stateDetailIsFetching={stateDetailIsFetching}
              stateDetail={stateDetail}
              showSubordinateItems={this.showSubordinateItems}
              dispatch={dispatch}
              isList={isList}
              regionIsExpanded={regionIsExpanded}
              stateIsExpanded={stateIsExpanded}
              name={searchedItem.name}
              id={searchedItem.id}
            />}

            {searchedItem && searchedItem.type === "state" && categoryFilter === "state" && <StateBroadcastField
              stateDetail={stateDetail}
              stateDetailIsFetching={stateDetailIsFetching}
              showSubordinateItems={this.showSubordinateItems}
              dispatch={dispatch}
              isList={isList}
              stateIsExpanded={stateIsExpanded}
              name={searchedItem.name}
              id={searchedItem.id}
            />}

            {searchedItem && searchedItem.type === "company" && categoryFilter === "company" && <BroadcastField
              name={searchedItem.name}
              type="company"
              showSubordinateItems={this.showSubordinateItems}
              dispatch={dispatch}
              isList={isList}
              id={searchedItem.id}
            />}
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

export default AddBroadcast;
