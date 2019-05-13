import { Segment, GridRow } from 'semantic-ui-react'
import styled from 'styled-components'


const RelaxedSegment = styled(Segment)`
  margin-top: 0px !important;
  background-color: #fafafa !important;
`

const RelaxedRow = styled(GridRow)`
  padding-bottom: 4px !important;
  padding-top: 10px !important;
`

const HeaderTextRow = styled(RelaxedRow)`
  font-size: 1.25rem;
  font-weight: 500;
`

const Title = styled(HeaderTextRow)`
  background-color: #e7e7e7;
  text-transform: uppercase;
`


export { RelaxedSegment, RelaxedRow, HeaderTextRow, Title }