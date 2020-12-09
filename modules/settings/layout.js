import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

export const DivRow = styled.div`
  display: flex !important;

  > div {
    flex-grow: 0;
    flex-shrink: 0;
  }

  > span {
    flex-grow: 1;
    flex-shrink: 1;
  }
`

export const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }
`

export const RowDropdown = styled(Dropdown)`
  display: block !important;
  height: 100% !important;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
`

export const RowDropdownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 8px 2px -4px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }
`