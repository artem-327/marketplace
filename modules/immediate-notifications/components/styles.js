import { Modal } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalCustom = styled(Modal)`
  &.ui.modal {
    width: 660px;
  }
  &.ui.modal > .actions {
    background: none !important;
  }
`

export const ModalAppeal = styled(Modal)`
  &.ui.modal {
    width: 900px;
    margin-top: 200px !important;
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

export const DivOuterCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto;
  background-color: ${props => props.bkgColor}
`

export const DivInnerCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 10px;
  position: absolute;
  background-color: ${props => props.bkgColor}
`
