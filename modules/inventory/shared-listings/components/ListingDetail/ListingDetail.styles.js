import styled from 'styled-components'
import { Header, GridColumn, GridRow, Grid, Segment, Message, Button, ButtonGroup, Tab } from 'semantic-ui-react'
import { ChevronLeft, ChevronRight } from 'react-feather'
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
  margin-right: 20px;
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
  padding: 4px !important;
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