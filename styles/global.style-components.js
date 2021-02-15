import styled from 'styled-components'
import { Dimmer } from 'semantic-ui-react'

export const DimmerBottomSidebarOpend = styled(Dimmer)`
  ${({ height }) => (height ? height : '')}
`
