import styled from 'styled-components'
import { Grid, GridRow, Icon } from 'semantic-ui-react'
import { Trash, PlusCircle } from 'react-feather'

export const CustomGridRow = styled(GridRow)`
  padding-top: 6px !important;
  padding-bottom: 0px !important;
`

export const CustomGridColumn = styled(Grid.Column)`
  padding-bottom: 0px !important;
  padding-top: 7px !important;
`

export const GridColumnRequired = styled(Grid.Column)`
  padding: 0px 10px !important;
  color: #404040 !important;
  font-size: 14px !important;
  line-height: 1.29 !important;
`

export const PricingIcon = styled(Icon)`
  line-height: 40px;
`

export const DivAddInputTds = styled.div`
  border-radius: 3px;
  border: solid 1px #2599d5;
  background-color: #ddf1fc;
  padding: 8px 0 4px 0;
  cursor: pointer;
`

export const IconPlusCircle = styled(PlusCircle)`
  color: #2599d5;
  line-height: 1.11;
  width: 18px;
  height: 20px;
`

export const IconTrash = styled(Trash)`
  cursor: pointer;
  color: #f16844;
`

export const DivIconPlusCircle = styled.div`
  margin: 0;
`

export const DivTrash = styled.div`
  cursor: pointer;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DivButtonPlus = styled.div`
  cursor: pointer;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  height: 40px;
  width: 40px;
  padding-top: 6px;
  text-align: center;
`

export const DivLevel = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DivTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;
  color: #20273a;
  padding: 20px 20px 0px 20px;
`

export const DivRequiredFields = styled.div`
  padding: 10px 10px 30px 10px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  //width: -webkit-fill-available;
`

export const GridFields = styled(Grid)`
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;

  > .row:first-child:nth-last-child(2) svg {
    display: none !important;
  }
`

export const DivFlex = styled.div`
  display: flex;
  margin: 0px !important;
  font-size: 1em !important;
  color: #404040 !important;
`
