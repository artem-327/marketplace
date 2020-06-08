import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CompanyModal } from '~/modules/company-form/'
import { updateClientCompany, createClientCompany, closePopup } from '~/modules/settings/actions'
import { postCompanyLogo, deleteCompanyLogo, getCompanyLogo } from '~/modules/company-form/actions'
import { getSafe } from '~/utils/functions'

class Popup extends Component {
  state = {
    companyLogo: null
  }

  async componentDidMount() {
    if (this.props.companyId) {
      try {
        const companyLogo = await this.props.getCompanyLogo(this.props.companyId)
        if (companyLogo.value.data.size) this.setState({ companyLogo: companyLogo.value.data })
      } catch (error) {
        console.error(error)
      }
    }
  }

  onSubmit = (values, isEdit) => {
    const requestBody = {}
    const propsToInclude = [
      'associations',
      'businessType',
      'cin',
      'dba',
      'dunsNumber',
      'enabled',
      'name',
      'phone',
      'tin',
      'website',
      'primaryBranch',
      'primaryUser',
      'mailingBranch'
    ]
    propsToInclude.forEach(prop => (values[prop] ? (requestBody[prop] = values[prop]) : null))
    if (getSafe(() => requestBody.associations[0].id, '')) {
      requestBody.associations = requestBody.associations.map(association => association.id)
    }
    if (isEdit) {
      delete requestBody.primaryUser
      delete requestBody.primaryBranch
    }

    return new Promise(async (resolve, reject) => {
      const { updateClientCompany, createClientCompany, postCompanyLogo, deleteCompanyLogo } = this.props
      let data = null
      try {
        if (isEdit) {
          if (this.state.shouldUpdateLogo) {
            if (this.state.companyLogo) {
              postCompanyLogo(values.id, this.state.companyLogo)
            } else {
              deleteCompanyLogo(values.id)
            }
          }
          data = await updateClientCompany(requestBody, values.id)
        } else {
          if (this.state.companyLogo) {
            let reader = new FileReader()
            reader.onload = async function () {
              const loadedLogo = btoa(reader.result)
              data = await createClientCompany(requestBody)
              await postCompanyLogo(data.id, this.state.companyLogo)
            }
            reader.readAsBinaryString(this.state.companyLogo)
          } else {
            data = await createClientCompany(requestBody)
          }
        }
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  selectLogo = (logo, isNew = true) => {
    this.setState({ companyLogo: logo, shouldUpdateLogo: isNew })
  }

  removeLogo = () => {
    this.setState({ companyLogo: null, shouldUpdateLogo: true })
  }

  render() {
    const { selectLogo, removeLogo } = this
    const { companyLogo } = this.state
    return (
      <CompanyModal
        selectLogo={selectLogo}
        removeLogo={removeLogo}
        companyLogo={companyLogo}
        onSubmit={this.onSubmit}
        isClientCompany
        header={{ id: 'global.clientCompany', defaultMessage: 'Guest Company' }}
        closePopupClientCompany={this.props.closePopup}
      />
    )
  }
}

const mapDispatchToProps = {
  updateClientCompany,
  createClientCompany,
  closePopup,
  postCompanyLogo,
  deleteCompanyLogo,
  getCompanyLogo
}

const mapStateToProps = state => {
  return {
    companyId: getSafe(() => state.settings.popupValues.id, '')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
