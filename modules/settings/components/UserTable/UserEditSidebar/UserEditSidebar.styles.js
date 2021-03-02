import styled from 'styled-components'
import { Sidebar, GridColumn, Segment } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'


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
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
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
