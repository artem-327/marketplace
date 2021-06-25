import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalStyled = styled(Modal)`
  &.ui.modal {
    text-align: center;
  }
`

export const DivCenteredWrapper = styled.div`
  align-items: center;
`

export const DivHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #404040;
  margin: 7px 10px;
`

export const DivDescription = styled.div`
  color: #404040;
  margin: 7px 10px 24px;
`

export const DivContent = styled.div`
  padding: 0 60px 24px;
`

export const DivButtons = styled.div`
  margin: 8px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const DivButtonColumn = styled.div`
  margin: 0 5px;
`