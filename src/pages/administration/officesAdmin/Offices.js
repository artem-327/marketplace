import React, { Component } from 'react'
import Office from "../companiesAdmin/components/Office";
import Spinner from "../../../components/Spinner/Spinner";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeOffice, fetchOffices, createOffice } from "../../../modules/companies";
import { fetchLocations } from "../../../modules/location";
import { required } from "../../../utils/validation";
import RemoteComboBox from "../../../components/ComboBox/RemoteComboBox";
import Button from "../../../components/Button/Button";

class Offices extends Component {
   state = {
      name: "",
      location: {}
   }

   componentDidMount() {
      this.props.fetchOffices();
      this.props.fetchLocations();
   }

   render() {
      if (this.props.isFetching) return <Spinner />;
      //TODO: where should I take company ID?!
      const newOfficePayload = {
         name: this.state.name,
         baselocation: this.state.location.id,
      }
      const offices = this.props.offices.map(office => (
         <Office
            removeOffice={(id) => this.props.removeOffice(id, this.props.company)}
            key={office.id}
            id={office.id}
            office={office}
            history={this.props.history}
         />));

      return (
      <div>
         <table className="company-table">
            <thead>
               <tr><th>Name</th><th></th></tr>
            </thead>
            <tbody>
               {offices}
            </tbody>
         </table>

         <div className="">
            <div className="admin-add-input office">
               <input
                  placeholder="Office name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={this.state.name} />
               <RemoteComboBox
                  items={this.props.locations}
                  api={(name) => this.props.fetchLocations(name)}
                  dataFetched={this.props.locationsFetched}
                  limit={5}
                  placeholder="Location"
                  className="location-admin-add"
                  isFetching={this.props.isFetchingLocation}
                  getObject={(location) => this.setState({ location: location })}
                  validators={{ required }}
               />
               <Button 
                  onClick={() => this.props.createOffice(newOfficePayload, () => this.setState({name: "", location: {}}))}
               >Add</Button>
            </div>
         </div>
      </div>
      )
   }
}

function mapStateToProps(store) {
   return {
      isFetching: store.companies.isFetching,
      offices: store.companies.offices,
      locations: store.location.locations,
      locationsFetched: store.location.locationsFetched,
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ fetchOffices, removeOffice, createOffice, fetchLocations }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Offices);
