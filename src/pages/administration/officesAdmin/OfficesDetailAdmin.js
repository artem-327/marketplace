import React, {Component} from 'react';
import './officesAdmin.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import InputEdit from "../../../components/InputEdit/InputEdit";
import Spinner from "../../../components/Spinner/Spinner";
import {editOffice, fetchOffice} from "../../../modules/companies";

class CompaniesDetailAdmin extends Component {

    constructor(props){
        super(props);
        this.state = {
            addMode: false
        }
    }

    componentDidMount() {
        this.props.fetchOffice(this.props.match.params.id);
    }

    render() {
        return (
            this.props.isFetching ? <Spinner/> :
            <div className="admin-companies">
                <h1 className='header'>Office administration - {this.props.office.name}</h1>
                <div className="list-companies">
                    <h4>Office Name</h4>
                    <InputEdit value={this.props.office.name} onSave={(text) => {
                        debugger
                        this.props.editOffice({"id": this.props.office.id, "name": text, "baseLocation": this.props.office.baseLocation.id, "company": this.props.office.companyResponse.id})
                    }}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        isFetching: store.companies.isFetching,
        office: store.companies.office,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchOffice, editOffice}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDetailAdmin);