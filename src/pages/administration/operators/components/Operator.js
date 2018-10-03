import React, {Component} from 'react';

class Operator extends Component {
    
    render() {
        let {firstname, middlename, lastname, email, login} = this.props;
        return (
            <tr className="admin-operators-new-item">
                    <td>{firstname}</td>
                    <td>{middlename}</td>
                    <td>{lastname}</td>
                    <td>{email}</td>
                    <td>{login}</td>
                    <td>
                        <button className="button small red" onClick={()=>this.props.removeOperator(this.props.id)}>Delete</button>
                        <button className="button small" onClick={()=>this.props.editOperator({...this.props})}>Edit</button>
                    </td>
            </tr>
        )
    }
}

export default Operator;