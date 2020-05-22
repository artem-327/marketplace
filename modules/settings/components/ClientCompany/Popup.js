import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CompanyModal } from '~/modules/company-form/'
import { updateClientCompany, createClientCompany, closePopup } from '~/modules/settings/actions'
class Popup extends Component {
  onSubmit = (values, isEdit) => {
    const requestBody = {}
    if (values.associations) requestBody.associations = values.associations
    if (values.businessType) requestBody.businessType = values.businessType
    if (values.cin) requestBody.cin = values.cin
    if (values.dba) requestBody.dba = values.dba
    if (values.dunsNumber) requestBody.dunsNumber = values.dunsNumber
    if (values.nacdMember) requestBody.nacdMember = values.nacdMember
    if (values.name) requestBody.name = values.name
    if (values.phone) requestBody.phone = values.phone
    if (values.tin) requestBody.tin = values.tin
    if (values.website) requestBody.website = values.website
    if (values.primaryBranch) requestBody.primaryBranch = values.primaryBranch
    if (values.primaryUser) requestBody.primaryUser = values.primaryUser
    if (values.mailingBranch) requestBody.mailingBranch = values.mailingBranch

    return new Promise(async (resolve, _reject) => {
      const { updateClientCompany, createClientCompany } = this.props
      let data = null
      try {
        if (isEdit) data = await updateClientCompany(requestBody, values.id)
        else data = await createClientCompany(requestBody)
        resolve(data)
      } catch (error) {
        _reject(error)
      }
    })
  }
  render() {
    return (
      <CompanyModal
        onSubmit={this.onSubmit}
        isClientCompany
        header={{ id: 'global.clientCompany', defaultMessage: 'Client Company' }}
        closePopupClientCompany={this.props.closePopup}
      />
    )
  }
}

const mapDispatchToProps = { updateClientCompany, createClientCompany, closePopup }

export default connect(null, mapDispatchToProps)(Popup)
