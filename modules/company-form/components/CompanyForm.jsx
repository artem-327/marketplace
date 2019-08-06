import React, { Component } from 'react'
import { FormGroup, FormField, Popup, Image } from 'semantic-ui-react'
import { Input, Checkbox, Dropdown } from 'formik-semantic-ui'
import { FormattedMessage, injectIntl } from 'react-intl'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'

class CompanyForm extends Component {

  componentDidMount() {
    this.props.getCompanyLogo(this.props.companyId)
    if (this.props.data.length === 0) this.props.getBusinessTypes()
  }

  getCompanyLogo = () => {
    if (this.props.companyLogo) {
      const file = new Blob([this.props.companyLogo], { type: this.props.companyLogo.type })
      let fileURL = URL.createObjectURL(file)

      return (
        <FormField>
          <label><span>Preview</span></label>
          <Image src={fileURL} size='small' />
        </FormField>
      )
    }

    return null
  }

  getMimeType = (documentName) => {
    const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)
    switch (documentExtension) {
      case 'gif':
        return 'image/gif'
      case 'png':
        return 'image/png'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'svg':
        return 'image/svg'
      default:
        return 'image/png'
    }
  }

  render() {
    let { intl, loading, data } = this.props

    const { formatMessage } = intl

    return (
      <>
        <FormGroup widths='equal' data-test='company_form_legalCompanyName_inp'>
          <Input label={<FormattedMessage id='company.legalCompanyName' defaultMessage='Legal Company Name' />} name='name' />
          <Dropdown
            options={data.map((type) => ({
              text: type.name,
              value: type.id,
              key: type.id
            }))}
            inputProps={{
              loading,
            }}
            label={<FormattedMessage id='company.businessType' defaultMessage='Business Type' />}
            name='businessType.id'
            data-test='company_form_businessType_drpdn'/>
        </FormGroup>
        <FormGroup widths='equal' data-test='company_form_dbaDuns_inp'>
          <Input label={<FormattedMessage id='company.dba' defaultMessage='Doing Business As' />} name='dba' />
          <Input label={<FormattedMessage id='company.duns' defaultMessage='DUNS Number' />} name='dunsNumber' />
        </FormGroup>


        <FormGroup widths='equal' data-test='company_form_tinCin_inp'>
          <Input label={
            <Popup
              content={<FormattedMessage id='company.tooltip.orEin' defaultMessage='or Employer Identification Number' />}
              trigger={<label><FormattedMessage id='company.tin' defaultMessage='Tax Identification Number' /></label>} />
          }
            name='tin' />

          <Input label={
            <Popup
              content={<FormattedMessage id='company.tooltip.notRequiredIfSame' defaultMessage='Not required unless different from TIN' />}
              trigger={<label><FormattedMessage id='company.cin' defaultMessage='Company Identification Number' /></label>} />
          }
            name='cin' />
        </FormGroup>

        <FormGroup widths='equal' data-test='company_form_websiteUrlPhone_inp'>
          <Input label={<FormattedMessage id='global.websiteUrl' defaultMessage='Website URL' />} name='website' />
          <Input label={<FormattedMessage id='global.phone' defaultMessage='Phone' />} name='phone' />
        </FormGroup>


        <FormGroup widths='equal'>
          <Checkbox label={formatMessage({ id: 'global.nacdNumber', defaultMessage: 'NACD Number' })} name='nacdMember'
                    data-test='company_form_nacdNumber_chckb'/>
        </FormGroup>

        <FormGroup>
          <FormField className='upload-input' width={8}>
            <label for="field_input_phone"><span>Company Logo</span></label>
            <UploadLot {...this.props}
                       attachments={this.props.companyLogo ? [this.props.companyLogo] : []}
                       name={`logo`}
                       filesLimit={1}
                       fileMaxSize={20}
                       emptyContent={(<FormattedMessage id='addInventory.clickUpload' defaultMessage='Click to upload' tagName='A' />)}
            />
          </FormField>
          {this.getCompanyLogo()}
        </FormGroup>
      </>
    )
  }
}


export default injectIntl(CompanyForm)