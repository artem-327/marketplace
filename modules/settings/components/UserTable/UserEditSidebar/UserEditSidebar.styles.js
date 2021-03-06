import styled from 'styled-components'
import { Sidebar, GridColumn, Segment, GridRow } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import {
  SidebarFlex,
  DivFlexContent,
  SegmentCustomContent,
  DivBottomSidebar,
  DimmerSidebarOpend,
  DivHeader
} from '../../Locations/Locations.styles'
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
  padding-top: 0px !important;
  padding-bottom: 0px !important;
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

export const DivNotify = styled.div`
  font-size: 14px;
  font-style: italic;
  color: #848893;
  border-bottom: solid 1px #dee2e6;
  padding-bottom: 12px;
  margin-bottom: 12px;
  margin-top: -10px !important;
`

export const HighSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  z-index: 1;
`

export const GridColumnRoles = styled(GridColumn)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
`

export const GridRowRoles = styled(GridRow)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
`

export const DivHeaderCustom = styled(DivHeader)`
  margin-bottom: 20px !important;
  margin-top: 0px !important;
`

export const DivLabel = styled.div`
  margin-bottom: 5px !important;
`

export const DivSectionSign = styled.div`
  display: flex;
  flex-flow: row;
  height: 60px;
  margin: 5px 7px;
  padding: 10px 15px;
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f5f7fa;
`
export const DivSignImageColumn = styled.div`
  margin: auto 39px auto 0;
`

export const DivSectionSignColumn = styled.div`
  margin: 0 11px;
`

export const DivSectionSignHeader = styled.div`
  color: #848893;
  font-size: 12px;
  white-space: nowrap;
`

export const DivSectionSignDescription = styled.div`
  font-size: 14px;
  color: #20273a;
`