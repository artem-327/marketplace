import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
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
const ViewOnlyPopup = props => {
  const { onCancel, applicationName } = props

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
          <DivHeader margin='-4px 10px 1px'>
            <FormattedMessage id='marketplace.viewOnly' defaultMessage='View Only' />
          </DivHeader>
          <DivGreyText margin='1px 10px 11px'>
            <FormattedMessage
              id='marketplace.noLinkedBankAccount'
              defaultMessage="No linked bank account"
            />
          </DivGreyText>
          <DivDescription>
            <FormattedMessage
              id='marketplace.viewOnlyPopupText'
              defaultMessage="Before you can make purchases from the Marketplace you or your company's controller must link a bank account. This can be done in My TradePass > Bank Accounts through a secure Plaid link."
              values={{
                companyName: applicationName
              }}
            />
          </DivDescription>
          <DivButtons>
            <DivButtonColumn>
              <Button
                type='button'
                basic
                onClick={() => onCancel()}
                data-test='confirmation_popup_keep_browsing'>
                <FormattedMessage id='marketplace.keepBrowsing' defaultMessage='Keep Browsing' />
              </Button>
            </DivButtonColumn>
          </DivButtons>
        </DivCenteredWrapper>
      </Modal.Content>
    </ModalStyled>
  )
}

ViewOnlyPopup.propTypes = {
  onCancel: PropTypes.func,
  applicationName: PropTypes.string
}

ViewOnlyPopup.defaultProps = {
  onCancel: () => {},
  applicationName: ''
}

function mapStateToProps(store) {
  return {
    applicationName: store?.auth?.identity?.appInfo?.applicationName
  }
}

export default connect(mapStateToProps, {})(injectIntl(ViewOnlyPopup))