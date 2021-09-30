import { injectIntl } from 'react-intl'
import { Button, Modal, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Images
import Logo from '../../../../../assets/images/blue-pallet/blue-pallet-circle.svg'
// Styles
import {
  ModalStyled,
  DivCenteredWrapper,
  DivDescription,
  DivPicture,
  DivIconOuterCircle,
  DivHeader,
  DivGreyText,
  DivButtons,
  DivButtonColumn
} from './Popup.styles'

/**
 * ViewOnlyPopup Component
 * @category Marketplace - Listings
 * @components
 */
const ViewOnlyRegisterPopup = props => {
  const { onCancel, onButtonClick, header, subHeader, description, buttonText } = props

  return (
    <ModalStyled
      open
      size='tiny'
      onClose={() => onCancel()}
    >
      <Modal.Content>
        <DivCenteredWrapper>
          <DivPicture>
            <DivIconOuterCircle>
              <Image src={Logo} fluid/>
            </DivIconOuterCircle>
          </DivPicture>
          <DivHeader margin='-4px 10px 1px'>{header}</DivHeader>
          <DivGreyText margin='1px 10px 11px'>{subHeader}</DivGreyText>
          <DivDescription>{description}</DivDescription>
          <DivButtons>
            <DivButtonColumn>
              <Button
                type='button'
                basic
                onClick={() => onButtonClick()}
                data-test='confirmation_popup_keep_browsing'>
                {buttonText}
              </Button>
            </DivButtonColumn>
          </DivButtons>
        </DivCenteredWrapper>
      </Modal.Content>
    </ModalStyled>
  )
}

ViewOnlyRegisterPopup.propTypes = {
  onCancel: PropTypes.func,
  onButtonClick: PropTypes.func,
  header: PropTypes.any,
  subHeader: PropTypes.any,
  description: PropTypes.any,
  buttonText: PropTypes.any
}

ViewOnlyRegisterPopup.defaultProps = {
  onCancel: () => {},
  onButtonClick: () => {},
  header: '',
  subHeader: '',
  description: '',
  buttonText: 'Send'
}

export default injectIntl(ViewOnlyRegisterPopup)