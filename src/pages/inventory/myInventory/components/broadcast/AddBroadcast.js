import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BroadcastField from "./BroadcastField";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Spinner from "../../../../../components/Spinner/Spinner";
import PopupComponent from "../../../../../components/PopUp/PopupComponent";
import { removePopup } from "../../../../../modules/popup";
import { fetchRegions } from "../../../../../modules/location";
import { required } from "../../../../../utils/validation";
import RemoteComboBoxRedux from "../../../../../components/ComboBox/RemoteComboBoxRedux";
import "./AddBroadcast.css";

class AddBroadcast extends Component {
  state = {
    isList: true,
    categoryFilter: false
  };

  handleContinue = () => {
    console.log("aplikuje se broadcast");
    removePopup();
  };

  switchToList = () => {
    this.setState({ isList: true });
  };

  switchToPrice = () => {
    this.setState({ isList: false });
  };

  componentDidMount() {
    this.props.fetchRegions();
  }

  renderSearchField = () => {
    const {regions, fetchRegions, regionsAreFetching, dispatch } = this.props
    const {categoryFilter} = this.state
    switch(categoryFilter){
        case 'regions': return <RemoteComboBoxRedux
        items={regions}
        api={text => fetchRegions(text)}
        limit={20}
        label="Search In the Regions"
        placeholder="Search For a Region"
        isFetching={regionsAreFetching}
        saveObj={obj => obj.id}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.broadcast.search"
      />;
        case 'states': return <RemoteComboBoxRedux
        items={regions}
        api={text => fetchRegions(text)}
        limit={20}
        label="Search In the States"
        placeholder="Search For a State"
        isFetching={regionsAreFetching}
        saveObj={obj => obj.id}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.broadcast.search"
      />;
        case 'companies': return <RemoteComboBoxRedux
        items={regions}
        api={text => fetchRegions(text)}
        limit={20}
        label="Search In the Companies"
        placeholder="Search For a Company"
        isFetching={regionsAreFetching}
        saveObj={obj => obj.id}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.broadcast.search"
      />;
        default: return <RemoteComboBoxRedux
        items={regions}
        api={text => fetchRegions(text)}
        limit={20}
        label="Please Select The Category Filter First"
        placeholder="Search"
        isFetching={regionsAreFetching}
        saveObj={obj => obj.id}
        validators={{ required }}
        dispatch={dispatch}
        disabled
        model="forms.broadcast.search"
      />;
    }
  }

  render() {
    const { removePopup, isFetching, dispatch } = this.props;
    const { isList } = this.state;
    const categoryFilterOptions = [
      { name: "Regions", id: "regions" },
      { name: "States", id: "states" },
      { name: "Companies", id: "companies" }
    ];
    const templatesOptions = [] //TODO
    if (isFetching) return <Spinner />;
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
            <div className="field-name">Region</div>
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
            <BroadcastField
              name="Asia"
              type="region"
              dispatch={dispatch}
              isList={isList}
            />
            <BroadcastField
              name="Europe"
              type="region"
              dispatch={dispatch}
              isList={isList}
            />
            <BroadcastField
              name="State A"
              type="state"
              dispatch={dispatch}
              isList={isList}
            />
            <BroadcastField
              name="Company A"
              type="company"
              dispatch={dispatch}
              isList={isList}
            />
            <BroadcastField
              name="Company B"
              type="company"
              dispatch={dispatch}
              isList={isList}
            />
            <BroadcastField
              name="Company C"
              type="company"
              dispatch={dispatch}
              isList={isList}
            />
            <BroadcastField
              name="Company D"
              type="company"
              dispatch={dispatch}
              isList={isList}
            />
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
    isFetching: false, //TODO
    regionsAreFetching: store.location.regionsAreFetching,
    regions: store.location.regions
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removePopup, fetchRegions, dispatch }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBroadcast);


