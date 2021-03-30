import { Modal, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

export const ModalStyled = styled(Modal)`
  > i.close.icon {
    font-size: 18px;
  }

  &.ui.large.modal > .header {
    font-size: 18px;
  }

  &.ui.large.modal > .scrolling.content {
    padding: 30px;
  }
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
`

export const DivSmallText = styled.div`
  font-size: 12px;
  color: #848893;
  display: flex;

  > svg.title-icon {
    font-size: 14px;
    margin-right: 8px;
  }
`

export const GridStyled = styled(Grid)`
  &.ui.grid {
    margin: -7.5px -10px;

    .row {
      padding: 7.5px 0;

      .column {
        padding: 0 10px;
      }
    }

    .ui.input {
      height: 40px;
    }
  }
`