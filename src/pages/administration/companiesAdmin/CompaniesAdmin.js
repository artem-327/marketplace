import React, { Component } from 'react';
import './companiesAdmin.css';
import Company from "./components/Company";
import Spinner from "../../../components/Spinner/Spinner";
import Button from "../../../components/Button/Button";
import InputControlled from '../../../components/InputControlled/InputControlled'
class CompaniesAdmin extends Component {
    state = {
        name: ""
    }

    componentDidMount() {
        this.props.fetchAll();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderCompanies() {
        return this.props.isFetching
            ? <Spinner />
            : this.props.companies.map((company) => (
                <Company key={company.id} id={company.id} name={company.name} history={this.props.history} />
            ));
    }

    render() {
        const { createCompany } = this.props
        return (
            <div className="admin-companies">
                <h1 className='header'>Companies administration</h1>
                <div className="list-companies">
                    <table className="company-table">
                        <tr><th>Name</th><th></th></tr>
                        {this.renderCompanies()}
                    </table>
                    <div className="add-new-company">
                        <InputControlled
                            value={this.state.name}
                            handleChange={this.handleChange}
                            name="name"
                            placeholder="Company name"
                        />
                        <Button 
                            color="green" 
                            onClick={() => createCompany(this.state.name, () => this.setState({ name: "" }))}
                        >Add New</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompaniesAdmin;
