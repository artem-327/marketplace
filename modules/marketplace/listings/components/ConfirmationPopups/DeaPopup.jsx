import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Images
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

/**
 * DeaPopup Component
 * @category Marketplace - Listings
 * @components
 */
const DeaPopup = props => {
  const { permissionsToBuy, deaListIIType, onCancel, onAccept } = props

  const deaType = deaListIIType ? 'II' : 'I'
  const requirements =
    <LinkLabel href='https://www.deadiversion.usdoj.gov/21cfr/cfr/1301/1301_72.htm' target='_blank'>
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
              defaultMessage={`This product contains a chemical that is designated by the DEA as a List ${deaType} Chemical. Before checking out, please ensure that the facility you are using understands the ${requirements} to store List ${deaType} substances.`}
              values={{ requirements, deaType }}
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
                color={permissionsToBuy ? 'blue' : 'white'}
                onClick={() => onAccept()}>
                <FormattedMessage id='marketplace.iUnderstand' defaultMessage='I understand' />
              </Button>
            </DivButtonColumn>
          </DivButtons>
        </DivCenteredWrapper>
      </Modal.Content>
    </ModalStyled>
  )
}

DeaPopup.propTypes = {
  permissionsToBuy: PropTypes.bool,
  deaListIIType: PropTypes.bool,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func
}

DeaPopup.defaultProps = {
  permissionsToBuy: false,
  deaListIIType: false,
  onCancel: () => {},
  onAccept: () => {}
}

export default injectIntl(DeaPopup)