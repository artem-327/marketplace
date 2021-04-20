/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Modal, Image } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'
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

const ViewOnlyPopup = props => {
  const { onCancel, systemCompanyName } = props

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
              id='marketplace.WeAreVerifyingYourIdentity'
              defaultMessage="We're verifying your identity"
            />
          </DivGreyText>
          <DivDescription>
            <FormattedMessage
              id='marketplace.viewOnlyPopupText'
              defaultMessage='For your security, we need some additional time to verify your identity and your financial information before you buy or sell on Blue Trade Direct. You will only be able to view Blue Trade Direct listings during this time. Most verifications are done within 24 hours but in rare cases can take up to 72 hours.'
              values={{
                companyName: systemCompanyName
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
                <FormattedMessage id='marketplace.keepBrowsing' defaultMessage='Keep Browsing'>
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

function mapStateToProps(store) {
  return {
    systemCompanyName: store?.auth?.identity?.appInfo?.systemCompanyName
  }
}

export default connect(mapStateToProps, {})(injectIntl(ViewOnlyPopup))