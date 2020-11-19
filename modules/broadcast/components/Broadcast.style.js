import { Grid, GridRow, Form, Dropdown, Input, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { Folder } from 'react-feather'

const COLORS = {
  root: '#edeef2',
  region: 'rgba(240, 240, 240, 0)',
  state: 'rgba(240, 240, 240, 0)',
  company: 'rgba(240, 240, 240, 0)'
}

const FONT_WEIGHT = {
  root: 'bold',
  region: 'bold',
  state: 'normal',
  company: 'normal'
}

const BORDER_RADIUS = {
  root: '4px',
  region: '0px',
  state: '0px',
  company: '0px'
}

const BACKGROUND = {
  root: 'none',
  region: '#eee',
  state: '#eee',
  company: '#eee'
}

const Row = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  line-height: 45px;
  border-bottom: 1px solid #e7e7e7;

  background-color: ${({ type }) => COLORS[type]};
  font-weight: ${({ type }) => FONT_WEIGHT[type]};

  ${props =>
    props.asSidebar
      ? `border-top-left-radius: ${BORDER_RADIUS[props.type]};
     border-top-right-radius: ${BORDER_RADIUS[props.type]};
    `
      : ''}

  cursor: pointer;
  color: #20273a;

  &:hover {
    background-color: ${({ type }) => BACKGROUND[type]};
  }
`

const Root = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  margin: 0em 0.714285714em;
  background-color: #ffffff;

  ${props =>
    props.asSidebar
      ? 'flex-basis: 60px'
      : `overflow-y: scroll;
          flex-basis: 168px;
          margin: 0px;
          border: solid 1px #dee2e6;
          border-radius: 4px;`}
`
const Header = styled(Row)`
  /* font-weight: bold; */
  flex: 0 0 auto;
  padding: 0;
  display: flex;
  color: #848893;
  font-weight: bold;
  border-bottom: none;
  > div:nth-child(2) {
    border-left: none;
    padding-left: 10px;
  }
  > div:last-child {
    padding-right: 10px;
  }

  ${props => (props.asSidebar ? 'justify-content: flex-end;' : '')}
`
const Content = styled.div`
  display: flex;
  flex: 1 0 300px;
  flex-direction: column;
  overflow-y: none;
  ${props =>
    props.asSidebar
      ? 'border: solid 1px #dee2e6 !important; border-radius: 4px; flex: 1 0 auto; overflow-y: hidden;'
      : ''}
`

const RowContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  padding: 9px 0 10px 0;
  line-height: 1.43;
  align-items: center;
  > *:first-child {
    flex: 0 0 1.18em;
  }
  .icon.chevron {
    color: #2599d5;
  }
  padding-left: ${({ depth }) => depth * 15 - 15}px;
`

const Toggle = styled.div`
  flex: 0 0 138px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: #20273a;
  font-weight: 500;
`
const Checkbox = styled.div`
  flex: 0 0 138px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BottomUnpaddedRow = styled(GridRow)`
  padding-bottom: 0px !important;
  .column {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    color: #404040 !important;
  }
`

const RightAlignedDiv = styled.div`
  text-align: right;
  margin-top: 20px;
`

const StretchedGrid = styled(Grid)`
  height: 90% !important;

  .ui.info.message {
    border: solid 1px #2599d5;
    background-color: #ffffff;
    color: #848893;
    box-shadow: none;
    i.info.circle.icon {
      color: #2599d5;
    }
    strong {
      font-weight: bold;
      color: #20273a;
    }
  }

  .ui.divider {
    margin: 1.357142857em 0 1.071428571em 0;
  }

  .upper-grid .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .column {
      padding-top: 0;
      padding-bottom: 0;
    }

    .ui.button {
      height: 40px;
      border-radius: 3px;
      border: solid 1px #f16844;
    }

    .ui.button.negative {
      color: #f16844;
      background-color: #fff0ed;
    }

    .ui.button.positive {
      border: solid 1px #84c225;
      background-color: #e5efd8;
      color: #84c225;
    }
  }
`

const GridRowSearch = styled(GridRow)`
  padding: 0 !important;
`

const FieldInHeaderTable = styled(Form.Field)`
  margin-right: 5px !important;
  max-width: 250px !important;
`

const DropdownInHeaderTable = styled(Dropdown)`
  background: #fdfdfd !important;
  min-width: 150px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #20273a !important;
`

const InputSearch = styled(Input)`
  input {
    background: #fdfdfd !important;
    border: solid 1px #dee2e6 !important;
  }
`

const GridRowTable = styled(Grid.Row)`
  padding-top: 7px !important;
`

const ButtonSave = styled(Button)`
  background-color: #2599d5 !important;
  color: #ffffff !important;
  margin-left: 8px !important;
`

const ButtonTemplate = styled(Button)`
  &.ui.basic.button {
    background-color: #edeef2 !important;
    color: #20273a !important;
    border: none !important;
  }
`

const GridRowFiltersModal = styled(Grid.Row)`
  padding-top: 5px !important;
  padding-bottom: 5px !important;
`

const GridRowTemplateModal = styled(Grid.Row)`
  padding-bottom: 2px !important;
  padding-top: 21px !important;
`

const GridColumnFiltersModal = styled(Grid.Column)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  ${props => (props.secondColumn ? 'padding-left: 0px !important; padding-right: 0px !important;' : '')}
  ${props => (props.firstColumn ? 'padding-right: 5px !important;' : '')}
  ${props => (props.thirdColumn ? 'padding-left: 5px !important;' : '')}
`

const IconFolder = styled(Folder)`
  color: #20273a !important;
  padding-right: 7px !important;
`

const DivIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const GridModalTemplate = styled(Grid)`
  margin-top: 16px !important;
  margin-right: 16px !important;
  margin-bottom: 16px !important;
  margin-left: 16px !important;
`

const UnpaddedRow = {
  Bottom: styled(GridRow)`
    padding-bottom: 0px !important;
  `,
  Top: styled(GridRow)`
    padding-top: 0px !important;
  `
}

const CustomButton = styled(Button)`
  &.ui.button.basic {
    min-width: min-content !important;
    padding: 7px !important;
  }
`

const CustomButtonDelete = styled(Button)`
  &.ui.button.basic {
    min-width: min-content !important;
    padding: 7px !important;
    color: #f16844 !important;
  }
`

const FormFieldBroadcastAllButton = styled(Form.Field)`
  .ui.button.basic,
  .ui.button.outline {
    padding: 7px !important;
    height: auto !important;
    min-height: 40px;
  }
`

export const Rule = {
  Row,
  RowContent,
  Root,
  Content,
  Header,
  Checkbox,
  Toggle
}

export {
  BottomUnpaddedRow,
  RightAlignedDiv,
  StretchedGrid,
  GridRowSearch,
  FieldInHeaderTable,
  DropdownInHeaderTable,
  InputSearch,
  GridRowTable,
  ButtonSave,
  ButtonTemplate,
  GridColumnFiltersModal,
  GridRowTemplateModal,
  GridRowFiltersModal,
  IconFolder,
  DivIcon,
  GridModalTemplate,
  CustomButtonDelete,
  CustomButton,
  FormFieldBroadcastAllButton,
  UnpaddedRow
}
