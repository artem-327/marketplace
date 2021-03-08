import styled from 'styled-components'
import { Form, Button } from 'formik-semantic-ui-fixed-validation'
import { Segment, Image, GridRow, Message } from 'semantic-ui-react'

export const width = 400

export const LoginContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 20px 0;
`

export const LoginSegment = styled(Segment)`
  position: relative;
  overflow: hidden;
  width: 500px;
  margin: 0 auto !important;
  border: 1px solid #dee2e6 !important;
  border-radius: 4px !important;
  padding: 40px 90px !important;
  box-shadow: 0 0 0 3000px #f5f7fa !important;
`

export const InstructionsDiv = styled.div`
  margin-bottom: 15px;
  text-align: justify;
  font-size: 0.9rem;
  
  &:empty {
    margin-bottom: 0 !important;
  }
`

export const LogoWrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  position: relative !important;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  max-height: 80px;
  margin: 0 !important;
  border: 0 none !important;
  padding: 11px 30px !important;
  background: #fff !important;
  box-shadow: 0 1px 0 0 #dee2e6;
  text-align: left;
`

export const LogoImage = styled(Image)`
  width: auto;
  height: 58px;
`

export const LogoIcon = styled(Image)`
  width: 100px;
  margin: 0 auto 18px;
`

export const LoginHeader = styled.div`
  position: relative;
  margin: 0;
  padding: 0 0 4px;
  text-align: center;
  text-decoration: none !important;
  font-size: 24px;
  font-weight: 500;
  line-height: 2.44;
`

export const StyledMessage = styled(Message)`
  margin: 0 0 16px !important;
  border: 0 none !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: 0 0 0 0 transparent !important;
  text-align: center !important;
  
  &.error {
    color: #f16844 !important;
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
  
  > label {
    margin-bottom: 0.5rem !important;
    font-size: 14px !important;
    letter-spacing: 0.6px;
    line-height: 1.29;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    height: 40px;
  }
`

export const LoginButton = styled(Button.Submit)`
  margin-top: 40px !important;
`

export const ToggleLabel = styled.label`
  float: right;
  margin-top: calc(-1rem + 7px);
  font-size: 12px;
  color: #2599d5;
  line-height: 1.17;
  cursor: pointer;
`

export const VersionWrapper = styled.div`
  position: relative;
  width: calc(100% + 180px);
  height: 50px;
  margin: 27px -90px -40px;
  border-top: 1px solid #dee2e6;
  background: #f8f9fb;
  text-align: center;
  font-size: 12px;
  color: #848893;
  line-height: 49px;
`
