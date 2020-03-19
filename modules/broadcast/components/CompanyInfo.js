import React, { Component } from 'react'
import pt, { node, bool, number, object, func } from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button, Grid, GridRow, GridColumn, Input, Dimmer, Loader, Label } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import styled from 'styled-components'

import ProdexGrid from '~/components/table'
import { getLocaleDateFormat } from '~/components/date-format'
import { getSafe } from '~/utils/functions'

export const CustomRow = styled(GridRow)`
  margin-left: 25px !important;
  margin-right: 25px !important;
  border-bottom: 1px solid #f0f0f0 !important;
`

export const CustomRowTable = styled(GridRow)`
  margin-left: 25px !important;
  margin-right: 25px !important;
`

export const CustomColumn = styled(GridColumn)`
  padding: 0 !important;
  color: #848893 !important;
`

export const CustomDiv = styled.div`
  padding: 0 !important;
`

export const CustomModalActions = styled(Modal.Actions)`
  background: none !important;
`

export const CustomLabelVerified = styled(Label)`
  background: #84c225 !important;
  color: #ffffff !important;
  font-size: 12px !important;
  font-weight: normal !important;
  font-stretch: normal !important;
  font-style: normal !important;
  letter-spacing: normal !important;
  text-align: center !important;
  border-radius: 11px !important;
  width: 74px !important;
  height: 22px !important;
`

export const CustomLabelNotVerified = styled(Label)`
  background: #dee2e6 !important;
  color: #848893 !important;
  font-size: 12px !important;
  font-weight: normal !important;
  font-stretch: normal !important;
  font-style: normal !important;
  letter-spacing: normal !important;
  text-align: center !important;
  border-radius: 11px !important;
  width: 74px !important;
  height: 22px !important;
`

export const CustomDivValue = styled.div`
  color: #20273a !important;
`

const leftWidth = 6
const rightWidth = 10

const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  },
  {
    name: 'documentTypeName',
    title: (
      <FormattedMessage id='global.docType' defaultMessage='Document Type'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  },
  {
    name: 'expirationDate',
    title: (
      <FormattedMessage id='global.expirationDate' defaultMessage='Expiration Date'>
        {text => text}
      </FormattedMessage>
    ),
    width: 140
  }
]

const values = {
  attachments: [
    {
      name: 'Test attachments 1 ',
      documentType: {
        name: 'EPA Document'
      },
      expirationDate: '2020-03-20T00:00:00'
    },
    {
      name: 'Test attachments 2 ',
      documentType: {
        name: 'Sales Tax Exemption Certificate'
      },
      expirationDate: '2020-03-20T00:00:00'
    },
    {
      name: 'Test attachments 3 ',
      documentType: {
        name: 'EPA Document'
      },
      expirationDate: '2020-03-20T00:00:00'
    },
    {
      name: 'Test attachments 4 ',
      documentType: {
        name: 'Sales Tax Exemption Certificate'
      },
      expirationDate: '2020-03-20T00:00:00'
    }
  ]
}

class CompanyInfo extends Component {
  getContent = () => {
    const { dataCompanyInfo } = this.props
    console.log('dataCompanyInfo====================================')
    console.log(dataCompanyInfo)
    console.log('====================================')
    return (
      <Grid>
        <CustomRow>
          <CustomColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
            <FormattedMessage id='boradcast.modal.companyName' defaultMessage='Company Name'>
              {text => text}
            </FormattedMessage>
          </CustomColumn>
          <CustomColumn mobile={rightWidth} computer={rightWidth}>
            <CustomDivValue style={{ fontWeight: 'bold' }} name='companyName'>
              {getSafe(() => dataCompanyInfo.name, 'N/A')}
            </CustomDivValue>
          </CustomColumn>
        </CustomRow>
        <CustomRow>
          <CustomColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
            <FormattedMessage id='boradcast.modal.nacdMember' defaultMessage='NACD Member'>
              {text => text}
            </FormattedMessage>
          </CustomColumn>
          <CustomColumn mobile={rightWidth} computer={rightWidth}>
            <CustomDivValue name='nacdMember'>
              {getSafe(() => dataCompanyInfo.nacdMember, false) ? (
                <CustomLabelVerified color={'#84c225'}>Verified</CustomLabelVerified>
              ) : (
                <CustomLabelNotVerified color={'#dee2e6'}>Not Verified</CustomLabelNotVerified>
              )}
            </CustomDivValue>
          </CustomColumn>
        </CustomRow>
        {!getSafe(() => dataCompanyInfo.nacdMember, false) ? (
          <CustomRow>
            <CustomColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
              <FormattedMessage id='boradcast.modal.nacdReferences' defaultMessage='NACD References'>
                {text => text}
              </FormattedMessage>
            </CustomColumn>
            <CustomColumn mobile={rightWidth} computer={rightWidth}>
              <CustomDivValue name='nacdReferences'>
                {getSafe(() => dataCompanyInfo.nacdReferences, 'N/A')}
              </CustomDivValue>
            </CustomColumn>
          </CustomRow>
        ) : null}
        <CustomRow>
          <CustomColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
            <FormattedMessage id='boradcast.modal.successfulSales' defaultMessage='Successful Sales'>
              {text => text}
            </FormattedMessage>
          </CustomColumn>
          <CustomColumn mobile={rightWidth} computer={rightWidth}>
            <CustomDivValue name='successfulSales'>
              {getSafe(() => dataCompanyInfo.successfulSales, 'N/A')}
            </CustomDivValue>
          </CustomColumn>
        </CustomRow>
        <CustomRow>
          <CustomColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
            <FormattedMessage id='boradcast.modal.participateSince' defaultMessage='Participate Since'>
              {text => text}
            </FormattedMessage>
          </CustomColumn>
          <CustomColumn mobile={rightWidth} computer={rightWidth}>
            <CustomDivValue name='participateSince'>
              {getSafe(() => dataCompanyInfo.participateSince, 'N/A')}
            </CustomDivValue>
          </CustomColumn>
        </CustomRow>
        <GridRow>
          <CustomColumn></CustomColumn>
        </GridRow>
        <CustomRowTable>
          <CustomColumn>
            <ProdexGrid
              virtual={false}
              tableName='broadcast_modal_company_info_table_attachment_documents'
              onTableReady={() => {}}
              columns={columns}
              normalWidth={false}
              rows={
                getSafe(() => values.attachments.length, false)
                  ? values.attachments
                      .map(row => {
                        return {
                          name: row.name,
                          documentTypeName: row.documentType && row.documentType.name,
                          expirationDate: row.expirationDate
                            ? moment(row.expirationDate).format(getLocaleDateFormat())
                            : 'N/A'
                        }
                      })
                      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
                  : []
              }
              rowActions={[
                {
                  text: (
                    <FormattedMessage id='global.test' defaultMessage='Test'>
                      {text => text}
                    </FormattedMessage>
                  ),
                  callback: async row => {
                    try {
                      console.log('click to row action')
                    } catch (e) {
                      console.error(e)
                    }
                  }
                }
              ]}
            />
          </CustomColumn>
        </CustomRowTable>
      </Grid>
    )
  }

  render() {
    const { isOpenModalCompanyInfo, closeModalCompanyInfo, isLoadingModalCompanyInfo } = this.props
    return (
      <Modal closeIcon open={isOpenModalCompanyInfo} onClose={() => closeModalCompanyInfo(false)} size='small'>
        <Modal.Header>
          <FormattedMessage id='broadcast.companyInfo' defaultMessage='COMPANY INFO' />
        </Modal.Header>
        <Modal.Content>
          <Dimmer inverted active={isLoadingModalCompanyInfo}>
            <Loader />
          </Dimmer>
          {this.getContent()}
        </Modal.Content>
        <CustomModalActions>
          <Button basic onClick={() => closeModalCompanyInfo(false)} data-test='broadcast_modal_close_company_info_btn'>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
          </Button>
        </CustomModalActions>
      </Modal>
    )
  }
}

CompanyInfo.propTypes = {
  dataCompanyInfo: object,
  isOpenModalCompanyInfo: bool,
  closeModalCompanyInfo: func,
  isLoadingModalCompanyInfo: bool
}

CompanyInfo.defaultProps = {
  dataCompanyInfo: {},
  isLoadingModalCompanyInfo: false,
  isOpenModalCompanyInfo: false,
  closeModalCompanyInfo: () => {}
}

export default CompanyInfo
