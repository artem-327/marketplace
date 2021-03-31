import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'
import { ChevronDown } from 'react-feather'

export const NetworkDropdown = styled(Dropdown)`
  &.ui.dropdown {
    ${({ $widthSharedListings }) => ($widthSharedListings ? `width: ${$widthSharedListings}` : '50px')};
    height: 32px !important;
    margin: -5px 0 !important;
    border: 1px solid #dee2e6;
    border-radius: 3px;
    padding: 6px 5px 6px 8px;

    > .text {
      svg {
        width: 18px;
        height: 18px;

        path[fill] {
          fill: #848893 !important;
        }
      }

      img {
        width: 18px;
        height: 18px;
        margin-right: 0px !important;
        margin-top: 0px !important;
      }
    }

    &.active {
      background: #edeef2 !important;

      > svg,
      img {
        transform: rotate(180deg);
      }

      > .text svg path[fill] {
        fill: #20273a !important;
      }
    }

    &.loading {
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 18px;
        margin: -0.64285714em 0 0 -0.64285714em;
        border-radius: 500rem;
        border: 0.2em solid rgba(0, 0, 0, 0.1);
        width: 1.28571429em;
        height: 1.28571429em;
      }

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 18px;
        -webkit-animation: dropdown-spin 0.6s linear;
        animation: dropdown-spin 0.6s linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        width: 1.28571429em;
        height: 1.28571429em;
        margin: -0.64285714em 0 0 -0.64285714em;
        border-radius: 500rem;
        border-color: #767676 transparent transparent;
        border-style: solid;
        border-width: 0.2em;
        -webkit-box-shadow: 0 0 0 1px transparent;
        box-shadow: 0 0 0 1px transparent;
      }

      > .text svg,
      img {
        opacity: 0;
      }
    }

    > .menu {
      margin-top: 5px !important;

      > .header {
        height: 30px !important;
        margin: 5px 0 !important;
        padding: 0 20px !important;
        text-transform: none;
        font-size: 14px;
        font-weight: 500;
        color: #404040;
        line-height: 30px;
      }

      &:after {
        right: 5px !important;
      }

      > .item {
        box-sizing: border-box;
        height: 60px;
        padding: 16px 30px 12px 60px !important;
        line-height: 16px;

        svg,
        img {
          position: absolute;
          top: 17px;
          left: 20px;
          width: 24px;
          height: 24px;

          path[fill] {
            fill: #848893 !important;
          }
        }

        &:hover svg path[fill] {
          fill: #20273a !important;
        }

        .content {
          font-size: 14px;
          color: #20273a;
          line-height: 16px;
          padding-left: 0px !important;

          .sub.header {
            font-size: 12px;
            color: #848893;
            line-height: 16px;
          }
        }
      }
    }
  }
`

export const NetworkChevronDown = styled(ChevronDown)`
  float: right !important;
  width: 14px !important;
  height: 20px !important;
  color: #848893 !important;
`
