import styled from 'styled-components'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { GridColumn, Segment } from 'semantic-ui-react'

export const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

export const GridColumnWError = styled(GridColumn)`
  &.column.error {
    color: #9f3a38;
  }
`

export const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
`