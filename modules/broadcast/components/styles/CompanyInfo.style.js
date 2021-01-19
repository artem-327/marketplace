import { Modal, GridRow, GridColumn, Label } from 'semantic-ui-react'
import styled from 'styled-components'

export const CustomRow = styled(GridRow)`
  border-bottom: 1px solid #f0f0f0 !important;
`

export const DivTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  color: #20273a;
  padding-bottom: 20px;
`

export const CustomColumn = styled(GridColumn)`
  color: #848893 !important;
`

export const CustomDiv = styled.div`
  padding: 0 !important;
`

export const CustomModalActions = styled(Modal.Actions)`
  background: none !important;
`

export const CustomLabelVerified = styled(Label)`
  background: #84c225 !important;
  width: 84px !important;
  height: 22px !important;
  border-radius: 4px !important;
  border: solid 1px #dee2e6 !important;
  text-align: center !important;
  padding-top: 3px !important;
`

export const CustomLabelNotVerified = styled(Label)`
  width: 84px !important;
  height: 22px !important;
  border-radius: 4px !important;
  border: solid 1px #dee2e6 !important;
  background-color: #edeef2 !important;
  text-align: center !important;
  padding-top: 3px !important;
`

export const CustomDivValue = styled.div`
  color: #20273a !important;
`
