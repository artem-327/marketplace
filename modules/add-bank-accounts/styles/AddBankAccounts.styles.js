import { PlaidLink } from 'react-plaid-link'

import styled from 'styled-components'

export const PlaidButton = styled(PlaidLink)`
  cursor: ${props => (props.disabled ? 'not-allowed !important' : 'pointer !important')};
  pointer-events: ${props => (props.disabled ? 'none !important' : 'auto !important')};
  box-shadow: none !important;
  border: solid 1px #dee2e6 !important;
  color: #20273a !important;
  background-color: ${props => (props.disabled ? '#adaeaf !important' : '#ffffff !important')};
  border-radius: 3px !important;
  font-weight: 500 !important;
  align-items: center !important;
  display: flex !important;
  justify-content: center !important;
  font-size: 20px !important;
  padding: 15px !important;
`
