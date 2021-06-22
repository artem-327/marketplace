import styled from 'styled-components'
import { GridColumn, Segment, Form } from 'semantic-ui-react'

export const FixyWrapper = styled.div`
    position: relative;
    transform: translateY(0);
    height: 100%;
`

export const AdminSegment = styled(Segment)`
    height: auto !important;
    margin-bottom: 42px !important;
    padding-bottom: 0 !important;
`

export const PositionHeaderSettings = styled.div`
    position: relative;
    z-index: 602;
`

export const DivCustomRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: -5px;
    flex-wrap: wrap;
    
    > div {
        align-items: top;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .column {
        margin: 5px;
    }
    
    input, .ui.dropdown {
        height: 40px;
    }
    
    .ui.button {
        height: 40px;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
        border: solid 1px #dee2e6;
        background-color: #ffffff;
        color: #848893;
        display: flex;
        align-items: center;
        &:hover {
            background-color: #f8f9fb;
            color: #20273a;
            }
            &:active {
            background-color: #edeef2;
            color: #20273a;
        }

        svg {
            width: 18px;
            height: 20px;
            margin-right: 10px;
            vertical-align: top;
            color: inherit;
        }

        &.light {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
            border: solid 1px #dee2e6;
            background-color: #ffffff;
            color: #848893;
            &:hover {
                background-color: #f8f9fb;
                color: #20273a;
            }
            &:active {
                background-color: #edeef2;
                color: #20273a;
            }
        }

        &.primary {
            box-shadow: none;
            border: none;
            color: #ffffff;
            background-color: #2599d5;
            &:hover {
                background-color: #188ec9;
            }
            &:active {
                background-color: #0d82bc;
            }
        }
    }
`

export const GridColumnEmail = styled(GridColumn)`
  .field {
    margin-bottom: 2px !important;
  }
`

export const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`