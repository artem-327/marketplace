import React, { Component } from "react";
import Office from "../companiesAdmin/components/Office";
import Spinner from "../../../components/Spinner/Spinner";
import DataTable from "../../../components/DataTable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  removeOffice,
  fetchOffices,
  createOffice
} from "../../../modules/companies";
import { fetchLocations } from "../../../modules/location";
import { required } from "../../../utils/validation";
import RemoteComboBox from "../../../components/ComboBox/RemoteComboBox";
import Button from "../../../components/Button/Button";

class Offices extends Component {
  state = {
    name: "",
    location: {}
  };

  componentDidMount() {
    this.props.fetchOffices();
    this.props.fetchLocations();
  }

  render() {
    const { offices, isFetching } = this.props;
    if (isFetching) return <Spinner />;
    const rows = offices.map(office => {
      debugger
      const merchants = office.merchants.map(i => i.email).join();
      return {
        group: "office", //hack - i dont know how to initialize datatable without group - it doesnt work well... maybe it would be necessary to fix datatable component
        rows: [
          {
            id: office.id,
            data: [
              office.name, 
              office.company ? office.company.name : "-", 
              merchants
            ]
          }
        ]
      };
    });
    return (
      <DataTable
        id="offices"
        sortFunc={nameColumn => console.log(nameColumn)}
        headerInit={[
          { name: "Office Name" },
          { name: "Company Name" },
          { name: "Merchants" }
        ]}
        contextMenu={[
          {
            action: id => console.log("edit Office with id: " + id),
            label: "Edit Office"
          },
          {
            action: id => console.log("remove Office with id: " + id),
            label: "Remove Office"
          }
        ]}
        rows={rows}
      />
    );
    // const newOfficePayload = {
    //    name: this.state.name,
    //    baselocation: this.state.location.id,
    // }
    // const officesData = offices.map(office => (
    //    <Office
    //       removeOffice={(id) => this.props.removeOffice(id, this.props.company)}
    //       key={office.id}
    //       id={office.id}
    //       office={office}
    //       history={this.props.history}
    //    />));

    // return (
    // <div>
    //    <table className="company-table">
    //       <thead>
    //          <tr><th>Name</th><th></th></tr>
    //       </thead>
    //       <tbody>
    //          {officesData}
    //       </tbody>
    //    </table>

    //    <div className="">
    //       <div className="admin-add-input office">
    //          <input
    //             placeholder="Office name"
    //             onChange={(e) => this.setState({ name: e.target.value })}
    //             value={this.state.name} />
    //          <RemoteComboBox
    //             items={this.props.locations}
    //             api={(name) => this.props.fetchLocations(name)}
    //             dataFetched={this.props.locationsFetched}
    //             limit={5}
    //             placeholder="Location"
    //             className="location-admin-add"
    //             isFetching={this.props.isFetchingLocation}
    //             getObject={(location) => this.setState({ location: location })}
    //             validators={{ required }}
    //          />
    //          <Button
    //             onClick={() => this.props.createOffice(newOfficePayload, () => this.setState({name: "", location: {}}))}
    //          >Add</Button>
    //       </div>
    //    </div>
    // </div>
    // )
  }
}

function mapStateToProps(store) {
  return {
    isFetching: store.companies.isFetching,
    offices: store.companies.offices,
    locations: store.location.locations,
    locationsFetched: store.location.locationsFetched
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchOffices, removeOffice, createOffice, fetchLocations },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offices);
