import { Grid, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalStyled = styled(Modal)`
  &.ui.modal {
    width: 100% !important;
    bottom: 0;

    .scrolling.content {
      max-height: unset;
    }

    > .actions {
      background: #fff;
    }
  }
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    max-width: 870px;
    margin: 0 auto auto auto;

    > div.row {
      padding: 7.5px 0;

      > div.column {
        padding: 0 10px;
      }
    }
  }
`

export const DivSectionHeader = styled.div`
  margin: 12.5px 10px;
  padding: 5px 11px;
  width: 100%;
  font-size: 14px;
  color: #404040;
  background-color: #edeef2;
`

export const DivAddressWrapper = styled.div`
  margin: -14px;
  margin-top: -28px;

  > div.ui.segment {
    border: none;
    box-shadow: none;
    background-color: #fff !important;
  }
`
