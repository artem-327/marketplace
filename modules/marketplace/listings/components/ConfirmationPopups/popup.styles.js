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

export const DivPicture = styled.div`
  margin: 9px auto 34px;
  width: 100px;
  height: 100px;
`

export const DivDescription = styled.div`
  color: #404040;
  line-height: 1.71;
  margin: 7px 10px 30px;
`

export const LinkLabel = styled.a`
  color: #2599d5;
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

export const DivHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #404040;
  margin: ${props => (props.margin ? props.margin : '')};
`

export const DivGreyText = styled.div`
  line-height: 1.71;
  color: #848893;
  text-align: center;
  margin: ${props => (props.margin ? props.margin : '')};
`

export const DivIconOuterCircle = styled.div`
  padding: 10px;
  background-color: rgba(0, 199, 249, 0.2);
  border-radius: 50px;
`