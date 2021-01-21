import styled from 'styled-components'
import { GridRow, GridColumn } from 'semantic-ui-react'
import { XCircle } from 'react-feather'

/**
 * @css z-index: 610 !important;
 * @css white-space: nowrap !important;
 * @css (&.field)  padding: 0px !important;
 */
export const GridColumnDropdown = styled(GridColumn)`
  z-index: 610 !important;
  white-space: nowrap !important;
  & .field {
    padding: 0px !important;
  }
`
/**
 * @css position: absolute;
 * @css top: -10px;
 * @css right: -15px;
 */
export const XCircleIcon = styled(XCircle)`
  position: absolute;
  top: -10px;
  right: -15px;
`
/**
 * @css display: block;
 * @css height: 10px;
 * @css position: relative;
 */
export const DivIcon = styled.div`
  display: block;
  height: 10px;
  position: relative;
`
/**
 * @css padding-left: 0 !important;
 */
export const GridColumnCustom = styled(GridColumn)`
  padding-left: 0 !important;
`
/**
 * @css padding: 1em;
 */
export const DivCustom = styled.div`
  padding: 1em;
`
/**
 * @css font-weight: bold;
 * @css color: #2599d5;
 */
export const ACustom = styled.a`
  font-weight: bold;
  color: #2599d5;
`
/**
 * @css padding-top: 0 !important;
 * @css justify-content: center !important;
 */
export const GridRowCustom = styled(GridRow)`
  padding-top: 0 !important;
  justify-content: center !important;
`
/**
 * @css border-bottom: 1px solid #dee2e6;
 */
export const DivCustomHr = styled.div`
  border-bottom: 1px solid #dee2e6;
`
/**
 * @css padding-bottom: 5px;
 * @css text-transform: capitalize;
 * @css color: #404040;
 */
export const DivFields = styled.div`
  padding-bottom: 5px;
  text-transform: capitalize;
  color: #404040;
`
