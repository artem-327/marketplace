import styled from 'styled-components'
import { Dimmer } from 'semantic-ui-react'
import { AlertCircle } from 'react-feather'

export const DimmerBottomSidebarOpend = styled(Dimmer)`
  ${({ height }) => (height ? height : '')}
`

export const InfoIcon = styled(AlertCircle)`
  transform: rotate(180deg);
`
