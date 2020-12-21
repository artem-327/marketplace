import React from 'react'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Check } from 'react-feather'
//Components
import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle
} from '~/modules/cart/components/StyledComponents'

const GridCompanyVerification = styled(Grid)`
  margin: 14px 16px !important;
`

const ColumnTextCenter = styled(GridColumn)`
  text-align: center;
`
const CustomA = styled.a`
  font-weight: bold;
  color: #2599d5;
`

const UlCustom = styled.ul`
  list-style: none;
  display: contents;
  li {
    margin-bottom: 10px;
  }
`

const IconCheck = styled(Check)`
  margin-right: 10px;
  margin-left: 10px;
  color: #cecfd4;
  vertical-align: text-bottom;
`

function CompanyVerification() {
  return (
    <GridCompanyVerification>
      <GridRow>
        <GridColumn>
          <FormattedMessage
            id='velloci.companyVerification.text'
            defaultMessage='We require the full legal business name and registered business address. In addition, you will need to submit one of the following five documents in PDF format. It is important that the document/s you submit clearly shows your company EIN number. Please have these ready prior to starting your verification. We require one of the following:'
          />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <UlCustom>
            <li>
              <IconCheck size={16} strokeWidth='4' />
              <FormattedMessage
                id='velloci.companyVerification.list.ein'
                defaultMessage='EIN Verification Letter (IRS Issued SS4 Confirmation Letter)'
              />
            </li>
            <li>
              <IconCheck size={16} strokeWidth='4' />
              <FormattedMessage
                id='velloci.companyVerification.list.filed'
                defaultMessage='Filed and stamped articles of incorporation'
              />
            </li>
            <li>
              <IconCheck size={16} strokeWidth='4' />
              <FormattedMessage id='velloci.companyVerification.list.tax' defaultMessage='Sales/Use Tax License' />
            </li>
            <li>
              <IconCheck size={16} strokeWidth='4' />
              <FormattedMessage id='velloci.companyVerification.list.license' defaultMessage='Business License' />
            </li>
            <li>
              <IconCheck size={16} strokeWidth='4' />
              <FormattedMessage
                id='velloci.companyVerification.list.certificate'
                defaultMessage='Certificate of Good Standing'
              />
            </li>
          </UlCustom>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Rectangle style={{ margin: '0px', backgroundColor: '#ddf1fc' }}>
            <CustomDivTitle style={{ color: '#2599d5' }}>
              <CustomDivInTitle>
                <FormattedMessage
                  id='velloci.companyVerification.infoTitle'
                  defaultMessage='Beneficial Owner Information'
                />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '10px' }}>
              <FormattedMessage
                id='velloci.companyVerification.infoContent'
                defaultMessage='A control person is a single individual with significant responsibility to control, manage or direct legal entity customer, including an executive Officer or senior manager (e.g. a Chief Executive Officer, Chief Financial Officer, Chief Operating Officer, Managing Member, General Partner, President, Vice President or Treasurer); or any other individual who regularly performs similar functions.'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>

      <GridRow>
        <ColumnTextCenter>
          <FormattedMessage
            id='velloci.companyVerification.infoText'
            defaultMessage='Thank you for taking the time to register your business with EchoSystem. Feel free to reach out to us at {email} or {phoneNumber} if you have any questions about this process, we are here to help.'
            values={{
              email: (
                <CustomA>
                  <FormattedMessage id='global.email.support' defaultMessage='support@echosystem.com' />
                </CustomA>
              ),
              phoneNumber: (
                <b>
                  <FormattedMessage id='global.phone.support' defaultMessage='833-321-3246' />
                </b>
              )
            }}
          />
        </ColumnTextCenter>
      </GridRow>
    </GridCompanyVerification>
  )
}

export default injectIntl(CompanyVerification)
