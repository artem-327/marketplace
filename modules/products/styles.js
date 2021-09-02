import styled from 'styled-components'
import { FileText, Paperclip } from 'react-feather'
import {
    Menu,
    GridRow,
    GridColumn,
    Segment,
    Icon,
    Sidebar,
    Modal,
    Grid,
    Checkbox,
    Dimmer
} from 'semantic-ui-react'
import TextareaAutosize from 'react-autosize-textarea'
import { Formik } from 'formik'


export const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`
export const DivColumn = styled.div`
  margin-right: 9px !important;
`
export const Circle = styled.div`
  width: 14px;
  height: 14px;
  margin: 3px;
  border-radius: 7px;
  background-color: #84c225;
  &.red {
    background-color: #f16844;
  }
`
export const FileTextIcon = styled(FileText)`
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #848893;
  line-height: 20px;
`
export const SegmentCustomContent = styled(Segment)`
  padding-top: 0px !important;
  width: 900px !important;
  padding: 30px !important;
`
export const DivTitleColumn = styled.div`
  color: #000000de;
  font-size: 14px;
`
export const PaperclipIcon = styled(Paperclip)`
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
`
export const DivBrowseFile = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  color: #20273a;
  padding: 6px;
`
export const GridColumnMixtures = styled(GridColumn)`
  padding: 3px 10px !important;
`
export const GridColumnLabelTextArea = styled(GridColumn)`
  padding: 3px 0px !important;
  color: #000000de !important;
  font-size: 14px;
`
export const GridColumnForm = styled(GridColumn)`
  padding: 6px 14px !important;
  ${({ color }) => (color ? color : null)};
`
export const DivHeader = styled.div`
  background-color: #edeef2;
  padding: 5px 10px;
  color: #404040;
  font-size: 14px;
`
export const GridRowCustom = styled(GridRow)`
  padding: 0px !important;
`
export const DivIconChevronDown = styled.div`
  align-self: center;
  position: absolute;
  right: 20px;
  cursor: pointer;
`
export const DivBottomSidebar = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  background-color: #ffffff;
`
export const MenuCustom = styled(Menu)`
  padding-left: 30px !important;
  margin: 0 !important;
`
export const MyContainer = styled.div`
  margin: 0 15px 0 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: bold;
  font-size: 1.1rem;
`
export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff !important;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  padding-bottom: 0px !important;

  &.ui.visible.bottom.overlay.sidebar {
    height: 87vh !important;
  }
  .field {
    font-size: 1em !important;
    line-height: 1.29 !important;
    font-weight: normal;
    > label {
      font-size: 1em !important;
      color: #404040;
    }
    > textarea,
    > .ui.input input,
    > .ui.dropdown {
      min-height: 32px;
      font-size: 1em;
      line-height: 1.29;
      border: solid 1px #dee2e6;
      background-color: #fdfdfd;
      &.disabled {
        opacity: 1;
        color: #cecfd4;
      }
      > .default.text {
        margin: 0 0 0 0.64285714em;
      }
    }
  }
`
export const FlexTabs = styled.div`
  height: 100%;
  margin: 0;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: 400;
  font-size: 1.1rem;

  > .tab-menu,
  > .tab-menu > .tab {
    height: 100%;
  }
`
export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  align-self: center;
`
export const GraySegment = styled(Segment)`
  background-color: #ededed !important;
`
export const HighSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  z-index: 1;
`
export const CustomTextarea = styled(TextareaAutosize)`
  resize: vertical !important;
  background-color: #fdfdfd !important;
`
export const DivIcon = styled.div`
  margin-right: 8px;
`
export const IconStyled = styled(Icon)` 
  &.small.icon {
    margin: 0;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    color: #848893;
    
    &.delete {
      color: #f16844;
    }
  }
`
export const DivCircleIcon = styled.div`
  margin: 10.5px auto 10.5px -3px;
  width: 18px;
  height: 18px; 
  border-radius: 9px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  cursor: pointer;
`
export const DivReadOnlyValues = styled.div`
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #edeef2;
  font-size: 14px;
  padding: 9.5px 15px;
  line-height: 1.29;
  color: #848893;
`
export const CustomForm = styled(Formik)`
  flex-grow: 0 !important;
`
export const StyledModalContent = styled(Modal.Content)`
  max-height: calc(80vh - 10em);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px;
`
export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: -7.5px -10px;

    > div.row {
      padding: 7.5px 0;

      > div.column {
        padding: 0 10px;
      }
    }
  }
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
export const GridDropdownOptions = styled(Grid)`
  &.ui.grid {
    margin: 0;

    > div.row {
      padding: 0;

      > div.column {
        padding: 0 5px;
      }
    }
  }
`
export const CheckboxStyled = styled(Checkbox)`
  margin: auto 0;
`

export const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px;
  flex-wrap: wrap;
  
  > div {
    align-items: top;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .column {
    margin: 5px;
  }
  
  input, .ui.dropdown {
    height: 40px;
  }
  
  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #848893;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #f8f9fb;
      color: #20273a;
    }
    &:active {
      background-color: #edeef2;
      color: #20273a;
    }

    svg {
      width: 18px;
      height: 20px;
      margin-right: 10px;
      vertical-align: top;
      color: inherit;
    }

    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }

    &.primary {
      box-shadow: none;
      border: none;
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }
`
