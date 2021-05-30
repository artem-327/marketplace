import styled from 'styled-components'
import { Grid, GridRow } from 'semantic-ui-react'
import BasicButton from '../../../../components/buttons/BasicButton'

export const GridInsurance = styled(Grid)`
  padding: 30px 30px 40px !important;
`

export const DivTitle = styled.div`
  font-size: 24px;
  line-height: 1.25;
  color: #282828;
`

export const RectangleSubTitle = styled.div`
  padding: 10px 20px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  color: #848893;
`

export const BasicButtonUpdate = styled(BasicButton)`
  &.ui.button {
    padding: 6px 14px;
    min-height: 32px;
    height: 32px !important;
    min-width: unset;
    margin: -4.5px -10px !important;
  }
`

export const GridRowAddRow = styled(GridRow)`
  &.row {
    margin-top: -18px;
    margin-left: -5px;
  }
`