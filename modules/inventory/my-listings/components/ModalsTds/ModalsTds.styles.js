import styled from 'styled-components'
import { Grid, Modal, Header, Button } from 'semantic-ui-react'

/**
 * @css width: auto !important;
 * @css padding-left: 32px !important;
 * @css padding-right: 31px !important;
 * @css font-size: 14px !important;
 * @css font-weight: 400 !important;
 * @css color: #20273a !important;
 * @css line-height: 20px !important;
 */
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

/**
 * @css padding-left: 30px !important;
 * @css padding-right: 30px !important;
 * @css font-size: 18px !important;
 * @css font-weight: 600 !important;
 * @css color: #20273a !important;
 */
export const TdsHeader = styled(Modal.Header)`
  padding-left: 30px !important;
  padding-right: 30px !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #20273a !important;
`

/**
 * @css background: #fff !important;
 * @css &:after { content: ""; clear: both; display: block; }
 */
export const TdsActions = styled(Modal.Actions)`
  background: #fff !important;

  &:after {
    content: "";
    clear: both;
    display: block;
  }
`

/**
 * @css margin-top: 0 !important;
 * @css padding-left: 9px !important;
 * @css padding-right: 9px !important;
 * @css padding-bottom: 6px !important;
 * @css font-size: 14px !important;
 * @css font-weight: 400 !important;
 * @css color: #404040 !important;
 * @css line-height: 20px !important;
 */
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

/**
 * @css padding-bottom: 2em !important;
 */
export const TemplateGrid = styled(Grid)`
  padding-bottom: 2em !important;
`

/**
 * @css display: flex;
 * @css flex-flow: row nowrap;
 * @css padding: 1px 23px 1px 23px !important;
 */
export const TemplateRow = styled(Grid.Row)`
  display: flex;
  flex-flow: row nowrap;
  padding: 1px 23px 1px 23px !important;
`

/**
 * @css padding-left: 0 !important;
 * @css padding-right: 0 !important;
 */
export const TemplateColumn = styled(Grid.Column)`
  padding-left: 0 !important;
  padding-right: 0 !important;
`

/**
 * @css flex-grow: 1;
 * @css flex-shrink: 1;
 * @css box-sizing: border-box;
 * @css height: 40px;
 * @css margin: 0 !important;
 * @css border: solid 1px #dee2e6;
 * @css border-radius: 3px;
 * @css padding: 10px 20px 11px 15px;
 * @css background-color: #ffffff;
 */
export const TemplateWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  box-sizing: border-box;
  height: 40px;
  margin: 0 !important;
  border: solid 1px #dee2e6;
  border-radius: 3px;
  padding: 10px 20px 11px 15px;
  background-color: #ffffff;
`

/**
 * @css float: right;
 * @css width: auto !important;
 * @css min-width: 0 !important;
 * @css height: 19px !important;
 * @css margin: 0 0 0 10px !important;
 * @css padding: 0 !important;
 * @css background: transparent !important;
 * @css font-size: 14px !important;
 * @css font-weight: 600 !important;
 * @css color: #20273a !important;
 * @css line-height: 19px;
 */
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

/**
 * @css flex-grow: 0;
 * @css flex-shrink: 0;
 * @css width: 18px !important;
 * @css min-width: 18px !important;
 * @css height: 20px !important;
 * @css margin: 10px 0 10px 14px !important;
 * @css border: 0 none !important;
 * @css padding: 0 !important;
 * @css background: transparent !important;
 * @css line-height: 20px;
 */
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