import React, { Component } from 'react';
import MerchantTableRow from './components/MerchantTableRow';
import './MerchantsTable.css';

class MerchantsTable extends Component {
  componentDidMount() {
    this.props.fetchMerchants();
  }


  render() {
    const {merchants, addPopup, editMerchant} = this.props
    const merchantsData = merchants.data.map(i => {
      return <MerchantTableRow
        addPopup={addPopup}
        merchantData={i}
        key={i.id}
        id={i.id}
        editMerchant={editMerchant}
      />
    });

    return (
      <div>
        <h1 className="header">MerchantsTable</h1>
        <table className="merchant-table">
          <thead className="merch-table">
            <tr>
              <th className="merch-header-item">Name</th>
              <th className="merch-header-item">MiddleName</th>
              <th className="merch-header-item">Surname</th>
              <th className="merch-header-item">E-mail</th>
              <th className="merch-header-item">Approve</th>
              <th className="merch-header-item"></th>
            </tr>
          </thead>
          <tbody>
            {merchantsData}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MerchantsTable;
