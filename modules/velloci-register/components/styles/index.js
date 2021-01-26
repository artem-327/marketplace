import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

export const DivRectangleForm = styled.div`
  padding: 0px !important;
  width: 740px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  text-align: initial;
  position: relative;
  margin-bottom: 20px;
  height: auto;
`

export const DivTitleRectangleForm = styled.div`
  border-bottom: solid 1px #dee2e6;
  height: 50px;
  display: flex;
  justify-content: space-between;
`
export const DivTitleText = styled.div`
  font-weight: bold;
  padding: 16px 30px;
  height: 50px;
`

export const DivButtonsBottom = styled.div`
  overflow: auto;
  color: #ffffff;
  margin: 0 30px 30px 0;
`

export const ButtonSubmit = styled(Button)`
  float: right !important;
  background: #2599d5 !important;
  margin-left: 10px !important;
  margin-right: 0px !important;
`

export const ButtonBack = styled(Button)`
  float: right !important;
  margin-left: 10px !important;
`

export const DivSubtitleText = styled.div`
  text-align: right;
  color: #848893;
  font-size: 12px;
  padding: 16px 30px;
`

export const SpanSubtitleValue = styled.span`
  font-weight: bold;
  color: #84c225;
`
export const RightAlignedDiv = styled.div`
  text-align: right !important;
  margin: 0 30px 10px 0;
`

//SetupIndicator
export const Rectangle = styled.div`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin: 32px;
  padding: 15px 20px 15px 20px;
  display: flex;
  justify-content: space-between;
  height: 80px;
`

export const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #20273a;
  margin-bottom: 3px;
`

export const Content = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #848893;
  margin-bottom: 17px;
`

export const OvalEmpty = styled.div`
  width: 18px;
  height: 18px;
  border: solid 2px #dee2e6;
  background-color: #f8f9fb;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  border-radius: 9px;
  margin-left: 10px;
`

export const OvalFocus = styled.div`
  width: 18px;
  height: 18px;
  border: solid 2px #2599d5;
  background-color: #2599d5;
  -moz-border-radius: 9px;
  -webkit-border-radius: 9px;
  border-radius: 9px;
  box-shadow: inset 0 0 0 2px #f8f9fb;
  margin-left: 10px;
`

export const Icons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
