import PropTypes from 'prop-types'
import { Header, FormGroup } from 'semantic-ui-react'
import { Input, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage } from 'react-intl'
//Components
import { Required } from '../../../../../../components/constants/layout'
import { AddressForm } from '../../../../../address-form'
import { PhoneNumber } from '../../../../../phoneNumber'
import { TimeInput } from '../../../../../../components/custom-formik'
//Styles
import { DivHeader, SegmentCustom } from '../../Locations.styles'

const customHeader = (
  <DivHeader>
    <FormattedMessage id='global.address' defaultMessage='Address' />
  </DivHeader>
)

/**
 * Form content for edit or add warehouse.
 * @category Settings - Locations - Warehouses
 * @component
 */
const WarehousesFormEdit = ({ intl, formikProps, sidebarValues }) => {
  const { formatMessage } = intl
  const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps

  return (
    <>
      <FormGroup widths='equal' data-test='settings_warehouse_popup_name_inp'>
        <Input
          type='text'
          label={
            <>
              <FormattedMessage id='settings.pickUpLocationName' defaultMessage='Warehouse Name' />
              <Required />
            </>
          }
          name='deliveryAddress.addressName'
          inputProps={{
            placeholder: formatMessage({
              id: 'settings.warehouses.enterWarehouseName',
              defaultMessage: 'Enter Warehouse Name'
            })
          }}
        />
      </FormGroup>

      <AddressForm
        prefix={'deliveryAddress'}
        noborder
        displayHeader={false}
        customHeader={customHeader}
        required={true}
        setFieldValue={setFieldValue}
        values={values}
        initialZipCodes={[
          {
            key: values.zipID.toString(),
            value: values.deliveryAddress.address.zip,
            text: values.deliveryAddress.address.zip
          }
        ]}
      />

      <DivHeader>
        <FormattedMessage id='settings.contactInfo' defaultMessage='Contact Info' />
      </DivHeader>
      <SegmentCustom>
        <FormGroup data-test='settings_warehouse_popup_contactName_inp'>
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
        <FormGroup widths='equal' data-test='settings_warehouse_popup_phoneEmail_inp'>
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

      <DivHeader>
        <FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' />
      </DivHeader>
      <SegmentCustom>
        <FormGroup data-test='settings_delivery_address_notes_inp'>
          <TimeInput
            label={formatMessage({ id: 'global.readyTime', defaultMessage: 'Ready Time' })}
            name='deliveryAddress.readyTime'
          />
          <TimeInput
            label={formatMessage({ id: 'global.closeTime', defaultMessage: 'Close Time' })}
            name='deliveryAddress.closeTime'
          />
        </FormGroup>
        <FormGroup widths='equal'>
          <Checkbox
            label={formatMessage({ id: 'global.liftGate', defaultMessage: 'Lift Gate' })}
            name='deliveryAddress.liftGate'
            inputProps={{ 'data-test': 'settings_delivery_address_liftGate_inp' }}
          />
        </FormGroup>
        <FormGroup widths='equal'>
          <Checkbox
            label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
            name='deliveryAddress.forkLift'
            inputProps={{ 'data-test': 'settings_delivery_address_forklift_inp' }}
          />
        </FormGroup>
        <FormGroup widths='equal'>
          <Checkbox
            label={formatMessage({ id: 'global.callAhead', defaultMessage: 'Call Ahead' })}
            name='deliveryAddress.callAhead'
            inputProps={{ 'data-test': 'settings_delivery_address_callAhead_inp' }}
          />
        </FormGroup>
        <FormGroup data-test='settings_warehouse_popup_taxId_inp'>
          <Input
            fluid
            type='text'
            label={formatMessage({ id: 'global.taxId', defaultMessage: 'Tax ID' })}
            name='taxId'
            fieldProps={{ width: 8 }}
            inputProps={{
              placeholder: formatMessage({
                id: 'settings.warehouses.enterTaxId',
                defaultMessage: 'Enter Tax ID'
              })
            }}
          />
        </FormGroup>
        <FormGroup widths='equal' data-test='settings_delivery_address_emailPhone_inp'>
          <TextArea
            name='deliveryAddress.deliveryNotes'
            label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
            inputProps={{
              placeholder: formatMessage({
                id: 'settings.warehouses.writeDeliveryNotesHere',
                defaultMessage: 'Write Delivery Notes Here'
              })
            }}
          />
        </FormGroup>
      </SegmentCustom>
      {!sidebarValues && (
        <FormGroup data-test='settings_branches_popup_contactName_inp'>
          <Checkbox
            label={formatMessage({ id: 'settings.alsoCreateAsBranch', defaultMessage: 'Also create as Branch' })}
            name='alsoCreate'
            inputProps={{ 'data-test': 'settings_branches_popup_pick_up_location_chckb' }}
          />
        </FormGroup>
      )}
    </>
  )
}

WarehousesFormEdit.propTypes = {
  intl: PropTypes.object,
  formikProps: PropTypes.object,
  sidebarValues: PropTypes.object
}

WarehousesFormEdit.defaultProps = {
  intl: {},
  formikProps: {},
  sidebarValues: null
}

export default WarehousesFormEdit
