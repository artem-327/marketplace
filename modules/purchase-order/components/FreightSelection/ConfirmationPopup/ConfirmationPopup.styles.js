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

export const DivIconOuterCircle = styled.div`
  margin: 18px auto 23px;
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: rgba(132, 194, 37, 0.2);
  border-radius: 50px;
`

export const DivIconInnerCircle = styled.div`
  background-color: #84c225;
  width: 80px;
  height: 80px;
  padding: 13px;
  border-radius: 40px;
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

export const DivButtons = styled.div`
  margin: 8px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const DivButtonColumn = styled.div`
  margin: 0 5px;
`