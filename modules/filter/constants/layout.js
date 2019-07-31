import styled from 'styled-components'
import { Sidebar, Accordion, Segment, GridRow, Icon, Popup, Dropdown } from 'semantic-ui-react'

const popupWidth = 400

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #fbfbfb;
  top: 105px !important;
  padding-bottom: 105px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 4;
  text-align: left;
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const FiltersContainer = styled.div`
  margin: 0 15px 0 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: bold;
  font-size: 1.1rem;
`

export const Title = styled.div`
  font-size: 18px !important;
  font-weight: bold;
  font-family: "Cabin", sans-serif !important;
  margin-top: 20px;
`

export const AccordionTitle = styled(Accordion.Title)`
  margin: 5px 0 5px 0px !important;
  font-size: 18px !important;
  font-weight: bold;
  & > i {
    margin-right: 10px;
  }
`

export const AccordionItem = styled.div`
  border-bottom: 1px solid #f0f0f0;
  // padding-left: 10px
`

export const AccordionContent = styled(Accordion.Content)`
  & > .field label {
    color: red;
  }
  span {
    font-size: 14px;
    font-family: "Cabin", sans-serif !important;
  }
  & .field {
    padding-top: 0px;
    
  }
  & > .field:last-child {
    padding-bottom: 15px;
  }
`

export const WhiteSegment = styled(Segment)`
  position: absolute !important;
  bottom: 4.57142858em;
  max-width: 100%;
  margin: -1em -1em 0 !important;
  padding: 1em 2em 2em !important;
  background-color: #ffffff !important;
`

export const GraySegment = styled(Segment)`
  background-color: #ededed !important;
`

export const RelaxedRow = styled(GridRow)`
  padding-top: 6px !important;
  padding-bottom: 0px !important;
`

export const FilterTag = styled.div`
  border: 1px solid #979797;
  height: 24px;
  font-size: 14px;
  padding: 5px 5px 5px 15px;
  margin-bottom: 5px;
  text-align: center;
  color: #979797;
  border-radius: 25px;
  cursor: pointer;
  margin-right: 10px
`

export const SavedFiltersSegment = styled(Segment)`
  padding-top: 0px !important;
  margin-top: 0px !important;
`

export const SavedFilterItem = styled.div`
  border-bottom: solid 1px #e3e3e3;
  font-weight: normal;
`

export const SavedFilterTitle = styled(AccordionTitle)`
  text-transform: uppercase;
  font-weight: normal;
  margin-bottom: 0px !important;
`

export const SavedFilterIcon = styled(Icon)`
  font-size: 22px !important;
`

export const ActionRow = styled(GridRow)`
  padding-top: 0px !important;
  margin-bottom: 15px !important;
`

export const PopupRow = styled(GridRow)`
  padding-top: 0.6rem !important;
  padding-bottom: 0.6rem !important;
`

export const WiderPopup = styled(Popup)`
  min-width: ${popupWidth}px !important;
  ::before {
    left: ${popupWidth * 0.5}px !important
  }
`

export const LessPaddedRow = styled(GridRow)`
  padding-top: 12px !important;
  padding-bottom: 12px !important;
`

export const BottomMargedDropdown = styled(Dropdown)`
  margin-bottom: 15px;
`

export const SaveFilterRow = styled(GridRow)`
  min-width: calc(100% + 2rem) !important;
  margin-left: -1rem;
  margin-right: -1rem;
  border-top: 1px solid #dedede;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  background-color: #eee;
`

export const SaveFilterTitle = styled(Title)`
  margin: 0;
`

export const SaveFilterClose = styled(Icon)`
  position: absolute;
  top: -1px;
  right: 2rem;
  margin: 0 !important;
  cursor: pointer;
`