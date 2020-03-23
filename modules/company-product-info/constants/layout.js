import styled from 'styled-components'
import { Menu, Segment } from 'semantic-ui-react'

export const BottonButtonsShowOnly = styled.div`  
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  background-color: #ffffff;
  padding: 0.714285714em 2.142857143em;
  text-align: right;
  > .ui.button {
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
  }
`

export const SegmentShowOnly = styled(Segment)`
  margin: 1.071428571em 0 0 0; 
  .grid {
    margin: 0;
    padding: 0 0.142857143em;
  
    > .row.select-row {
      padding: 1.071428571em 0;
      > .column:first-child {
        padding: 0 0.714285714em 0 0;
      }
       > .column:last-child {
        padding: 0 0 0 0.714285714em;
      }
      > .column label {
        padding-bottom: 0.5em;
        color: #404040;
      }
      > .column .ui.dropdown {
        background-color: #fdfdfd;
        margin-top: 0.5em;
      }
    }
    > .row.table-name {
      padding: 1.071428571em 0 0.714285714em 0;
      > .column {
        padding: 0;
        color: #20273a;
      }
    }
    > table {
      padding: 0;
      margin: 0 0 1.428571429em 0;
      thead tr {
        th {
          font-size: 1em;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.43;
          letter-spacing: normal;
          color: #848893;
          background-color: #ffffff;
        }
      }
      tbody tr {
        font-size: 1em;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #20273a;
      }
    }

    > .row:not(.select-row):not(.table-name) {
      box-shadow: 0 1px 0 0 #dee2e6;
      padding: 0.357142857em 0;
      > .column:first-child {
        padding: 0 0.714285714em 0 0;
      }
       > .column:last-child {
        padding: 0 0 0 0.714285714em;
      }
      > .column {
        .field {
          > .ui.dropdown,
          > .ui.input input {
            padding: 0.785714286em 0;
            border: none;
            opacity: 1;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.29;
            letter-spacing: normal;
            color: #20273a;
            > i.dropdown.icon {
              visibility: hidden;
            }
          }
        }
      }
    }
  }
`