import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Dimmer, Loader } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

//Components
import { Broadcast } from '../../../../broadcast'
//Styles
import { TdsHeader } from '../../../my-listings/components/ModalsTds/ModalsTds.styles'

const ModalPriceBook = props => {
  return (
    <Modal open={props.isOpenPriceBookModal} onClose={() => props.triggerPriceBookModal(false, null)} closeIcon={true}>
      <TdsHeader>
        <FormattedMessage id='addInventory.priceBook' defaultMessage='PRICE BOOK' />
      </TdsHeader>
      <Modal.Content>
        <Broadcast
          asModal={true}
          close={() => props.triggerPriceBookModal(false, null)}
          detailValues={props.rowIdPriceBook}
          isPrepared={true}
          styleMarginBottom={true}
        />
      </Modal.Content>
    </Modal>
  )
}

ModalPriceBook.propTypes = {}

export default ModalPriceBook
