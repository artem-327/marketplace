import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form } from "react-redux-form";
import { bindActionCreators } from "redux";
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";
import RegionBroadcastField from "./RegionBroadcastField";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Spinner from "../../../../../components/Spinner/Spinner";
import PopupComponent from "../../../../../components/PopUp/PopupComponent";
import { removePopup } from "../../../../../modules/popup";
import { fetchRegions, fetchRegionDetail, fetchStates, fetchStateDetail } from "../../../../../modules/location";
import { fetchAll as fetchCompanies } from "../../../../../modules/companies"; //TODO
import { required } from "../../../../../utils/validation";
import RemoteComboBoxRedux from "../../../../../components/ComboBox/RemoteComboBoxRedux";
import "./AddBroadcast.css";
import { actions } from 'react-redux-form';

class AddBroadcast extends Component {
  state = {
    isList: true,
    categoryFilter: false,
    regionIsExpanded: false,
    stateIsExpanded: false,
  };

  componentDidMount() { //TODO fetch after selection!
    this.props.fetchRegions()
    this.props.fetchCompanies()
    this.props.fetchStates()
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
    const {dispatch, storedCompanies, storedStates, stateDetail, regionDetail, storedRegions, searchedItem } = this.props
      // manipulate companies broadcast rules based on state broadcast rule
      if (this.state.stateIsExpanded !== prevState.stateIsExpanded) {
        this.checkUpToDownBroadcasts(storedStates, stateDetail, "companies", "company", dispatch)
      }

      // manipulate states broadcast rules based on region broadcast rule
      if (this.state.regionIsExpanded !== prevState.regionIsExpanded) {
        this.checkUpToDownBroadcasts(storedRegions, regionDetail, "countries", "state", dispatch)
      }

      if ((storedCompanies && stateDetail.companies) || storedStates !== prevProps.storedStates) { 
        // manipulate companies broadcast rules based on state broadcast rule
        if(this.state.stateIsExpanded && (storedStates !== prevProps.storedStates || !prevProps.storedStates)) {
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
        if(this.state.regionIsExpanded && (storedRegions !== prevProps.storedRegions || !prevProps.storedRegions)) {
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
    console.log("aplikuje se broadcast"); //TODO
    removePopup();
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
      fetchRegionDetail, fetchStateDetail
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
    const {regions, states, companies, fetchRegions, isFetching, dispatch } = this.props
    const {categoryFilter} = this.state;
    switch(categoryFilter){
        case 'region': return <RemoteComboBoxRedux
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
        case 'state': return <RemoteComboBoxRedux
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
        case 'company': return <RemoteComboBoxRedux
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
    const {categoryFilter} = this.state;
    console.log(this.props, this.state)
    const { isList } = this.state;
    const categoryFilterOptions = [
      { name: "Regions", id: "region" },
      { name: "States", id: "state" },
      { name: "Companies", id: "company" }
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
            {this.props.searchedItem && this.props.searchedItem.type === "region" && categoryFilter==="region" && <RegionBroadcastField
              regionDetail={this.props.regionDetail}
              stateDetail={this.props.stateDetail}
              showSubordinateItems={this.showSubordinateItems}
              dispatch={dispatch}
              isList={isList}
              regionIsExpanded={this.state.regionIsExpanded}
              stateIsExpanded={this.state.stateIsExpanded}
              name={this.props.searchedItem.name}
              id={this.props.searchedItem.id}
            />}

            {this.props.searchedItem && this.props.searchedItem.type === "state" && categoryFilter==="state" && <StateBroadcastField
              stateDetail={this.props.stateDetail}
              showSubordinateItems={this.showSubordinateItems}
              dispatch={dispatch}
              isList={isList}
              stateIsExpanded={this.state.stateIsExpanded}
              name={this.props.searchedItem.name}
              id={this.props.searchedItem.id}
            />}

            {this.props.searchedItem && this.props.searchedItem.type === "company" && categoryFilter==="company" && <BroadcastField
              name={this.props.searchedItem.name}
              type="company"
              showSubordinateItems={this.showSubordinateItems}
              dispatch={dispatch}
              isList={isList}
              id={this.props.searchedItem.id}
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

const mapStateToProps = store => {
  return {
    isFetching: store.location.isFetching,

    stateDetail: store.location.stateDetail,
    regionDetail: store.location.regionDetail,
    regions: store.location.regions,
    states: store.location.states,
    companies: store.companies.data,

    searchedItem: store.forms.broadcastRules.search,
    storedCompanies: store.forms.broadcastRules.company,
    storedStates: store.forms.broadcastRules.state,
    storedRegions: store.forms.broadcastRules.region, 
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removePopup, fetchRegions, fetchRegionDetail, fetchStates, fetchCompanies, fetchStateDetail, dispatch }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBroadcast);
