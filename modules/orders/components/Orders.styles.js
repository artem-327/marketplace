import styled from 'styled-components'
import { Modal, Dropdown } from 'semantic-ui-react'
import { CheckCircle } from 'react-feather'


export const CustomA = styled.a`
  color: #2599d5;
`

export const DivText = styled.div`
  padding-bottom: 20px;
`

export const DivTextContact = styled.div`
  text-align: center;
`

export const SpanModalText = styled.span`
  text-align: center;
`

export const StyledModal = styled(Modal)`
  > .header {
    padding: 21px 30px !important;
    font-size: 14px !important;
    text-transform: uppercase;
  }

  > .content {
    padding: 30px !important;
    //margin: 30px 0;
  }

  > .actions {
    background-color: #ffffff !important;
    padding: 10px 5px !important;
    button {
      margin: 0 5px;
      height: 40px;
    }
  }
`

export const StyledHeader = styled.span`
  color: #2599d5;
`

export const RelatedDocumentsDropdown = styled(Dropdown)`
  z-index: 601 !important;
`

export const CustomDivAddDocument = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Rectangle = styled.div`
  height: 50px;
  border-radius: 4px;
  border: solid 1px #84c225;
  background-color: #ffffff;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
`

export const RectangleRed = styled.div`
  height: 50px;
  border-radius: 4px;
  border: solid 1px #db2828;
  background-color: #ffffff;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
`

export const CustomCheckCircleRed = styled(CheckCircle)`
  width: 24px;
  height: 20px;
  font-family: feathericon;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.83;
  letter-spacing: normal;
  color: #db2828;
  margin: 0 10px 0 10px;
`

export const CustomCheckCircle = styled(CheckCircle)`
  width: 24px;
  height: 20px;
  font-family: feathericon;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.83;
  letter-spacing: normal;
  color: #84c225;
  margin: 0 10px 0 10px;
`

export const CustomDivAddedMewDocument = styled.div`
  display: flex;
`

export const CustomDivTextAddedMewDocument = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
`

export const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

export const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: top;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 5px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }
`
