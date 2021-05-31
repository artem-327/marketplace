
import styled from 'styled-components'
import {
  Grid,
  Segment,
  Accordion,
  AccordionContent,
  GridColumn,
  Table,
  List,
  Label,
  Button,
  Icon,
  Divider,
  Header,
  Popup,
  GridRow,
  Dropdown,
  Input,
  Dimmer,
  Modal
} from 'semantic-ui-react'
import { ArrowLeft, ChevronDown, DownloadCloud, PlusCircle, UploadCloud, Link2 } from 'react-feather'

export const OrderSegment = styled(Segment)`
width: calc(100% - 64px);
margin-left: 32px !important;
margin-bottom: 30px !important;

> .grid {
  padding: 0;

  > .row {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  > .column,
  > .row > .column {
    padding: 20px !important;
  }
}

h1.header {
  height: 17px;
  margin: 0 0 10px;
  padding: 0;
  font-size: 14px !important;
  font-weight: 700 !important;
  color: #20273a;
  line-height: 1.2142857;

  ~ a {
    display: inline-block;
    height: 32px;
    border: 1px solid #2599d5;
    border-radius: 3px;
    padding: 5px 14px;
    background-color: #ddf1fc;
    font-size: 13px !important;
    font-weight: 500;
    color: #2599d5;
    line-height: 1.5384615;

    svg {
      width: 18px;
      height: 20px;
      margin-right: 10px;
      vertical-align: top;
      color: inherit;
    }
  }
}
`

export const OrderList = styled(List)`
&.horizontal.divided:not(.celled) {
  display: flex !important;
  flex-flow: row;
  justify-content: flex-end;

  > .item:nth-child(n) {
    // nth-child to have stronger path
    flex-grow: 1;
    max-width: 150px;
    border-left: 1px solid rgba(34, 36, 38, 0.15) !important;
    padding: 13px 15px !important;

    .header {
      margin: 0;
      padding: 0 0 3px;
      font-size: 12px;
      font-weight: 400;
      color: #848893;
      line-height: 1.1666667;
    }

    .description {
      font-size: 14px;
      font-weight: 700;
      color: #20273a;
      line-height: 1.2142857;

      &.green {
        color: #84c225;
      }

      &.red {
        color: #f16844;
      }
    }
  }
}
`

export const OrderAccordion = styled(Accordion)`
box-shadow: 0 0 0 0 transparent !important;
background: transparent !important;

> .title {
  border: solid 1px #dee2e6 !important;
  border-radius: 4px;
  background-color: #f8f9fb !important;

  &.active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

> .content {
  border: 1px solid #dee2e6;
  border-top: 0 none !important;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 15px 1em !important;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  .uploadAttachment {
    display: contents !important;
  }
  + .title {
    margin-top: 10px !important;
  }

  .table-responsive {
    .ui.table {
      width: calc(100% - 32px);
      margin: 16px;
      border: 0 none;

      th.p-0,
      td.p-0 {
        width: 0 !important;
        padding: 0 !important;
      }
      button.ui.fluid.button {
        width: max-content;
      }
      span.product-name {
        font-weight: 500;
      }
    }
  }
}
`

export const AccordionTitle = styled(Accordion.Title)`
padding-left: 9px !important;
text-transform: uppercase;
font-size: 1rem !important;
color: #20273a !important;
line-height: 1.9285714;

svg {
  transform: rotate(-90deg);
  color: #2599d5 !important;
}

&.active {
  color: #20273a !important;

  svg {
    transform: rotate(0deg);
    color: #2599d5 !important;
  }
}
`

export const Chevron = styled(ChevronDown)`
width: 20px;
height: 20px;
margin: 3px 6px 4px;
vertical-align: top;
font-size: 20px;
color: #2599d5 !important;
`

export const GridData = styled(Grid)`
padding-top: 1em !important;
padding-bottom: 1em !important;
> .column:not(.row),
> .row > .column,
&.column > .column:not(.row),
&.column > .row > .column {
  &[class*='key'] {
    width: 181px !important;

    + * {
      width: calc(100% - 211px) !important;
    }
  }
}
`

export const GridDataColumn = styled(GridColumn)`
padding-top: 10px !important;
padding-bottom: 10px !important;
font-size: 14px !important;
line-height: 1.4285714 !important;

&.key {
  padding-left: 30px !important;
  padding-right: 0 !important;
  font-size: 14px;
  font-weight: 400;
  color: #848893;
  line-height: 2.86;
}
`

export const StyledTable = styled(Table)`
width: 100% !important;
margin: -10px 0 !important;
padding: 0 !important;

thead,
tbody,
tfoot {
  tr {
    th,
    td {
      border: 0 none !important;
      padding: 10px 0 10px 30px !important;
      font-size: 14px !important;
      font-weight: 400 !important;
      color: #848893 !important;
      line-height: 1.4285714 !important;

      &:first-child {
        padding-left: 16px !important;
      }

      &:last-child {
        padding-right: 16px !important;
        color: #20273a !important;
      }
    }
  }
}
`

export const TableRowData = styled(Table.Row)`
padding-top: 0.75em !important;
padding-bottom: 0.75em !important;
font-size: 1.14285714rem;
line-height: 1.125;

strong {
  padding-left: 0;
  padding-right: 0;
}
`

export const DocumentsDropdown = styled(Dropdown)`
z-index: 601 !important;
margin-left: 16px;
`

export const GridDataColumnTrackingID = styled(GridDataColumn)`
display: flex !important;
`

export const CustomInput = styled(Input)`
max-width: 70% !important;
margin-right: 10px !important;
`

export const CustomButton = styled(Button)`
background-color: #2599d5 !important;
color: #ffffff !important;
`

export const PlusIcon = styled(PlusCircle)`
margin-right: 5px;
vertical-align: middle;
`

export const CustomA = styled.a`
cursor: pointer;
text-decoration-line: underline;
text-decoration-style: dashed;
`

export const TopRow = styled.div`
margin: 0 32px;
padding: 20px 0 50px 0;
vertical-align: middle;
display: block;

> a {
  float: left;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  color: #20273a;
  font-size: 14px !important;
  font-weight: 500;
  line-height: 1.43;
  padding: 9px 17px 11px 17px;
  margin-right: 10px;

  > svg {
    width: 18px;
    height: 20px;
    color: #20273a;
    margin-right: 9px;
    vertical-align: middle;
  }
}

> div.field {
  float: right;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;

  > div {
    padding: 12px 18px;
  }

  > div:first-child {
    color: #20273a;
  }
}
`

export const StyledModal = styled(Modal)`
> .header {
  padding: 21px 30px !important;
  font-size: 14px !important;
}

> .content {
  padding: 30px !important;
}

> .actions {
  background-color: #ffffff !important;
  padding: 10px 5px !important;
  button {
    margin: 0 5px;
    height: 40px;
  }
}
`

export const DivIcon = styled.div`
display: flex !important;
`

export const AIcon = styled.a`
margin-left: 0.8vw;
`

export const UploadCloudIcon = styled(UploadCloud)`
color: #2599d5 !important;
`

export const StyledHeader = styled.span`
color: #2599d5;
`

export const CustomDivAddDocument = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
