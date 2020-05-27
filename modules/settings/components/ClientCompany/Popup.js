import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CompanyModal } from '~/modules/company-form/'
import { updateClientCompany, createClientCompany, closePopup } from '~/modules/settings/actions'
class Popup extends Component {
  onSubmit = (values, isEdit) => {
    const requestBody = {}
    const propsToInclude = [
      'associations',
      'businessType',
      'cin',
      'dba',
      'dunsNumber',
      'nacdMember',
      'name',
      'phone',
      'tin',
      'website',
      'primaryBranch',
      'primaryUser',
      'mailingBranch'
    ]
    propsToInclude.forEach(prop => (values[prop] ? (requestBody[prop] = values[prop]) : null))

    return new Promise(async (resolve, reject) => {
      const { updateClientCompany, createClientCompany } = this.props
      let data = null
      try {
        if (isEdit) data = await updateClientCompany(requestBody, values.id)
        else data = await createClientCompany(requestBody)
        resolve(data)
      } catch (error) {
        reject(error)
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
