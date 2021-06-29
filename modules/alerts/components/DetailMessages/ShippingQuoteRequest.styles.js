import { Table, GridRow } from 'semantic-ui-react'
import styled from 'styled-components'

export const AddressRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 10px;

  .addresses {
    display: flex;
    flex-direction: row;
  }

  .right-buttons {
    .grid {
      margin: 0;

      .row {
        margin: 0;
        padding: 10px 0;
      }

      .column {
        margin: 0;
        padding: 0;
      }
    }

    .ui.button {
      display: flex;
      align-items: center;
      height: 40px;
      border-radius: 3px;
      font-weight: 500;
      color: #848893;
      margin: 0 5px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;

      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }

      &:active {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
        border: solid 1px #dee2e6;
        background-color: #edeef2;
        color: #20273a;
      }
    }
  }
`

export const SpanIdValue = styled.span`
  color: #20273a;
  margin-left: 7px;
  margin-right: 2px;
`

export const TableStyled = styled(Table)`
  .table-detail-rows-wrapper .table-responsive table.table,
  &.ui.table {
    border: none;

    tbody {
      tr {
        border: none;
        border-bottom: 1px solid #dde2e6 !important;
        
        &:first-child {
          padding-top: 0px !important;
        }
        
        &:last-child {
          padding-bottom: 0px !important;
          border-bottom: none !important;
        }
        
        th,
        td:not(.p-0):first-child,
        td {
          box-shadow: none !important;
          background-color: #fff !important;
          border: inherit !important;
          border-left: 1px solid #dde2e6 !important;
          border-radius: 0 !important;
          
          padding: inherit !important;
          padding-right: 5px !important;
          padding-left: 5px !important;
                
          &:first-child {         
            border-left: none !important;
            padding-left: 0px !important;
            
            &:before {
              border-left: none !important;
            }
          }
  
          &:last-child {
            padding-right: 0px !important;
            
            &:before {
              border-right: none !important;
            }
          }
        }
      }
    }
  }
`

export const DivCellContent = styled.div`
  display: block;
  flex-direction: column;
`

export const DivCellHeader = styled.div`
  font-size: 12px;
  color: #848893;
`

export const DivCellValue = styled.div`
  font-size: 14px;
  color: #20273a;
`

export const GridRowMargin = styled(GridRow)`
  &.row {
    ${props => (props.margin ? `margin: ${props.margin} !important;` : '')};
  }
`