import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Control } from "react-redux-form";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import Spinner from "../../../../../components/Spinner/Spinner";
import PopupComponent from "../../../../../components/PopUp/PopupComponent";
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux";
import Switcher from "../../../../../components/Switcher/Switcher";
import { removePopup } from "../../../../../modules/popup";
import { fetchRegions } from "../../../../../modules/location";
import { required, isNumber } from "../../../../../utils/validation";
import RemoteComboBoxRedux from "../../../../../components/ComboBox/RemoteComboBoxRedux";
import "./AddBroadcast.css";

class AddBroadcast extends Component {
  state = {
    isList: true
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

  render() {
    const { removePopup, isFetching, dispatch } = this.props;
    const { isList } = this.state;
    const categoryFilterOptions = [
      { name: "Regions" },
      { name: "States" },
      { name: "Companies" }
    ];
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
              />
            </div>
            <div className="group-item-wr">
              <RemoteComboBoxRedux
                items={this.props.regions}
                api={text => this.props.fetchRegions(text)}
                limit={20}
                label="Search In the Regions"
                isFetching={this.props.regionsAreFetching}
                saveObj={obj => obj.id}
                validators={{ required }}
                dispatch={dispatch}
                model="forms.broadcast.search"
              />
            </div>
            <hr />
            <div className="group-item-wr">
              <label>Templates</label>
              <Dropdown opns={[]} placeholder="Select Template" />
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

const BroadcastField = ({ name, type, dispatch, isList }) => {
  return (
    <div className={`broadcast-field ${type}`}>
      <div className="field-name">
        <i className="fas fa-angle-right" /> {name}
      </div>
      {isList ? (
        <div className="list-rules">
          <Switcher
            onChange={value => console.log(value)}
            value={true}
            isRounded={true}
          />
          <CheckboxRedux
            defaultValue={false}
            dispatch={dispatch}
            model={"forms.broadcast.broadcastField"}
            onChange={value => console.log(value)}
          />
        </div>
      ) : (
        <div className="price-rules">
          <Control.text
            model="forms.broadcast.priceRule"
            className="price-rule"
            validators={{ isNumber }}
            id=".mark"
            defaultValue=""
          />
          <div className="price-rules-units"><div>$</div><div>%</div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};
