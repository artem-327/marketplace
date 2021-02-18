import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

export const GridTradeCriteria = styled(Grid)`
  padding: 30px !important;
  margin: 15px 30px 30px 30px !important;
  border-radius: 4px !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
`

export const DivTitle = styled.div`
  margin: 15px 30px 0px 30px;
  font-size: 24px;
  line-height: 1.25;
  color: #282828;
`

export const DivDescription = styled.div`
  padding: 15px 20px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  color: #848893;
  height: fit-content;
`

export const DivSubLabel = styled.div`
  color: #848893;
`

export const GridColumn = styled(Grid.Column)`
  padding: 0px !important;
  .ui.selection.dropdown {
    background: #fdfdfd !important;
  }
`

export const DivTitleLabel = styled.div`
  color: #20273a;
  font-size: 14px;
  font-weight: bold;
`
