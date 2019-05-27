import { Menu } from 'semantic-ui-react'
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
  padding-left: ${({ depth }) => (depth * 15)}px;
  background-color: ${({ type }) => COLORS[type]};
  font-weight: ${({ type }) => FONT_WEIGHT[type]};
  cursor: pointer;

  &:hover {
    background-color: #EEE;
  }
`

const Root = styled.div`
  display: flex;
  flex: 1 0 300px;
  flex-direction: column;
`
const Header = styled(Row)`
  /* font-weight: bold; */
  flex: 0 0 45px;
  padding: 5px 15px 5px 5px;
  display: flex;
`
const Content = styled.div`
  display: flex;
  flex: 1 0 300px;
  flex-direction: column;
  overflow-y: scroll;
`

const RowContent = styled.div`
  flex: 1 1 300px;
`

const Toggle = styled.div`
  flex: 0 0 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Checkbox = styled.div`
  flex: 0 0 110px;
  display: flex;
  justify-content: center;
  align-items: center;
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