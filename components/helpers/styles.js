import styled from 'styled-components'

export const DivCircle = styled.div`
  align-self: center;
  margin: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : '')};
`
