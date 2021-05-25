import styled from 'styled-components'
import { Sidebar, Segment, Icon, Dimmer, Form } from 'semantic-ui-react'
import { TextArea } from 'formik-semantic-ui-fixed-validation'
import { ChevronDown, ChevronUp } from 'react-feather'

export const FormCustom = styled(Form)`
  flex-grow: 0 !important;
`

export const SegmentTopSidebar = styled(Segment)`
  margin: 0 !important;
  padding: 16px 30px !important;
  height: 100%;  
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
  background-color: #ffffff !important;
  z-index: 1;
  cursor: pointer;

  svg {
    font-size: 18px;
    vertical-align: middle;
  }

  svg.title-icon {
    margin-left: 15px;
    color: #cecfd4;
  }

  svg.close-icon {
    right: 0;
    position: absolute;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

export const DivTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
`

export const DimmerStyled = styled(Dimmer)`
  height: 11vh !important; // 89vh height has Sidebar
`

export const SidebarFlex = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;
  background-color: #f8f9fb !important;
  
  &.ui.bottom.sidebar{
    height: 89vh !important;
  }
`

export const DivFlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  align-self: center;
  padding: 16px;
`

export const SegmentCustomContent = styled(Segment)`
  width: 900px;
  padding: 0 30px 10px 30px !important;
  border-radius: 4px !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
`

export const DivBottomSidebar = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  background-color: #ffffff;
`

export const DivSectionHeader = styled.div`
  margin: 30px 0 10px 0;
  padding: 5px 11px;
  font-size: 14px;
  color: #404040;
  background-color: #edeef2;
`

export const CustomerName = styled.div`
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  
  > div:first-child {
    flex-grow: 0
    flex-shrink: 1;
    overflow: hidden;
    width: auto;
    text-overflow: ellipsis;
  }
  
  > div:last-child {
    flex-grow: 0;
    flex-shrink: 0;
  }
`

export const SubrowButtons = styled.div`
  display: block;
  width: calc(100% + 10px);
  margin: 0 -5px;
  text-align: right;
`

export const ChevronDownStyled = styled(ChevronDown)`
  color: #848893;
  cursor: pointer;
`

export const ChevronUpStyled = styled(ChevronUp)`
  color: #848893;
  cursor: pointer;
`