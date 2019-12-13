import { Segment, GridRow, Modal, Button, Header } from 'semantic-ui-react'
import styled from 'styled-components'

export const RelaxedSegment = styled(Segment)`
  margin-top: 0px !important;
  background-color: #fafafa !important;
`

export const RelaxedRow = styled(GridRow)`
  padding-bottom: 4px !important;
  padding-top: 10px !important;
`

export const HeaderTextRow = styled(RelaxedRow)`
  font-size: 1.25rem;
  font-weight: 500;
`

export const Title = styled(HeaderTextRow)`
  background-color: #e7e7e7;
  text-transform: uppercase;
`

export const WiderModal = styled(Modal)`
  width: 350px !important;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
`

export const CustomSpan = styled.span`
  color: ${props => (props.positive ? '#21BA45' : '#2599d5')};
  cursor: pointer;
`

export const CustomHeader = styled(Header)`
  font-size: 18px !important;
`
