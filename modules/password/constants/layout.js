import styled from 'styled-components'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { Segment, Image, GridRow } from 'semantic-ui-react'

export const width = 400

export const LoginSegment = styled(Segment)`
  width: ${width}px;
  margin: auto !important;
`

export const LogoImage = styled(Image)`
  width: ${width * 0.4}px;
  position: absolute !important;
  left: ${width / 2 - (width * 0.4) / 2}px;
  top: ${-(width * 0.4 / 2)}px;
  margin: auto;
`

export const StyledForm = styled(Form)`
  margin-top:  ${(width * 0.4 / 2)}px;
`

export const BottomMargedRow = styled(GridRow)`
  margin-bottom: 20px !important;
`