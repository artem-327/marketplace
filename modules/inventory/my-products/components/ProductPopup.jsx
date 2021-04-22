/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Formik } from 'formik'
import { usePrevious } from '../../../../hooks'

// Components
import { Modal, Popup, Grid, GridRow, GridColumn, Divider, Dimmer, Loader } from 'semantic-ui-react'
import { Input, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import BasicButton from '../../../../components/buttons/BasicButton'
import { AttachmentManager } from '~/modules/attachments'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import ProdexGrid from '~/components/table'
import { FlexContent } from '~/modules/inventory/constants/layout'
import { X as XIcon } from 'react-feather'
import ErrorFocus from '~/components/error-focus'
import { CompanyGenericProductRequestForm } from '~/modules/company-generic-product-request'
import { Required } from '~/components/constants/layout'
import { AddBox } from '@material-ui/icons'
import { CompanyProductMixtures } from '~/components/shared-components/'
import { DisabledButtonWrapped } from '~/utils/components'

// Styles
import {
  FormStyled,
  SegmentHigh,
  DivBottomButtons,
  DivIcon,
  IconClose,
  UploadCloudIcon,
  GridStyled,
  DivTitleSegment,
  GridRowLabel,
  GridColumnFlex,
  DivCheckboxWrapper,
  InfoCustom
} from './ProductPopup.styles'

// Constants
import { COLUMNS } from './ProductPopup.constants'

// Services
import {
  formValidation,
  checkPalletParamsRequired,
  filterPackagingTypes,
  getInitialFormValues,
  handlerSubmit,
  handleSearchChange,
  handleSearchNmfcNumberChange,
  handleChangeDocumentType,
  attachDocumentsManager,
  attachDocumentsUploadAttachment,
  handleChangePackagingType
} from './ProductPopup.services'
import confirm from '~/components/Confirmable/confirm'
import { generateToastMarkup, getSafe, uniqueArrayByKey, getDesiredCasProductsProps } from '~/utils/functions'

const ProductPopup = props => {
  const [openUpload, setOpenUpload] = useState(false)
  const [documentType, setDocumentType] = useState(null)
  const [attachments, setAttachments] = useState([])
  const [loadSidebar, setLoadSidebar] = useState(false)
  const [packagingTypesReduced, setpackagingTypesReduced] = useState([])

  const state = {
    openUpload,
    setOpenUpload,
    documentType,
    setDocumentType,
    attachments,
    setAttachments,
    loadSidebar,
    setLoadSidebar,
    packagingTypesReduced,
    setpackagingTypesReduced
  }

  useEffect(() => {
    function prepareAttachments() {
      if (props.popupValues) {
        const attachments = props.popupValues.attachments.map(att => ({
          id: att.id,
          name: att.name,
          documentType: att.documentType.name,
          linked: true
        }))
        setAttachments(attachments)
      }
    }

    //async fetch data
    async function fetchData() {
      await props.getProductsCatalogRequest()
      if (props.popupValues && props.popupValues.nmfcNumber) await props.addNmfcNumber(props.popupValues.nmfcNumber)
      if (props.documentTypes.length === 0) await props.getDocumentTypes()
      prepareAttachments()
    }

    if (!props?.unitsAll?.length) fetchData()
    else if (!attachments.length && props?.popupValues?.attachments?.length) prepareAttachments()

    if (props.popupValues?.packagingUnit) {
      filterPackagingTypes(
        popupValues.packagingUnit.id,
        props.unitsAll,
        props.packagingTypesAll,
        setpackagingTypesReduced
      )
    } else {
      setpackagingTypesReduced(props.packagingType)
    }
  }, [props?.unitsAll?.length])

  const {
    closePopup,
    openGlobalAddForm,
    productsUnitsType,
    popupValues,
    freightClasses,
    intl: { formatMessage },
    companyGenericProduct,
    companyGenericProductFetching,
    nmfcNumbersFetching,
    nmfcNumbersFiltered,
    packageWeightUnits,
    documentTypes,
    toastManager,
    loading,
    datagrid
  } = props

  let editable = popupValues ? popupValues.cfProductOfferCount === 0 || !popupValues.cfProductOfferCount : true
  let allCompanyGenericProduct = uniqueArrayByKey(
    companyGenericProduct.concat(
      getSafe(() => popupValues.companyGenericProduct) ? popupValues.companyGenericProduct : []
    ),
    'id'
  )

  return (
    <Formik
      initialValues={getInitialFormValues(props)}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={() => (openGlobalAddForm ? openGlobalAddForm('') : closePopup())}
      onSubmit={(values, actions) => handlerSubmit(values, actions, props, attachments, setLoadSidebar)}
      loading={loading}>
      {formikProps => {
        let { setFieldValue, values } = formikProps
        let casProducts = getSafe(() => values.casProducts, [])
        const palletParamsRequired = checkPalletParamsRequired(values)

        return (
          <Modal open={true}>
            <FormStyled>
              <Dimmer inverted active={loading || loadSidebar}>
                <Loader />
              </Dimmer>
              <SegmentHigh>
                <>
                  <div>
                    <span>
                      {openGlobalAddForm || !popupValues ? (
                        <FormattedMessage id='createMenu.addProduct' defaultMessage='Add Product' />
                      ) : (
                        <FormattedMessage id='global.editProduct' defaultMessage='Edit Product' />
                      )}
                    </span>
                    <AddBox className='title-icon' />
                  </div>
                  <div style={{ position: 'absolute', right: '20px' }}>
                    <XIcon
                      onClick={() => (openGlobalAddForm ? openGlobalAddForm('') : closePopup())}
                      className='close-icon'
                    />
                  </div>
                </>
              </SegmentHigh>
              <FlexContent>
                <GridStyled>
                  <GridRowLabel>
                    <FormattedMessage id='productCatalog.selectProduct' defaultMessage='Select Product' />
                    <Required />
                  </GridRowLabel>

                  <GridRow>
                    <GridColumn width={10}>
                      <Dropdown
                        name='companyGenericProduct'
                        options={allCompanyGenericProduct.map(echo => ({
                          key: echo.id,
                          text: echo.name,
                          value: echo.id
                        }))}
                        inputProps={{
                          fluid: true,
                          search: val => val,
                          clearable: true,
                          selection: true,
                          loading: companyGenericProductFetching,
                          onChange: (_, { value }) =>
                            setFieldValue(
                              'casProducts',
                              getDesiredCasProductsProps(
                                getSafe(() => allCompanyGenericProduct.find(el => el.id === value).elements, [])
                              )
                            ),
                          onSearchChange: (_, { searchQuery }) => handleSearchChange(searchQuery, props),
                          placeholder: formatMessage({
                            id: 'productCatalog.typeToSearch',
                            defaultMessage: 'Type to Search...'
                          })
                        }}
                      />
                    </GridColumn>
                    <GridColumn width={6}>
                      <CompanyGenericProductRequestForm />
                    </GridColumn>
                  </GridRow>

                  {casProducts.length > 0 && (
                    <GridRow>
                      <GridColumn>
                        <>
                          <Divider />
                          <Grid>
                            <CompanyProductMixtures casProducts={casProducts} />
                          </Grid>
                          <Divider />
                        </>
                      </GridColumn>
                    </GridRow>
                  )}

                  <GridRow>
                    <GridColumn>
                      <Input
                        type='text'
                        name='intProductName'
                        label={
                          <>
                            <FormattedMessage id='global.productName' defaultMessage='Product Name' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'productCatalog.enterProductName',
                            defaultMessage: 'Enter Product Name'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn>
                      <Input
                        type='text'
                        name='intProductCode'
                        label={
                          <>
                            <FormattedMessage id='global.productCode' defaultMessage='Product Code' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'productCatalog.enterProductCode',
                            defaultMessage: 'Enter Product Code'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn>
                      <DivTitleSegment>
                        <FormattedMessage id='global.packaging' defaultMessage='Packaging' />
                      </DivTitleSegment>
                    </GridColumn>
                  </GridRow>

                  <GridRow columns={3}>
                    <GridColumn>
                      <Input
                        name='packagingSize'
                        label={
                          <>
                            <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size' />
                            <Required />
                          </>
                        }
                        inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                      />
                    </GridColumn>
                    <GridColumn>
                      <Dropdown
                        name='packagingUnit'
                        options={productsUnitsType}
                        label={
                          <>
                            <FormattedMessage id='global.packagingUnit' defaultMessage='Unit' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          'data-test': 'settings_product_popup_packagingUnit_drpdn',
                          onChange: (e, d) => {
                            setFieldValue('packagingType', '')
                            filterPackagingTypes(
                              d.value,
                              props.unitsAll,
                              props.packagingTypesAll,
                              setpackagingTypesReduced
                            )
                          },
                          placeholder: formatMessage({
                            id: 'productCatalog.selectUnit',
                            defaultMessage: 'Select Unit'
                          })
                        }}
                      />
                    </GridColumn>
                    <GridColumn>
                      <Popup
                        disabled={!!getSafe(() => formikProps.values.packagingUnit, false)}
                        position={'bottom left'}
                        content={
                          <FormattedMessage
                            id='product.packaging.selectFirst'
                            defaultMessage='Please select Packaging Unit'
                          />
                        }
                        trigger={
                          <div>
                            <Dropdown
                              name='packagingType'
                              options={packagingTypesReduced}
                              label={
                                <>
                                  <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type' />
                                  <Required />
                                </>
                              }
                              inputProps={{
                                disabled: !getSafe(() => formikProps.values.packagingUnit, false),
                                'data-test': 'settings_product_popup_packagingType_drpdn',
                                placeholder: formatMessage({
                                  id: 'productCatalog.selectType',
                                  defaultMessage: 'Select Type'
                                }),
                                onChange: (e, { value }) => {
                                  handleChangePackagingType(e, value, setFieldValue, values, props)
                                }
                              }}
                            />
                          </div>
                        }
                      />
                    </GridColumn>
                  </GridRow>

                  <GridRow columns={3}>                    
                    <GridColumn>
                      <Input
                        name='pkgTypeWeight'
                        label={
                          <>
                            <FormattedMessage id='global.pkgTypeWeight' defaultMessage='Weight (Read Only)' />
                            <Required />
                          </>
                        }
                        inputProps={{ placeholder: '0', type: 'number', min: 0, readOnly: true, disabled: !getSafe(() => formikProps.values.packagingType, false) }}
                      />
                    </GridColumn>
                    <GridColumn>
                      <Input
                        name='pkgTypeWeightUnit'
                        label={
                          <>
                            <FormattedMessage id='global.pkgTypeWeightUnit' defaultMessage='Weight Unit (Read Only)' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.pkgTypeWeightUnit',
                            defaultMessage: 'Comes from Packaging Type'
                          }),
                          readOnly: true, 
                          disabled: !getSafe(() => formikProps.values.packagingType, false)
                        }}
                      />
                    </GridColumn>

                    <GridColumn>
                      <Input
                        name='palletMaxPkgs'
                        label={
                          <>
                            <FormattedMessage id='global.palletMaxPkgs' defaultMessage='Max Pkgs per Pallet' />
                            {(palletParamsRequired || values.palletSaleOnly) && <Required />}
                          </>
                        }
                        inputProps={{ placeholder: '0', type: 'number', min: 1 }}
                      />
                    </GridColumn>
                  </GridRow>

                  <GridRow>
                    <GridColumn>
                      <DivTitleSegment>
                        <FormattedMessage id='global.freight' defaultMessage='Freight' />
                      </DivTitleSegment>
                    </GridColumn>
                  </GridRow>

                  <GridRow columns={2}>
                    <GridColumn>
                      <Input
                        name='packageWeight'
                        label={
                          <>
                            <FormattedMessage id='global.packageWeight' defaultMessage='Gross Weight Per Package' />
                            <Popup
                              content={
                                <FormattedMessage
                                  id='global.infoPackageWeight'
                                  defaultMessage="The total weight of the contents and it's packaging"
                                />
                              }
                              position='top center'
                              trigger={<InfoCustom size='12' />}
                            />
                            <Required />
                          </>
                        }
                        inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                      />
                    </GridColumn>
                    <GridColumn>
                      <Dropdown
                        name='packageWeightUnit'
                        options={packageWeightUnits}
                        label={
                          <>
                            <FormattedMessage id='global.weightUnit' defaultMessage='Weight Unit' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          'data-test': 'settings_product_popup_packageWeightUnit_drpdn',
                          placeholder: formatMessage({
                            id: 'productCatalog.selectWeightUnit',
                            defaultMessage: 'Select Weight Unit'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow columns={2}>
                    <GridColumn>
                      <Dropdown
                        options={nmfcNumbersFiltered}
                        inputProps={{
                          fluid: true,
                          search: val => val,
                          selection: true,
                          loading: nmfcNumbersFetching,
                          onSearchChange: (_, { searchQuery }) => handleSearchNmfcNumberChange(searchQuery, props),
                          placeholder: formatMessage({
                            id: 'productCatalog.selectNmfcCode',
                            defaultMessage: 'Select NMFC Code'
                          })
                        }}
                        name='nmfcNumber'
                        label={
                          <>
                            <FormattedMessage id='global.nmfcCode' defaultMessage='NMFC Code' />
                            <Required />
                          </>
                        }
                      />
                    </GridColumn>
                    <GridColumn>
                      <Dropdown
                        name='freightClass'
                        options={freightClasses}
                        label={
                          <>
                            <FormattedMessage id='global.freightClass' defaultMessage='Freight Class' />
                            <Required />
                          </>
                        }
                        inputProps={{
                          'data-test': 'settings_product_popup_freightClass_drpdn',
                          placeholder: formatMessage({
                            id: 'productCatalog.selectFreightClass',
                            defaultMessage: 'Select Freight Class'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>

                  <GridRow>
                    <GridColumnFlex>
                      <DivCheckboxWrapper>
                        <Checkbox
                          label={formatMessage({ id: 'global.stackable', defaultMessage: 'Stackable' })}
                          name='stackable'
                          inputProps={{ 'data-test': 'settings_product_popup_stackable_chckb' }}
                        />
                      </DivCheckboxWrapper>
                      <DivCheckboxWrapper>
                        <Checkbox
                          label={formatMessage({ id: 'global.hazardous', defaultMessage: 'Hazardous' })}
                          name='hazardous'
                          inputProps={{ 'data-test': 'settings_product_popup_hazardous_chckb' }}
                        />
                      </DivCheckboxWrapper>
                      <DivCheckboxWrapper>
                        <Checkbox
                          label={formatMessage({ id: 'global.freezeProtect', defaultMessage: 'Freeze Protect' })}
                          name='freezeProtect'
                        />
                      </DivCheckboxWrapper>
                    </GridColumnFlex>
                  </GridRow>

                  {!values.palletSaleOnly ? (
                    <>
                      <GridRow>
                        <GridColumn>
                          <DivTitleSegment>
                            <FormattedMessage id='global.packagingDimensions' defaultMessage='Packaging Dimensions' />
                          </DivTitleSegment>
                        </GridColumn>
                      </GridRow>

                      <GridRow columns={3}>
                        <GridColumn>
                          <Input
                            name='packagingWidth'
                            label={
                              <>
                                <FormattedMessage id='global.packageWidth' defaultMessage='Package Width' />
                                <Required />
                              </>
                            }
                            inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                          />
                        </GridColumn>
                        <GridColumn>
                          <Input
                            name='packagingHeight'
                            label={
                              <>
                                <FormattedMessage id='global.packageHeight' defaultMessage='Package Height' />
                                <Required />
                              </>
                            }
                            inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                          />
                        </GridColumn>
                        <GridColumn>
                          <Input
                            name='packagingLength'
                            label={
                              <>
                                <FormattedMessage id='global.packageLength' defaultMessage='Package Length' />
                                <Required />
                              </>
                            }
                            inputProps={{ placeholder: '0', type: 'number', min: 0 }}
                          />
                        </GridColumn>
                      </GridRow>

                      {false && (
                        <GridRow>
                          <GridColumn>
                            <Input
                              label={formatMessage({
                                id: 'global.packagesPerPallet',
                                defaultMessage: 'Packages per Pallet'
                              })}
                              name='packagesPerPallet'
                              inputProps={{ placeholder: '0', type: 'number', min: 1 }}
                            />
                          </GridColumn>
                        </GridRow>
                      )}
                    </>
                  ) : null}

                  <GridRow>
                    <GridColumn>
                      <DivTitleSegment>
                        <FormattedMessage id='global.document' defaultMessage='Document' />
                      </DivTitleSegment>
                    </GridColumn>
                  </GridRow>
                  {documentTypes.length && (
                    <>
                      <GridRow>
                        <GridColumn>
                          <div style={{ marginBottom: '6px' }}>
                            <FormattedMessage
                              id='productCatalog.chooseExistingDocument'
                              defaultMessage='Choose Existing Document'
                            />
                          </div>
                          <AttachmentManager
                            color='#20273a'
                            background='#edeef2'
                            border='none'
                            asModal
                            returnSelectedRows={rows => attachDocumentsManager(rows, values, setFieldValue, state)}
                          />
                        </GridColumn>
                      </GridRow>
                      <GridRow style={{ paddingBottom: '12.5px !important', marginTop: '12.5px !important' }}>
                        <GridColumn>
                          <Dropdown
                            name='documents.documentType'
                            closeOnChange
                            options={documentTypes}
                            inputProps={{
                              placeholder: formatMessage({
                                id: 'global.documentType.choose',
                                defaultMessage: 'Choose document type'
                              }),
                              onChange: (e, { name, value }) => {
                                handleChangeDocumentType(e, name, value, state)
                              }
                            }}
                            label={
                              <FormattedMessage
                                id='productCatalog.orUploadNewDocument'
                                defaultMessage='Or Upload New Document'
                              />
                            }
                          />
                        </GridColumn>
                      </GridRow>
                    </>
                  )}

                  {values.documents.documentType && openUpload ? (
                    <GridRow>
                      <GridColumn>
                        <UploadAttachment
                          {...props}
                          header={
                            <DivIcon onClick={() => setOpenUpload(!openUpload)}>
                              <IconClose name='close' color='grey' />
                            </DivIcon>
                          }
                          hideAttachments
                          edit={getSafe(() => popupValues.id, 0)}
                          attachments={values.documents.attachments}
                          name='documents.attachments'
                          type={documentType}
                          fileMaxSize={20}
                          onChange={files => {
                            attachDocumentsUploadAttachment(files, values, setFieldValue, state)
                          }}
                          data-test='settings_product_catalog_attachments_drop'
                          emptyContent={
                            <div style={{ margin: '25px' }}>
                              <div>
                                <UploadCloudIcon />
                              </div>
                              {formatMessage({ id: 'addInventory.dragDrop' })}
                              <br />
                              <FormattedMessage
                                id='addInventory.dragDropOr'
                                defaultMessage={'or {link} to select from computer'}
                                values={{
                                  link: (
                                    <a>
                                      <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                    </a>
                                  )
                                }}
                              />
                            </div>
                          }
                          uploadedContent={
                            <label>
                              <FormattedMessage
                                id='addInventory.dragDrop'
                                defaultMessage={'Drag and drop to add file here'}
                              />
                              <br />
                              <FormattedMessage
                                id='addInventory.dragDropOr'
                                defaultMessage={'or {link} to select from computer'}
                                values={{
                                  link: (
                                    <a>
                                      <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                    </a>
                                  )
                                }}
                              />
                            </label>
                          }
                        />
                      </GridColumn>
                    </GridRow>
                  ) : null}
                  {values.documents.attachments && (
                    <GridRow>
                      <GridColumn>
                        <ProdexGrid
                          virtual={false}
                          tableName='company_product_documents'
                          onTableReady={() => {}}
                          columns={COLUMNS}
                          normalWidth={true}
                          rows={attachments
                            .map(row => ({
                              ...row,
                              documentTypeName: row.documentType
                            }))
                            .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))}
                          rowActions={[
                            {
                              text: (
                                <FormattedMessage id='global.unlink' defaultMessage='Unlink'>
                                  {text => text}
                                </FormattedMessage>
                              ),
                              callback: async row => {
                                try {
                                  if (row.linked) {
                                    const unlinkResponse = await props.removeAttachmentLinkCompanyProduct(
                                      popupValues.id,
                                      row.id
                                    )
                                    datagrid.loadData() // Reload product with updated attachments
                                    toastManager.add(
                                      generateToastMarkup(
                                        <FormattedMessage id='addInventory.success' defaultMessage='Success' />,
                                        <FormattedMessage
                                          id='addInventory.unlinkeAttachment'
                                          defaultMessage='Attachment was successfully unlinked.'
                                        />
                                      ),
                                      {
                                        appearance: 'success'
                                      }
                                    )
                                    if (unlinkResponse.value.data.lastLink) {
                                      confirm(
                                        formatMessage({
                                          id: 'confirm.attachments.delete.title',
                                          defaultMessage: 'Delete Attachment'
                                        }),
                                        formatMessage(
                                          {
                                            id: 'confirm.attachments.delete.content',
                                            defaultMessage: `Do you want to delete file ${row.name}?`
                                          },
                                          { fileName: row.name }
                                        )
                                      ).then(
                                        async () => {
                                          // confirm
                                          try {
                                            await props.removeAttachment(row.id)
                                            toastManager.add(
                                              generateToastMarkup(
                                                <FormattedMessage
                                                  id='notifications.attachments.deleted.header'
                                                  defaultMessage='File Deleted'
                                                />,
                                                <FormattedMessage
                                                  id='notifications.attachments.deleted.content'
                                                  defaultMessage={`File ${row.name} successfully deleted.`}
                                                  values={{ fileName: row.name }}
                                                />
                                              ),
                                              {
                                                appearance: 'success'
                                              }
                                            )
                                          } catch (e) {
                                            console.error(e)
                                          }
                                        },
                                        () => {
                                          // cancel
                                        }
                                      )
                                    }
                                  }
                                  setAttachments(attachments.filter(o => o.id !== row.id))
                                } catch (e) {
                                  console.error(e)
                                }
                              }
                            }
                          ]}
                        />
                      </GridColumn>
                    </GridRow>
                  )}
                </GridStyled>
              </FlexContent>

              <DivBottomButtons className='bottom-buttons'>
                {!openGlobalAddForm && (
                  <BasicButton noBorder onClick={closePopup} data-test='settings_product_popup_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </BasicButton>
                )}
                <Popup
                  disabled={editable}
                  trigger={
                    <DisabledButtonWrapped>
                      <BasicButton
                        disabled={!editable}
                        data-test='settings_product_popup_submit_btn'
                        onClick={() => {
                          formikProps.validateForm().then(err => {
                            const errors = Object.keys(err)
                            if (errors.length && errors[0] !== 'isCanceled') {
                              // Errors found
                              formikProps.submitForm() // to show errors
                            } else {
                              // No errors found
                              setLoadSidebar(true)
                              handlerSubmit(formikProps.values, formikProps, props, attachments, setLoadSidebar)
                            }
                          })
                        }}>
                        <FormattedMessage id='global.send' defaultMessage='Send'>
                          {text => text}
                        </FormattedMessage>
                      </BasicButton>
                    </DisabledButtonWrapped>
                  }
                  content={
                    <FormattedMessage
                      id='settings.product.offerExists'
                      defaultMessage='Product cannot be edited, as it already has ProductOffers linked to it.'>
                      {text => text}
                    </FormattedMessage>
                  }
                />
              </DivBottomButtons>
              <ErrorFocus />
            </FormStyled>
          </Modal>
        )
      }}
    </Formik>
  )
}

export default ProductPopup
