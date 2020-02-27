import { Grid, GridRow } from 'semantic-ui-react'
import styled from 'styled-components'

const COLORS = {
  root: '#ADD4EC',
  region: '#F0F7FB',
  state: '#FAFAFA',
  company: '#FFF'
}

const FONT_WEIGHT = {
  root: 'bold',
  region: 'bold',
  state: 'normal',
  company: 'normal'
}

const Row = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 45px;
  line-height: 45px;
  border-bottom: 1px solid #e7e7e7;
  padding-left: ${({ depth }) => depth * 15}px;
  background-color: ${({ type }) => COLORS[type]};
  font-weight: ${({ type }) => FONT_WEIGHT[type]};
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`

const Root = styled.div`
  display: flex;
  flex: 1 0 300px;
  flex-direction: column;
  margin: 1.428571429em 0.714285714em;
`
const Header = styled(Row)`
  /* font-weight: bold; */
  flex: 0 0 45px;
  padding: 9px 10px 11px 5px;
  display: flex;
  color: #848893;
  font-weight: bold;
`
const Content = styled.div`
  display: flex;
  flex: 1 0 300px;
  flex-direction: column;
  overflow-y: scroll;
`

const RowContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  padding: 12px 0;
  line-height: 21px;

  > *:first-child {
    flex: 0 0 1.18em;
  }
`

const Toggle = styled.div`
  flex: 0 0 110px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`
const Checkbox = styled.div`
  flex: 0 0 110px;
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
  height: 100vh;
  
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
    .column {
      padding-top: 0;
      padding-bottom: 0;
    }
    .ui.button {
      height: 40px;
      border-radius: 3px;
      border: solid 1px #f16844;
      color: #f16844;
      background-color: #fff0ed;
    }
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

export { BottomUnpaddedRow, RightAlignedDiv, StretchedGrid }
