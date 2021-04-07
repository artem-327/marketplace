import styled from 'styled-components'

import { Container as SemanticContainer, Grid, GridRow } from 'semantic-ui-react'

export const ContainerMain = styled(SemanticContainer)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f5f7fa;
`

export const DivScrollableContent = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
`

export const DivTopButtonRow = styled.div`
  padding: 15px 4px;
`

export const DivButtonContentWrapper = styled.div`
  margin: auto -8px;
  display: flex;
  align-items: center;
`

export const SpanButtonText = styled.span`
  padding-left: 10px;
`

export const ContainerCheckout = styled(SemanticContainer)`
  padding: 15px 0;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ disabled }) => disabled ? 'color: #848893;' : ''}
`

export const DivSectionHeader = styled.div`
  padding: 0 5px;
  font-weight: 500;
  color: #20273a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ disabled }) => disabled ? 'color: #848893;' : ''}
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

export const DivTopPadding = styled.div`
  padding-top: 10px;
`

export const GridExpandedSection = styled(Grid)`
  ${({ overflow }) => overflow}
  &.ui.grid {
    margin: 10px -20px;
    padding: 0;
    ${props => (props.maxheight ? 'max-height: ' + props.maxheight + ';' : '')}

    > .row {
      margin: 2.5px 20px;
      padding: 15px 5px;

      > .column {
        padding: 0 5px;
      }
    }
  }
`

export const GridRowReviewItems = styled(GridRow)`
  margin: 5px 15px !important;
  padding: 0 !important;
`

export const GridRowExpandedSelectionRow = styled(GridRow)`
  border-radius: 4px;
  ${props =>
    props.checked
      ? 'border: solid 1px #2599d5; background-color: #ddf1fc;'
      : 'border: solid 1px #dee2e6; background-color: #f8f9fb;'}
  ${props => (props.selection && !props.disabled ? 'cursor: pointer;' : '')}
  ${props => (props.disabled ? 'background-color: #edeef2;' : '')}
`
