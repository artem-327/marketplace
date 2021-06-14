import styled from 'styled-components'
import { Segment, Grid, Header, Button,  GridColumn, ModalContent, Accordion, Tab, TabPane } from 'semantic-ui-react'
import { UploadCloud } from 'react-feather'
import { OrderSegment } from './components/Detail.styles'

export const ARButton = styled(Button)`
  float: right;
  width: auto !important;
  height: 40px;
  margin-left: 10px !important;
  margin-right: 0 !important;
  margin-top: 10px !important;
  padding: 10px 26px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 20px !important;
`

export const ModalBody = styled(ModalContent)`
    padding: 1.5rem !important;
`

export const TabMenu = styled(Tab)`
  .ui.pointing.secondary.menu {
    margin: 0 0 6px !important;
    box-shadow: 0 3px 0 0 #ccc !important;
  }
`

export const LotsTab = styled(TabPane)`
  margin: 0 !important;
  border: 0 none !important;
  padding: 0 !important;
`

export const Subtitle = styled(Header)`
  margin-top: 1em;
  font-weight: 400;
`

export const TableWrapper = styled(Segment)`
  padding: 1em 2em 3em !important;
`

export const CustomButton = styled(Button)`
  background-color: #ffffff !important;
  border: solid 1px #dee2e6 !important;
`

export const CustomGrid = styled(Grid)`
  input,
  textarea {
    background-color: #fdfdfd !important;
  }
`

export const Rectangle = styled.div`
  border-radius: 4px;
  border: solid 1px orange;
  background-color: #ffffff;
  margin-bottom: 15px;
  align-items: center;
  display: block;
  padding: 10px;
  font-size: 14px;
`

export const CustomDivTitle = styled.div`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #0d0d0d;
  display: flex;
`

export const CustomDivContent = styled.div`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  padding: 4px 30px;
`

export const CustomDivInTitle = styled.div`
  padding-left: 10px;
`

export const CustomSubmitButton = styled(Button)`
  background-color: #2599d5 !important;
`

export const Line = styled.div`
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
`

export const GridRowLine = styled(Grid.Row)`
  border-top: 1px solid rgba(34, 36, 38, 0.15);
`

export const GridColumnText = styled(GridColumn)`
  font-weight: bold !important;
`

export const StrongTitle = styled.strong`
  display: flex;
  align-items: center;
`

export const CreditInput = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`

export const CustomA = styled.a`
  color: #2599d5;
`

export const SpanModalText = styled.span`
  text-align: center;
`

export const AccordionTitle = styled(Accordion.Title)`
  font-size: 1.12rem;
  line-height: 1.5;

  i.chevron {
    margin-right: 1rem;
    vertical-align: center;
  }
`

export const ButtonsRow = styled(Grid.Row)`
  > .column {
    width: auto !important;
    margin-left: 0 !important;

    &:first-child {
      margin-left: auto !important;
    }
  }
`

export const UploadCloudIcon = styled(UploadCloud)`
  color: #2599d5 !important;
`

export const LotsTabs = styled(TabPane)`
  margin: 0 !important;
  border: 0 none !important;
  padding: 0 !important;
  .uploadAttachment {
    padding: 0em !important;
    font-size: 1rem !important;
  }
  .ui.table tr.active,
  .ui.table .td.active {
    background: #f8f9fb !important;
  }
`

export const DivIcon = styled.div`
  display: flex !important;
`

export const AIcon = styled.a`
  margin-left: 0.8vw;
`

export const SmallerTextColumn = styled(GridColumn)`
  .page-wrapper .segment .grid > .row > & {
    padding: 5px 25px !important;
    vertical-align: baseline;
    font-size: 12px !important;
    line-height: 20px !important;
  }
`

export const RightSpan = styled.span`
  font-weight: bold;
  float: right;
  font-size: 14px !important;
  color: #20273a;
`

export const StyledSegment = styled(OrderSegment)`
  margin: 14px 32px !important;
  padding: 0px !important;

  [class*='OrderSegment'] + & {
    margin-top: -20px !important;
  }

  + div.ui.hidden.divider {
    margin: 14px 0 0 !important;
    border: 0 none !important;
  }

  > .grid {
    margin: 0 !important;
    padding: 10px 0 !important;

    > .row {
      padding: 0 !important;

      + .row {
        margin-top: 10px !important;
      }
    }
  }
`

