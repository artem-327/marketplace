import React, {Component} from 'react';
import './operators.css';
import Operator from "./components/Operator";

class Operators extends Component {

    componentDidMount(){
        this.props.fetchOperators();
    }

    renderOperators(){
        return this.props.operators.map((operator, index) => {
            return <Operator {...operator} key={index}/>
        })
    }

    render(){
        return (
            <div className="admin-operators-wr">
                <h1 className="header">Operators</h1>
                <div className="admin-operators">
                    {this.renderOperators()}
                </div>
            </div>
        )
    }
}

export default Operators;