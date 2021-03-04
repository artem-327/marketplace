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

export const ModalContentFixed = styled(Modal.Content)`
 @supports (-webkit-touch-callout: none) {
   & {
     white-space:nowrap;
     overflow: scroll;
     -webkit-overflow-scrolling: touch;  
   }
 }
`