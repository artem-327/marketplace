import styled from 'styled-components'

export const DivNavItem = styled.div`
  color: ${({ $highlighted }) => ($highlighted ? '#20273a' : '#848893')} !important;
  font-weight: 400;
  margin: 0;
  padding: 7px 28px 7px 44px !important;
  font-size: 12px !important;
  ${({ pointer }) => (pointer ? 'cursor: pointer' : null)};
`

export const DivCheckboxWrapper = styled.div`
  padding: 20px 0;
`