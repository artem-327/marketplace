import styled from 'styled-components'
import { Edit } from 'react-feather'

export const IconEdit = styled(Edit)`
  ${props => (props.disabled ? 'opacity: 0.3;' : '')}
  color: #2599d5;
  margin-top: 2px;
`

