import styled from 'styled-components'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { GridColumn, Segment, Modal } from 'semantic-ui-react'

export const GridColumnWError = styled(GridColumn)`
  &.column.error {
    color: #9f3a38;
  }
`

export const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
`

export const ModalFixed = styled(Modal)`
  display: flex;
  flex-flow: column;
  
  > .content {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden !important;
    display: flex !important;
    flex-flow: column;
    
    > .ps {
      flex-grow: 1;
      flex-shrink: 1;
      position: relative;
      overflow: hidden;
      margin: -1.5rem;
      padding: 1.5em 1.5em 0.5em; // part of Safari fix

      > .ps__rail-y {
        position: absolute !important;
        /*top: 2px !important;*/
        right: 0 !important;
        /*bottom: 2px !important;*/
        opacity: 0.2;
        overflow: hidden !important;
        width: 10px !important;
        height: 100% !important;
        padding: 0 2px !important;

        .ps__thumb-y {
          position: absolute;
          width: 6px;
          margin: 0 auto;
          border-radius: 3px;
          background: #20273a;
        }
      }
      
      & > .ps__rail-y:hover,
      &.ps--scrolling-y > .ps__rail-y {
        opacity: 0.5;
      }
      
      // part of Safari fix
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 1em;
        opacity: 0.01;
      }
    }
  }
  
  > .header,
  > .actions {
    flex-grow: 0;
    flex-shrink: 0;
  }
`