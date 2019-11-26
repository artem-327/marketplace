import React, { Component } from 'react'
import { object, func, number } from 'prop-types'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { FormGroup, Header, Popup, Button, Icon } from 'semantic-ui-react'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { beneficialOwner, maxBeneficialOwners } from '~/constants/beneficialOwners'

import { AddressForm } from '~/modules/address-form/'
import { DateInput } from '~/components/custom-formik'

const RightAlignedDiv = styled.div`
  text-align: right !important;
`

class BeneficialOwnersForm extends Component {
  getBeneficialOwners = (values, setFieldValue) => {
    let beneficialOwners = []
    let {
      intl: { formatMessage }
    } = this.props

    for (let i = 0; i < this.props.beneficialOwnersCount; i++) {
      beneficialOwners.push(
        <>
          <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_namePostal_inp'>
            <Input
              inputProps={{ fluid: true }}
              label={formatMessage({ id: 'global.firstName', defaultMessage: 'First Name' })}
              name={`beneficialOwners[${i}].firstName`}
            />
            <Input
              inputProps={{ fluid: true }}
              label={formatMessage({ id: 'global.lastName', defaultMessage: 'Last Name' })}
              name={`beneficialOwners[${i}].lastName`}
            />
          </FormGroup>
          <AddressForm
            countryPopup={{
              disabled: false,
              content: (
                <FormattedMessage
                  id='settings.dwollaOnlyForUSA'
                  defaultMessage='Dwolla is only supported for companies located in USA.'
                />
              )
            }}
            values={values}
            setFieldValue={setFieldValue}
            index={i}
            prefix={`beneficialOwners`}
            displayHeader={false}
            additionalCountryInputProps={{ disabled: true }}
          />

          <FormGroup widths='equal' data-test='settings_dwolla_beneficialOwner_nameSsn_inp'>
            <Input
              inputProps={{ placeholder: '123-45-6789', fluid: true }}
              label={formatMessage({ id: 'settings.ssn', defaultMessage: 'SSN' })}
              name={`beneficialOwners[${i}].ssn`}
            />
            <DateInput
              inputProps={{ fluid: true }}
              label={formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })}
              name={`beneficialOwners[${i}].dateOfBirth`}
            />
          </FormGroup>
        </>
      )
    }

    return beneficialOwners
  }

  handleOwnerCountChange = (direction = 0, values) => {
    let { beneficialOwnersCount } = this.props
    if (beneficialOwnersCount + direction > 0 && beneficialOwnersCount + direction <= maxBeneficialOwners) {
      let { beneficialOwners } = values
      direction === -1 ? beneficialOwners.pop() : beneficialOwners.push(beneficialOwner)

      this.props.handleOwnerCountChange(values)
    }
  }

  handleFormReset = values => {
    let { dwollaController, ...rest } = values
    let beneficialOwners = values.beneficialOwners.slice()

    if (beneficialOwners.length === this.props.beneficialOwnersCount) return

    beneficialOwners.length < this.props.beneficialOwnersCount
      ? beneficialOwners.push(beneficialOwner)
      : beneficialOwners.pop()

    let nextValues = {
      beneficialOwners,
      dwollaController,
      ...rest
    }

    this.props.handleOwnerCountChange(nextValues)
  }

  render() {
    let { values, setFieldValue } = this.props
    return (
      <>
        {this.getBeneficialOwners(values, setFieldValue).map((owner, i) => (
          <>
            <Header as='h3'>
              <FormattedMessage
                id='settings.beneficialOwnerNum'
                defaultMessage={`Beneficial owner # ${i + 1}`}
                values={{ num: i + 1 }}
              />
            </Header>
            {owner}
          </>
        ))}
        <RightAlignedDiv>
          <Popup
            trigger={
              <Button
                type='button'
                negative
                disabled={this.props.beneficialOwnersCount === 1}
                onClick={() => this.handleOwnerCountChange(-1, values)}
                icon>
                <Icon name='minus' />
              </Button>
            }
            content={<FormattedMessage id='settings.removeBeneficialOwner' defaultMessage='Remove beneficial owner' />}
          />

          <Popup
            trigger={
              <Button
                type='button'
                positive
                disabled={this.props.beneficialOwnersCount === maxBeneficialOwners}
                onClick={() => this.handleOwnerCountChange(1, values)}
                icon>
                <Icon name='plus' />
              </Button>
            }
            content={<FormattedMessage id='settings.addBeneficialOwner' defaultMessage='Add beneficial owner' />}
          />
        </RightAlignedDiv>
      </>
    )
  }
}

BeneficialOwnersForm.propTypes = {
  values: object.isRequired,
  setFieldValue: func.isRequired,
  handleOwnerCountChange: func.isRequired,
  beneificalOwnersCount: number.isRequired
}

export default injectIntl(BeneficialOwnersForm)
