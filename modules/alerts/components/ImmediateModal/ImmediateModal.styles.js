import { Modal, Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalCustom = styled(Modal)`
  &.ui.modal {
    width: 660px;
  }
  &.ui.modal > .actions {
    background: none !important;
  }
`

export const DivConent = styled.div`
  padding-bottom: 15px;
  text-align: center;
  font-size: 15px;
`

export const DivError = styled.div`
  color: #9f3a38;
  text-align: center;
`
