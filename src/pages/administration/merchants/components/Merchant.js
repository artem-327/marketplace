import React, {Component} from 'react';
import './Merchant.css';
import Switcher from '../../../../components/Switcher/Switcher';
class Merchant extends Component {



    render(){
        console.log(this.props.merch.approve)
        return (
            <tr className="merch-row">
                <td className="merch-row-item">{this.props.merch.name}</td>
                <td className="merch-row-item">{this.props.merch.surname}</td>
                <td className="merch-row-item">{this.props.merch.email}</td>
                <td className="merch-row-item"><Switcher onChange={value => this.props.approveMerchant(this.props.id)} value={this.props.merch.approve} id={this.props.id}/></td>
            </tr>
        )
    }
}

export default Merchant;