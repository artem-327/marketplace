import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0 -5px;
  
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

export const Line = styled.div`
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
`

export const CustomRectangle = styled.div`
  border-radius: 4px;
  border: solid 1px orange;
  background-color: #ffffff;
  margin-bottom: 15px;
  align-items: center;
  display: block;
  padding: 10px;
  font-size: 14px;
`

export const DivTitle = styled.div`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #0d0d0d;
  display: flex;
`

export const DivContent = styled.div`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  padding: 4px 25.5px;
`

export const DivInTitle = styled.div`
  padding-left: 10px;
`
