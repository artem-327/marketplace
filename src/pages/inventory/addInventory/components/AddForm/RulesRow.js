import React, {Component} from 'react';
import './addForm.css'
import { Control} from 'react-redux-form';


class RulesRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <tr>
                <td className="rule-id">{this.props.id}</td>

                <td>
                    {this.props.from}
                </td>
                <td><Control model="forms.purchaseForm.reqShipDate" placeholder="51.25"/></td>
                <td className="description">
                    ${this.props.price}
                </td>
            </tr>
        );
    }

}

export default RulesRow;