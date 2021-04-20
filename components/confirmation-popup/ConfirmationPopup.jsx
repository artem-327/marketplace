/* eslint-disable react-hooks/exhaustive-deps */
import { object } from 'prop-types'
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
  const {
    header,
    description,
    closeCaption,
    onClose
  } = props

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
            {header}
          </DivHeader>
          <DivDescription>
            {description}
          </DivDescription>
          <DivButtons>
            {closeCaption && (
              <DivButtonColumn>
                <Button
                  type='button'
                  basic
                  onClick={() => onClose()}
                  data-test='confirmation_popup_returnToCart'>
                  {closeCaption}
                </Button>
              </DivButtonColumn>
            )}
          </DivButtons>
        </DivCenteredWrapper>
      </Modal.Content>
    </ModalStyled>
  )
}

ConfirmationPopup.propTypes = {
  header: object,
  description: object,
  closeCaption: object
}

ConfirmationPopup.defaultProps = {
  header: '',
  description: '',
  closeCaption: 'Close'
}

export default injectIntl(ConfirmationPopup)