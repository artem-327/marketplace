import styled from 'styled-components'
import { FormGroup, FormField, Popup, Image, Dropdown, Grid, GridRow, GridColumn, Button } from 'semantic-ui-react'
import { Trash, UploadCloud, Image as ImageIcon } from 'react-feather'

export const LogoWrapper = styled.div`
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;

  > .ui.grid {
    margin: 20px;
    &.admin {
      margin: 20px 100px;
    }

    > .row {
      padding: 5px 0;
      > .column {
        padding: 0 5px;

        .ui.button {
          border-radius: 3px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
          border: solid 1px #dee2e6;
          background-color: #ffffff;
          padding: 7px 10px;
          color: #848893;
          font-size: 13px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;

          &.delete {
            color: #f16844;
          }

          > svg {
            width: 18px;
            height: 20px;
            margin: -3px 10px;
          }
        }
      }
    }
  }

  .uploadAttachment {
    padding: 0;
    border-radius: 3px;
    border: solid 1px #dee2e6;
    background-color: #f8f9fb;

    .dropzoneLot,
    .dropzoneLotHasFile {
      border: none;
      background-color: #f8f9fb;
      > img {
        display: unset;
      }
    }
  }

  > div.logo-hint {
    display: flex;
    flex-direction: column;
    padding: 16px 20px;
    border-top: solid 1px #dee2e6;
    background-color: #f8f9fb;
    font-size: 12px;
    text-align: center;
    color: #848893;
  }
`

export const StyledImageIcon = styled(ImageIcon)`
  width: 40px;
  height: 40px;
  object-fit: contain;
  color: #dee2e6;
  margin: 30px;
`

export const ButtonsRow = styled(GridRow)`
  .button {
    min-width: 100% !important;
    padding-left: 5px !important;
    padding-right: 5px !important;

    svg {
      margin-left: 0 !important;
      margin-right: 5px !important;
    }
  }

  @media (max-width: 1800px) {
    .button {
      position: relative;
      overflow: hidden;
      text-align: left;
      text-indent: -5000px;
      max-width: 100%;
      min-width: 32px !important;

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 !important;
      }
    }
  }
`