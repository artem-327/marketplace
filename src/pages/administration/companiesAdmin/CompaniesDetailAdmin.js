import React, {Component} from 'react';
import './companiesAdmin.css';
import {connect} from "react-redux";
import {createOffice, editCompany, fetchDetail, removeCompany, removeOffice, fetchOffices} from "../../../modules/companies";
import {bindActionCreators} from "redux";
import InputEdit from "../../../components/InputEdit/InputEdit";
import Office from "./components/Office";
import AddOffice from "./components/AddOffice";
import {fetchLocations} from "../../../modules/location";
import Spinner from "../../../components/Spinner/Spinner";
import InputControlled from '../../../components/InputControlled/InputControlled'
import Button from '../../../components/Button/Button'

class CompaniesDetailAdmin extends Component {
        state = {
          addMode: false,
          name: ""
        }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    componentDidMount() {
        new Promise((resolve) => {
          this.props.fetchDetail(this.props.match.params.id, resolve)
        }).then(() => {
          this.setState({name: this.props.company.name})
        })
        this.props.fetchOffices(this.props.match.params.id)
    }

    renderOffices() {
        return this.props.isFetching || !Object.keys(this.props.offices).length
        ? <Spinner/>
        : this.props.offices.map(office => (
            <Office 
              removeOffice={(id)=>this.props.removeOffice(id, this.props.company)} 
              key={office.id} 
              id={office.id} 
              office={office} 
              history={this.props.history}
            />
        ));
    }

    render() {
        return (
            <div className="admin-companies">
                <h1 className='header'>Companies administration - {this.props.company.name}</h1>
                <div className="list-companies">
                    <h4>Company Detail</h4>
                    <div className="company-detail">
                    <InputControlled
                        value={this.state.name}
                        handleChange={this.handleChange}
                        name="name"
                    />
                  <Button color="red" onClick={()=>this.props.removeCompany(this.props.company.id, ()=>this.props.history.push('/administration/companies/'))}>
                    Delete
                  </Button>
                  <Button color="blue" onClick={() => this.props.editCompany(Object.assign({}, this.props.company, {name: this.state.name}))}>
                    Edit
                  </Button>
                </div>
                <h4>Company Offices</h4>
                    <AddOffice
                        changeMode={(state)=>this.setState({addMode: state})}
                        addMode={this.state.addMode}
                        text="Add new office and connect to company"
                        locations={this.props.locations}
                        isFetchingLocation={this.props.isFetchingLocation}
                        addItem={(payload)=>this.props.createOffice(Object.assign({}, payload, {company: this.props.company}), ()=>this.setState({addMode: false}))}
                        fetchLocation={(text)=>this.props.fetchLocations({search: text})}/>
                    <table className="company-table">
                        <tr><th>Name</th><th></th></tr>
                        {this.renderOffices()}
                    </table>
                </div>
            </div>
        )
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

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchDetail, fetchOffices, editCompany, fetchLocations, createOffice, removeOffice, removeCompany}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDetailAdmin);