import React, {Component} from 'react';
import './companiesAdmin.css';
import {connect} from "react-redux";
import {fetchDetail} from "../../../modules/companies";
import {bindActionCreators} from "redux";
import InputEdit from "../../../components/InputEdit/InputEdit";
import Office from "./components/Office";

class CompaniesDetailAdmin extends Component {

    componentDidMount() {
        this.props.fetchDetail(this.props.match.params.id);
    }

    renderOffices() {
        if(!this.props.company.offices) return;
        return this.props.company.offices.map((office) => (
            <Office key={office.id} id={office.id} name={office.name} history={this.props.history}/>
        ));
    }

    render() {
        return (
            <div className="admin-companies">
                <h1 className='header'>Companies administration - {this.props.company.name}</h1>
                <div className="list-companies">
                    <h4>Company Name</h4>
                    <InputEdit value={this.props.company.name} onSave={(text) => console.log(text)}/>
                    <h4>Company Offices</h4>
                    {this.renderOffices()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        isFetching: store.companies.isFetching,
        company: store.companies.detail
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchDetail}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDetailAdmin);