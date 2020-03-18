import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CompanyModal } from '~/modules/company-form/'
import { updateClientCompany, createClientCompany } from '~/modules/settings/actions'
class Popup extends Component {
  onSubmit = (values, isEdit) => {
    return new Promise(async (resolve, _reject) => {
      const { updateClientCompany, createClientCompany } = this.props
      let data = null

      if (isEdit) data = await updateClientCompany(values, values.id)
      else data = await createClientCompany(values)
      
      resolve(data)
    })
  }
  render() {
    return (
      <CompanyModal
        onSubmit={this.onSubmit}
        isClientCompany
        header={{ id: 'global.clientCompany', defaultMessage: 'Client Company' }}
      />
    )
  }
}

const mapDispatchToProps = { updateClientCompany, createClientCompany }

export default connect(null, mapDispatchToProps)(Popup)
