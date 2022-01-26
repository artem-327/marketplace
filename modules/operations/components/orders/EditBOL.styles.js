import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import { Sidebar, Segment, GridColumn, Icon, Grid, Modal, Table, Header, ModalContent, Tab, Button } from 'semantic-ui-react'
import { TextArea } from 'formik-semantic-ui-fixed-validation'
import {MapTable} from "../../../inventory/styles";


export const TabDetailRow = styled(Tab)`
  .ui.secondary.menu:not(.vertical) {
    padding-left: 25px !important;
    margin: -15px -15px 10px -15px !important;
    border-bottom: solid 1px #dee2e6 !important;
    border-left: solid 1px #dee2e6 !important;
    border-right: solid 1px #dee2e6 !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    .item.active {
      border-color: #dee2e6 !important;
    }
  }
`

export const TabPane = styled(Tab.Pane)`
  display: contents !important;
  width: 100% !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: 0 !important;
  border: 0 !important;
  background-color: #ffffff;
`

export const GridBol = styled(Grid)`
  &.ui.grid {
    margin: 0;
    
    >.row {
      padding: 7px 0;
      
      >.column {
        padding: 0 7px;
      }
    }
  }
`

export const DivTitleSection = styled.div`
  background-color: #edeef2 !important;
  color: #404040 !important;
  padding: 5px 9px !important;
`

export const GreySegment = styled(Segment)`
  &.ui.segment {
    background-color: #fafafa;
  }
`

export const DivButtonsSection = styled.div`
  padding: 10px 15px;
  margin: 0 -14px -15px;
  border-top: solid 1px #dee2e6;
  display: flex;
  flex-flow: row;
  justify-content: space-between;  
`

export const TableCarrier = styled(Table)`
  &.ui.celled.padded.center.aligned.table {
    thead tr th {
      background: unset;
      color: #848893;
    }

    tbody {
      tr {
        td {
          padding: 5px;
     
          .field .ui.input {
            min-width: unset;
          }
        }

        td:not(:last-child) {
          border-left: none;
        }
      }
    } 
  }
`

export const DivPLusIcon = styled.div`
  margin-bottom: 20px;
  border: solid 1px #dee2e6;
  border-radius: 3px;
  width: 32px;
  text-align: center;
  font-size: 24px;
  cursor: pointer;
`