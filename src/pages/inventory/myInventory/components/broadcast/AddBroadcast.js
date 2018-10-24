import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropdown from '../../../../../components/Dropdown/Dropdown'
import Spinner from '../../../../../components/Spinner/Spinner'
import PopupComponent from '../../../../../components/PopUp/PopupComponent'
import CheckboxRedux from '../../../../../components/Checkbox/CheckboxRedux';
import Switcher from '../../../../../components/Switcher/Switcher';
import { removePopup } from "../../../../../modules/popup";
import './AddBroadcast.css';

class AddBroadcast extends Component {

  handleContinue = () => {
    console.log("aplikuje se broadcast")
    removePopup()
  }

  render() {
    const { removePopup, isFetching } = this.props;
    const categoryFilterOptions = [{name: "Regions"}, {name: "States"}, {name: "Companies"}]
    if (isFetching) return <Spinner />

    return (
      <PopupComponent handleContinue={this.handleContinue} removePopup={removePopup} headerTitle="Broadcast control">
        <div className="add-broadcast">

          <div className="broadcast-nav">
            <div>Client List</div>
            <div>Client Price</div>
           </div>


          <div className="broadcast-filter">
            <div>
              <label>Category Filter</label>
              <Dropdown opns={categoryFilterOptions} placeholder="Select Category Filter" />
            </div>
            {/* <RemoteComboBoxRedux 
              items={this.props.originData}
              api={() => {}}
              limit={20} 
              label="Search In the Regions"
              isFetching={}
              saveObj={obj => obj.id}
              validators={{ required }} 
              dispatch={this.props.dispatch}
              model="forms.broadcast.search" /> */}
            <div>
              <label>Templates</label>
              <Dropdown opns={[]} placeholder="Select Template" />
            </div>
          </div>

          <div className="broadcast-filter-nav">
            <div className="field-name">Region</div>
            <div className="field-rules"><div>Include</div><div>Anonymous</div></div>
          </div>

          <div className="broadcast-main">
              <BroadcastField name="Asia" type="region"/>
              <BroadcastField name="Europe" type="region"/>
              <BroadcastField name="State A" type="state"/>
              <BroadcastField name="Company A" type="company"/>
              <BroadcastField name="Company B" type="company"/>
              <BroadcastField name="Company C" type="company"/>
              <BroadcastField name="Company D" type="company"/>
          </div>
        </div>
      </PopupComponent>
    )
  }
}

AddBroadcast.propTypes = {
  isFetching: PropTypes.bool,
  removePopup: PropTypes.func,
}

function mapStateToProps(store) {
  return {
    isFetching: false, //TODO
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removePopup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBroadcast);

const BroadcastField = ({name, type}) => {
  const broadcastClass = `broadcast-field ${type}`
  return (
    <div className={broadcastClass}>
      <div className="field-name"><i className="fas fa-angle-right"></i> {name}</div>
      <div className="field-rules">
        <Switcher onChange={() => {}} value={true} id={2}/> 
        <CheckboxRedux></CheckboxRedux></div>
    </div>
  );
};
