import styled from 'styled-components'
import {Container, Image, Label, Menu, Header} from "semantic-ui-react";

export const TopMenu = styled(Menu)`
  background-color: #fff !important;
  position: fixed;
  width: auto !important;
  height: 80px;
  top: 0;
  right: 0 !important;
  bottom: 0;
  left: 300px !important;
  border: 0 none !important;
        
  &.ui.menu.fixed .item-cart {
    margin-right: 5px;
    padding: 20px;
    
    &:hover {
      background: transparent !important;
    }
  }
  
  &.ui.menu.fixed .item.user-menu-wrapper {
    position: relative;
    box-sizing: content-box;
    width: 40px;
    height: 40px;
    border-radius: 50% !important;
    padding: 20px;
    background: #edeef2 !important;
    background-clip: content-box !important;
    text-align: center;
    
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -1px;
      display: block;
      width: 1px;
      height: 31px;
      margin: 24px 0;
      background: #dee2e6 !important;
    }
    
    > i.icon {
      margin: 0 auto;
      
      &.user.thick {
        color: #748cad;
      }
    }
    
    .menu {
      top: 69px !important;
      box-sizing: border-box;
      width: 200px !important;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      box-shadow: 0 0 0 0 transparent;
      
      &:before,
      &:after {
        content: "";
        position: absolute;
        right: 34px;
        width: 10px;
        height: 6px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
      }
      
      &:before {
        top: -6px;
        border-bottom: 6px solid #dee2e6;
      }
      
      &:after {
        top: -5px;
        border-bottom: 6px solid #fff;
      }
      
      > div.item {
        margin-bottom: 6px;
        border-bottom: 1px solid #dee2e6;
        padding: 13px 21px !important;
        font-size: 12px !important;
        color: #848893 !important;
        line-height: 18px;
        
        .header {
          font-size: 16px !important;
          color: #20273a !important;
          line-height: 18px;
        }
        
        &:hover {
          background-color: #fff !important;
        }
      }
      
      > a.item {
        display: block;
        height: 30px;
        padding: 0 21px !important;
        font-size: 14px;
        color: #848893 !important;
        line-height: 30px;
        
        &:hover {
          background-color: #2599d5 !important;
          color: #fff !important;
        }
        
        &.logout {
          box-sizing: border-box;
          height: 32px;
          margin: 8px 19px 19px;
          border: 1px solid #dee2e6;
          border-radius: 3px !important;
          text-align: center;
          font-weight: 700;
          color: #f16844 !important;
          
          &:hover {
            background-color: #fff !important;
            color: #2599d5 !important;
          }
        }
      }
    }
  }
`
export const TopMenuContainer = styled(Container)`
  padding: 0 30px;
`
export const LeftMenu = styled(Menu)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: width 250ms linear;
  width: 300px !important;
  height: auto;
  background-color: #fff !important;
  box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.06), inset -1px 0 0 0 #dee2e6 !important;
  
  &.vertical,
  &.vertical.borderless {
    
    &,
    > .container {
      max-height: 100vh;
    }
    
    > .container > .scrollbar-container {
      overflow: hidden;
      max-height: 100vh;
      
      > .ps__rail-y {
        position: absolute;
        top: 2px;
        right: 0;
        bottom: 2px;
        width: 10px;
        height: auto;
        
        .ps__thumb-y {
          width: 6px;
          margin: 0 auto;
          border-radius: 3px;
          background: #edeef2;
        }
      }
    }
  
    .container > a.item,
    .scrollbar-container > a.item {
      border-radius: 4px;
      text-transform: uppercase;
      white-space: nowrap;
      font-weight: 700 !important;
      
      &:hover,
      &:hover i,
      &:hover svg {
        color: #20273a !important;
      }
      
      &.active {
        background: #edeef2 !important;
      }
      
      &.active i,
      &.active svg {
        color: #20273a !important;
      }
    }
    
    .container > .item,
    .scrollbar-container > .item {
      overflow: hidden;
      transition: width 250ms linear 250ms, padding 250ms linear 250ms;
      box-sizing: border-box;
      width: 280px;
      height: auto;
      min-height: 50px;
      max-height: 50px;
      margin: 4px 0;
      border-radius: 4px !important;
      padding: 12px 40px 12px 55px;
      text-align: left;
      color: #848893 !important;
      line-height: 26px;
      
      &:before,
      &:after {
        content: "";
        position: absolute !important;
        top: 20px !important;
        left: auto !important;
        right: 18px !important;
        bottom: auto !important;
        transform-origin: 50% 50%;
        transition: transform 250ms linear, opacity 250ms linear;
        opacity: 1;
        display: block;
        width: 1px !important;
        height: 9px !important;
        border-radius: 1px;
        background: #cecfd4 !important;
      }
      
      &:after {
        top: 24px !important;
        right: 14px !important;
        width: 9px !important;
        height: 1px !important;
      }
      
      &.opened {
        max-height: none;
        
        &:before,
        &:after {
          transform: rotate(135deg);
          background: #546fd3 !important;
        }
      }
      
      &.dropdown {
        box-sizing: border-box;
        width: 280px;
      
        > .menu {
          padding: 10px 0;
          background-color: #edeef2;
          box-shadow: 0 0 0 0 transparent;
          
          a {
            display: block;
            box-sizing: border-box;
            height: 40px;
            margin: 0;
            padding: 12px 40px 12px 55px !important;
            color: #848893 !important;

            &.active,
            &:hover {
              background: transparent !important;
              font-weight: 400 !important;
              color: #20273a !important;
            }
          }
        }
        
        &:not(.upward),
        &.upward {
        
          > .menu {
            position: static !important;
            overflow: hidden !important;
            display: block;
            width: auto;
            height: 0;
            margin: 12px -40px 0 -55px;
            border: none;
            border-top: 1px solid #dee2e6;
            border-radius: 4px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            padding: 0 !important;
          }
          
          &.opened {
            border-radius: 4px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            /*background: #132947 !important;*/
            background: rgba(237,238,242,1) !important;
            background: -moz-linear-gradient(top, rgba(237,238,242,1) 0%, rgba(237,238,242,1) 50px, rgba(237,238,242,0) 50px, rgba(237,238,242,0) 100%) !important;
            background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(237,238,242,1)), color-stop(50px, rgba(237,238,242,1)), color-stop(50px, rgba(237,238,242,0)), color-stop(100%, rgba(237,238,242,0))) !important;
            background: -webkit-linear-gradient(top, rgba(237,238,242,1) 0%, rgba(237,238,242,1) 50px, rgba(237,238,242,0) 50px, rgba(237,238,242,0) 100%) !important;
            background: -o-linear-gradient(top, rgba(237,238,242,1) 0%, rgba(237,238,242,1) 50px, rgba(237,238,242,0) 50px, rgba(237,238,242,0) 100%) !important;
            background: -ms-linear-gradient(top, rgba(237,238,242,1) 0%, rgba(237,238,242,1) 50px, rgba(237,238,242,0) 50px, rgba(237,238,242,0) 100%) !important;
            background: linear-gradient(to bottom, rgba(237,238,242,1) 0%, rgba(237,238,242,1) 50px, rgba(237,238,242,0) 50px, rgba(237,238,242,0) 100%) !important;
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#546f93', endColorstr='#546f93', GradientType=0 ) !important;
            color: #848893 !important;
            
            > .menu {
              height: auto;
              padding: 10px 0 !important;
            }
          }
        }
      }
      
      i,
      svg {
        position: absolute;
        top: 14px;
        left: 15px;
        width: 22px !important;
        height: 22px;
        margin: 0 !important;
        vertical-align: top;
        font-size: 22px;
        line-height: 22px;
        
        &.hexagon {
          transform-origin: 60% 50%;
          transform: rotate(30deg);
        }
      }
      
      > .text {
        text-transform: uppercase;
        white-space: nowrap;
        font-weight: 700 !important;
        line-height: 26px;
        
        ~ .chevron {
          margin-right: -33px;
          width: 26px !important;
          height: 26px;
        }
      }

      &,        
      &.active {
        background: transparent !important;
        
        > .text,
        > .text ~ i,
        > .text ~ svg {
          color: #848893 !important;
          
          &.hexagon {
            color: #2599d5 !important;
          }
        }
      }
      
      &.active {
        color: #20273a !important;
        
        &:before,
        &:after {
          background: #546f93 !important;
        }
      }
        
      &:hover {
        background-color: transparent !important;
        
        > .text {
          color: #20273a !important;
        }
        
        > .text ~ i,
        > .text ~ svg {
          color: #20273a !important;
        }
        
        &:before,
        &:after {
          background: #546f93 !important;
        }
      }
      
      &.opened {
        background-color: transparent !important;
        
        > .text {
          color: #20273a !important;
        }
        
        > .text ~ i,
        > .text ~ svg {
          color: #20273a !important;
        }
        
        &:before,
        &:after {
          background: #546f93 !important;
        }
      }
      
      &.opened {
        
        > .text ~ i.hexagon,
        > .text ~ svg.hexagon {
          color: #2599d5 !important;
        }
      }
    }
    
    .container > a.item {
      transition: width 250ms linear 250ms, padding 250ms linear 250ms;
      overflow: hidden;
      
      &:before,
      &:after {
        content: none;
        display: none;
      }
    }
  
    &.collapsed {
      width: 70px !important;
      
      .container > a.item,
      .scrollbar-container > a.item,
      .dropdown {
        transition: width 250ms linear 0ms, padding 250ms linear 0ms;
        width: 50px !important;
        padding: 12px 0 12px 50px;
        
        &:before,
        &:after {
          opacity: 0;
        }
      }
      
      .container > a.item {
        width: 50px !important;
        transition: width 250ms linear 0ms, padding 250ms linear 0ms;
      }
      
      .scrollbar-container {
        overflow: visible !important;
        
        > .ps__rail-y {
          display: none !important;
        }
      
        .dropdown.opened {
          overflow: visible !important;
          border-width: 1px 0 1px 1px;
          border-style: solid;
          border-color: #dee2e6;
          
          > .text {
            position: absolute;
            top: -1px;
            left: 43px;
            box-sizing: border-box;
            width: 243px;
            border-width: 1px 1px 1px 0;
            border-style: solid;
            border-color: #dee2e6;
            border-radius: 0;
            border-top-right-radius: 4px;
            padding: 11px 40px 11px 55px;
            background: #edeef2;
          }
        
          > .menu {
            position: absolute !important;
            top: 48px !important;
            left: 58px !important;
            bottom: auto !important;
            box-sizing: border-box;
            width: 228px;
            margin: 0;
            border-width: 0 1px 1px 1px;
            border-style: solid;
            border-color: #dee2e6;
            border-radius: 0;
            border-bottom-right-radius: 4px;
            padding: 0;
            
            a {
              padding-left: 40px !important;
            }
          }
          
          &.upward {
          
            > .text {
              border-radius: 0;
              border-bottom-right-radius: 4px;
            }
            
            > .menu {
              top: auto !important;
              bottom: 48px !important;
              border-width: 1px 1px 0 1px;
              border-radius: 0;
              border-top-right-radius: 4px;
            }
          }
        }
      }
    }
  }
`
export const LeftMenuContainer = styled(Container)`
  padding: 0 10px;
  
  .scrollbar-container {
    height: calc(100vh - 70px);
    flex-grow: 1;
    flex-shrink: 1;
  }
  
  .container.bottom {
    height: 70px;
    flex-grow: 0;
    flex-shrink: 0;
    
    a.item {
      margin: 10px 0 !important;
    }
  }
`
export const MainContainer = styled(Container)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
export const ContentContainer = styled(Container)`
  /* padding: 0 20px; */
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`
export const FlexContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 300px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`
export const LogoImage = styled(Image)`
  width: 177px;
  margin: 33px auto 31px;
`
export const CircularLabel = styled(Label)`
  position: absolute;
  top: -0.7em;
  left: auto;
  right: -0.7em;
  bottom: auto;
  width: 21px;
  height: 21px;
  background-color: #f16844 !important;
  font-size: 0.7142857rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
  
  &.ui.orange.label {
    background-color: #f16844 !important;
  }
`
export const MainTitle = styled(Header)`
  margin: 0 !important;
  padding: 24px 0 !important;
  font-size: 25px !important;
  font-weight: 400 !important;
  color: #000;
  line-height: 31px;
`