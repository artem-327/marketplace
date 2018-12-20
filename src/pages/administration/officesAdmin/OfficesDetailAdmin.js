import React, {Component} from 'react';
import './officesAdmin.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import InputEdit from "../../../components/InputEdit/InputEdit";
import Spinner from "../../../components/Spinner/Spinner";
import {putOfficeEdit, getOffice} from "../../../modules/companies";

class OfficesDetailAdmin extends Component {

    componentDidMount() {
        this.props.getOffice(this.props.id);
    }

    render() {
        const {office, putOfficeEdit, isFetching} = this.props;
        if (isFetching || !office || !office.baseLocation) return <Spinner/>
        const merchants = office.merchants.map(i => <div>{i.email}</div>)
        return (
            <div className="admin-companies">
                <h1 className='header'>Office administration - {office.name}</h1>
                <div className="list-companies">
                
                    <div>Office Name: {office.name}</div>
                    {/* <div>Country: {office.baseLocation.country.name}</div> */}
                    {/* <div>State: {office.baseLocation.state.name}</div> */}
                    <div>Company: {office.company.name}</div>
                    <div>Merchants: {merchants}</div>

                    <InputEdit value={office.name} onSave={(text) => {
                        putOfficeEdit({"id": office.id, "name": text, "baseLocation": office.baseLocation.id, "company": office.companyResponse.id})
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
    return bindActionCreators({getOffice, putOfficeEdit}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficesDetailAdmin);