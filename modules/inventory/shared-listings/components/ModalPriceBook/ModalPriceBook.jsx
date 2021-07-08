import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
// Components
import { Broadcast } from '../../../../broadcast'
// Styles
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
          detailValues={props.detailValues}
          isPrepared={true}
          styleMarginBottom={true}
          dataType='shared-listings'
          inventoryGrid={props.tableDatagrid}
        />
      </Modal.Content>
    </Modal>
  )
}

ModalPriceBook.propTypes = {}

export default injectIntl(ModalPriceBook)
