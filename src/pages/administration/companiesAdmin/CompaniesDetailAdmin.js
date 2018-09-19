import React, {Component} from 'react';
import './companiesAdmin.css';
import {connect} from "react-redux";
import {createOffice, editCompany, fetchDetail, removeCompany, removeOffice} from "../../../modules/companies";
import {bindActionCreators} from "redux";
import InputEdit from "../../../components/InputEdit/InputEdit";
import Office from "./components/Office";
import AddOffice from "./components/AddOffice";
import {fetchLocations} from "../../../modules/location";
import Spinner from "../../../components/Spinner/Spinner";

class CompaniesDetailAdmin extends Component {

    constructor(props){
        super(props);
        this.state = {
            addMode: false
        }
    }

    componentWillMount() {
        this.props.fetchDetail(this.props.match.params.id);
    }

    renderOffices() {
        if(!this.props.isFetching && !this.props.company.offices) return;
        return this.props.isFetching ?
            <Spinner/>
        : this.props.company.offices.map((office) => (
            <Office removeOffice={(id)=>this.props.removeOffice(id, this.props.company)} key={office.id} id={office.id} name={office.name} history={this.props.history}/>
        ));
    }

    render() {
        return (
            <div className="admin-companies">
                <h1 className='header'>Companies administration - {this.props.company.name}</h1>
                <div className="list-companies">
                    <br />
                    <button className="button small" onClick={()=>this.props.removeCompany(this.props.company.id, ()=>this.props.history.push('/administration/companies/'))}>Delete</button>
                    <h4>Company Name</h4>
                    <InputEdit value={this.props.company.name} onSave={(text) => {
                        this.props.editCompany(Object.assign({}, this.props.company, {name: text}))}}
                    />
                    <h4>Company Offices</h4>
                    <AddOffice
                        changeMode={(state)=>this.setState({addMode: state})}
                        addMode={this.state.addMode}
                        text="Add new office and connect to company"
                        locations={this.props.locations}
                        isFetchingLocation={this.props.isFetchingLocation}
                        addItem={(payload)=>this.props.createOffice(Object.assign({}, payload, {company: this.props.company}), ()=>this.setState({addMode: false}))}
                        fetchLocation={(text)=>this.props.fetchLocations({search: text})}/>
                    {this.renderOffices()}
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
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchDetail, editCompany, fetchLocations, createOffice, removeOffice, removeCompany}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDetailAdmin);