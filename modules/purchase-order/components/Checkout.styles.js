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