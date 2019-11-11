import styled from 'styled-components'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { Segment, Image, GridRow } from 'semantic-ui-react'

export const width = 400

export const LoginSegment = styled(Segment)`
  width: ${width}px;
  margin: auto !important;
`

export const LogoImage = styled(Image)`
  width: 40%;
  margin: auto;
`

export const StyledForm = styled(Form)`
  margin-top: 0;
`

export const BottomMargedRow = styled(GridRow)`
  margin-bottom: 20px !important;
`