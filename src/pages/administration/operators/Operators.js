import React, {Component} from 'react';
import './operators.css';
import Operator from "./components/Operator";
import Spinner from '../../../components/Spinner/Spinner'

class Operators extends Component {

    componentDidMount(){
        this.props.fetchOperators();
    }

    render(){
        const {operators} = this.props
        if (this.props.isFetching) return <Spinner />;
        const operatorsData = operators.map((operator, index) => {
            return (
              <Operator
                removeOperator={this.props.removeOperator}
                editOperator={this.props.editOperator}
                {...operator}
                key={index}
              />)
        })
        return (
            <div className="admin-operators-wr">
                <h1 className="header">Operators</h1>
                <table className="admin-operators">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Login</th>
                        <th className="settings"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {operatorsData}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Operators;