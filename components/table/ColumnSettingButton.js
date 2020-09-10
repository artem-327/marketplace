import React from 'react'
import { bool, func } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Settings } from 'react-feather'
import { toggleColumnSettingModal } from '~/modules/inventory/actions'

const DivSetting = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer !important;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  margin: 5px 5px 5px 9px;
  align-self: center;
`

const CustomSettings = styled(Settings)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const DivDivide = styled.div`
  height: 40px;
  border-left: solid 1px #dee2e6;
  align-self: center;
`

const ColumnSettingButton = ({ toggleColumnSettingModal, divide }) => {
  return (
    <>
      {divide && <DivDivide />}
      <DivSetting onClick={() => toggleColumnSettingModal(true)} data-test='table_setting_btn' name='setting'>
        <CustomSettings size='20' />
      </DivSetting>
    </>
  )
}

ColumnSettingButton.propTypes = {
  toggleColumnSettingModal: func,
  divide: bool
}

ColumnSettingButton.defaultProps = {
  toggleColumnSettingModal: () => {},
  divide: false
}

export default connect(null, { toggleColumnSettingModal })(ColumnSettingButton)
