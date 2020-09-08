import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Settings } from 'react-feather'
import { toggleColumnSettingModal } from '~/modules/inventory/actions'

const DivSetting = styled.div`
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer !important;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin: 5px;
`

const ColumnSettingButton = ({ toggleColumnSettingModal }) => {
  return (
    <DivSetting onClick={() => toggleColumnSettingModal(true)} data-test='table_setting_btn' name='setting'>
      <Settings size='20' />
    </DivSetting>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { toggleColumnSettingModal })(ColumnSettingButton)
