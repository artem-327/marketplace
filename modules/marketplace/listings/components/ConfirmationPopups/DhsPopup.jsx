/* eslint-disable react-hooks/exhaustive-deps */
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal, Image } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'
import Logo from '../../../../../assets/images/marketplace/dhs-logo.svg'

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

const DhsPopup = props => {
  const { onCancel, onAccept } = props


  const DhsChemicalOfInterest =
    <LinkLabel
      href='https://www.cisa.gov/sites/default/files/publications/appendix-a-to-part-27-508.pdf'
      target='_blank'>
      <FormattedMessage id='marketplace.DhsChemicalOfInterest' defaultMessage='DHS Chemical of Interest' />
    </LinkLabel>

  const cfats =
    <LinkLabel
      href='https://www.cisa.gov/sites/default/files/publications/flyer-cfats-receiving-coi-508.pdf'
      target='_blank'>
      <FormattedMessage id='marketplace.cfats' defaultMessage='CFATS' />
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
              id='marketplace.dhsDescription'
              defaultMessage={`This product is a ${DhsChemicalOfInterest} and by adding this product to your order you are agreeing that your facility currently meets or will meet the regulatory standards to house this product within 60 days of receiving it. Please review this ${cfats} document listing your facility's responsibilities for handling COIs.`}
              values={{ DhsChemicalOfInterest, cfats }}
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
                onClick={() => {
                  onAccept()
                  onCancel()
                }}>
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

export default injectIntl(DhsPopup)