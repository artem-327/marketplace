import React, {Component} from 'react'
import './AdditionalDocuments.scss'
import UploadLot from '../../Upload/UploadLot'
import {FormattedMessage} from 'react-intl'

class AdditionalDocuments extends Component {
  render() {
    return (
      <div>
        <h4 className='add-doc-title'>
          <FormattedMessage id='addInventory.additionalDocuments' defaultMessage='ADDITIONAL DOCUMENTS' />
        </h4>
        <div className='add-documents'>
          <UploadLot className='add-doc' type='MSDS' {...this.props} />
          <UploadLot className='add-doc' type='Spec Sheet' {...this.props} />
          <UploadLot className='add-doc' type='Product Image' {...this.props} />
        </div>
      </div>
    )
  }
}

export default AdditionalDocuments
