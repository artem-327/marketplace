import { Modal, Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalCustom = styled(Modal)`
  ${({ basicModal }) =>
    basicModal
      ? `
& .ui.modal > .header {
  border-bottom: none !important;
}
& .ui.modal > .actions {
  text-align: center !important;
  border-top: none !important;
  background: none !important;
}`
      : null}
`
