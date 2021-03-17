import styled from 'styled-components'
import { Form, Header, Label } from 'semantic-ui-react'
import { ChevronDown, ChevronUp } from 'react-feather'

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
    display: block;
    margin: 0;
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
  
  > label {
    display: block;
    margin: 0;
    font-size: 12px;
    color: #848893;
    line-height: 16px;
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
      
      input {
        flex: 1 0 50px;
        width: 0;
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