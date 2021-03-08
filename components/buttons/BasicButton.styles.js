import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

export const CustomButton = styled(Button)`
  min-width: 0;
  box-shadow: none !important;
  border: ${props => (props.noBorder ? 'none !important' : 'solid 1px #dee2e6 !important')};
  color: ${props => (props.textColor ? props.textColor : '#20273a !important')};
  background-color: ${props => (props.background ? props.background : '#ffffff !important')};
  float: ${({ float }) => (float ? float : null)};
  height: 40px !important;
  border-radius: 3px !important;
  font-weight: 500 !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 14px !important;
  margin: 0px 5px !important;
  &.ui.button[disabled] {
    opacity: 0.3 !important;
  }

  &.icon {
    width: 40px;
    min-width: 40px !important;
    height: 40px;
    padding: 9px !important;
    text-align: center;

    svg {
      max-width: 20px;
      max-height: 20px;
    }
  }

  &.font-medium {
    font-weight: 500 !important;
  }

  // attribute disabled disables also Popup but we need it
  // function is disabled differently and only disabled styles are applied
  &.disabled-style {
    &:not(.icon) {
      &,
      &:active,
      &:focus,
      &:hover {
        opacity: 0.22; // from design All Notification - button icons
      }
    }

    &.icon {
      svg,
      &:active svg,
      &:focus svg,
      &:hover svg {
        opacity: 0.22; // from design All Notification - button icons
      }
    }
  }
`
