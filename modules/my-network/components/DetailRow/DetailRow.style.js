import { Grid, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

export const SegmentGroupHeader = styled(Segment.Group)`
  margin: 0 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  ${({ noneBorder }) => noneBorder && 'border: none !important'};
  ${({ alignItems }) => alignItems && alignItems};
`

export const SegmentCustom = styled(Segment)`
  border-left: none !important;
`

export const DivCollectionStat = styled.div`
  border: solid 1px #dee2e6;
  border-radius: 4px;
  display: flex;
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
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '20px')};
  font-weight: bold;
  color: #282820;
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
`

export const GridRowBottomSegment = styled(Grid.Row)`
  padding: 20px 0px !important;
`

export const SegmentBottom = styled(Segment)`
  padding-top: 0px !important;
`

export const DivCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: solid 10px #fce1da;
  background-color: #f16844;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const DivModal = styled.div`
  text-align: -webkit-center !important;
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
