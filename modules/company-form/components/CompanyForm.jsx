import React, { Component } from 'react'
import { FormGroup, Popup } from 'semantic-ui-react'
import { Input, Checkbox, Dropdown } from 'formik-semantic-ui'
import { FormattedMessage, injectIntl } from 'react-intl'

class CompanyForm extends Component {

  componentDidMount() {
    if (this.props.data.length === 0) this.props.getBusinessTypes()
  }

  render() {
    let { intl, loading, data } = this.props

    const { formatMessage } = intl

    return (
      <>
        <FormGroup widths='equal'>
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
            name='businessType.id' />
        </FormGroup>
        <FormGroup widths='equal'>
          <Input label={<FormattedMessage id='company.dba' defaultMessage='Doing Business As' />} name='dba' />
          <Input label={<FormattedMessage id='company.duns' defaultMessage='DUNS Number' />} name='dunsNumber' />
        </FormGroup>


        <FormGroup widths='equal'>
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

        <FormGroup widths='equal'>
          <Input label={<FormattedMessage id='global.websiteUrl' defaultMessage='Website URL' />} name='website' />
          <Input label={<FormattedMessage id='global.phone' defaultMessage='Phone' />} name='phone' />
        </FormGroup>


        <FormGroup widths='equal'>
          <Checkbox label={formatMessage({ id: 'global.nacdNumber', defaultMessage: 'NACD Number' })} name='nacdMember' />
        </FormGroup>
      </>
    )
  }
}


export default injectIntl(CompanyForm)