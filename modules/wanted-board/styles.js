import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

export const UpperCaseText = styled.div`
  text-transform: uppercase;
`
import Dropzone from 'react-dropzone'
import { Sidebar, Segment, GridColumn, Icon, Grid, Modal, FormField, Header, ModalContent, Table, Button } from 'semantic-ui-react'
import { TextArea } from 'formik-semantic-ui-fixed-validation'

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;

  &.full-screen-sidebar {
    top: 0 !important;
    padding-bottom: 0px;
  }

  .field {
    font-size: 1em !important;
    line-height: 1.29 !important;
    font-weight: normal;
    > label {
      font-size: 1em !important;
      color: #404040;
      margin: 0em 0em 0.428571429em 0em !important;
    }
    > textarea,
    > .ui.input input,
    > .ui.dropdown {
      min-height: 32px;
      font-size: 1em;
      line-height: 1.29;
      padding-top: 0.714285714em;
      padding-bottom: 0.714285714em;
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
    > .ui.multiple.selection.dropdown {
      padding: 7.5px 11px;
      > a.ui.label {
        margin: 1.5px;
        padding: 3px 0.357142857em;
        box-shadow: none;
        background: none;
        border-radius: 2px;
        background-color: #edeef2;
        color: #848893;
        font-weight: normal;
      }
      > .default.text {
        margin: 3px 15px;
      }
    }
  }
  .ui.button.doc-manager {
    border-radius: 3px;
    border: solid 1px #2599d5;
    background-color: #ddf1fc;
    color: #2599d5;
    > i.icon {
      font-size: 18px;
    }
  }
  .column.product-offer-documents {
    tbody tr td:nth-child(2) {
      color: #2599d5;
    }
  }
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

export const FlexModal = styled(Modal)`
  display: flex !important;
  flex-direction: column !important;
  background-color: #ffffff !important;
  top: 80px !important;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075) !important;
  z-index: 1000 !important;
  text-align: left !important;
  font-size: 14px !important;

  &.full-screen-sidebar {
    top: 0 !important;
    padding-bottom: 0px !important;
  }

  .field {
    font-size: 1em !important;
    line-height: 1.29 !important;
    font-weight: normal !important;
    padding-top: 7px;
    > label {
      font-size: 1em !important;
      color: #404040 !important;
      margin: 0em 0em 0.428571429em 0em !important;
    }
    > textarea {
      min-height: 32px !important;
      font-size: 1em !important;
      line-height: 1.29 !important;
      border: solid 1px #dee2e6 !important;
      background-color: #fdfdfd !important;
      &.disabled {
        opacity: 1 !important;
        color: #cecfd4 !important;
      }
      > .default.text {
        margin: 0 0 0 0.64285714em !important;
      }
      padding: 10px !important;
      border-radius: 4px !important;
      width: -webkit-fill-available !important;
      // firefox fix
      &.fluid {
        width: 100%;
      }
    }
    > .ui.input input,
    > .ui.dropdown {
      min-height: 32px !important;
      font-size: 1em !important;
      line-height: 1.29 !important;
      padding-top: 0.714285714em !important;
      padding-bottom: 0.714285714em !important;
      border: solid 1px #dee2e6 !important;
      background-color: #fdfdfd !important;
      &.disabled {
        opacity: 1 !important;
        color: #cecfd4 !important;
      }
      > .default.text {
        margin: 0 0 0 0.64285714em !important;
      }
    }
    > .ui.multiple.selection.dropdown {
      padding: 7.5px 11px !important;
      > a.ui.label {
        margin: 1.5px !important;
        padding: 3px 0.357142857em !important;
        box-shadow: none !important;
        background: none !important;
        border-radius: 2px !important;
        background-color: #edeef2 !important;
        color: #848893 !important;
        font-weight: normal !important;
      }
      > .default.text {
        margin: 3px 15px !important;
      }
    }
  }
  .ui.button.doc-manager {
    border-radius: 3px !important;
    border: solid 1px #2599d5 !important;
    background-color: #ddf1fc !important;
    color: #2599d5 !important;
    > i.icon {
      font-size: 18px !important;
    }
  }
  .column.product-offer-documents {
    tbody tr td:nth-child(2) {
      color: #2599d5 !important;
    }
  }
`

export const FlexTabs = styled.div`
  height: 100%;
  margin: 0;
  text-align: left;
  padding: 0;
  font-weight: 400;
  font-size: 1.1rem;
  > .tab-menu .ui.menu {
    padding: 0 2.142857143em !important;
    border-bottom: none !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
    > .item {
      font-weight: 500;
      color: #848893;
    }
    > .active.item {
      color: #20273a;
      border-bottom-width: 2px;
    }
  }
  > .tab-menu,
  > .tab-menu > .tab {
    height: 100%;
  }
  > .tab-menu > .tab {
    padding: 0 2.142857143em !important;
    > .ui.grid {
      margin: 1.607142857em -0.714285714em;
      > .row,
      > .ui.grid > .row {
        padding: 0.535714286em 0;
        > .column {
          padding: 0 0.714285714em;
          > .field {
            padding-top: 0 !important;
          }
        }
      }
    }
  }
  .grid.stretched[class*='StretchedGrid'] {
    height: auto !important;
  }
`

export const FlexModalContent = styled(Modal.Content)`
  padding: 0 !important;
`

export const TopMargedColumn = styled(GridColumn)`
  margin-top: 6px !important;
`

export const GraySegment = styled(Segment)`
  border-radius: 0.285714286em !important;
  border: solid 1px #dee2e6 !important;
  background-color: #f8f9fb !important;
  margin: 0.5em 0 0 0 !important;
  padding: 0 1em !important;
  box-shadow: unset !important;
  > .ui.grid {
    margin: 0.535714286em -1em;
    > .row {
      padding: 0.535714286em 0;
      > .column {
        padding: 0 1em;
      }
    }
  }
`

export const BottomButtons = styled.div`
  position: relative;
  overflow: visible;
  margin: 0;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  padding: 0.714285714em 1.785714286em;
  text-align: right;

  .ui.button {
    font-size: 1em;
    margin: 0 0.357142857em;
    padding: 9px 18px 9px;

    border: solid 1px #dee2e6;
    background-color: #ffffff;
    color: #20273a;

    &:hover {
      background-color: #f8f9fb;
    }

    &.disabled {
      background-color: #ffffff;
      color: #cecfd4;
    }

    &.large.primary {
      border: none;
      background-color: #2599d5;
      color: #ffffff;

      &:hover {
        background-color: #188ec9;
      }

      &.disabled {
        background-color: #bde0f2;
        color: #ffffff;
      }
    }
  }
`

export const HighSegment = styled(Segment)`
  height: 100%;
  padding: 0 !important;

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
export const DivIcon = styled.div`
  display: block;
  height: 20px;
  position: relative;
`

export const CloceIcon = styled(Icon)`
  position: absolute;
  top: -10px;
  right: -10px;
`

export const InputWrapper = styled.div`
  > .field-label {
    //margin: 0em 0em 0.428571429em 0em;
    font-size: 1em;
    line-height: 1.29;
    color: #404040;
  }
  & div {
    position: relative;
    > .field {
      margin: 0 !important;
      .ui.input input {
        padding-left: 47px;
        background-color: #fdfdfd;
      }
    }
    > .ui.label {
      //padding: 0.5em 0.7142857em;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      text-align: center;
      color: #848893;
      border-radius: 2px;
      background-color: #edeef2;
      position: absolute;
      top: 0.85em;
      left: 0.3em;
    }
  }
`

export const InputLabeledWrapper = styled.div`
  > .field-label {
    // margin: 0em 0em 0.428571429em 0em;
    font-size: 1em;
    line-height: 1.29;
    color: #404040;
  }
  & .field {
    .ui.input {
      > input {
        border-radius: 3px 0 0 3px;
        width: 50% !important;
      }
      > div.ui.label {
        font-weight: normal;
        border-radius: 0 3px 3px 0;
        border: solid 1px #dee2e6;
        background-color: #f8f9fb;
        color: #848893;
      }
    }
  }
`

export const QuantityWrapper = styled.div`
  > .field-label {
    //margin: 0em 0em 0.428571429em 0em;
    font-size: 1em;
    line-height: 1.29;
    color: #404040;
  }
  & div {
    position: relative;
    > .field {
      margin: 0 !important;
      .ui.input input {
        padding-right: 47px;
        background-color: #fdfdfd;
      }
    }
    > .sideButtons {
      position: absolute;
      width: 40px;
      height: 40px;
      right: 0;
      top: 0;
      .ui.button {
        position: absolute;
        margin: 0;
        background-color: #f8f9fb;
        border: solid 1px #dee2e6;
        font-family: feathericon;
        text-align: center;
        color: #848893;
        min-width: unset;
        min-height: unset;
        height: unset;
        line-height: 14px;
        border-radius: 0 3px 0 0;
        width: 40px;

        &.buttonPlus {
          padding: 3px 0 2px 0;
        }
        &.buttonMinus {
          padding: 2px 0 2px 0;
          top: 20px;
        }
      }
    }
  }
`

export const SmallGrid = styled(Grid)`
  & {
    margin: 0 -0.357142857em !important;
    > .row {
      padding: 0.535714286em 0 !important;
      > .column {
        padding: 0 0.357142857em !important;
      }
    }
  }
`

export const CustomLabel = styled.div`
  margin: 0em 0em 0.428571429em 0em;
  font-size: 1em;
  line-height: 1.29;
  color: #404040;
`

/**
 * @css padding-right: 15px;
 */
export const DivIconOptions = styled.div`
  padding-right: 15px;
`

export const HeaderOptions = styled(Header)`
  display: flex;
`

export const GridColumnOptionalInformation = styled(GridColumn)`
  cursor: pointer;
  padding: 25px 10px 7px 10px !important;
  color: #404040 !important;
  font-size: 14px;
`

export const FormFieldZeroPadding = styled(FormField)`
  padding: 0px !important;
`

export const TextAreaField = styled(TextArea)`
  padding-left: 10px !important;
  border-radius: 4px !important;
  width: -webkit-fill-available !important;
`

export const SettingsGrid = styled(Grid)`
  flex-direction: column !important;
  margin-top: 0;
  margin-bottom: 0 !important;
  padding-bottom: 1em !important;

  > .row {
    flex-direction: column !important;
    flex-grow: 1 !important;
    flex-shrink: 1 !important;
    height: calc(100% + 1px) !important;
    padding-bottom: 0 !important;

    > .column {
      flex-grow: 1 !important;
      flex-shrink: 1 !important;
      height: 100%;
      padding-bottom: 0 !important;

      > [class*='FixyWrapper'] {
        height: 100%;

        > .segment {
          height: 100%;
        }
      }
    }
  }
`

export const CustomGridColumn = styled(Grid.Column)`
  > form + .ui.segment {
    margin-top: 0;
  }
  padding-top: '10px';
  padding-bottom: '10px';
`

export const StyledModal = styled(ModalContent)`
  height: 500px;
  overflow: auto;
`

export const StyledHeader = styled(Header)`
  margin-bottom: 0;
`

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`

export const DivSeeOffer = styled.div`
  width: 400px;
`

export const MapTable = styled(Table)`
  width: 100%;
  max-width: 100%;
`

export const SmallerTableCell = styled(Table.Cell)`
  overflow-wrap: 'break-word';
  font-size: 0.8em;

  > div {
    overflow: hidden;
    overflow-wrap: break-word;
  }

  &.cols1 {
    width: calc(
      88vw - 404px
    ); /* 404 = 44px for wrapper padding and border; 130px for first column; 230px for last column */
    max-width: 537px;

    > div {
      width: calc((88vw - 404px) - 25px);
      max-width: 513px;
    }
  }

  &.cols2 {
    width: calc((88vw - 404px) / 2);
    max-width: calc(537px / 2);

    > div {
      width: calc(((88vw - 404px) / 2) - 25px);
      max-width: calc((537px / 2) - 24px);
    }
  }

  &.cols3 {
    width: calc((88vw - 404px) / 3);
    max-width: calc(537px / 3);

    > div {
      width: calc(((88vw - 404px) / 3) - 25px);
      max-width: calc((537px / 3) - 24px);
    }
  }

  &.cols4 {
    width: calc((88vw - 404px) / 3);
    max-width: calc(537px / 3);

    > div {
      width: calc(((88vw - 404px) / 3) - 25px);
      max-width: calc((537px / 3) - 24px);
    }
  }

  @media (max-width: 1919px) {
    max-width: 487px;

    &.cols1 {
      > div {
        max-width: 463px;
      }
    }

    &.cols2 {
      max-width: calc(487px / 2);

      > div {
        max-width: calc((487px / 2) - 24px);
      }
    }

    &.cols3 {
      max-width: calc(487px / 3);

      > div {
        max-width: calc((487px / 3) - 24px);
      }
    }

    &.cols4 {
      max-width: calc(487px / 3);

      > div {
        max-width: calc((487px / 3) - 24px);
      }
    }
  }

  @media (max-width: 1199px) {
    max-width: 447px;

    &.cols1 {
      > div {
        max-width: 423px;
      }
    }

    &.cols2 {
      max-width: calc(447px / 2);

      > div {
        max-width: calc((447px / 2) - 24px);
      }
    }

    &.cols3 {
      max-width: calc(447px / 3);

      > div {
        max-width: calc((447px / 3) - 24px);
      }
    }

    &.cols4 {
      max-width: calc(447px / 3);

      > div {
        max-width: calc((447px / 3) - 24px);
      }
    }
  }

  @media (max-width: 767px) {
    &,
    &.cols1,
    &.cols2,
    &.cols3,
    &.cols4 {
      width: 100%;
      max-width: 100%;

      > div {
        width: 100%;
        max-width: 100%;
      }
    }
  }
`

export const StyledButton = styled(Button)`
  min-width: 200px !important;
`

export const SmallerTableCellSimple = styled(Table.Cell)`
  font-size: 0.8em;
`

export const StyledDropzone = styled(Dropzone)`
  display: flex;
  border: 2px dashed #2599d5;
  width: 300px;
  height: 300px;
  cursor: pointer;
  &:hover {
    border: 2px dashed #2599d5;
    background-color: #eef7fc;
  }
  ${props =>
    props.uploaded &&
    `
      border: 2px dashed #4cd137;
      background-color: #f1fcef;
    `
  }
  ${props =>
    props.error &&
    `
      border: 2px dashed #f44336;
      background-color: #ffebee;
    `
  }
`

export const StyledSegment = styled(Segment)`
  margin: 0 !important;
  background: transparent !important;
  border: none !important;
`


export const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 5px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }

  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    color: #848893;
    display: flex;
    align-items: center;

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

    &.secondary {
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

export const CustomSearchNameTags = styled.div`
  .column {
    width: 370px;
    padding-top: 0 !important;
  }
`

export const ControlPanel = styled.div`
  padding: 5px 0;
  .ui.primary.button {
    background-color: #2599d5;
  }
`

export const TopButtons = styled.div`
  padding-top: 9px;
  float: right;
`

export const DivRow = styled.div`
  display: flex !important;

  > div {
    flex-grow: 0;
    flex-shrink: 0;
  }

  > span {
    flex-grow: 1;
    flex-shrink: 1;
  }
`

export const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
  
  &:hover {
    font-weight: bold;
    color: #2599d5;
  }
`

export const RowDropdown = styled(Dropdown)`
  display: block !important;
  height: 100% !important;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
`

export const RowDropdownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 8px 2px -4px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }
`
export const SegmentHigh = styled(Segment)`
  margin: 0 0 1px 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  border: unset !important;
  display: flex;
  flex-direction: row;

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
export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 15px 20px;
  }

  > .row {
    padding: 7.5px 0 !important;
    .column {
      padding: 0 10px !important;
    }
  }

  .field {
    .ui.checkbox {
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
  }
`

export const DivPopupTableHandler = styled.div`
  margin: 15px 51px 0;
`