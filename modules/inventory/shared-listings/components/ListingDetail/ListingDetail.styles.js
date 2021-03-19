import styled from 'styled-components'
import { Header, GridColumn, GridRow, Grid, Segment, Message, Button, ButtonGroup } from 'semantic-ui-react'
//Components
import BasicButton from '../../../../../components/buttons/BasicButton'

export const DivDetailWrapper = styled.div`
  margin: -9px -10px;
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;

    > .row {
      padding: 16px 0;
      margin: 0;

      > .column {
        padding: 0 5px;
      }
    }
  }
`

export const GridRowButton = styled(GridRow)`
  &.row {
    border-top: solid 1px #dee2e6;
    text-align: right;
    padding: 10px 0 !important;
  }
`

export const DivRectangle = styled.div`
  width: 150px;
  height: 90px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`

export const DivName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #20273a;
`

export const DivAddress = styled.div`
  font-size: 14px;
  color: #848893;
`

export const DivButtons = styled.div`
  color: #20273a;
  font-size: 14px;
  padding-top: 8px;
  display: flex;
  min-width: 400px;
`

export const BasicButtonCustom = styled(BasicButton)`
  border-radius: 20px !important;
`

export const DivMail = styled.div`
  padding-right: 6px;
`

export const DivTextButton = styled.div`
  display: flex;
  justify-content: center;
`
