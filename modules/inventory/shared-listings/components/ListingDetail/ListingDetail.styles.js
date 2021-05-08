import styled from 'styled-components'
import { Header, GridColumn, GridRow, Grid, Segment, Message, Button, ButtonGroup, Tab, Input } from 'semantic-ui-react'
import { ChevronLeft, ChevronRight, FileText, Download } from 'react-feather'
//Components
import BasicButton from '../../../../../components/buttons/BasicButton'
//Styles
import { SegmentGroupHeader } from '../../../../my-network/components/DetailRow/DetailRow.style'

export const DivDetailWrapper = styled.div`
  margin: -9px -10px;
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;

    > .row {
      padding: 16px 0;
      margin: 0;

      > .column {
        padding: 0 5px;
      }
    }
  }
`

export const GridRowButton = styled(GridRow)`
  &.row {
    border-top: solid 1px #dee2e6;
    text-align: right;
    padding: 10px 0 !important;
  }
`

export const DivRectangle = styled.div`
  width: 150px;
  height: 90px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DivName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #20273a;
`

export const DivAddress = styled.div`
  font-size: 14px;
  color: #848893;
`

export const DivButtons = styled.div`
  color: #20273a;
  font-size: 14px;
  padding-top: 8px;
  display: flex;
`

export const BasicButtonCustom = styled(BasicButton)`
  border-radius: 20px !important;
  margin-left: 0px !important;
`

export const DivMail = styled.div`
  padding-right: 6px;
`

export const DivTextButton = styled.div`
  display: flex;
  justify-content: center;
`

export const UpperCaseText = styled.div`
  text-transform: uppercase;
`

export const TabPane = styled(Tab.Pane)`
  display: contents !important;
  width: 100% !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: 0 !important;
  border: 0 !important;
  background-color: #ffffff;
`

export const SegmentGroupTab = styled(SegmentGroupHeader)`
  margin-top: 15px !important;
`

export const GridColumnTitleSection = styled(Grid.Column)`
  background-color: #edeef2 !important;
  color: #404040 !important;
  padding: 5px 9px !important;
`

export const GridRowTabField = styled(Grid.Row)`
  border-bottom: solid 1px #dee2e6 !important;
  padding: 8px 0px !important;
`

export const GridColumnTabFieldValue = styled(Grid.Column)`
  color: #20273a !important;
`

export const ChevronLeftStyled = styled(ChevronLeft)`
  position: absolute;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  border-radius: 12px;
  margin: -12px;
  left: 0;
  top: 32px;
  color: #cecfd4;
  padding: 2.5px;
  ${props => (props.clickable === 'true' ? 'cursor: pointer; color: #20273a;' : '')}
`

export const ChevronRightStyled = styled(ChevronRight)`
  position: absolute;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  border-radius: 12px;
  margin: -12px;
  right: 0;
  top: 32px;
  color: #cecfd4;
  padding: 2.5px;
  ${props => (props.clickable === 'true' ? 'cursor: pointer; color: #20273a;' : '')}
`

export const SegmentDetailRow = styled(Segment)`
  padding: 0px 10px 0px 10px !important;
  min-width: 50% !important;
`

export const DivTableWrapper = styled.div`
  padding: 0px 15px;
`

export const GridStyledTds = styled(Grid)`
  &.ui.grid {
    text-align: left;
    margin: 0;
    padding: 0;

    ${props => (props.bordered === 'true' ? 'border-radius: 4px; border: solid 1px #dee2e6;' : '')}

    background-color: #ffffff;

    > .row {
      background-color: rgba(240, 240, 240, 0);
      padding: 10px 0;
      margin: 0;

      > .column {
        padding: 0 12px;
      }
    }

    > .row:not(:last-child) {
      ${props => (props.bordered === 'true' ? 'border-bottom: solid 1px #dee2e6;' : '')}
    }
  }
`

export const DivTdsTableHeader = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #848893;
  text-transform: uppercase;
`

export const DivTdsPropertyText = styled.div`
  font-weight: 500;
  color: #20273a;
`

export const DivNormalText = styled.div`
  color: #20273a;
`

export const GridColumnCustom = styled(GridColumn)`
  &.column {
    ${props => (props.value ? props.value : '')}
  }
`

export const GridStyledNotes = styled(Grid)`
  &.ui.grid {
    text-align: left;
    margin: 0;
    padding: 0;
    background-color: #ffffff;

    > .row {
      background-color: #ffffff;
    }
  }
`

export const GridRowNotesLabel = styled(GridRow)`
  &.row {
    padding: 5px 0 0px !important;
    margin: 0 !important;
  }
`

export const GridColumnNotesLabel = styled(GridColumn)`
  &.column {
    padding: 0 !important;
  }
`

export const GridRowNotesContent = styled(GridRow)`
  &.row {
    border-radius: 3px;
    border: solid 1px #dee2e6;
    padding: 9px 0 !important;
    margin: 3px 0 5px !important;
  }
`

export const GridColumnNotesContent = styled(GridColumn)`
  &.column {
    padding: 0 19px !important;
  }
`

export const GridStyledDocuments = styled(Grid)`
  &.ui.grid {
    text-align: left;
    margin: 0;
    padding: 0;
    background-color: #ffffff;

    > .row {
      padding: 10px 0;
      margin: 2px 0;
      border-radius: 3px;
      border: solid 1px #dee2e6;
      background-color: #f8f9fb;

      > .column {
        padding: 0 19px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
`

export const DivCentered = styled.div`
  margin: auto 0 auto 0;
`

export const IconFileText = styled(FileText)`
  color: #20273a;
  margin: 2px 6px 0 0;
`

export const DivDocumentsColumn = styled.div`
  padding: 0 10px;
  ${props => (props.value ? props.value : '')}
`

export const IconDownload = styled(Download)`
  color: #2599d5;
  margin: 2px 0 0 10px;
  cursor: pointer;
`

export const DivFlexRow = styled.div`
  display: flex;
  flex-flow: row;
`

export const DivGreyHeader = styled.div`
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: normal;
  color: #848893;
`

export const DivSdsProductName = styled.div`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  padding: 12px 15px;
  margin: 10px -5px 0;
`

export const DivBoldText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #20273a;
`

export const TabDetailRow = styled(Tab)`
  .ui.secondary.menu:not(.vertical) {
    padding-left: 25px !important;
    margin: -15px -15px 10px -15px !important;
    border-bottom: solid 1px #dee2e6 !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    .item.active {
      border-color: #dee2e6 !important;
    }
  }
`

export const GridRowTab = styled(Grid.Row)`
  padding-bottom: 30px !important;
`

export const InputMarkup = styled(Input)`
  &.ui.fluid.input > input {
    background: #fdfdfd !important;
    height: 40px;
  }
`
