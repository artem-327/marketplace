import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'

export const DivScrollContent = styled.div`
  margin: -13px -10px;
  padding: 10px 20px 20px 20px;
  max-height: calc(80vh - 180px);
  overflow-y: auto;
`

export const DivDetailRow = styled.div`
  text-align: left;
  font-size: 14px;
  border: solid 1px #dee2e6;
  border-radius: 3px;
  background-color: #f8f9fb;
`

export const DivFieldRectangle = styled.div`
  padding: 10px 15px;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #20273a;

  &.disabled {
    opacity: 0.45;
  }
`

export const DivMessageInputHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const DivSmallText = styled.div`
  font-size: 12px;
  color: #848893;
  position: relative;
  bottom: -6px;
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: 0;

    .row {
      margin: 0;
      padding: 7.5px 0;

      .column {
        margin: 0;
        padding: 0 10px;
      }
    }

    .ui.input {
      height: 40px;
    }
  }
`