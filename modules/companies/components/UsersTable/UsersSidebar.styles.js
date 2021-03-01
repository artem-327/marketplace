import styled from 'styled-components'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { Sidebar, GridColumn, Segment } from 'semantic-ui-react'

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;
`

export const HighSegment = styled.div`
  padding: 1.071428571em 2.142857143em;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  background-color: #ffffff;
  text-transform: uppercase;
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 30px;

  .ui.grid {
    margin: 0 -5px;
    .row {
      padding: 7.5px 0;
    }
    .column {
      padding: 0 5px;
    }
  }

  .field {
    .ui.checkbox {
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
    .field {
      label {
        color: #546f93;
      }
    }
  }
`

export const GridColumnWError = styled(GridColumn)`
  &.column.error {
    color: #9f3a38;
  }
`

export const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
`