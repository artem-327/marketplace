import React from 'react'
import styled from 'styled-components'
import { Input } from 'formik-semantic-ui-fixed-validation'

import {
  Grid,
  GridRow,
  GridColumn,
  Label,
  Segment,
  List,
  Button
} from 'semantic-ui-react'

export const TableSegment = styled(Segment)`
  margin: 0;

  &.ui.segment {
    padding: 10px 15px;
    border-radius: 4px;
    border: solid 1px #dee2e6;
    background-color: #f8f9fb;
    box-shadow: none;
  }
`

export const StyledRectangle = styled.div`
  padding: 11px 15px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  
  .header {
    font-size: 12px;
    color: #848893;
  }
  
  .name {
    font-size: 14px;
    color: #20273a;
    font-weight: bold;
  }
  
  .name {
    font-size: 14px;
    color: #20273a;
    line-height: 1.57;
  }
`

export const StyledList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: space-between;
    margin: 0;
    &:nth-child(n+2) {
      border-top: 1px solid rgba(34, 36, 38, 0.15);
    }

    > .item {
      flex-grow: 1;
      padding: 1px 15px !important;

      .header {
        margin: 0;
        padding: 0 0 3px;
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: 1.1666667;
      }

      .description {
        font-size: 14px;
        font-weight: bold;
        color: #20273a;
        line-height: 1.2142857;
        
        &.green {
          color: #84c225;
        }
      }
    }
  }
`

export const InputWrapper = styled.div`
  td > & {
    position: relative;
    min-width: 107px;
    height: 22px;
    margin: 0 -5px;

    * {
      max-height: 100%;
    }

    > div {
      position: absolute !important;
      top: -5px;
      bottom: -5px;
      width: 100%;
      height: 32px !important;
      max-height: 32px !important;
    }

    div {
      > .field {
        // .ui.input input {
        box-sizing: border-box;
        max-width: 100%;
        padding: 5px 30px 5px 13px;
        background-color: #fdfdfd;
        font-size: 14px;
        line-height: 1.4285714;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        &[type='number'] {
          -moz-appearance: textfield;
        }
      }
      // }

      > .ui.label {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 24px;
        height: 24px;
        border-radius: 2px;
        padding: 0;
        background-color: rgba(132, 194, 37, 0.15);
        text-align: center;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        color: #84c225;
        line-height: 24px;
      }
    }
  }

  > .field-label {
    margin: 0em 0em 0.428571429em 0em;
    font-size: 1em;
    line-height: 1.29;
    color: #404040;
  }
  div {
    position: relative;

    > .field {
      margin: 0 !important;

      .ui.input input {
        padding-left: 47px;
        background-color: #fdfdfd;
      }
    }
    > .ui.label {
      padding: 0.5em 0.7142857em;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      text-align: center;
      color: #848893;
      border-radius: 2px;
      background-color: #edeef2;
      position: absolute;
      top: 6px;
      left: 6px;
    }
  }
`

export const PriceInput = ({ name, inputProps, label, currencyLabel }) => {
  return (
    <InputWrapper>
      {label && (<div className='field-label'>{label}</div>)}
      <div>
        <Input
          inputProps={inputProps}
          name={name}
        />
        <Label>{currencyLabel}</Label>
      </div>
    </InputWrapper>
  )
}

