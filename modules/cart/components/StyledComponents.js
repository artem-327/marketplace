import styled from 'styled-components'

import { Header, GridColumn, GridRow, Grid, Segment } from 'semantic-ui-react'

export const CapitalizedText = styled.span`
  text-transform: capitalize;
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
`

export const StyledRow = styled(GridRow)`
  box-shadow: ${props => props.bottomShadow ? '0 1px 0 0 #dee2e6' : '0 0 0 0'};
`

export const TopUnpaddedRow = styled(GridRow)`
  padding-top: 0px !important;
`

export const BottomUnpaddedRow = styled(GridRow)`
  padding-bottom; 0px !important;
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
  box-shadow: ${props => props.bottomShadow ? '0 1px 0 0 #dee2e6' : '0 0 0 0'};
  padding-bottom: 30px;
`

export const DescriptionValue = styled.span`
  color: #20273a;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`

export const TotalRow = styled(GridRow)`
  background-color: #f8f9fb;
  border-top: 1px solid #dee2e6;
`