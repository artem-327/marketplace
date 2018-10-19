import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropdown from '../../../../../components/Dropdown/Dropdown'
import Spinner from '../../../../../components/Spinner/Spinner'
import PopupComponent from '../../../../../components/PopUp/PopupComponent'
import { removePopup } from "../../../../../modules/popup";
import './AddBroadcast.css';

class AddBroadcast extends Component {

  handleContinue = () => {
    console.log("aplikuje se broadcast")
    removePopup()
  }

  render() {
    const { removePopup, isFetching } = this.props;
    if (isFetching) return <Spinner />


    return (
      <PopupComponent handleContinue={this.handleContinue} removePopup={removePopup} headerTitle="Broadcast control">
        <div className="add-broadcast">

          <div className="add-broadcast-nav">
            <div className="add-broadcast-nav-link">Client List Client Price</div>
          </div>

          <div className="add-broadcast-main">
            Main section
          </div>

          <div className="add-broadcast-filter">
            <div>
              <label>Category Filter</label>
              <Dropdown opns={[]} placeholder="Select Category Filter" />
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
          
          <div className="add-broadcast-main">
              <BroadcastField name="Asia" type="region"/>
              <BroadcastField name="Europe" type="region"/>
              <BroadcastField name="State A" type="state"/>
              <BroadcastField name="Company A" type="company"/>
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
      <i className="fas fa-angle-right"></i> {name}
    </div>
  );
};
