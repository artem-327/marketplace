/* eslint-disable react-hooks/exhaustive-deps */
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal, Image } from 'semantic-ui-react'
import { getSafe } from '../../../../../utils/functions'
import Logo from '../../../../../assets/images/marketplace/dea-logo.svg'

// Styles
import {
  ModalStyled,
  DivCenteredWrapper,
  DivDescription,
  DivPicture,
  LinkLabel,
  DivButtons,
  DivButtonColumn
} from './Popup.styles'

const DeaPopup = props => {
  const { onCancel, onAccept } = props

  const requirements =
    <LinkLabel href='https://www.google.com' target='_blank'>
      <FormattedMessage id='marketplace.requirements' defaultMessage='requirements' />
    </LinkLabel>

  return (
    <ModalStyled
      open
      size='tiny'
      onClose={() => onCancel()}
    >
      <Modal.Content>
        <DivCenteredWrapper>
          <DivPicture>
            <Image src={Logo}/>
          </DivPicture>
          <DivDescription>
            <FormattedMessage
              id='marketplace.deaDescription'
              defaultMessage={`This product contains a chemical that is designated by the DEA as a List II Chemical. Before checking out, please ensure that the facility you are using understands the ${requirements} to store List II substances.`}
              values={{ requirements }}
            />
          </DivDescription>
          <DivButtons>
            <DivButtonColumn>
              <Button
                type='button'
                basic
                onClick={() => onCancel()}
                data-test='confirmation_popup_cancel'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </DivButtonColumn>
            <DivButtonColumn>
              <Button
                type='button'
                color='blue'
                onClick={() => onAccept()}>
                <FormattedMessage id='marketplace.iUnderstand' defaultMessage='I understand'>
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

export default injectIntl(DeaPopup)