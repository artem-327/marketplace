import React, { Component } from "react";
import { connect } from "react-redux";
import { createOffice, putCompanyEdit, editOffice, fetchDetail, deleteCompany, postNewCompany, removeOffice, fetchOffices } from "../../../modules/companies";
import { bindActionCreators } from "redux";
import "./companiesAdmin.css";
//import Company from "./components/Company";
import Spinner from "../../../components/Spinner/Spinner";
import InputControlled from "../../../components/InputControlled/InputControlled";
import DataTable from "../../../components/DataTable";
class CompaniesAdmin extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.props.fetchAll();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { postNewCompany, companies, isFetching } = this.props;
    if (isFetching) return <Spinner />;
    const rows = companies.map(company => {
      return {
        group: "company", //hack - i dont know how to initialize datatable without group - it doesnt work well... maybe it would be necessary to fix datatable component
        rows: [
          {
            id: company.id,
            data: [company.name]
          }
        ]
      };
    });
    return (
      <>
        <DataTable
          id="offices"
          sortFunc={nameColumn => console.log(nameColumn)}
          headerInit={[{ name: "Company Name" }]}
          contextMenu={[
            {
              action: id => console.log("edit Company with id: " + id),
              label: "Edit Company"
            },
            {
              action: id => this.props.deleteCompany(id),
              label: "Remove Company"
            }
          ]}
          rows={rows}
        />
        <div className="add-new-company">
          <InputControlled
            value={this.state.name}
            handleChange={this.handleChange}
            name="name"
            placeholder="New company name"
          />
          <i
            className="fas fa-plus"
            title="Add new company"
            onClick={() =>
              postNewCompany(this.state.name, () => this.setState({ name: "" }))
            }
          />
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    isFetching: store.companies.isFetching,
    company: store.companies.detail,
    isFetchingLocation: store.location.locationFetching,
    locations: store.location.locations,
    offices: store.companies.offices,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDetail, fetchOffices, editOffice, putCompanyEdit, postNewCompany, createOffice, removeOffice, deleteCompany }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesAdmin);