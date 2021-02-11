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

export const DivSectionExpandedRow = styled.div`
  display: flex;
  flex-flow: row;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const DivSectionHeader = styled.div`
  padding: 0 5px;
  font-weight: 500;
  color: #20273a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const DivSectionSmallHeader = styled.div`
  padding: 0 5px;
  font-size: 12px;
  color: #848893;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const DivSectionDescription = styled.div`
  padding: 0 5px;
  color: #848893;
`

export const DivFlexRow = styled.div`
  display: flex;
  flex-flow: row;
`

export const DivCentered = styled.div`
  margin: auto 5px auto 0;
`

export const DivRightSection = styled.div`
  margin: auto 5px auto auto;
`

export const GridExpandedSection = styled(Grid)`
  &.ui.grid {
    margin: 10px 0;
  
    > .row {
      margin: 2.5px 0;
      padding: 15px 5px;
      
      > .column {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        padding: 0 5px;
      }
    }
  }
`

export const GridRowExpandedSelectionRow = styled(GridRow)`
  border-radius: 4px;
  ${props => (props.checked 
    ? 'border: solid 1px #2599d5; background-color: #ddf1fc;'
    : 'border: solid 1px #dee2e6; background-color: #f8f9fb;'
  )}
  ${props => (props.selection ? 'cursor: pointer;' : '')}
`

