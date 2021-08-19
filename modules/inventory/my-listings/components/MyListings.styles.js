import styled from 'styled-components'
import {
  Header,
  GridRow,
  GridColumn,
  TableCell,
  Popup
} from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'

export const CustomPaddedColumn = styled(GridColumn)`
    width: 75% !important;
    padding-top: 0px !important;

    @media only screen and (max-width: 1680px) {
        width: 100% !important;
    }
`

export const ResponsiveColumn = styled(GridColumn)`
    @media only screen and (max-device-width: 991px) {
        padding-bottom: 14px;
    }
`

export const TopMargedColumn = styled(GridColumn)`
    margin-top: 6px !important;
`

export const TableCellBig = styled(TableCell)`
    @media (min-width: 768px) {
        width: 15%;
        max-width: 15%;
    }
`

export const FileUploadDiv = styled.div`
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    > * {
        cursor: pointer;
    }
`

export const TableCellSmall = styled(TableCell)`
    @media (min-width: 768px) {
        width: 10%;
        max-width: 10%;
    }
`

export const TableCellMini = styled(TableCell)`
    @media (min-width: 768px) {
        width: 5%;
        max-width: 5%;
    }
`

export const GridHeader = styled(Header)`
    padding-top: 10px !important;
    font-size: 1.142857em !important;
    font-weight: 500;
`

export const InnerRow = styled(GridRow)`
    padding-top: 0 !important;
    padding-bottom: 1em !important;

    &.header {
        padding-top: calc(1rem - 0.14285714em) !important;

        h3.ui.header:first-child {
            margin-top: 0;
        }

        &:first-child h3.ui.header:first-child {
            margin-top: -0.14285714em;
        }
    }

    &.divider {
        padding-bottom: 0 !important;
    }
`

export const HeaderMixtures = styled(Header)`
    margin: 0;
    padding: 0.25em 0 0.75em;
    text-transform: uppercase;
    font-weight: 500;
`

export const defaultHiddenColumns = [
    'productNumber',
    'manufacturer',
    'cost',
    'minOrderQuantity',
    'splits',
    'condition',
    'grade',
    'origin',
    'form',
    'assayString',
    'mfgDate',
    'expDate',
    'allocatedPkg',
    'offerExpiration',
    'groupId',
    'lotNumber'
]

export const FiltersRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: -5px;
`

export const StyledPopup = styled(Popup)`
    max-width: 90% !important;
    padding: 0 !important;
    border-radius: 4px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px #dee2e6;
    background-color: #ffffff;

    .ui.form {
    width: 570px;
    padding: 0;
    }
`

export const CustomSearchNameTags = styled.div`
    .column {
    width: 370px;
    padding-top: 0 !important;
    }
`

export const CapitalizedText = styled.span`
    text-transform: capitalize;
`

export const FobPrice = styled.div`
    cursor: pointer;

    &:hover {
    //text-decoration-style: solid;
    text-decoration: none;
    font-weight: bold;
    color: #2599d5;
    }
`

export const StyledForm = styled(Form)`
  .high-segment {
    padding: 16px 30px;

    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    color: #20273a;
    height: 50px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
    background-color: #ffffff;
  }

  .content {
    max-height: 60vh;
    overflow-y: auto;
  }

  .ui.grid {
    margin: 30px 0 30px 25px;
    padding: 0;

    .row {
      padding: 5px 0;
      &.header {
        padding: 2px 0;
      }

      .column {
        padding: 0 5px;
        .field {
          margin: 0;
          .ui.input,
          .ui.dropdown {
            height: 40px;
          }
          .ui.disabled {
            opacity: 1;
            .dropdown.icon {
              opacity: 0.45;
            }
          }
        }

        .labeled {
          position: relative;
          > div.label {
            position: absolute !important;
            height: 28px !important;
            max-height: 28px !important;
            min-width: 28px;
            top: 6px;
            border-radius: 2px;
            text-align: center;
            padding: 4px 6px 6px 6px;
          }

          &.price {
            .ui.input > input {
              padding-left: 44px;
            }

            > div.label {
              left: 6px;
              color: #84c225;
              background-color: rgba(132, 194, 37, 0.15);
            }
          }

          &.quantity {
            .ui.input > input {
              padding-right: 94px;
            }

            > div.label {
              right: 6px;
              color: #848893;
              background-color: #edeef2;
            }
          }
        }
      }

      .column:nth-child(1) {
        width: 240px;
        padding-right: 15px;
      }
      .column:nth-child(2) {
        width: 230px;
      }
      .column:nth-child(3) {
        width: 50px;
      }

      .ui.button {
        min-width: 40px;
        height: 40px;
        border-radius: 3px;
      }

      .ui.button.delete {
        padding: 0;
        border: solid 1px #f16844;
        background-color: #fff0ed;
        color: #f16844;
        line-height: 1.11;
        font-size: 18px;

        .icon {
          margin: 0 10px;
          width: 18px;
          height: 20px;
          color: #f16844;
          line-height: 1.11;
          font-size: 18px;
        }
      }

      .ui.button.add {
        padding-left: 17px;
        padding-right: 17px;
        border: solid 1px #2599d5;
        background-color: #ddf1fc;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        color: #2599d5;
      }
    }
  }

  .bottom-buttons {
    position: relative;
    overflow: visible;
    margin: 0;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
    padding: 10px 5px;
    text-align: right;

    .ui.button {
      font-size: 1em;
      margin: 0 0.357142857em;
      color: #848893;
      background-color: #ffffff;
      border: solid 1px #dee2e6;
      min-width: 80px;
    }

    .ui.primary.button {
      color: #ffffff;
      background-color: #2599d5;
      border: none;
    }

    .ui.modal & {
      border-top: 1px solid #dee2e6;
      box-shadow: 0 0 0 0 transparent;
    }
  }
`

export const BoldLabel = styled.label`
  font-weight: bolder;
`
export const EllipsisColumn = styled(GridColumn)`
  & input {
    text-overflow: ellipsis !important;
  }
`
