import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewOffice, putCompanyEdit, putOfficeEdit, fetchDetail, deleteCompany, postNewCompany, deleteOffice, getOffices } from "../../../modules/companies";
import { bindActionCreators } from "redux";
import "./companiesAdmin.css";
//import Company from "./components/Company";
import Spinner from "../../../components/Spinner/Spinner";
import InputControlled from "../../../components/InputControlled/InputControlled";
import DataTable from "../../../components/DataTable";
import { injectIntl } from 'react-intl';

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
    const { formatMessage } = this.props.intl;
    return (
      <>
        <DataTable
          id="offices"
          sortFunc={nameColumn => console.log(nameColumn)}
          headerInit={[{ name: "companyName" }]}
          contextMenu={[
            {
              action: id => console.log("edit Company with id: " + id),
              label: "editCompany"
            },
            {
              action: id => this.props.deleteCompany(id),
              label: "removeCompany"
            }
          ]}
          rows={rows}
        />
        <div className="add-new-company">
          <InputControlled
            value={this.state.name}
            handleChange={this.handleChange}
            name="name"
            placeholder={formatMessage({
                id: 'administration.newCompanyName',
                defaultMessage: 'New Company Name'
            })}
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
  return bindActionCreators({ fetchDetail, getOffices, putOfficeEdit, putCompanyEdit, postNewCompany, postNewOffice, deleteOffice, deleteCompany }, dispatch)
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CompaniesAdmin));