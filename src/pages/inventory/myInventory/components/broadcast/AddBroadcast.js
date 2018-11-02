import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, actions } from "react-redux-form";
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";
import RegionBroadcastField from "./RegionBroadcastField";
import RouteBroadcastField from "./RouteBroadcastField";
import {RegionsSearchBox, StatesSearchBox, CompaniesSearchBox, DefaultSearchBox} from "./BroadcastSearchBoxes";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import PopupComponent from "../../../../../components/PopUp/PopupComponent";
import Button from "../../../../../components/Button/Button";
import Spinner from '../../../../../components/Spinner/Spinner'

import "./AddBroadcast.css";

class AddBroadcast extends Component {
  state = {
    isList: true,
    categoryFilter: false,
    regionIsExpanded: false,
    stateIsExpanded: false,
  };

  componentDidMount() {
    this.props.fetchRegions()
    this.props.fetchBroadcast()
  }

  //transform storedStates/storedCompanies/storedRegions from object of objects to array of objects (the former object key is now id property)
  convertObjectToArray = (storedObject) => {
    if (!storedObject) return;
    const storedValues = Object.values(storedObject) 
    const storedKeys = Object.keys(storedObject)
    const newArray = storedValues.map((item, index) => ({...item, id: parseInt(storedKeys[index], 10)}))
    return newArray;
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
    const { removePopup, dispatch, broadcastData, broadcastIsFetching } = this.props;
    const { isList, categoryFilter } = this.state;
    if (broadcastIsFetching) return <Spinner />
    const categoryFilterOptions = [
      { name: "Regions", id: "region" },
      { name: "States", id: "state" },
      { name: "Companies", id: "company" }
    ];
    const templatesOptions = [] //TODO

    const footerComponent = (
      <>
        <Button color="grey-white" onClick={() => removePopup()}>
          Cancel
        </Button>
        {/*<Button color="green-white" size="large-2x" onClick={() => removePopup()}>*/}
          {/*Save As Template*/}
        {/*</Button>*/}
        <Button color="blue" onClick={() => removePopup()}>
          Apply
        </Button>
      </>
    )
    return (
      <PopupComponent
        handleContinue={this.handleContinue}
        footerComponent={footerComponent}
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
            <RouteBroadcastField
              name="Root"
              type="root"
              broadcastData={broadcastData}
              dispatch={dispatch}
              isList={isList}
              id={1}
            />
          {/* {!searchedItem && regions.map(i => <RegionBroadcastField
              regionDetail={regionDetail}
              regionDetailIsFetching={regionDetailIsFetching}
              stateDetailIsFetching={stateDetailIsFetching}
              stateDetail={stateDetail}
              showSubordinateItems={this.showSubordinateItems}
              dispatch={dispatch}
              isList={isList}
              regionIsExpanded={regionIsExpanded === i.id}
              stateIsExpanded={stateIsExpanded}
              name={i.name}
              id={i.id}
              key={i.id}
            />)} */}
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
