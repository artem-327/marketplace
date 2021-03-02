import { Grid, Segment, List, GridColumn, Table, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { InfoIcon } from '../../../../styles/global.style-components'

export const SegmentGroupHeader = styled(Segment.Group)`
  margin: 0;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  align-items: center !important;
  ${({ noneBorder }) => noneBorder && 'border: none !important'};
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
