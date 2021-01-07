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
    //background-color: #f8f9fb;
    box-shadow: none;
  }
`

export const StyledRectangle = styled.div`
  padding: 11px 15px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #edeef2;
  
  .header {
    font-size: 12px;
    color: #848893;
  }
  
  .message {
    font-size: 14px;
    color: #20273a;
    font-size: 14px;
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
        <Label className={inputProps && inputProps.disabled ? 'disabled' : ''}>{currencyLabel}</Label>
      </div>
    </InputWrapper>
  )
}

export const DefaultIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <g fill="none" fill-rule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g transform="translate(-1400 -19) translate(240) translate(855 18.737) translate(137) translate(168 1)">
                <path fill="#748CAD" d="M29 29l-.094-1.875c-.125-.625-1.39-1.39-3.797-2.297-.093-.031-.172-.062-.234-.094-1.469-.53-2.234-.828-2.297-.89-.187-.125-.281-.657-.281-1.594 0-.375.14-.742.422-1.102.281-.359.5-.992.656-1.898.063-.313.156-.563.281-.75.125-.188.25-.563.375-1.125.094-.281.102-.547.024-.797-.078-.25-.117-.406-.117-.469.062-.5.125-1.015.187-1.547.063-.718-.25-1.492-.938-2.32C22.5 11.414 21.438 11 20 11c-1.438 0-2.5.414-3.188 1.242-.687.828-1 1.602-.937 2.32.063.532.125 1.047.188 1.547 0 .063-.04.22-.118.47-.078.25-.07.515.024.796.125.563.25.938.375 1.125.125.188.218.438.281.75.156.906.375 1.54.656 1.898.282.36.422.727.422 1.102v.281c0 .688-.062 1.102-.187 1.242-.125.141-.547.336-1.266.586-.531.188-.984.344-1.36.47-2.406.905-3.671 1.671-3.796 2.296C11.03 27.563 11 28.188 11 29h18z"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export const IconWrapper = styled.div`
    position: relative;
    box-sizing: content-box;
    width: 38px;
    height: 38px;
    border-radius: 20px;
    text-align: center;
    border: solid 1px #dee2e6;
    background-color: #ffffff;
    margin: -4px 0;
`

export const StyledName = styled.div`
  margin: -4px 0;
  
  .name {
    font-size: 14px;
    font-weight: 500;
    color: #2599d5;
  }
  
  .company {
    font-size: 12px;
    font-weight: normal;
    color: #848893;
  }
`

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const HistoryRow = styled(GridRow)`
  &.row {
    box-shadow: 0 1px 0 0 #dee2e6;
  }
`

export const HistoryDetailGrid = styled(Grid)`
  &.ui.grid {
    margin: 0;
  
    .row {
      margin: 0;
      padding: 7.5px 0;
      
      .column {
        margin: 0;
        padding: 0 10px;  
      }  
    }
  }
`

export const HistoryDetailRow = styled(GridRow)`
  &.row {
    padding: 6.5px 0 !important;
  }
  
  .column {
    display: flex !important;
    align-items: center !important;
  }
`