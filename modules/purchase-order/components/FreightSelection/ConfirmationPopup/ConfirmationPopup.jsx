/* eslint-disable react-hooks/exhaustive-deps */
import Router from 'next/router'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'
import { Check } from 'react-feather'

// Styles
import {
  ModalStyled,
  DivCenteredWrapper,
  DivHeader,
  DivDescription,
  DivIconOuterCircle,
  DivIconInnerCircle,
  DivButtons,
  DivButtonColumn
} from './ConfirmationPopup.styles'

const ConfirmationPopup = props => {
  const { onClose } = props

  return (
    <ModalStyled
      open
      size='tiny'
      onClose={() => onClose()}
    >
      <Modal.Content>
        <DivCenteredWrapper>
          <DivIconOuterCircle>
            <DivIconInnerCircle>
              <Check size={54} color='white' />
            </DivIconInnerCircle>
          </DivIconOuterCircle>
          <DivHeader>
            <FormattedMessage id='checkout.freight.quoteRequestSent' defaultMessage='Quote Request Sent' />
          </DivHeader>
          <DivDescription>
            <FormattedMessage
              id='checkout.freight.weWillNotifyYou'
              defaultMessage="We'll notify you when your custom quote has been created" />
          </DivDescription>
          <DivButtons>
            <DivButtonColumn>
              <Button
                type='button'
                basic
                onClick={() => {
                  Router.push('/cart')
                  onClose()
                }}
                data-test='confirmation_popup_returnToCart'>
                <FormattedMessage id='checkout.header.button.returnToCart' defaultMessage='Return to Cart'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </DivButtonColumn>
            <DivButtonColumn>
              <Button
                type='button'
                color='blue'
                onClick={() => onClose()}>
                <FormattedMessage id='checkout.header.button.stayInCheckout' defaultMessage='Stay in Checkout'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </DivButtonColumn>
          </DivButtons>
        </DivCenteredWrapper>
      </Modal.Content>
    </ModalStyled>
  )
}

export default injectIntl(ConfirmationPopup)