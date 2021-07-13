import styled from 'styled-components'
import { HighSegment } from '../../../../../inventory/styles'
import { Menu } from 'semantic-ui-react'

export const HighSegmentCustom = styled(HighSegment)`
  margin: 0 !important;
  z-index: 1;

  &.add-form {
    padding: 1.071428571em 2.142857143em !important;
    font-size: 14px;
    font-weight: 500;
    color: #20273a;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
    background-color: #ffffff !important;
    display: flex !important;
    flex-direction: row !important;
  }

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

export const DivRectangle = styled.div`
  border-radius: 4px;
  border: solid 1px orange;
  background-color: #ffffff;
  margin: 14px 0 20px 0;
  align-items: center;
  display: block;
  padding: 13px 11px;
`

export const DivTitleCustom = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #20273a;
  display: flex;
`

export const DivContentCustom = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  padding-left: 33px;
`

export const DivInTitleCustom = styled.div`
  padding-left: 10px;
`

export const MenuCustom = styled(Menu)`
  padding-left: 30px !important;
  margin: 0 !important;
`
