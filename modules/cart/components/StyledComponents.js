import styled from 'styled-components'

import { Header, GridColumn, GridRow, Grid, Segment, Message } from 'semantic-ui-react'
import { AlertCircle } from 'react-feather'

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

export const CapitalizedText = styled.span`
  text-transform: capitalize;
`
export const TopUnpaddedRow = styled(GridRow)`
  padding-top: 0px !important;
`

export const BottomUnpaddedRow = styled(GridRow)`
  padding-bottom: 0px !important;
`

export const CustomHeader = styled(Header)`
  font-size: 18px;
  font-weight: 500;
  color: #20273a;
`

export const CartColumn = styled(GridColumn)`
  margin: 30px;
`

export const SummaryColumn = styled(GridColumn)`
  margin: 30px 30px 30px 0px;
`
export const ContentSegment = styled(Segment)`
  padding-top: 0px;
  padding-bottom: 0px;
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
  box-shadow: ${props => (props.bottomShadow ? '0 1px 0 0 #dee2e6' : '0 0 0 0')};
  margin-top: ${props => (props.topMarged ? '5px' : '0px')} !important;
  ${props => (props.verticallyUnpadded ? 'padding-bottom: 0px !important; padding-top: 0px !important;' : '')};
`

export const BottomUnpaddedColumn = styled(GridColumn)`
  padding-bottom: 0px !important;
`

export const ItemDescriptionGrid = styled(Grid)`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  margin: 0 !important;
  > .row {
    padding: 0 !important;
  }
  > .row .column span {
    float: right;
  }
`

export const Item = styled.div`
  box-shadow: ${props => (props.bottomShadow ? '0 1px 0 0 #dee2e6 !important' : '0 0 0 0')};
  padding-bottom: 30px;
`

export const DescriptionValue = styled.span`
  color: #20273a;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`

export const TotalRow = styled(GridRow)`
  background-color: #f8f9fb;
  border-top: 1px solid #dee2e6;
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
  margin: 44px 44px 0 44px;
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
  padding: 4px 30px;
`

export const CustomDivInTitle = styled.div`
  padding-left: 10px;
`

export const InfoIcon = styled(AlertCircle)`
  transform: rotate(180deg);
  color: #2599d5;
`
