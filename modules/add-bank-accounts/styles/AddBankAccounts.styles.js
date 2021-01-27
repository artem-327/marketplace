import { PlaidLink } from 'react-plaid-link'

import styled from 'styled-components'

/**
 * @param {boolean} disabled Props change cursor, pointer and background in button
 * @css cursor: ${props => (props.disabled ? 'not-allowed !important' : 'pointer !important')};
 * @css pointer-events: ${props => (props.disabled ? 'none !important' : 'auto !important')};
 * @css box-shadow: none !important;
 * @css border: solid 1px #dee2e6 !important;
 * @css color: #20273a !important;
 * @css background-color: ${props => (props.disabled ? '#adaeaf !important' : '#ffffff !important')};
 * @css border-radius: 3px !important;
 * @css font-weight: 500 !important;
 * @css align-items: center !important;
 * @css display: flex !important;
 * @css justify-content: center !important;
 * @css font-size: 20px !important;
 * @css padding: 15px !important;
 */
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
