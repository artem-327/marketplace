import styled from 'styled-components'
import { Message, Container, Icon } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

export const MessageContainer = styled(Container)`
  padding: 5px;
  > .message {
    margin-top: 0.5em !important;
    margin-bottom: 0.5em !important;
    font-size: 14px !important;
    &:last-child {
      margin-bottom: 0em !important;
    }
    &:first-child {
      margin-top: 0em !important;
    }
  }
`

export const StyledMessage = styled(Message)`
  color: #33373e !important;
  padding-top: 0.5em !important;
  padding-bottom: 0.5em !important;
`

export const CloseIcon = styled(Icon)`
  cursor: pointer;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  opacity: 0.7 !important;
  -webkit-transition: opacity 0.1s ease;
  transition: opacity 0.1s ease;
  &:hover {
    opacity: 1 !important;
  }
`

export const themes = {
  ERROR: 'error',
  SUCCESS: 'success'
}

export const responses = {
  SUCCESS: <FormattedMessage id='response.success.saved' defaultMessage='Succesfully saved!' />
}