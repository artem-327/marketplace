import styled from 'styled-components'
import { Segment, Form, Sidebar, Dimmer, Grid, GridColumn } from 'semantic-ui-react'
import TextareaAutosize from 'react-autosize-textarea'

export const FormCustom = styled(Form)`
  flex-grow: 0 !important;
`

export const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
`


export const SidebarFlex = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;
  background-color: #ffffff !important;
  
  &.ui.bottom.sidebar{
    height: 87vh !important;
  }
`

export const CustomHighSegment = styled(Segment)`
  margin: 0 !important;
  padding: 22px 30px 14px 30px !important;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
  background-color: #ffffff !important;
  z-index: 1;
  cursor: pointer;
`

export const DivTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
`

export const DivHeader = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;
  color: #20273a;
`

export const DivFlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  align-self: center;
  padding: 0 30px 30px !important;
`

export const DivBottomSidebar = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  background-color: #ffffff;
`

export const DimmerSidebarOpened = styled(Dimmer)`
  height: 13vh !important; // 87vh height has Sidebar
`

export const SegmentCustomContent = styled(Segment)`
  padding-top: 0px !important;
  margin-bottom: auto !important;
  width: 900px !important;
  padding: 25px 30px !important;
  background-color: #ffffff !important;
`

export const DivHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  background-color: #edeef2;
  height: 30px;
  padding: 0 11px;
  margin: 20px 0 30px;
`
export const DivHeaderCaption = styled.div`
  font-size: 14px;
  color: #404040;
  margin: auto 0;
`
export const CasGridStyled = styled(Grid)`
  &.ui.grid {
    margin: -27.5px -10px 2.5px;

    > div.row {
      padding: 7.5px 0;

      > div.column {
        padding: 0 10px;
      }
    }
  }
`

export const GridColumnLabelTextArea = styled(GridColumn)`
  padding: 3px 0px !important;
  color: #000000de !important;
  font-size: 14px;
`

export const CustomTextarea = styled(TextareaAutosize)`
  resize: vertical !important;
  background-color: #fdfdfd !important;
`
