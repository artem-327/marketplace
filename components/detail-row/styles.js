import { Grid, Segment, List, GridColumn, Table, Button } from 'semantic-ui-react'
import styled from 'styled-components'

export const StyledGrid = styled(Grid)`
  &.ui.grid {
    margin: 0 5px;

    .row {
      margin: 0;
      padding: 5px 0;
    }

    .column {
      margin: 0;
      padding: 0 5px;
    }
  }
`

export const TableSegment = styled(Segment)`
  ${({ $oldDesign }) => ($oldDesign ? '' : 'margin: 0;')}
  ${({ $oldDesign }) => ($oldDesign ? '' : 'border-color: #dee2e6 !important;')}
  ${({ $oldDesign }) => ($oldDesign ? '' : 'padding: 20px !important;')}
  background-color: ${({ $oldDesign }) => ($oldDesign ? '#f5f7fa' : '#f6f6f6')} !important;
  
  &.ui.segment {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
`

export const StyledList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: space-between;
    margin: 0;
    
    &:nth-child(n + 2) {
      border-top: 1px solid rgba(34, 36, 38, 0.15);
    }
    
    /* to separate last item from right border */
    &:after {
      content: "";
      display: block;
    }

    > .item {
      text-align: left !important;
      padding: 0px ${({ $oldDesign }) => ($oldDesign ? '10px' : '20px')} !important;
      max-width: fit-content !important;

      .header {
        margin: 0;
        padding: ${({ $oldDesign }) => ($oldDesign ? '0 0 3px' : '11px 0 4px')};
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: ${({ $oldDesign }) => ($oldDesign ? '1.1666667' : '1.25')};
      }

      .description {
        padding: ${({ $oldDesign }) => ($oldDesign ? '0' : '0 0 13px')};
        font-size: 14px;
        color: #20273a;
        line-height: 1.2142857;
      }
    }
  }
`

export const DetailMessage = styled.div`
  text-align: left;
  font-size: 14px;
  color: #20273a;
  padding: 0 5px 5px 5px;
`

export const ColumnDetail = styled(GridColumn)`
  padding: 0px !important;
`

export const DivTable = styled.div`
  background-color: #ffffff;
  width: 100%;
`

export const DivHeaderTable = styled.div`
  width: 100%;
  text-align: left;
  color: #848893;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  display: flex;
`

export const DivHeaderColumnTable = styled.div`
  width: ${props => (props.widthProp ? props.widthProp : '15%')};
  padding: 9px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`

export const DivBodyTable = styled.div`
  width: 100%;
  text-align: left;
  color: #20273a;
  font-size: 14px;
  border-radius: 4px;
  border: ${props => (props.separatedRows ? '0 none' : 'solid 1px #dee2e6')};
`
export const DivBodyRowTable = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row ${props => (props.canWrap ? 'wrap' : 'nowrap')};
  margin: ${props => (props.separatedRows ? '2px 0' : '0')};
  border-width: ${props => (props.separatedRows ? '1px' : props.isLastRow ? '0' : '0 0 1px')};
  //border-bottom: ${props => (props.isLastRow ? 'none' : 'solid 1px #dee2e6;')};
  border-style: solid;
  border-color: #dee2e6;
  border-radius: ${props => (props.separatedRows ? '4px' : '0')};
`

export const DivBodyColumnTable = styled.div`
  width: ${props => (props.widthProp ? props.widthProp : '15%')};
  padding: 9px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`

export const DivBodyRowDetail = styled.div`
  display: block;
  width: 100%;
  border-top: 1px solid #dee2e6;
  padding: 1em 1em 0;
`

export const CustomButton = styled(Button)`
  ${props =>
    props.buttonStyles ? props.buttonStyles : 'background-color: #2599d5 !important; color: #ffffff !important;'};
`
