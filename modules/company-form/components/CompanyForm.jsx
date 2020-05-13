import React, { Component } from 'react'
import { FormGroup, FormField, Popup, Image, Dropdown, Grid, GridRow, GridColumn, Button } from 'semantic-ui-react'
import { Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { getSafe } from '~/utils/functions'
import styled from 'styled-components'
import { Trash, UploadCloud } from 'react-feather'

const LogoWrapper = styled.div`
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  
  > .ui.grid {
    margin: 20px;
    &.admin {
      margin: 20px 100px;
    }

    > .row {
      padding: 5px 0;
      > .column {
        padding: 0 5px;
        
        .ui.button {
          border-radius: 3px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
          border: solid 1px #dee2e6;
          background-color: #ffffff;
          padding: 4px 10px;
          color: #848893;
          
          &.delete {
            color: #f16844;
          }
          
          > svg {
            width: 18px;
            height: 20px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  
  .uploadAttachment.has-file .dropzoneLotHasFile {
    background-color: #f8f9fb;
    > img {
      display: unset;
    }
  }
  
  > div.logo-hint {
    display: flex;
    flex-direction: column;
    padding: 16px 20px; 
    border-top: solid 1px #dee2e6;
    background-color: #f8f9fb;
    font-size: 12px;
    text-align: center;
    color: #848893;
  }
`

class CompanyForm extends Component {
  state = {
    associations: [],
    businessType: {
      id: ''
    }
  }
  async componentDidMount() {
    this.loadCompanyLogo()
    try {
      if (!getSafe(() => this.props.data.length, false)) await this.props.getBusinessTypes()
      if (!getSafe(() => this.props.associations.length, false))
        await this.props.getAssociations({ filters: [], pageSize: 50 })
    } catch (error) {
      console.error(error)
    }

    this.setState({
      businessType: { id: getSafe(() => this.props.values.businessType.id, '') },
      associations: getSafe(() => this.props.values.associations.length, false)
        ? this.props.values.associations.map(assoc => assoc.id)
        : []
    })
  }

  loadCompanyLogo = async () => {
    if (this.props.hasLogo && this.props.selectLogo && this.props.getCompanyLogo) {
      const companyLogo = await this.props.getCompanyLogo(this.props.companyId)

      if (companyLogo.value.data.size) this.props.selectLogo(companyLogo.value.data, false)
    }
  }

  getCompanyLogo = () => {
    if (this.props.companyLogo) {
      const file = new Blob([this.props.companyLogo], { type: this.props.companyLogo.type })
      let fileURL = URL.createObjectURL(file)

      return (
        <Image src={fileURL} size='small' />
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

  renderCompanyFields = () => {
    let {
      intl,
      loading,
      data,
      setFieldValue,
      values,
      setFieldTouched,
      errors,
      touched,
      isSubmitting
    } = this.props
    const { formatMessage } = intl

    return (
      <>
        <FormGroup widths='equal' data-test='company_form_legalCompanyName_inp'>
          <FormField className='upload-input' width={8}>
            <Input
              label={
                <>
                  <FormattedMessage id='company.legalCompanyName' defaultMessage='Legal Company Name' />
                  <Required />
                </>
              }
              name='name'
            />
          </FormField>
          <FormField className='upload-input' width={8}>
            <label htmlFor='field_dropdown_associations'>
              <FormattedMessage id='company.businessType' defaultMessage='Business Type' />
            </label>
            <Dropdown
              options={
                data && data.length
                  ? data.map(type => ({
                    text: type.name,
                    value: type.id,
                    key: type.id
                  }))
                  : []
              }
              clearable
              loading={loading}
              selection
              value={this.state.businessType.id}
              onChange={(e, data) => {
                e.preventDefault()
                this.setState({
                  businessType: { id: data.value }
                })
                setFieldValue('businessType.id', data.value)
              }}
              name='businessType.id'
              data-test='company_form_businessType_drpdn'
            />
          </FormField>
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

        <FormGroup widths='equal' >
          <Checkbox
            label={formatMessage({ id: 'global.enabled', defaultMessage: 'Enabled' })}
            name='enabled'
            data-test='company_form_enabled_chckb'
          />
          <Checkbox
            label={formatMessage({ id: 'global.nacdMember', defaultMessage: 'NACD Member' })}
            name='nacdMember'
            data-test='company_form_nacdMember_chckb'
          />
        </FormGroup>
      </>
    )
  }

  renderAdminFields = () => {
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
      associations
    } = this.props
    const { formatMessage } = intl

    return (
      <>
        <FormGroup widths='equal' data-test='company_form_legalCompanyName_inp'>
          <FormField className='upload-input' >
            <Input
              label={
                <>
                  <FormattedMessage id='company.legalCompanyName' defaultMessage='Legal Company Name' />
                  <Required />
                </>
              }
              name='name'
            />
          </FormField>
        </FormGroup>
        <FormGroup widths='equal' data-test='company_form_dbaDuns_inp'>
          <FormField className='upload-input' >
            <label htmlFor='field_dropdown_associations'>
              <FormattedMessage id='company.businessType' defaultMessage='Business Type' />
            </label>
            <Dropdown
              options={
                data && data.length
                  ? data.map(type => ({
                    text: type.name,
                    value: type.id,
                    key: type.id
                  }))
                  : []
              }
              clearable
              loading={loading}
              selection
              value={this.state.businessType.id}
              onChange={(e, data) => {
                e.preventDefault()
                this.setState({
                  businessType: { id: data.value }
                })
                setFieldValue('businessType.id', data.value)
              }}
              name='businessType.id'
              data-test='company_form_businessType_drpdn'
            />
          </FormField>
          <Input label={<FormattedMessage id='company.dba' defaultMessage='Doing Business As' />} name='dba' />
        </FormGroup>

        <FormGroup widths='equal' data-test='company_form_tinCin_inp'>
          <Input label={<FormattedMessage id='company.duns' defaultMessage='DUNS Number' />} name='dunsNumber' />
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
        </FormGroup>

        <FormGroup widths='equal' data-test='company_form_websiteUrlPhone_inp'>
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
          <Input
            label={
              <>
                <FormattedMessage id='global.websiteUrl' defaultMessage='Website URL' />
              </>
            }
            name='website'
          />
        </FormGroup>

        <FormGroup widths='equal'>
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
          <FormField className='upload-input' >
            <label htmlFor='field_dropdown_associations'>
              <FormattedMessage id='company.associationMembership' defaultMessage='Association Membership' />
            </label>
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
              loading={loading}
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
              name='associations'
              data-test='company_form_association_drpdn'
            />
          </FormField>
        </FormGroup>

        <FormGroup widths='equal'>
          <Checkbox
            label={formatMessage({ id: 'global.enabled', defaultMessage: 'Enabled' })}
            name='enabled'
            data-test='company_form_enabled_chckb'
          />
          <Checkbox
            label={formatMessage({ id: 'global.nacdMember', defaultMessage: 'NACD Member' })}
            name='nacdMember'
            data-test='company_form_nacdMember_chckb'
          />
          <Checkbox
            label={formatMessage({
              id: 'company.purchaseHazmatEligible ',
              defaultMessage: 'Purchase Hazardous Materials'
            })}
            name='purchaseHazmatEligible'
            data-test='company_form_purchaseHazmatEligible_chckb'
          />
        </FormGroup>
      </>
    )
  }

  renderLogo = () => {
    let { selectLogo, removeLogo } = this

    const hasLogo = !!this.props.companyLogo
    const isAdmin = !!this.props.admin

    return (
      <div>
        <label>
          <FormattedMessage id='global.companyLogo' defaultMessage='Company Logo' />
        </label>
        <LogoWrapper>
          <Grid className={isAdmin ? 'admin' : ''}>
            {!isAdmin && (
              <GridRow>
                <GridColumn style={{ textAlign: 'center' }}>
                  <label>
                    <FormattedMessage
                      id='company.logoDescription'
                      defaultMessage='This is how your logo looks on the Web Portal'
                    />
                  </label>
                </GridColumn>
              </GridRow>
            )}

            <GridRow>
              <GridColumn>
                <UploadAttachment
                  {...this.props}
                  attachments={this.props.companyLogo ? [this.props.companyLogo] : []}
                  name={`companyLogo`}
                  filesLimit={1}
                  fileMaxSize={0.2}
                  onChange={files => (files.length ? selectLogo(files[0]) : null)}
                  removeAttachment={removeLogo}
                  hideAttachments
                  emptyContent={
                    <FormattedMessage id='addInventory.clickUpload' defaultMessage='Click to upload' tagName='a' />
                  }
                  uploadedContent={this.getCompanyLogo()}
                />
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn width={8}>
                <Button
                  className='delete'
                  disabled={!hasLogo}
                  type='button'
                  fluid
                  onClick={() => removeLogo()}
                >
                  <Trash />
                  <FormattedMessage id='company.logoButtonDelete' defaultMessage='Delete'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </GridColumn>
              <GridColumn width={8}>
                <Button
                  type='button'
                  fluid
                  onClick={() => /* */ console.log('Change/Upload click')}
                >
                  <UploadCloud />
                  {
                    hasLogo
                      ? (
                        <FormattedMessage id='company.logoButtonChange' defaultMessage='Change'>
                          {text => text}
                        </FormattedMessage>
                      )
                      : (
                        <FormattedMessage id='company.logoButtonUpload' defaultMessage='Upload'>
                          {text => text}
                        </FormattedMessage>
                      )
                  }
                </Button>
              </GridColumn>
            </GridRow>

          </Grid>
          <div className='logo-hint'>
            <label>
              <FormattedMessage
                id='company.logoHintRow1'
                defaultMessage='Minimum resolution 100 x 50 px in transparent PNG'
              />
            </label>
            <label>
              <FormattedMessage
                id='company.logoHintRow2'
                defaultMessage='Use the logo color that matches with dark backgrounds'
              />
            </label>
          </div>
        </LogoWrapper>
      </div>
    )
  }

  render() {
    if (this.props.admin) {
      return (
        <>
          {this.renderAdminFields()}
          {this.renderLogo()}
        </>
      )
    } else {
      return (
        <Grid>
          <GridRow>
            <GridColumn width={4}>
              {this.renderLogo()}
            </GridColumn>
            <GridColumn width={12}>
              {this.renderCompanyFields()}
            </GridColumn>
          </GridRow>
        </Grid>
      )
    }
  }
}

export default withToastManager(injectIntl(CompanyForm))
