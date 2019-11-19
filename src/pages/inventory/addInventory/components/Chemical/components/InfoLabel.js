import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

export default class InfoLabel extends Component {
  render() {
    return (
      <div className='group-item-wr infoLabel'>
        <span className='info-icon'>i</span>
        <label>
          <FormattedMessage
            id='addInventory.infoLabel'
            defaultMessage={
              'By selecting "Save Mapping" CAS Name, CAS Number,' +
              'Product Name and Product Number will be mapped in our system.' +
              'Next time you enter this product these fields will be pre-populated for you.'
            }
          />
        </label>
        <div className='clearfix'></div>
      </div>
    )
  }
}
