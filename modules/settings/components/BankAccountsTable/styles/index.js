import { Modal, Grid, Label } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalActions = styled(Modal.Actions)`
  background-color: #ffffff !important;
  text-align: center !important;
`

export const GridColumnInput = styled(Grid.Column)`
  .ui.fluid.input > input {
    background-color: #fdfdfd !important;
  }
  .ui.fluid.input {
    padding-top: 7px !important;
  }
`

export const DivCircle = styled.div`
  align-self: center;
  margin: 5px 10px 5px 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : '')};
`

export const StatusLabel = styled(Label)`
  height: 22px;
  margin-left: 9px !important;
  font-size: 12px !important;
  font-style: normal !important;
  border-radius: 3px;
  background-color: #edeef2;
  color: #20273a;
  span {
    vertical-align: text-top;
    padding-left: 4px;
    line-height: 8px;
  }
`

export const ModalContent = styled(Modal.Content)`
  text-align: center !important;
  padding: 39px !important;
`

export const DivCircleIcon = styled.div`
  height: 100px;
  background-color: #edeef2;
  border-radius: 50%;
  margin-left: 38%;
  margin-right: 38%;
  margin-bottom: 34px;
  display: flex;
  justify-content: center;
`

export const DivIcon = styled.div`
  margin-top: 25px;
`
