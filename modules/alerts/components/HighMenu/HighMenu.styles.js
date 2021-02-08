import styled from 'styled-components'
import { Container, Label, Menu, Dropdown } from 'semantic-ui-react'

export const StyledMenu = styled(Menu)`
  &.ui.menu {
    height: 50px !important;
    min-height: 50px !important;

    > .item {
      box-sizing: content-box !important;
      height: 17px !important;
      padding-top: 16px !important;
      padding-bottom: 17px !important;

      > div.ui.circular.label {
        box-sizing: border-box !important;
        height: 20px !important;
        padding-top: 4px !important;
        padding-bottom: 4px !important;
      }

      &.active {
        font-weight: 400 !important;

        > div.ui.circular.label {
          padding-top: 5px !important;
          padding-bottom: 5px !important;
        }

        &:hover {
          font-weight: 700 !important;
        }
      }
    }

    > .item:not(.active) .ui.circular.label {
      border: solid 1px #dee2e6;
      background-color: #f8f9fb;
      color: #848893;
    }

    > .active.item .ui.circular.label {
      background-color: #f16844;
      color: #ffffff;
    }

    .ui.dropdown {
      .text {
        height: 50px;
        line-height: 50px;

        svg {
          width: 20px;
          height: 20px;
          margin: 0 10px;
          vertical-align: middle;
        }
      }

      i.dropdown.icon {
        display: none;
      }

      .menu {
        padding-top: 11px !important;
        padding-bottom: 9px !important;

        > .item {
          box-sizing: content-box !important;
          height: 20px !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          margin-bottom: 0 !important;
          border-width: 0 0 0 3px !important;
          border-style: none none none solid !important;
          border-color: transparent !important;
          padding: 10px 10px 10px 17px !important;
          text-transform: uppercase !important;
          line-height: 20px;

          > div.ui.circular.label {
            float: right;
            box-sizing: border-box !important;
            height: 20px !important;
            margin-right: 0 !important;
            border: solid 1px #dee2e6;
            padding-top: 4px !important;
            padding-bottom: 4px !important;
            background-color: #f8f9fb;
            color: #848893;
          }

          &.active {
            border-color: #2599d5 !important;
            font-weight: 400;

            > div.ui.circular.label {
              padding-top: 5px !important;
              padding-bottom: 5px !important;
            }
          }

          &:hover {
            background: transparent !important;
            font-weight: 700 !important;
            color: #2599d5 !important;
          }
        }
      }
    }
  }
`

export const CircularLabel = styled(Label)`
  margin-left: 5px !important;
  bottom: auto;
  font-size: 0.7142857rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
`
