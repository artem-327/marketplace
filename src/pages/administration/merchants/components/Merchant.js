import React, {Component} from 'react';
import './Merchant.css';
import Switcher from '../../../../components/Switcher/Switcher';
import Button from '../../../../components/Button/Button';
class Merchant extends Component {

    render(){
        const approveToggleMerchant = {...this.props.merch, approved: !this.props.merch.approve}
        return (
            <tr className="merch-row">
                <td className="merch-row-item">{this.props.merch.firstname}</td>
                <td className="merch-row-item">{this.props.merch.middlename}</td>
                <td className="merch-row-item">{this.props.merch.lastname}</td>
                <td className="merch-row-item">{this.props.merch.email}</td>
                <td className="merch-row-item"><Switcher onChange={() => this.props.editMerchant(approveToggleMerchant)} value={this.props.merch.approved} id={this.props.id}/></td>
                <td className="merch-row-item"><Button>Detail</Button></td>
            </tr>
        )
    }
}

export default Merchant;