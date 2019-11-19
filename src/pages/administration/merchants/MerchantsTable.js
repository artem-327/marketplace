import React, { Component } from 'react'
import MerchantTableRow from './components/MerchantTableRow'
import './MerchantsTable.scss'
import { FormattedMessage } from 'react-intl'

class MerchantsTable extends Component {
  componentDidMount() {
    this.props.getMerchants()
  }

  render() {
    const { merchants, addPopup, putMerchantEdit } = this.props
    const merchantsData = merchants.data.map(i => {
      return (
        <MerchantTableRow addPopup={addPopup} merchantData={i} key={i.id} id={i.id} putMerchantEdit={putMerchantEdit} />
      )
    })

    return (
      <div>
        <h1 className='header'>
          <FormattedMessage id='merchants.table' defaultMessage='MerchantsTable' />
        </h1>
        <table className='merchant-table'>
          <thead className='merch-table'>
            <tr>
              <th className='merch-header-item'>
                <FormattedMessage id='merchants.name' defaultMessage='Name' />
              </th>
              <th className='merch-header-item'>
                <FormattedMessage id='global.middleName' defaultMessage='Middle Name' />
              </th>
              <th className='merch-header-item'>
                <FormattedMessage id='global.surname' defaultMessage='Surname' />
              </th>
              <th className='merch-header-item'>
                <FormattedMessage id='global.email' defaultMessage='E-mail' />
              </th>
              <th className='merch-header-item'>
                <FormattedMessage id='merchants.approve' defaultMessage='Approve' />
              </th>
              <th className='merch-header-item'></th>
            </tr>
          </thead>
          <tbody>{merchantsData}</tbody>
        </table>
      </div>
    )
  }
}

export default MerchantsTable
