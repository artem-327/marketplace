import React, {Component} from 'react';
import './companiesAdmin.css';
import Company from "./components/Company";
import AddCompany from "./components/AddCompany";
import Spinner from "../../../components/Spinner/Spinner";

class CompaniesAdmin extends Component {

    constructor(props){
        super(props);
        this.state = {
            addMode: false,
        }
    }

    componentDidMount() {
        this.props.fetchAll();
    }

    renderCompanies() {
        return this.props.isFetching ?
            <Spinner/>
        : this.props.companies.map((company) => (
            <Company key={company.id} id={company.id} name={company.name} history={this.props.history}/>
        ));
    }

    render() {
        return (
            <div className="admin-companies">
                <h1 className='header'>Companies administration</h1>
                <div className="list-companies">
                    <AddCompany addItem={(text) => this.props.createCompany(text, () => this.setState({addMode: false}))}
                             text="Add new company" addMode={this.state.addMode} changeMode={(state)=>this.setState({addMode: state})}/>
                    {this.renderCompanies()}
                </div>
            </div>
        )
    }
}

export default CompaniesAdmin;