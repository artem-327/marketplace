import styled from 'styled-components'
import {Button} from 'semantic-ui-react'

export const DisabledButtonWrapped = styled.span`
  & > button {
    pointer-events: auto !important;
    opacity: 1 !important;
    background-color: rgba(33, 133, 208, 0.45);
  }
`
