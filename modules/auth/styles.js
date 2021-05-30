import styled from 'styled-components'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { Segment, Image, Button, Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'

export const ConfirmSegment = styled(Segment.Group)`
position: relative;
display: flex !important;
width: 800px;
margin: 120px auto 0 !important;
border: 0 none !important;
padding: 40px 40px 0 !important;
background: #fff;
box-shadow: 0 0 0 3000px #fafafa !important;
`

export const InnerSegment = styled(Segment)`
margin: 0 !important;
border: 0 none !important;
padding: 0 0 40px !important;
background: #fff !important;
box-shadow: 0 0 0 transparent !important;
`

export const ButtonsSegment = styled(Segment)`
padding: 40px 0 !important;
`

export const LogoWrapper = styled(Segment)`
position: absolute !important;
top: -165px;
left: 50%;
width: 348px;
max-width: 348px;
margin: 0 0 0 -174px !important;
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
  background: #fafafa;
}
`

export const StyledForm = styled(Form)`
  margin-bottom: 15px;
`

export const LoginButton = styled(Button)`
  margin-top: 40px !important;
`

export const AutoColumn = styled(GridColumn)`
  width: auto !important;
  white-space: nowrap;

  &.right.aligned {
    margin-left: auto !important;
  }
`
