import React, {Component} from 'react';
import './operators.css';
import Operator from "./components/Operator";

class Operators extends Component {

    componentDidMount(){
        this.props.fetchOperators();
    }

    renderOperators(){
        return this.props.operators.map((operator, index) => {
            return <Operator removeOperator={this.props.removeOperator}  {...operator} key={index}/>
        })
    }

    render(){
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
                        {this.renderOperators()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Operators;