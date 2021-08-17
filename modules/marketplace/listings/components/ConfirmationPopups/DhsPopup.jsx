import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Images
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

/**
 * DhsPopup Component
 * @category Marketplace - Listings
 * @components
 */
const DhsPopup = props => {
  const { permissionsToBuy, onCancel, onAccept } = props

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
          {!permissionsToBuy && (
            <DivDescription>
              <FormattedMessage
                id='marketplace.notUserPermissionsToBuy'
                defaultMessage='You have not signed documents proving you are authorized to purchase regulated products yet, or the authorization has expired. Please, check the authorization under you user settings.'
              />
            </DivDescription>
          )}
          <DivButtons>
            <DivButtonColumn>
              <Button
                type='button'
                basic
                onClick={() => onCancel()}
                data-test='confirmation_popup_cancel'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
              </Button>
            </DivButtonColumn>
            <DivButtonColumn>
              <Button
                disabled={!permissionsToBuy}
                type='button'
                color='blue'
                onClick={() => onAccept()}>
                <FormattedMessage id='marketplace.iAgree' defaultMessage='I agree' />
              </Button>
            </DivButtonColumn>
          </DivButtons>
        </DivCenteredWrapper>
      </Modal.Content>
    </ModalStyled>
  )
}

DhsPopup.propTypes = {
  permissionsToBuy: PropTypes.bool,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func
}

DhsPopup.defaultProps = {
  permissionsToBuy: false,
  onCancel: () => {},
  onAccept: () => {}
}

export default injectIntl(DhsPopup)