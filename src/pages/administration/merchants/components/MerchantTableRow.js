import React, {Component} from 'react';
import './MerchantTableRow.css';
import Switcher from '../../../../components/Switcher/Switcher';
import Button from '../../../../components/Button/Button';

import MerchantDetail from './MerchantDetail';

class MerchantTableRow extends Component {
    openDetail = () => {
      this.props.addPopup(<MerchantDetail id={this.props.id}/>)
   }

    render(){
        const {merchantData, editMerchant, id} = this.props;
        const approveToggleMerchant = {...this.props.merchantData, approved: !merchantData.approve}
        return (
            <tr className="merch-row">
                <td className="merch-row-item">{merchantData.firstname}</td>
                <td className="merch-row-item">{merchantData.middlename}</td>
                <td className="merch-row-item">{merchantData.lastname}</td>
                <td className="merch-row-item">{merchantData.email}</td>
                <td className="merch-row-item"><Switcher onChange={() => editMerchant(approveToggleMerchant)} value={merchantData.approved} id={id}/></td>
                <td className="merch-row-item"><Button onClick={this.openDetail}>Detail</Button></td>
            </tr>
        )
    }
}

export default MerchantTableRow;