import React, { Component } from 'react'
import { FormGroup, FormField, Popup, Image, Dropdown } from 'semantic-ui-react'
import { Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'

class CompanyForm extends Component {
  state = {
    associations: []
  }
  componentDidMount() {
    this.loadCompanyLogo()
    if (this.props.data.length === 0) this.props.getBusinessTypes()
    const dataGrid = {
      filters: [],
      pageSize: 50
    }
    if (!this.props.associations.length) this.props.getAssociations(dataGrid)
    if (this.props.values.associations) {
      this.setState({
        associations: this.props.values.associations.map(assoc => assoc.id)
      })
    }
  }

  loadCompanyLogo = async () => {
    if (this.props.hasLogo && this.props.selectLogo && this.props.getCompanyLogo) {
      const companyLogo = await this.props.getCompanyLogo(this.props.companyId)

      if (companyLogo.value.data.size) this.props.selectLogo(companyLogo.value.data)
    }
  }

  getCompanyLogo = () => {
    if (this.props.companyLogo) {
      const file = new Blob([this.props.companyLogo], { type: this.props.companyLogo.type })
      let fileURL = URL.createObjectURL(file)

      return (
        <FormField>
          <FormattedMessage id='global.preview' defaultMessage='Preview' />
          <Image src={fileURL} size='small' />
        </FormField>
      )
    }

    return null
  }

  getMimeType = documentName => {
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
        return false
    }
  }

  selectLogo = file => {
    if (this.getMimeType(file.name)) {
      this.props.selectLogo(file)
    } else {
      this.props.toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='errors.notImage.header' defaultMessage='File not Uploaded' />,
          <FormattedMessage
            id='errors.notImage.content'
            defaultMessage={`File ${file.name} you are uploading is not in the desired format. Please select a picture in format: (gif, jpg, png, svg)`}
            values={{ name: file.name }}
          />
        ),
        {
          appearance: 'error'
        }
      )
    }
  }

  removeLogo = () => {
    this.props.removeLogo()
  }

  render() {
    let {
      intl,
      loading,
      data,
      setFieldValue,
      values,
      setFieldTouched,
      errors,
      touched,
      isSubmitting,
      getAssociations,
      associations
    } = this.props
    let { selectLogo, removeLogo } = this

    const { formatMessage } = intl

    return (
      <>
        <FormGroup widths='equal' data-test='company_form_legalCompanyName_inp'>
          <Input
            label={
              <>
                <FormattedMessage id='company.legalCompanyName' defaultMessage='Legal Company Name' />
                <Required />
              </>
            }
            name='name'
          />
          <Dropdown
            options={data.map(type => ({
              text: type.name,
              value: type.id,
              key: type.id
            }))}
            inputProps={{
              loading,
              clearable: true
            }}
            label={<FormattedMessage id='company.businessType' defaultMessage='Business Type' />}
            name='businessType.id'
            data-test='company_form_businessType_drpdn'
          />
        </FormGroup>
        <FormGroup widths='equal' data-test='company_form_dbaDuns_inp'>
          <Input label={<FormattedMessage id='company.dba' defaultMessage='Doing Business As' />} name='dba' />
          <Input label={<FormattedMessage id='company.duns' defaultMessage='DUNS Number' />} name='dunsNumber' />
        </FormGroup>

        <FormGroup widths='equal' data-test='company_form_tinCin_inp'>
          <Input
            label={
              <Popup
                content={
                  <FormattedMessage id='company.tooltip.orEin' defaultMessage='or Employer Identification Number' />
                }
                trigger={
                  <label>
                    <FormattedMessage id='company.tin' defaultMessage='Tax Identification Number' />
                  </label>
                }
              />
            }
            name='tin'
          />

          <Input
            label={
              <Popup
                content={
                  <FormattedMessage
                    id='company.tooltip.notRequiredIfSame'
                    defaultMessage='Not required unless different from TIN'
                  />
                }
                trigger={
                  <label>
                    <FormattedMessage id='company.cin' defaultMessage='Company Identification Number' />
                  </label>
                }
              />
            }
            name='cin'
          />
        </FormGroup>

        <FormGroup widths='equal' data-test='company_form_websiteUrlPhone_inp'>
          <Input
            label={
              <>
                <FormattedMessage id='global.websiteUrl' defaultMessage='Website URL' />
              </>
            }
            name='website'
          />
          <PhoneNumber
            label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
            name='phone'
            values={values}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
          />
        </FormGroup>

        <FormGroup widths='equal'>
          <Checkbox
            label={formatMessage({ id: 'global.nacdMember', defaultMessage: 'NACD Member' })}
            name='nacdMember'
            data-test='company_form_nacdNumber_chckb'
          />

          {this.props.admin && (
            <Checkbox
              label={formatMessage({
                id: 'company.purchaseHazmatEligible ',
                defaultMessage: 'Purchase Hazardous Materials'
              })}
              name='purchaseHazmatEligible'
              data-test='company_form_purchaseHazmatEligible_chckb'
            />
          )}
        </FormGroup>
        <FormGroup widths={this.props.admin && 'equal'} data-test='company_form_associationMembership_upload_inp'>
          {this.props.admin && (
            <FormField className='upload-input' width={!this.props.admin && 8}>
              <Dropdown
                options={
                  associations && associations.length
                    ? associations.map(assoc => ({
                        text: assoc.name,
                        value: assoc.id,
                        key: assoc.id
                      }))
                    : []
                }
                clearable
                multiple
                search
                selection
                value={this.state.associations}
                onChange={(e, data) => {
                  e.preventDefault()
                  this.setState({
                    associations: data.value
                  })
                  setFieldValue('associations', data.value)
                }}
                label={<FormattedMessage id='company.associationMembership' defaultMessage='Association Membership' />}
                name='associations'
                data-test='company_form_association_drpdn'
              />
            </FormField>
          )}
          <FormField className='upload-input' width={!this.props.admin && 8}>
            <label htmlFor='field_input_phone'>
              <span>Company Logo</span>
            </label>
            <UploadLot
              {...this.props}
              attachments={this.props.companyLogo ? [this.props.companyLogo] : []}
              name={`companyLogo`}
              filesLimit={1}
              fileMaxSize={0.2}
              onChange={files => (files.length ? selectLogo(files[0]) : null)}
              removeAttachment={removeLogo}
              emptyContent={
                <FormattedMessage id='addInventory.clickUpload' defaultMessage='Click to upload' tagName='a' />
              }
            />
          </FormField>
          {this.getCompanyLogo()}
        </FormGroup>
      </>
    )
  }
}

export default withToastManager(injectIntl(CompanyForm))
