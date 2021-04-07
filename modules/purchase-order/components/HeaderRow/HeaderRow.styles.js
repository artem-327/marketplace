import styled from 'styled-components'
import { Image, Button, Grid, Popup, Container } from 'semantic-ui-react'

export const DivHeaderRow = styled.div`
  position: fixed;
  width: auto;
  height: 80px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 25px 0;
  box-shadow: 0 1px 0 0 #dee2e6;
  background-color: #ffffff;
`

export const ContainerHeader = styled(Container)`
  &.ui.container {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding: 0;
  }
`

export const DivHeaderRowText = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.11;
  letter-spacing: normal;
  text-align: right;
  color: #20273a;
  margin: auto 0 auto 5px;
`

export const DivImageWrapper = styled.div`
  margin: auto 5px auto 9px;
  cursor: pointer;
`

export const LogoImage = styled(Image)`
  max-height: 30px;
  margin: auto 0;
`

export const PopupHeader = styled(Popup)`
  &.ui.popup {
    padding: 0;
    font-size: 12px;
    align-items: center;
    max-width: 360px;
  }
`

export const PopupGrid = styled(Grid)`
  &.ui.grid {
    margin: -3.5px -5px;
    padding: 16px;

    .row {
      padding: 3.5px 0;
      
      .column {
        text-align: center;
        padding: 0 5px;
      }
    }
  }
`

export const ButtonHeader = styled(Button)`
  &.ui.button {
    font-size: 12px;
    padding: 5px 16px;
    background-color: #ffffff;
    font-weight: 500;
    height: auto;
    color: #20273a;
    
    &.bordered {
      border-radius: 3px;
      border: solid 1px #dee2e6;
    }
  }
`