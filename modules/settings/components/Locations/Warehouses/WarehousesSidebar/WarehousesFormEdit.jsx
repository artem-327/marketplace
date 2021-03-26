import PropTypes from 'prop-types'
import { Header, FormGroup, Image } from 'semantic-ui-react'
import { Input, Checkbox, TextArea, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
//Components
import { Required } from '../../../../../../components/constants/layout'
import { AddressForm } from '../../../../../address-form'
import { PhoneNumber } from '../../../../../phoneNumber'
import { TimeInput } from '../../../../../../components/custom-formik'
import UploadAttachment from '../../../../../inventory/components/upload/UploadAttachment'
import RedIcon from '../../../../../../assets/images/orders/list-red.png'
import GreenIcon from '../../../../../../assets/images/orders/list-green.png'
//Services
import { getSafe } from '../../../../../../utils/functions'
import { addCertificateAttachment } from './Warehouses.services'
//Styles
import {
  DivHeader,
  SegmentCustom,
  SegmentCertifications,
  HorizontalRule,
  DivBrowseFile,
  DivIcon,
  ImageResized
} from '../../Locations.styles'

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
const WarehousesFormEdit = ({
  intl,
  formikProps,
  sidebarValues,
  addAttachment,
  addDeaAttachment,
  addTaxExemptAttachment,
  loadFile,
  removeAttachment,
  attachmentFiles,
  setAttachmentFiles,
  listDocumentTypes,
  toastManager
}) => {
  const { formatMessage } = intl
  const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps
  const deaDocumentType = 17
  const taxExemptionType = 13
  const fileMaxSize = 20
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
        noBorder
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
        <FormattedMessage id='settings.certifications' defaultMessage='Certifications' />
      </DivHeader>
      <SegmentCertifications>
        <FormGroup data-test='settings_warehouse_popup_certifications_dea_drpdn'>
          <Dropdown
            label={formatMessage({
              id: 'settings.certifications.isCertifiedToDEA',
              defaultMessage: 'Is this location certified to receive DEA List I chemicals?'
            })}
            name='deaListReceiveFlag'
            options={[
              {
                text: formatMessage({ id: 'global.no', defaultMessage: 'No' }),
                value: false
              },
              {
                text: formatMessage({ id: 'global.yes', defaultMessage: 'Yes' }),
                value: true
              }
            ]}
          />
        </FormGroup>
        {values.deaListReceiveFlag && (
          <>
            <p>
              <FormattedMessage
                id='settings.certifications.dea.paragraph'
                defaultMessage='Any location receiving chemicals published on the DEA List I must provide the appropriate certifications before an order can be placed.  You may upload the certifications below for verification.'
              />
            </p>
            <UploadAttachment
              {...sidebarValues}
              attachments={formikProps.values.attachments.filter(
                att => getSafe(() => att.documentType.id, 0) === deaDocumentType
              )}
              //removeAttachment={removeAttachment}
              hideAttachments={true}
              edit={getSafe(() => sidebarValues.id, '')}
              name='attachments'
              type={deaDocumentType.toString()}
              filesLimit={1}
              fileMaxSize={20}
              //listDocumentTypes={this.props.listDocumentTypes}
              noWrapperStyles
              onChange={files => {
                addCertificateAttachment(files, sidebarValues.id, listDocumentTypes, toastManager, formikProps, {
                  loadFile,
                  addAttachment: addDeaAttachment
                })
                formikProps.setFieldValue('deaListCertificateFile', files[0].name)
              }}
              onRemoveFile={async id => {
                await formikProps.setFieldValue(
                  'attachments',
                  formikProps.values.reduce((filteredAttachments, att) => {
                    if (att.documentType !== deaDocumentType) filteredAttachments.push(att)

                    return filteredAttachments
                  }, [])
                )
              }}
              data-test='settings_warehouse_popup_certifications_dea_file'
              emptyContent={
                <DivBrowseFile background='white'>
                  {formikProps.values.deaListCertificateFile ? formikProps.values.deaListCertificateFile : (
                    <FormattedMessage id='settings.certifications.dea.fileText' defaultMessage='DEA List I' />
                  )}
                  <DivIcon>
                    <ImageResized src={sidebarValues.deaListReceive ? GreenIcon : RedIcon} />
                  </DivIcon>
                </DivBrowseFile>
              }
              uploadedContent={
                <DivBrowseFile>
                  {formikProps.values.deaListCertificateFile ? formikProps.values.deaListCertificateFile : (
                    <FormattedMessage id='settings.certifications.dea.fileText' defaultMessage='DEA List I' />
                  )}
                  <DivIcon>
                    <ImageResized src={sidebarValues.deaListReceive ? GreenIcon : RedIcon} />
                  </DivIcon>
                </DivBrowseFile>
              }
            />
          </>
        )}
        <HorizontalRule />
        <FormGroup data-test='settings_warehouse_popup_certifications_tax_drpdn'>
          <Dropdown
            label={formatMessage({
              id: 'settings.certifications.taxExemptPurchase',
              defaultMessage:
                'Will this location receive tax exempt purchases? (not applicable for AK, OR, MT, VT or DE)'
            })}
            name='taxExemptReceiveFlag'
            options={[
              {
                text: formatMessage({ id: 'global.no', defaultMessage: 'No' }),
                value: false
              },
              {
                text: formatMessage({ id: 'global.yes', defaultMessage: 'Yes' }),
                value: true
              }
            ]}
          />
        </FormGroup>
        {values.taxExemptReceiveFlag && (
          <>
            <p>
              <FormattedMessage
                id='settings.certifications.dea.paragraph'
                defaultMessage='Any location receiving chemicals published on the DEA List I must provide the appropriate certifications before an order can be placed.  You may upload the certifications below for verification.'
              />
            </p>
            <UploadAttachment
              {...sidebarValues}
              attachments={formikProps.values.attachments.filter(
                att => getSafe(() => att.documentType.id, 0) === taxExemptionType
              )}
              //removeAttachment={removeAttachment}
              hideAttachments={true}
              edit={getSafe(() => sidebarValues.id, '')}
              name='attachments'
              type={taxExemptionType.toString()}
              filesLimit={1}
              fileMaxSize={fileMaxSize}
              //listDocumentTypes={this.props.listDocumentTypes}
              noWrapperStyles
              onChange={files => {
                addCertificateAttachment(files, sidebarValues.id, listDocumentTypes, toastManager, formikProps, {
                  loadFile,
                  addAttachment: addTaxExemptAttachment
                })
                formikProps.setFieldValue('taxExemptCertificateFile', files[0].name)
              }}
              onRemoveFile={async id => {
                await formikProps.setFieldValue(
                  'attachments',
                  formikProps.values.reduce((filteredAttachments, att) => {
                    if (att.documentType !== taxExemptionType) filteredAttachments.push(att)

                    return filteredAttachments
                  }, [])
                )
              }}
              data-test='settings_warehouse_popup_certifications_dea_file'
              emptyContent={
                <DivBrowseFile background='white'>
                  {formikProps.values.taxExemptCertificateFile ? formikProps.values.taxExemptCertificateFile : (
                    <FormattedMessage id='settings.certifications.taxExempt.fileText' defaultMessage='State Exempt Certificate' />
                  )}
                  <DivIcon>
                    <ImageResized src={sidebarValues.taxExemptReceive ? GreenIcon : RedIcon} />
                  </DivIcon>
                </DivBrowseFile>
              }
              uploadedContent={
                <DivBrowseFile>
                  {formikProps.values.taxExemptCertificateFile ? formikProps.values.taxExemptCertificateFile : (
                    <FormattedMessage id='settings.certifications.taxExempt.fileText' defaultMessage='State Exempt Certificate' />
                  )}
                  <DivIcon>
                    <ImageResized src={sidebarValues.taxExemptReceive ? GreenIcon : RedIcon} />
                  </DivIcon>
                </DivBrowseFile>
              }
            />
          </>
        )}
      </SegmentCertifications>

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
  sidebarValues: PropTypes.object,
  addAttachment: PropTypes.func,
  loadFile: PropTypes.func
}

WarehousesFormEdit.defaultProps = {
  intl: {},
  formikProps: {},
  sidebarValues: null,
  addAttachment: () => {},
  loadFile: () => {}
}

export default withToastManager(WarehousesFormEdit)
