import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal, Dimmer, Loader } from 'semantic-ui-react'
import { func, bool, string, object, number } from 'prop-types'
import { FormattedNumber, injectIntl } from 'react-intl'
import { Check } from 'react-feather'

// Components
import BasicButton from '../../../../components/buttons/BasicButton'
import confirm from '../../../../components/Confirmable/confirm'

//Styles
import { ModalCustom } from '../../../my-network/components/InviteModal/InviteModal.styles'
import { CustomA, DivText, DivTextContact, SpanModalText } from '../Orders.styles'
import { DivCircle, DivModal } from '../../../my-network/components/DetailRow/DetailRow.style'

//Constants
import { currency } from '../../../../constants'

/**
 * @category Orders - Detail
 * @components
 */
const ModalOrderResolution = ({
  order,
  loading,
  onClose,
  actions: { orderResolutionAccept, orderResolutionReopen },
  intl,
  appInfo
}) => {
  return (
    <ModalCustom size='small' open={true} onClose={() => onClose()} closeIcon={true}>
      <Dimmer active={loading} inverted>
        <Loader size='large' />
      </Dimmer>
      <Modal.Header>
        <FormattedMessage id='operations.orders.detail.modal.title' defaultMessage='Resolve Dispute' />
      </Modal.Header>
      <Modal.Content>
        <DivText>
          {/* reviewStatus === 4 Credited, reviewStatus === 3 Rejected  */}
          {order?.reviewStatus === 'Credited' ? (
            <FormattedMessage
              id='orders.detail.modal.orderResolution.creditText'
              defaultMessage='After all parties have reviewed the disputed order it has been agreed upon that {Seller_Company} will credit {Credit_Amount} to {Buyer_Company} for Order {Order_ID}.'
              values={{
                Order_ID: <b>{order?.id}</b>,
                Buyer_Company: <b>{order?.buyerCompanyName}</b>,
                Credit_Amount: (
                  <>
                    <b>
                      <FormattedNumber
                        minimumFractionDigits={2}
                        maximumFractionDigits={2}
                        style='currency'
                        currency={currency}
                        value={order?.disputeCreditAmount}
                      />
                    </b>
                  </>
                ),
                Seller_Company: <b>{order?.sellerCompanyName}</b>
              }}
            />
          ) : (
            <FormattedMessage
              id='orders.detail.modal.orderResolution.rejectText'
              defaultMessage='After all parties have reviewed the disputed order it has been agreed upon that {Buyer_Company} will return the order {Order_ID} to {Seller_Company} and will receive a full refund. {Seller_Company} will take on the expense of both the original freight costs and the return freight costs.'
              values={{
                Order_ID: <b>{order?.id}</b>,
                Buyer_Company: <b>{order?.buyerCompanyName}</b>,
                Seller_Company: <b>{order?.sellerCompanyName}</b>
              }}
            />
          )}
        </DivText>
        <DivText>
          <FormattedMessage
            id='orders.detail.modal.orderResolution.description'
            defaultMessage='After both parties accept this resolution will update the order invoice to reflect the credit issued. If a full payment has already occured, it will initiate a refund of the agreed amount to the purchaser. If any of this information is incorrect you may choose to reopen the case and a support specialist will contact you with the next steps.'
          />
        </DivText>
        <DivTextContact>
          <FormattedMessage
            id='orders.detail.modal.orderResolution.contact'
            defaultMessage='Feel free to reach out with any additional questions at '
          />
          <FormattedMessage
            id='global.emailAndPhoneNumber'
            defaultMessage='{emailAndPhoneNumber}'
            values={{
              emailAndPhoneNumber: (
                <>
                  <b>{appInfo?.supportPhone}</b>
                  <FormattedMessage id='global.orSpaceAround' defaultMessage=' or ' />
                  <CustomA href={`mailto: ${appInfo?.supportEmail}`}>{appInfo?.supportEmail}</CustomA>
                </>
              )
            }}
          />
        </DivTextContact>
      </Modal.Content>
      <Modal.Actions>
        <BasicButton
          noBorder
          onClick={async () => {
            await orderResolutionReopen(order.id)
            onClose()
            confirm(
              <DivModal>
                <DivCircle background='#84c225' borderColor='#dae7c7'>
                  <Check size='34' color='#ffffff' />
                </DivCircle>
              </DivModal>,
              <DivModal>
                <SpanModalText>
                  {intl?.formatMessage({
                    id: 'dispute.reopend.success',
                    defaultMessage: 'Case reopened, a support specialist will be in touch shortly.'
                  })}
                </SpanModalText>
              </DivModal>,
              {
                cancelText: null,
                proceedText: intl?.formatMessage({ id: 'global.close', defaultMessage: 'Close' })
              },
              true //Basic Modal
            ).then(
              async () => {
                // confirm
              },
              () => {
                // cancel
              }
            )
          }}>
          <FormattedMessage id='global.reopen' defaultMessage='Reopen' />
        </BasicButton>
        <BasicButton
          onClick={async () => {
            await orderResolutionAccept(order.id)
            onClose()
          }}>
          <FormattedMessage id='global.accept' defaultMessage='Accept' />
        </BasicButton>
      </Modal.Actions>
    </ModalCustom>
  )
}

ModalOrderResolution.propTypes = {
  order: object,
  loading: bool,
  onClose: func,
  actions: {
    orderResolutionAccept: func,
    orderResolutionReopen: func
  },
  intl: object,
  appInfo: object
}

ModalOrderResolution.defaultValues = {
  order: null,
  loading: false,
  onClose: () => {},
  actions: {
    orderResolutionAccept: () => {},
    orderResolutionReopen: () => {}
  },
  intl: {
    formatMessage: () => {}
  },
  appInfo: null
}

export default injectIntl(ModalOrderResolution)
