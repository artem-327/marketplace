import React, {Component} from 'react';

class Operator extends Component {
    
    render() {
        let {firstname, middlename, lastname, email, login} = this.props;
        return (
            <div className="admin-operators-new-item">
                <div className="info">
                    <span>{firstname}</span>
                    <span>{middlename}</span>
                    <span>{lastname}</span>
                    <span>{email}</span>
                    <span>{login}</span>
                </div>
                <button className="button small red" onClick={()=>this.props.removeOperator(this.props.id)}>Delete</button>
            </div>
        )
    }
}

export default Operator;