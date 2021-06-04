import styled from 'styled-components'
import { Menu, Grid, Tab, Popup, Input, Dropdown, Button, Image } from 'semantic-ui-react'
import Calendar from 'react-calendar'


export const DivGraph = styled.div`
  margin: 10px;
`

export const GraphTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`
export const GraphSubTitle = styled.div`
  font-size: 12px;
  font-style: italic;
  text-align: center;
  color: #848893;
  margin-bottom: 10px;
`

export const CustomGrid = styled(Grid)`
  flex-shrink: 0;
  margin: 15px !important;
`

export const UpperCaseText = styled.div`
  text-transform: uppercase;
`

export const DivContainerGraph = styled.div`
  //width: 100%;
  height: 580px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;

  [class*='LineGraph'] {
    min-height: 479px;

    [class*='LineGraph'] {
      min-height: 0;
    }
  }
`

export const TabPane = styled(Tab.Pane)`
  display: contents !important;
  width: 100% !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: 0 !important;
  border: 0 !important;
  background-color: #ffffff;
`

export const Select = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: auto;
  height: 40px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0 37px 0 14px;
  background: #ffffff;
  font-size: 14px;
  color: #848893;
  line-height: 38px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 12px;
    right: 14px;
    transform: rotate(-45deg);
    display: block;
    width: 10px;
    height: 10px;
    border-width: 0 0 2px 2px;
    border-style: solid;
    border-color: #dee2e6;
  }

  &:hover:after {
    border-color: #2599d5;
  }
`

export const DateGrid = styled(Grid)`
  box-sizing: border-box;
  min-width: 710px;
  max-width: 710px;
  padding: 20px;
`

export const QuickFilter = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-bottom: 2px;
  border-radius: 4px;
  padding: 0 20px;
  background: #eff1f5;
  font-size: 13px;
  color: #222222;
  line-height: 40px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover,
  &.active {
    background: #2599d5;
    color: #ffffff;
  }
`

export const StyledCalendar = styled(Calendar)`
  /* Calendar.css */
  &.react-calendar {
    width: 350px;
    max-width: 100%;
    background: white;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  &.react-calendar--doubleView {
    width: 700px;
  }
  &.react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  &.react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  &.react-calendar,
  &.react-calendar *,
  &.react-calendar *:before,
  &.react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  &.react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  &.react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now {
    background: #ffff76;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
  /* End of Calendar.css */

  &.react-calendar {
    border: 0 none;

    abbr[title] {
      text-transform: capitalize;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
    }

    button {
      width: 32px;
      height: 32px;
      padding: 0;
      text-align: center;
      font-size: 13px;
      line-height: 32px;

      &:hover,
      &:focus {
        border-radius: 4px;
        box-shadow: inset 0 0 0 16px #2599d9;
        color: #ffffff;
      }
    }
  }

  .react-calendar__navigation {
    height: 32px;
    margin: 24px 0 0;

    button {
      min-width: 32px;

      &.react-calendar__navigation__prev2-button,
      &.react-calendar__navigation__next2-button {
        display: none !important;
      }

      &.react-calendar__navigation__prev-button,
      &.react-calendar__navigation__next-button {
        position: relative;
        overflow: hidden;
        display: block;
        text-align: left;
        text-indent: -5000px;

        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: 50% 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          display: block;
          box-sizing: border-box;
          width: 11px;
          height: 11px;
          border-style: solid;
          border-color: #222222;
        }

        &:hover:after {
          border-color: #ffffff;
        }
      }

      &.react-calendar__navigation__prev-button:after {
        margin-left: 2px;
        border-width: 2px 0 0 2px;
      }

      &.react-calendar__navigation__next-button:after {
        margin-left: -2px;
        border-width: 0 2px 2px 0;
      }

      .react-calendar__navigation__label__labelText--from,
      .react-calendar__navigation__label__labelText--to {
        width: 160px;
        height: 32px;
        border-radius: 4px;
        text-align: center;
        font-size: 13px;
        font-weight: 700;
        color: #222222;
        line-height: 32px;
      }

      .react-calendar__navigation__label__labelText--from {
        float: left;
      }

      .react-calendar__navigation__label__labelText--to {
        float: right;
      }

      &.react-calendar__navigation__label {
        &:focus {
          background: transparent;
          box-shadow: 0 0 0 0 transparent;
          color: #222222;

          .react-calendar__navigation__label__labelText--from,
          .react-calendar__navigation__label__labelText--to {
            background-color: transparent;
            color: #222222;
          }
        }

        &:hover {
          background: transparent;
          box-shadow: 0 0 0 0 transparent;
          color: #222222;

          .react-calendar__navigation__label__labelText--from,
          .react-calendar__navigation__label__labelText--to {
            background-color: #2599d9;
            color: #ffffff;
          }
        }
      }
    }
  }

  .react-calendar__month-view {
    width: 224px !important;

    + .react-calendar__month-view {
      margin-left: auto;
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    width: 32px;
    height: 32px;
    padding: 0;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: #222222;
    line-height: 32px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #222222;
  }

  .react-calendar__tile--now {
    &,
    &.react-calendar__tile--hover {
      background: transparent;
    }
  }

  &.react-calendar--selectRange {
    .react-calendar__tile--now {
      &.react-calendar__tile--hover {
        background: #e6e6e6;
      }
    }
  }

  .react-calendar__tile--range,
  .react-calendar__tile--active {
    background: #eff1f5;
    color: #222222;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    border-radius: 4px;
    background-clip: border-box;
    background: #eff1f5;
    box-shadow: inset 0 0 0 16px #2599d9;
    font-weight: 700;
    color: #ffffff;
  }
`

export const StatsTypeSelect = styled(Dropdown)`
  > .menu {
    > .item {
      border: none !important;
      margin: 0 !important;
    }
  }
`

export const StyledTab = styled(Tab)`
  & > .ui.pointing.secondary.menu {
    min-height: 50px !important;
    margin: 0 -20px !important;
    padding: 0 5px 0 20px !important;
  }
`

export const RightChartControl = styled.div`
  display: flex;
  margin: auto;
  margin-right: 0;
  height: 40px;
`

export const GraphTypeSwitch = styled.div`
  display: inline-block;
  margin: auto 10px;

  .ui.button {
    height: 32px;
    min-width: 32px;
    padding: 6px !important;
    text-align: center;
  }

  &.line-graph {
    .ui.left.button {
      background-color: #2599d5;
      border: solid 1px #2599d5;
      > svg {
        color: #ffffff;
      }
    }
    .ui.right.button {
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      > svg {
        color: #20273a;
      }
    }
  }
  &.bar-graph {
    .ui.left.button {
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      > svg {
        color: #20273a;
      }
    }
    .ui.right.button {
      background-color: #2599d5;
      border: solid 1px #2599d5;
      > svg {
        color: #ffffff;
      }
    }
  }
`

export const DivFlex = styled.div`
  display: flex;
`

export const ButtonLeftArrows = styled(Button)`
  width: 40px;
  height: 38px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  margin-left: 10px !important;
  margin-right: 0 !important;
  padding: 0 !important;
`

export const ButtonRightArrows = styled(Button)`
  width: 40px;
  height: 38px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  padding: 0 !important;
`

export const RectanglePieGraph = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
`

export const DivPieGraphHeader = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: solid 1px #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 23px;
`

export const DivPieGraphTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
`

export const ButtonViewAll = styled(Button)`
  width: 80px;
  height: 32px;
  border-radius: 3px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
  border: solid 1px #dee2e6 !important;
  background-color: #ffffff !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  line-height: 1.54 !important;
  text-align: center !important;
  color: #848893 !important;
  padding: 0 !important;
`

export const DivPieGraphCircle = styled.div`
  height: 55%;
  width: 100%;
`

export const DivPieGraphLegend = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 2.14;
  color: #848893;
  padding: 0 25px;
`

export const DivRowLegend = styled.div`
  display: flex;
`

export const DivTextLegend = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const DivNumberLegend = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 2.14;
  color: #242424;
`

export const DivValueLegend = styled.div`
  display: flex;
`

export const DivOval = styled.div`
  margin-right: 9px;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: #2599d5;
  color: #fff;
`

export const DivOvalLegend = styled.div`
  display: flex;
  align-items: center;
`

export const DivAfterNumberLegend = styled.div`
  margin-left: 5px;
  font-size: 14px;
  line-height: 2.14;
  color: #848893;
`

export const DivTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #20273a;
  &:hover {
    overflow: visible;
  }
`

export const RectangleSummary = styled.div`
  width: 100%;
  height: 103px;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;

  &[style*='pointer']:hover [class*='DivNumbers'] {
    color: #2599d5;
  }
`

export const RectangleSummaryHeader = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
`

export const DivIcon = styled.div`
  height: 100%;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border: solid 5px #c5ebff;
  background-color: #2599d5;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: relative;
  text-align: center; */
`

export const DivSummary = styled.div`
  width: 200px;
  height: 100px;
  background-color: #ffffff;
`

export const DivNumbers = styled.div`
  opacity: 0.89;
  font-size: 32px;
  font-weight: bold;
  line-height: 1.25;
  color: #242424;
  padding-top: 25px;
`

export const DivTotalText = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: #848893;
`

export const RectangleSummaryBottom = styled.div`
  width: 100%;
  height: 50px;
  border-top: solid 1px #dee2e6;
  background-color: #f8f9fb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`

export const DivTotalTextBottom = styled.div`
  font-size: 12px;
  line-height: 1.67;
  color: #848893;
`
