import styled from 'styled-components'
import { Form, Button } from 'formik-semantic-ui-fixed-validation'
import { Segment, Image, GridRow } from 'semantic-ui-react'

export const width = 400

export const LoginSegment = styled(Segment)`
  position: relative;
  width: 400px;
  margin: 100px auto 0 !important;
  border: 0 none !important;
  padding: 40px !important;
  box-shadow: 0 0 0 3000px #1b3454 !important;
`

export const LogoWrapper = styled(Segment)`
  position: absolute !important;
  top: -125px;
  left: 26px;
  right: 26px;
  width: 348px;
  max-width: 348px;
  margin: 0 !important;
  border: 0 none !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: 0 0 0 0 transparent !important;
`

export const LogoImage = styled(Image)`
  width: 100%;
  height: auto;
`

export const LoginHeader = styled.div`
  position: relative;
  margin: -31px 0 1.8571429rem -40px;
  padding: 0 0 4px 40px;
  text-decoration: none !important;
  font-size: 1.7857143em;
  font-weight: 400;
  line-height: 2.44;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 103px;
    height: 4px;
    background: #1b3454;
  }
`

export const StyledForm = styled(Form)`
  margin-bottom: 15px;
`

export const BottomMargedRow = styled(GridRow)`
  margin-bottom: 1.8571429rem !important;
`

export const LoginField = styled(Form.Field)`
  margin-bottom: 1rem !important;
`

export const LoginButton = styled(Button.Submit)`
  margin-top: 40px !important;
`
