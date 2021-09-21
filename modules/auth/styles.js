import styled from 'styled-components'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { Segment, Image, Button, Input, GridRow, GridColumn, Header } from 'semantic-ui-react'

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

export const DivCenteredWrapper = styled.div`
  align-items: center;
  padding: 30px;
`

export const DivButtons = styled.div`
  margin: 8px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const DivButtonColumn = styled.div`
  padding: 0 20px;
  width: 100%;
`

export const DivDescription = styled.div`
  text-align: center;
  color: #848893;
  line-height: 1.71;
  margin: -10px 10px 40px;
`

export const DivOptions = styled.div`
  padding: 0 50px;
  margin-bottom: 40px; 
`

export const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const InputCode = styled(Input)`
  &.ui.input {
    min-width: 50px;
    width: 50px;
    margin: 0 7px;

    > input  {
      text-align: center;
    }
  }
`


