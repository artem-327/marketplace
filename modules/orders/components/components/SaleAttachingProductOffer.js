import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Dimmer,
  Loader,
  ModalContent,
  Table,
  Grid,
  Header,
  Button,
  Segment,
  Tab,
  TabPane,
  Menu,
  Label
} from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import * as Actions from '../../actions'
import { getSafe } from '~/utils/functions'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`
//TODO
class SaleAttachingProductOffer extends Component {
  componentDidMount() {
    const { getGroupedProductOffers, orderId, orderItemsId } = this.props

    if (orderItemsId && orderItemsId.length > 1) {
      orderItemsId.forEach(id => getGroupedProductOffers(orderId, id))
    } else if (orderId && orderItemsId && orderItemsId.length === 1) {
      console.log('orderId====================================')
      console.log(orderId)
      console.log('====================================')
      console.log('orderItemsId====================================')
      console.log(orderItemsId)
      console.log('====================================')
      console.log('getGroupedProductOffers====================================')
      console.log(getGroupedProductOffers)
      console.log('====================================')
      getGroupedProductOffers(orderId, orderItemsId[0])
    }
  }

  render() {
    const {
      intl: { formatMessage },
      closePopup,
      loadingGroupedProductOffer,
      groupedProductOffers
    } = this.props
    return (
      <Modal closeIcon onClose={() => closePopup()} open={true} size='small'>
        <Dimmer active={loadingGroupedProductOffer} inverted>
          <Loader />
        </Dimmer>
        <Modal.Header>
          <FormattedMessage id='order.saleAttachingProductOffer' defaultMessage='ATTACHING PRODUCT OFFER' />
        </Modal.Header>
        <ModalBody>
          <Modal.Description>{groupedProductOffers.map(offer => JSON.stringify(offer, null, '\t'))}</Modal.Description>
        </ModalBody>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  console.log('state====================================')
  console.log(state)
  console.log('====================================')
  const { detail } = state.orders
  return {
    orderId: getSafe(() => detail.id, null),
    orderItemsId: getSafe(() => detail.orderItems.map(item => item.id), []),
    loadingGroupedProductOffer: getSafe(() => state.orders.loadingGroupedProductOffer, false),
    groupedProductOffers: getSafe(() => state.orders.groupedProductOffers, false)
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(SaleAttachingProductOffer))
