import styled from 'styled-components'

import {
  Container as SemanticContainer,
  Image,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider
} from 'semantic-ui-react'

export const DivCheckoutWrapper = styled.div`
  background-color: #f5f7fa;
  height: 100vh;
`

export const ContainerCheckout = styled(SemanticContainer)`
  padding: 20px 30px 30px 30px !important;
`

export const GridSections = styled(Grid)`
  &.ui.grid {
    margin: -7.5px -5px;
  
    > .row {
      padding: 2.5px 0;
    }
  }
`

export const DivSectionCollapsedWrapper = styled.div`
  margin: -5px -10px;
`

export const DivSectionCollapsedRow = styled.div`
  display: flex;
  flex-flow: row;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
`

export const DivSectionName = styled.div`
  padding: 0 5px;
  color: #20273a;
`

export const DivSectionDescription = styled.div`
  padding: 0 5px;
  color: #848893;
`

