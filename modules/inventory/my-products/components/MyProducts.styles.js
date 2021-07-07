import styled from 'styled-components'
import { FileText } from 'react-feather'
import { Dropdown } from 'semantic-ui-react'

/**
 * @css display: block;
 * @css width: 20px;
 * @css height: 20px;
 * @css margin: 0 auto;
 * @css vertical-align: top;
 * @css font-size: 20px;
 * @css color: #848893;
 * @css line-height: 20px;
 */
export const FileTextIcon = styled(FileText)`
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #848893;
  line-height: 20px;
`
/**
 * @css width: 14px;
 * @css height: 14px;
 * @css margin: 3px;
 * @css border-radius: 7px;
 * @css background-color: #84c225;
 * @cssClass &.red {
 * @cssClass     background-color: #f16844;
 * @cssClass }
 */
export const DivCircle = styled.div`
  width: 14px;
  height: 14px;
  margin: 3px;
  border-radius: 7px;
  background-color: #84c225;
  &.red {
    background-color: #f16844;
  }
`
/**
 * @css z-index: 601 !important;
 */
export const DropdownStyled = styled(Dropdown)`
  z-index: 601 !important;
`
