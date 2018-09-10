import React, {Component} from 'react';
import './companiesOffices.css';

class CompaniesOffices extends Component {

    componentDidMount(){
        this.props.fetchAll();
    }

    render(){
        return (
            <div className="companies">
                <h1 className='header'>Names and synonyms</h1>
            </div>
        )
    }
}

export default CompaniesOffices;