import styled from 'styled-components'

import { Header, GridColumn, GridRow, Grid, Segment, Message, Button, ButtonGroup } from 'semantic-ui-react'
import { AlertCircle, ShoppingBag, Trash2, Edit2 } from 'react-feather'

export const GridContainer = styled(Grid)`
  .row:not(.default-padded) {
    padding-left: 30px;
    padding-right: 30px;
  }
  > .column > .segment > .grid > .row > .column:first-child:not(.default) {
    padding-left: 0px !important;
  }
  > .column > .segment > .grid > .row > .column:last-child:not(.default) {
    padding-right: 0px !important;
  }
`

export const SummaryGrid = styled(Grid)`
  .column:first-child:not(.default) {
    padding-left: 0px !important;
  }
  .column:first-child:last-child:not(.default) {
    padding-right: 0px !important;
  }
  .row .column:nth-child(2):not(.default) {
    padding-right: 0px !important;
  }
  .row > .column:last-child:not(:first-child) {
    text-align: right;
  }
  .grid {
    padding-top: 0px !important;
  }
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;

    > .row {
      padding: 16px 0;

      > .column {
        padding: 0 20px;
      }
    }
  }
`

export const DivHeader = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.29;
  color: #20273a;
`

export const StyledGridRow = styled(GridRow)`
  &.row {
    ${props => props.padding ? `padding: ${props.padding} !important;` : ''}
  }
`

export const DivNormalText = styled.div`
  font-size: 14px;
  line-height: 1.29;
  color: #20273a;
`

export const DivButtonContent = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #20273a;
`


export const CapitalizedText = styled.span`
  text-transform: capitalize;
`
export const TopUnpaddedRow = styled(GridRow)`
  padding-top: 0px !important;
`

export const BottomUnpaddedRow = styled(GridRow)`
  padding-bottom: 0px !important;
`

export const CustomHeader = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #20273a;
  margin-bottom: 5px;
`

export const CartColumn = styled(GridColumn)`
  max-width: calc(100% - 430px);
  margin: 30px 0 30px 30px;
  
  @media (max-width: 1200px) {
    max-width: calc(100% - 360px);
    min-width: calc(100% - 360px);
  }
  
  @media (max-width: 1000px) {
    order: 2;
    max-width: calc(100% - 60px);
    min-width: calc(100% - 60px);
    margin-top: 0 !important;
  }
`

export const SummaryColumn = styled(GridColumn)`
  min-width: 370px;
  margin: 30px 0 30px 0;
  
  @media (max-width: 1200px) {
    min-width: 300px;
  }
  
  @media (max-width: 1000px) {
    order: 1;
    max-width: calc(100% - 60px);
    min-width: calc(100% - 60px);
    margin: 30px 30px 0 !important;
  }
`

export const CartButtonGroup = styled(ButtonGroup)`
  .ui.button {
    padding-left: 14px !important;
    padding-right: 14px !important;
  }
  
  @media (max-width: 1200px) and (min-width: 1001px) {
    display: block !important;
    width: 100% !important;
  
    .ui.button {
      width: 100%;
      border-radius: 3px !important;
      
      + .ui.button {
        margin-top: 5px;
      }
    }
  }
`

export const ButtonStyled = styled(Button)`
  &.ui.button {
    width: 100%;
    border-radius: 3px !important;
    margin: 0;
  }
`

export const ContentSegment = styled(Segment)`
  &.ui.segment {
    padding: 0;
  }
`

export const VerticalUnpaddedColumn = styled(GridColumn)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  ${props => props.black && 'color: black !important;'}
`

export const VerticalUnpaddedRow = styled(GridRow)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
`

export const StyledRow = styled(GridRow)`
  box-shadow: ${props => (props.bottomshadow ? '0 1px 0 0 #dee2e6' : '0 0 0 0')};
  margin-top: ${props => (props.topmarged ? '5px' : '0px')} !important;
  ${props => (props.verticallyunpadded ? 'padding-bottom: 0px !important; padding-top: 0px !important;' : '')};
`

export const BottomUnpaddedColumn = styled(GridColumn)`
  padding-bottom: 0px !important;
`

export const ItemDescriptionGrid = styled(Grid)`
  &.ui.grid {
    border-radius: 4px;
    border: solid 1px #dee2e6;
    background-color: #f8f9fb;
    margin: 0 20px;
    padding: 11px 0 !important;
    
    > .row {
      padding: 0 !important;
      
      > .column {
        padding: 5px 20px;
      }
    }

    > .row .column span {
      float: right;
    }
  }
`

export const Item = styled.div`
  box-shadow: ${props => (props.bottomshadow ? '0 1px 0 0 #dee2e6 !important' : '0 0 0 0')};
  padding-bottom: 20px;
`

export const DescriptionValue = styled.span`
  color: #20273a;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`

export const TotalRow = styled(GridRow)`
  &.row {
    padding: 14px 0 !important;
    background-color: #f8f9fb;
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }
`

export const DivTotalHeader = styled.div`
  font-weight: bold;
`

export const TotalPriceRow = styled(GridRow)`
  > .column:last-child {
    color: #84c225 !important;
  }
  background-color: #f8f9fb;
  border-top: 1px solid #dee2e6;

  padding-right: 30px !important;
`

export const TopUnpaddedColumn = styled(GridColumn)`
  padding-top: 0px !important;
  ${props => props.black && 'color: black !important;'}
`

export const UnpaddedColumn = styled(GridColumn)`
  padding: 0 !important;
`

export const UnpaddedRow = styled(GridRow)`
  padding: 0 !important;
`

export const RightUnpaddedRow = styled(GridRow)`
  padding-right: 0px !important;
`

export const CustomMessage = styled(Message)`
  border-radius: 4px;
  ${props => props.warning && `border: solid 1px #ff9d42;`}
  ${props => props.informative && `border: solid 1px #2599d5;`}
  ${props => props.ownFreight && `border: solid 1px #84c225;`}
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  background-color: #ffffff !important;
  display: block !important;
  i {
    ${props => props.warning && `color: #ff9d42;`}
    ${props => props.informative && `color: #2599d5;`}
    ${props => props.ownFreight && `color: #84c225;`}
  }

  *:not(i) {
    color: black !important;
  }
  & .button {
    float: right;
    bottom: 7px;
    position: relative;
  }
`

export const Rectangle = styled.div`
  border-radius: 4px;
  border: solid 1px #2599d5;
  background-color: #ffffff;
  align-items: center;
  display: block;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 20px;
`

export const CustomDivTitle = styled.div`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #0d0d0d;
  display: flex;
`

export const CustomDivContent = styled.div`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  padding: 4px 35px;
`

export const CustomDivInTitle = styled.div`
  padding-left: 10px;
`

export const InfoIcon = styled(AlertCircle)`
  transform: rotate(180deg);
  color: #2599d5;
`

export const IconShoppingBag = styled(ShoppingBag)`
  font-size: 18px;
  width: 18px;
  height: 20px;
  margin-right: 9px; 
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  text-align: center;
  color: #20273a;
`

export const DivIconsWrapper = styled.div`
  margin-left: auto;
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  width: fit-content;
`

export const DivIconRectangle = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 0 0 5px;
  padding: 5px 7px 7px;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  ${props => !props.disabled ? 'cursor: pointer;' : ''}
`

export const IconTrash2 = styled(Trash2)`
  font-size: 18px;
  width: 18px;
  height: 20px;
  text-align: center;
  color: #f16844;
`

export const IconEdit2 = styled(Edit2)`
  font-size: 18px;
  width: 18px;
  height: 20px;
  text-align: center;
  color: ${props => props.disabled ? '#848893' : '#20273a'};
`