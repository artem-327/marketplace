import React from 'react'
import { connect } from 'react-redux'
import { updateCompany, createCompany } from '~/modules/admin/actions'

import { CompanyModal } from '~/modules/company-form/'
class Popup extends React.Component {
  onSubmit = (values, isEdit) => {
    const { updateCompany, createCompany } = this.props

    return new Promise(async (resolve, _reject) => {
      let data = null
      
      if (isEdit) data = await updateCompany(values.id, values)
      else data = await createCompany(values)

      resolve(data)
    })
  }
  render() {
    return <CompanyModal onSubmit={this.onSubmit} header={{ id: 'global.company', defaultMessage: 'Company' }} />
  }
}

const mapDispatchToProps = {
  updateCompany,
  createCompany
}

export default connect(null, mapDispatchToProps)(Popup)
