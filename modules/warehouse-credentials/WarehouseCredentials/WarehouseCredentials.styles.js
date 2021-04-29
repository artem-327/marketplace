import styled from 'styled-components'
import { Form, Header, Label } from 'semantic-ui-react'
import { ChevronDown, ChevronUp } from 'react-feather'

export const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
  padding: 20px 30px 10px;
`

export const IconDown = styled(ChevronDown)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  vertical-align: -4px;
  color: #848893;
`

export const IconUp = styled(ChevronUp)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  vertical-align: -4px;
  color: #848893;
`

export const CertificationLabel = styled(Label)`
  position: relative;
  width: auto;
  height: 22px;
  margin: 0 0 0 5px !important;
  border-radius: 11px !important;
  border: solid 1px #dee2e6 !important;
  padding: 2px 13px 3px 25px !important;
  background-color: #f8f9fb !important;
  vertical-align: top !important;
  font-size: 12px !important;
  font-weight: normal !important;
  font-style: normal;
  color: #848893 !important;
  line-height: 1.33 !important;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #84c225;
  }
  
  &.pending:before {
    content: "?";
    background: #ffc65d;
    vertical-align: middle;
    text-align: center;
    font-weight: 900;
    color: #fff;
    line-height: 16px;
  }
  
  &.certified:after {
    content: "";
    position: absolute;
    top: 4px;
    left: 7px;
    transform-clip: 50% 50%;
    transform: rotate(45deg);
    width: 6px;
    height: 10px;
    border-width: 0 2px 2px 0;
    border-style: solid;
    border-color: #fff;
  }
`

export const CertHeader = styled(Header)`
  margin: 0 -1rem !important;
  border-top: 1px solid #dee2e6 !important;
  padding: 10px 1em !important;
  font-size: 1em !important;
  font-weight: 700 !important;
  line-height: 1.42857 !important;

  &:first-child {
    border-top: 0 none !important;
    padding-top: 0 !important;
  }
`

export const Warehouse = styled.div`
  position: relative;
  float: left;
  width: calc((100% - 1em) / 2);
  height: 60px;
  margin: 0 0 15px;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 12px 22px 14px 52px;
  background-color: #f8f9fb;
  font-size: 14px;
  color: #20273a;
  line-height: 18px;

  > svg {
    position: absolute;
    top: 21px;
    left: 19px;
    width: 18px;
    height: 18px;
    color: #20273a;
  }

  > label {
    display: block !important;
    margin: 0 !important;
    font-size: 12px;
    color: #848893;
    line-height: 16px;
  }

  + div {
    float: right;
    width: calc((100% - 1em) / 2) !important;
  }
`

export const FileName = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  margin: 0 0 15px;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 12px 22px 14px 52px;
  background-color: #f8f9fb;
  font-size: 14px;
  color: #20273a;
  line-height: 18px;

  > svg {
    position: absolute;
    top: 21px;
    left: 19px;
    width: 18px;
    height: 18px;
    color: #20273a;

    &.download {
      left: auto;
      right: 12px;
      display: none;
      width: 18px;
      color: #2599d5;
    }
  }

  > label,
  > div > label {
    display: block !important;
    margin: 0 !important;
    font-size: 12px;
    color: #848893;
    line-height: 16px;
  }
  
  > div {
    position: absolute;
    top: -1px;
    left: 57%;
    width: auto;
    height: 60px;
    margin: 0 0 15px;
    border: 0 none;
    padding: 12px 22px 14px 52px;
    background-color: transparent;
    font-size: 14px;
    color: #20273a;
    line-height: 18px;
    
    + div {
      left: 73%;
    }
  }

  &.clickable {
    cursor: pointer;

    > svg.download {
      display: block;
    }

    > label {
      cursor: pointer;
    }
  }
`

export const EpaWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin: 0 0 15px;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 12px 22px 14px 19px;
  background-color: #f8f9fb;
  font-size: 14px;
  color: #20273a;
  line-height: 18px;
  
  &:after {
    content: "";
    display: block;
  }

  > label,
  > div > label {
    display: block !important;
    margin: 0;
    font-size: 12px;
    color: #848893;
    line-height: 16px;
  }
  
  > div {
    flex-grow: 0;
    flex-shrink: 0;
    width: auto;
    height: 34px;
    margin: -1px 0;
    border: 0 none;
    padding: 0 20px 0 0;
    background-color: transparent;
    font-size: 14px;
    color: #20273a;
    line-height: 18px;
    
    &:last-child {
      flex-shrink: 1;
      overflow: hidden;
      padding-right: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`

export const FormArea = styled(Form)`
  clear: both;

  &.ui.form .fields > .field {
    flex-grow: 1 !important;
    flex-shrink: 1 !important;
    flex-basis: 50px !important;
    display: flex;
    flex-flow: column;
    width: 0;

    > * {
      flex-grow: 0 !important;
      flex-basis: auto !important;
    }

    div {
      flex: 1 0 50px;
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      
      &.ui.input.disabled {
        opacity: 1;
      }

      input {
        flex: 1 0 50px;
        width: 0;
        
        &:disabled {
          opacity: 1;
          border-color: rgba(222, 226, 230, 0.45);
          color: #000; //rgba(0, 0, 0, 0.87);
        }
      }
    }
  }
`

export const ButtonGroup = styled.div`
  padding: 10px 0 1em;
  text-align: right;

  button {
    margin: 0 0 0 1rem !important;
  }
`
