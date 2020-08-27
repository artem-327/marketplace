import React from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Info, UploadCloud } from 'react-feather'

import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle
} from '~/modules/cart/components/StyledComponents'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'

const GridFormationDocument = styled(Grid)`
  margin: 14px 16px !important;
`

const DivLegalAddressTitle = styled.div`
  padding-bottom: 6px;
`

const StyledUploadIcon = styled(UploadCloud)`
  width: 48px;
  height: 40px;
  object-fit: contain;
  color: #dee2e6;
`

export const CustomDiv = styled.div`
  padding: 1em;
`

export const CustomA = styled.a`
  font-weight: bold;
  color: #2599d5;
`

function FormationDocument({ formikProps, intl: { formatMessage } }) {
  return (
    <GridFormationDocument>
      <GridRow>
        <GridColumn>
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#2599d5' }} />
              <CustomDivInTitle>
                <FormattedMessage
                  id='velloci.formationDocument.requiredTitle'
                  defaultMessage='What files are required?'
                />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.formationDocument.requiredContent'
                defaultMessage='EIN Documentation (IRS)'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#2599d5' }} />
              <CustomDivInTitle>
                <FormattedMessage
                  id='velloci.formationDocument.optionalTitle'
                  defaultMessage='What files are optional?'
                />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.formationDocument.optionalContent'
                defaultMessage='Articles of Incorporation, Certificate of Formation, Articles of Organization'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <DivLegalAddressTitle>
            <FormattedMessage
              id='velloci.formationDocument.uploadDocuments'
              defaultMessage='Upload PNG, JPEG or PDF formats. '
            />
            <b>
              <FormattedMessage
                id='velloci.formationDocument.availableDocuments'
                defaultMessage='Add as many documents as you have available.'
              />
            </b>
          </DivLegalAddressTitle>

          <UploadAttachment
            name='attachments'
            attachments={formikProps.values.attachments}
            fileMaxSize={20}
            onChange={files => {
              if (files.length) {
                formikProps.setFieldValue('attachments', files)
              }
            }}
            removeAttachment={async fileId => {
              let newAttachments = await formikProps.values.attachments.filter(att =>
                att.id ? att.id !== fileId : att.lastModified !== fileId
              )
              await formikProps.setFieldValue('attachments', newAttachments)
            }}
            data-test='settings_velloci_registration_formation_document_attachments'
            emptyContent={
              <CustomDiv>
                <div>
                  <UploadCloud size='40' color='#dee2e6' />
                </div>

                {formatMessage({ id: 'addInventory.dragDrop' })}
                <br />

                <FormattedMessage
                  id='addInventory.dragDropOr'
                  defaultMessage={'or {link} to select from computer'}
                  values={{
                    link: (
                      <CustomA>
                        <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                      </CustomA>
                    )
                  }}
                />
              </CustomDiv>
            }
            uploadedContent={
              <CustomDiv>
                <div>
                  <UploadCloud size='40' color='#dee2e6' />
                </div>
                <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                <br />
                <FormattedMessage
                  id='addInventory.dragDropOr'
                  defaultMessage={'or {link} to select from computer'}
                  values={{
                    link: (
                      <CustomA>
                        <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                      </CustomA>
                    )
                  }}
                />
              </CustomDiv>
            }
          />
        </GridColumn>
      </GridRow>
    </GridFormationDocument>
  )
}

FormationDocument.propTypes = {
  formikProps: PropTypes.object
}

export default injectIntl(FormationDocument)
