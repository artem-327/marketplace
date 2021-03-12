import { Modal, Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalCustom = styled(Modal)`
  &.ui.modal > .actions {
    background: none !important;
  }
`

export const DivConent = styled.div`
  padding-bottom: 15px;
  text-align: center;
`

export const DivError = styled.div`
  color: #9f3a38;
  text-align: center;
`
