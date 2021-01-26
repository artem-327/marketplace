import styled from 'styled-components'
import { Grid, Modal, Header, Button } from 'semantic-ui-react'

export const SelectTemplates = styled(Button)`
  width: auto !important;
  padding-left: 32px !important;
  padding-right: 31px !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #20273a !important;
  line-height: 20px !important;
  
  svg {
    width: 18px;
    height: 20px;
    margin-right: 7px;
  }
`

export const TdsHeader = styled(Modal.Header)`
  padding-left: 30px !important;
  padding-right: 30px !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #20273a !important;
`

export const TdsActions = styled(Modal.Actions)`
  background: #fff !important;

  &:after {
    content: "";
    clear: both;
    display: block;
  }
`

export const TemplateTitle = styled(Header)`
  margin-top: 0 !important;
  padding-left: 9px !important;
  padding-right: 9px !important;
  padding-bottom: 6px !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #404040 !important;
  line-height: 20px !important;
`

export const TemplateGrid = styled(Grid)`
  padding-bottom: 2em !important;
`

export const TemplateRow = styled(Grid.Row)`
  display: flex;
  flex-flow: row nowrap;
  padding: 1px 23px 1px 23px !important;
`

export const TemplateColumn = styled(Grid.Column)`
  padding-left: 0 !important;
  padding-right: 0 !important;
`

export const TemplateWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  box-sizing: border-box;
  height: 40px;
  margin: 0 !important;
  border: solid 1px #dee2e6;
  border-radius: 3px;
  padding: 10px 20px 11px 15px;
  background-color: #ffffff
`

export const TemplateApply = styled(Button)`
  float: right;
  width: auto !important;
  min-width: 0 !important;
  height: 19px !important;
  margin: 0 0 0 10px !important;
  padding: 0 !important;
  background: transparent !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #20273a !important;
  line-height: 19px;
`

export const TemplateDelete = styled(Button)`
  flex-grow: 0;
  flex-shrink: 0;
  width: 18px !important;
  min-width: 18px !important;
  height: 20px !important;
  margin: 10px 0 10px 14px !important;
  border: 0 none !important;
  padding: 0 !important;
  background: transparent !important;
  line-height: 20px;
  
  svg {
    width: 18px;
    height: 20px;
    color: #f16844;
  }
  
  
`