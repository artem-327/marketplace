import styled from 'styled-components'

export const DivStatusLabel = styled.div`
  padding: 2px 13px 4px 15px;
  border-radius: 11px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  color: #848893;
  width: max-content;
`

export const DivCircle = styled.div`
  align-self: center;
  margin: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => (props.background ? props.background : '')};
`

export const DivCircles = styled.div`
  display: flex;
  height: inherit;
`
