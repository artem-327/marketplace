import { Grid, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

export const SegmentGroupHeader = styled(Segment.Group)`
  margin: 0 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  ${({ $noneBorder }) => $noneBorder && 'border: none !important'};
  ${({ $alignItems }) => $alignItems && $alignItems};
`

export const SegmentCustom = styled(Segment)`
  border-left: none !important;
`

export const DivCollectionStat = styled.div`
  display: flex;
`

export const DivBarGraph = styled.div`
  margin-left: 40px;
  width: 300px;
  height: 100px;
`

export const DivPercentageIconWrapper = styled.div`
  height: 80px;
  margin: 0 27px;
`

export const DivRiskTolerance = styled.div`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: #9b9b9b;
`

export const DivTransactions = styled.div`
  text-align: center;
  flex: 50%;
`
export const DivAvarageValue = styled.div`
  text-align: center;
  border-left: solid 1px #dee2e6;
  flex: 50%;
`

export const DivValue = styled.div`
  ${({ $minHeight }) => ($minHeight ? `min-height: ${$minHeight};` : '')}
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '20px')};
  font-weight: bold;
  color: ${({ $color }) => ($color ? $color : '#282820')};
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight};` : '')}
`

export const DivPadding = styled.div`
  padding: 14px;
`

export const DivTitleTradeCriteria = styled.div`
  color: #282828;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
`

export const DivTitleBottomSegment = styled.div`
  color: #282828;
  font-size: 18px;
  font-weight: bold;
`

export const DivEmpty = styled.div`
  height: 40px;
`

export const GridColumnDetail = styled(Grid.Column)`
  padding: 0px !important;
  font-size: 12px !important;
  ${({ $colorText }) => ($colorText ? `color: ${$colorText} !important;` : null)}
  line-height: ${({$lineHeight}) => ($lineHeight ? `${$lineHeight} !important` : '1.58334 !important')};
`

export const GridRowBottomSegment = styled(Grid.Row)`
  padding: 15px 0px 20px !important;
  
  &:last-child {
    padding: 10px 0px 5px !important;
  }
`

export const GridRowLoadingBottomSegment = styled(Grid.Row)`
  margin-top: 20px !important;
`

export const SegmentBottom = styled(Segment)`
  padding: 0px 24px 5px !important;
  
  &:first-child {
    padding-left: 5px !important;
  }
  
  .row {
    padding: 5px 0 !important;
  }
`

export const DivCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: ${({ borderColor }) => (borderColor ? `solid 10px ${borderColor}` : 'solid 10px #fff')};
  background-color: ${({ background }) => (background ? background : '#f16844')};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DivModal = styled.div`
  display: flex;
  justify-content: center;
`

export const DivIconCollapse = styled.div`
  padding-top: 6px;
`

export const DivCollapseText = styled.div`
  margin-top: -6px;
  display: flex;
  justify-content: center;
`

export const DivCollapse = styled.div`
  cursor: pointer;
  color: #848893;
  font-size: 12px;
  width: max-content;
  height: 36px;
  border-top: solid 1px #dee2e6;
  padding: 0 !important;
  margin: 0 !important;
  width: calc(100% + 30px) !important;
  margin-left: -15px !important;
  margin-right: -15px !important;
`

export const DivTradePassLogo = styled.div`
  float: right;
  margin-top: -30px;
  padding-right: 20px;
`
