import { Input } from 'semantic-ui-react'

import styled from 'styled-components'

export const DivHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;
`

export const DivHeaderSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const DivHeaderColumn = styled.div`
  margin: 5px 5px;
`

export const InputSearch = styled(Input)`
  width: 370px;
  height: 40px;
`