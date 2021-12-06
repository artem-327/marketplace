import PropTypes from 'prop-types'
import { Header, FormGroup } from 'semantic-ui-react'
import { Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage } from 'react-intl'
//Components
import { Required } from '../../../../../../components/constants/layout'
import { AddressForm } from '../../../../../address-form/'
import { PhoneNumber } from '../../../../../phoneNumber'
//Styles
import { DivHeader, SegmentCustom } from '../../Locations.styles'

const customHeader = (
  <DivHeader>
    <FormattedMessage id='global.address' defaultMessage='Address' />
  </DivHeader>
)

/**
 * Form content for edit or add branch.
 * @category Settings - Locations - Branches
 * @component
 */
const BranchesForm = ({ intl, formikProps, sidebarValues, disableCountryProvince }) => {
  const { formatMessage } = intl
  const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps

  return (
    <>
      <FormGroup widths='equal' data-test='settings_branches_popup_name_inp'>
        <Input
          type='text'
          label={
            <>
              <FormattedMessage id='settings.branchName' defaultMessage='Branch Name' />
              <Required />
            </>
          }
          name='deliveryAddress.addressName'
          inputProps={{
            placeholder: formatMessage({
              id: 'settings.warehouses.enterBranchName',
              defaultMessage: 'Enter Branch Name'
            })
          }}
        />
      </FormGroup>

      <AddressForm
        prefix={'deliveryAddress'}
        noBorder
        required={true}
        setFieldValue={setFieldValue}
        values={values}
        displayHeader={false}
        customHeader={customHeader}
        bacgroundColor={'#ffffff; !important'}
        initialZipCodes={[
          {
            key: values.zipID.toString(),
            value: values.deliveryAddress.address.zip,
            text: values.deliveryAddress.address.zip
          }
        ]}
        disableCountry={disableCountryProvince}
        disableProvince={disableCountryProvince}
        countryHint={disableCountryProvince
          ? (
            <FormattedMessage
              id='settings.stateAndCountryHint'
              defaultMessage='State and Country values cannot be changed for existing branch.'
            />
            )
          : null
        }
        provinceHint={disableCountryProvince
          ? (
            <FormattedMessage
              id='settings.stateAndCountryHint'
              defaultMessage='State and Country values cannot be changed for existing branch.'
            />
          )
          : null
        }
      />
      <DivHeader>
        <FormattedMessage id='settings.contactInfo' defaultMessage='Contact Info' />
      </DivHeader>

      <SegmentCustom>
        <FormGroup data-test='settings_branches_popup_contactName_inp'>
          <Input
            type='text'
            label={
              <>
                {formatMessage({ id: 'global.contactName', defaultMessage: 'Contact Name' })}
                <Required />
              </>
            }
            name='deliveryAddress.contactName'
            fieldProps={{ width: 16 }}
            inputProps={{
              placeholder: formatMessage({
                id: 'settings.warehouses.enterContactName',
                defaultMessage: 'Enter Contact Name'
              })
            }}
          />
        </FormGroup>
        <FormGroup widths='equal' data-test='settings_branches_popup_phoneEmail_inp'>
          <PhoneNumber
            background='#fdfdfd !important;'
            name='deliveryAddress.contactPhone'
            values={values}
            label={
              <>
                {<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                <Required />
              </>
            }
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
          />
          <Input
            type='text'
            label={
              <>
                {formatMessage({ id: 'global.contactEmail', defaultMessage: 'Contact Email' })}
                <Required />
              </>
            }
            name='deliveryAddress.contactEmail'
            inputProps={{
              placeholder: formatMessage({
                id: 'settings.warehouses.enterEmailAddress',
                defaultMessage: 'Enter Email Address'
              })
            }}
          />
        </FormGroup>
      </SegmentCustom>

      {!sidebarValues && (
        <FormGroup data-test='settings_branches_popup_contactName_inp'>
          <Checkbox
            label={formatMessage({
              id: 'settings.alsoCreateAsPickUpLocation',
              defaultMessage: 'Also create as Warehouse'
            })}
            name='alsoCreate'
            inputProps={{ 'data-test': 'settings_branches_popup_pick_up_location_chckb' }}
          />
        </FormGroup>
      )}
    </>
  )
}

BranchesForm.propTypes = {
  intl: PropTypes.object,
  formikProps: PropTypes.object,
  sidebarValues: PropTypes.object,
  disableCountryProvince: PropTypes.bool
}

BranchesForm.defaultProps = {
  intl: {},
  formikProps: {},
  sidebarValues: null,
  disableCountryProvince: false
}

export default BranchesForm
