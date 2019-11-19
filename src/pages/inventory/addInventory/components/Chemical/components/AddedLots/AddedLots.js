import React, {Component} from 'react'
import './AddedLots.scss'
import AddedLot from './AddedLot'
import {FormattedMessage} from 'react-intl'

class AddedLots extends Component {
  removeLots(index) {
    this.props.removeLot(index)
  }

  renderLots() {
    const props = {
      productOffer: this.props.productOffer,
      edit: this.props.edit,
      productOffering: this.props.productOffering,
      dispatch: this.props.dispatch,
      fileMaxSize: this.props.fileMaxSize,
      loadFile: this.props.loadFile,
      addAttachment: this.props.addAttachment,
      removeAttachment: this.props.removeAttachment,
      removeAttachmentLink: this.props.removeAttachmentLink
    }

    return this.props.lots.map((value, index) => {
      return (
        <AddedLot position={index + 1} lot={value} removeLots={() => this.removeLots(index)} key={index} {...props} />
      )
    })
  }

  render() {
    return (
      <div className='lots-container'>
        <div className='lots-header'>
          <h3>
            <FormattedMessage id='addInventory.addedLots' defaultMessage='ADDED LOTS' />
          </h3>
        </div>
        {this.renderLots()}
      </div>
    )
  }
}

export default AddedLots
