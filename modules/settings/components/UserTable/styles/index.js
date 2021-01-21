import styled from 'styled-components'
import { Sidebar, GridColumn, Segment } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'

/**
 * @css display: flex;
 * @css flex-direction: column;
 * @css background-color: #ffffff;
 * @css top: 80px !important;
 * @css padding-bottom: 80px;
 * @css box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
 * @css z-index: 1000 !important;
 * @css text-align: left;
 * @css font-size: 14px;
 * @css (&.full-screen-sidebar)   top: 0 !important;
 * @css (&.full-screen-sidebar)    padding-bottom: 0px;
 */
export const SidebarFlex = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;

  &.full-screen-sidebar {
    top: 0 !important;
    padding-bottom: 0px;
  }
`
/**
 * @css padding: 1.071428571em 2.142857143em;
 * @css font-size: 14px;
 * @css font-weight: 500;
 * @css color: #20273a;
 * @css box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
 * @css background-color: #ffffff;
 * @css text-transform: uppercase;
 * @css display: flex;
 * @css flex-direction: row;
 * @css (svg) font-size: 18px;
 * @css (svg) vertical-align: middle;
 * @css (svg.title-icon)  margin-left: 15px;
 * @css (svg.title-icon)  color: #cecfd4;
 * @css (svg.close-icon)  right: 0;
 * @css (svg.close-icon)  position: absolute;
 * @css (svg.close-icon)  width: 18px;
 * @css (svg.close-icon)  height: 18px;
 * @css (svg.close-icon)  cursor: pointer;
 */
export const DivHighSegment = styled.div`
  padding: 1.071428571em 2.142857143em;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  background-color: #ffffff;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;

  svg {
    font-size: 18px;
    vertical-align: middle;
  }

  svg.title-icon {
    margin-left: 15px;
    color: #cecfd4;
  }

  svg.close-icon {
    right: 0;
    position: absolute;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`
/**
 *@css  flex: 1;
 *@css overflow-x: hidden;
 *@css overflow-y: auto;
 *@css padding: 30px;
 *@css (.ui.grid)  margin: 0 -5px;
 *@css (.row)   padding: 7.5px 0;
 *@css (.column)  padding: 0 5px;
 *@css (.field .ui.checkbox)   margin-bottom: 9px;
 *@css (.field .ui.checkbox label)    color: #848893;
 *@css (.field .ui.checkbox &.checked label)     color: #20273a;
 *@css (.field .field label)    color: #546f93;
 */
export const DivFlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 30px;

  .ui.grid {
    margin: 0 -5px;
    .row {
      padding: 7.5px 0;
    }
    .column {
      padding: 0 5px;
    }
  }

  .field {
    .ui.checkbox {
      margin-bottom: 9px;
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
    .field {
      label {
        color: #546f93;
      }
    }
  }
`
/**
 * @css display: inline-block;
 * @css position: relative;
 * @css overflow: visible;
 * @css margin: 0;
 * @css box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
 * @css padding: 10px 25px;
 * @css text-align: right;
 * @css (.ui.button) height: 40px;
 * @css (.ui.button) border-radius: 3px;
 * @css (.ui.button) font-weight: 500;
 * @css (.ui.button) color: #848893;
 * @css (.ui.button) margin: 0 5px;
 * @css (.ui.button) align-items: center;
 * @css (.ui.button &.light)    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
 * @css (.ui.button &.light)    border: solid 1px #dee2e6;
 * @css (.ui.button &.light)    background-color: #ffffff;
 * @css (.ui.button &.light)    color: #848893;
 * @css (.ui.button &.light &:hover)    background-color: #f8f9fb;
 * @css (.ui.button &.light &:hover)   color: #20273a;
 * @css (.ui.button &.light &:active)     background-color: #edeef2;
 * @css (.ui.button &.light &:active)      color: #20273a;
 * @css (.ui.button &.secondary)   color: #ffffff;
 * @css (.ui.button &.secondary)   background-color: #2599d5;
 * @css (.ui.button &.secondary &:hover)   background-color: #188ec9;
 * @css (.ui.button &.secondary &:active)   background-color: #0d82bc;
 * @css (.ui.modal &)   margin: 30px -1.5rem -1.5rem;
 * @css (.ui.modal &)  border-top: 1px solid #dee2e6;
 * @css (.ui.modal &)  box-shadow: 0 0 0 0 transparent;
 */
export const DivBottomButtons = styled.div`
  display: inline-block;
  position: relative;
  overflow: visible;
  margin: 0;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  padding: 10px 25px;
  text-align: right;

  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    color: #848893;
    margin: 0 5px;
    align-items: center;

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
    &.secondary {
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

  .ui.modal & {
    margin: 30px -1.5rem -1.5rem;
    border-top: 1px solid #dee2e6;
    box-shadow: 0 0 0 0 transparent;
  }
`
/**
 * @css flex-grow: 0 !important;
 */
export const FormStyled = styled(Form)`
  flex-grow: 0 !important;
`
/**
 * @css (&.column.error)   color: #9f3a38;
 */
export const GridColumnWError = styled(GridColumn)`
  &.column.error {
    color: #9f3a38;
  }
`
/**
 * @css background-color: #f8f9fb !important;
 */
export const SegmentStyled = styled(Segment)`
  background-color: #f8f9fb !important;
`
