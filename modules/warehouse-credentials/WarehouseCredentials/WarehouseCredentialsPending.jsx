import { Component } from 'react'
import { connect } from 'react-redux'
import { func, bool, array, string } from 'prop-types'
import { withDatagrid } from '~/modules/datagrid'
import { Formik } from 'formik'
import moment from 'moment'
import { approveTaxExemptCertificate, denyTaxExemptCertificate } from '../actions'
// Components
import DetailRow from '../../../components/detail-row'
import { Modal, Dimmer, Loader, Popup, FormGroup, Header, Button} from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { DateInput } from '../../../components/custom-formik'
import { Required } from '../../../components/constants/layout'
import { Download, FileText, Map } from 'react-feather'
// Services
import { injectIntl, FormattedMessage } from 'react-intl'
import ProdexTable from '../../../components/table'
import {
  postNewWarehouseRequest,
  putEditWarehouse
} from '../../settings/actions'
import { downloadAttachment } from '../../inventory/actions'
import { getSafe, getMimeType, getFormattedAddress } from '../../../utils/functions'
// Constants
import { columns, CONTENT_SUBCOLUMNS, INITIAL_VALUES, VALIDATION_SCHEME } from './WarehouseCredentials.constants'
import { UserCompany, UserImage, UserName } from '../../alerts/components/layout'
import { groupActions } from '../../company-product-info/constants'
// Styles
import { CertificationLabel, Warehouse, FileName, FormArea } from './WarehouseCredentials.styles'


class WarehouseCredentialsPending extends Component {

  state = {
    expandedRowIds: [],
    expandedSubrowIds: []
  }

  componentDidMount() {
    this.props.datagrid.loadData()
  }

  prepareLinkToAttachment = async (documentName, documentId) => {
    let downloadedFile = await this.props.downloadAttachment(documentId)
    const mimeType = getMimeType(documentName)

    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    return element
  }

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentName, documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  getRows = () => {
    const { rows } = this.props

    return rows.map(r => ({
      ...r,
      warehouseName: r.name,
      user: (
        <>
          {getSafe(() => r.info.requestedBy.avatar, false) && (
            <UserImage>
              <img src={r.info.requestedBy.avatar} />
            </UserImage>
          )}
          <UserName as='h3'>{r.name}</UserName>
          <UserCompany as='h4'>{getSafe(() => r.cfDisplayName, false)}</UserCompany>
        </>
      ),
      description: r.description,
      date: r.createdAt ? (
        <Popup
          size='small'
          inverted
          style={{
            fontSize: '12px',
            color: '#cecfd4',
            opacity: '0.9'
          }}
          header={
            <div style={{ color: '#cecfd4', fontSize: '12px' }}>
              {moment(r.createdAt)
                .toDate()
                .toLocaleString()}
            </div>
          }
          trigger={<div style={{ color: r.read || this.props.isAdmin ? '#848893' : '#20273a' }}>{moment(r.createdAt).fromNow()}</div>}
        />
      ) : (
        'N/A'
      ),
      branches: r.branches.map(branch => ({
        ...branch,
        branchName: (
          <>
            {branch.deliveryAddress.cfName}
            {branch.deaListReceiveVerify && <CertificationLabel>DEA</CertificationLabel>}
            {branch.epaReceiveVerify && <CertificationLabel>EPA</CertificationLabel>}
            {branch.taxExemptReceiveVerify && <CertificationLabel>DHL</CertificationLabel>}
          </>
        )
      }))
    }))
  }

  getRowDetail = ({ row }) => {
    return (
      <DetailRow
        row={row}
        items={row.branches.map(branch => {
          let ids = this.state.expandedSubrowIds.slice()
          return {
            ...branch,
            opened: ids.includes(branch.id)
          }
        })}
        contentAttributes={CONTENT_SUBCOLUMNS}
        separatedRows={true}
        renderSubDetail={this.renderSubDetail}
        hiddenDetailContentHeader={true}
        onDetailRowClick={(branchId) => {
          let ids = this.state.expandedSubrowIds.slice()
          if (ids.includes(branchId)) {
            this.setState({ expandedSubrowIds: ids.filter(id => id !== branchId) })
          } else {
            ids.push(branchId)
            this.setState({ expandedSubrowIds: ids })
          }
        }}
      />
    )
  }

  renderSubDetail = (branch) => {
    const { intl: { formatMessage }} = this.props
    return (
      <Formik
        onSubmit={async (values, actions) => {
          //actions.submitForm()
          console.log('ACTIONS', actions)
          //await handleSubmit({ ...props, setIsOpenAddAddress, chatWidgetVerticalMoved }, formikPropsSelf)
        }}
        enableReinitialize
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEME}
      >
        {formikProps => {
          const { submitForm, validateForm, setFieldTouched, setFieldError } = formikProps

          return (
            <>
              {branch.deaListReceiveVerify && (
                <>
                  <Header>
                    <FormattedMessage id='warehouseCredentials.deaCertificate' defaultMessage='DEA Certificate' />
                  </Header>
                  <FileName onClick={(e) => {
                    this.downloadAttachment(branch.deaListCertificateFile.name, branch.deaListCertificateFile.id)
                  }}>
                    <FileText />
                    <label>
                      <FormattedMessage id='warehouseCredentials.fileName' defaultMessage='File Name' />
                    </label>
                    {branch.deaListCertificateFile.name}
                    <Download className='download' />
                  </FileName>
                  <FormArea>
                    <FormGroup widths='equal'>
                      <Input
                        label={
                          <>
                            <FormattedMessage id='global.certificateNumber' defaultMessage='Name' />
                            <Required />
                          </>
                        }
                        name='dea.certificateNumber'
                      />
                      <DateInput
                        inputProps={{ maxDate: moment(), id: 'deaIssueDate', clearable: true }}
                        name='dea.issueDate'
                        label={
                          <>
                            <FormattedMessage id='global.issueDate' defaultMessage='Issue Date' />
                            <Required />
                          </>
                        }
                      />
                      <DateInput
                        inputProps={{ minDate: moment().add(1, 'days'), id: 'deaExpDate', clearable: true }}
                        name='dea.expDate'
                        label={
                          <>
                            <FormattedMessage id='global.expDate' defaultMessage='Expiration Date' />
                            <Required />
                          </>
                        }
                      />
                    </FormGroup>
                  </FormArea>
                </>
              )}
              {branch.taxExemptReceiveVerify && (
                <>
                  <Header>
                    <FormattedMessage id='warehouseCredentials.taxExemptCertificate' defaultMessage='Tax Exempt Certificate' />
                  </Header>
                  <Warehouse>
                    <Map />
                    <label>
                      <FormattedMessage id='warehouseCredentials.warehouseAddress' defaultMessage='Warehouse Address' />
                    </label>
                    {getFormattedAddress({
                      street: getSafe(() => branch.deliveryAddress.address.streetAddress, false),
                      city: getSafe(() => branch.deliveryAddress.address.city, false),
                      zip: getSafe(() => branch.deliveryAddress.address.zip.zip, false),
                      country: getSafe(() => branch.deliveryAddress.address.country.name, false),
                      province: getSafe(() => branch.deliveryAddress.address.province.name, false)
                    })}
                  </Warehouse>
                  <FileName onClick={(e) => {
                    this.downloadAttachment(branch.taxExemptCertificateFile.name, branch.taxExemptCertificateFile.id)
                  }}>
                    <FileText />
                    <label>
                      <FormattedMessage id='warehouseCredentials.fileName' defaultMessage='File Name' />
                    </label>
                    {branch.taxExemptCertificateFile.name}
                    <Download className='download' />
                  </FileName>
                  <FormArea>
                    <FormGroup widths='equal'>
                      <Input
                        label={
                          <>
                            <FormattedMessage id='global.certificateNumber' defaultMessage='Name' />
                            <Required />
                          </>
                        }
                        name='taxExempt.certificateNumber'
                      />
                      <DateInput
                        inputProps={{ maxDate: moment(), id: 'taxExemptIssueDate', clearable: true }}
                        name='taxExempt.issueDate'
                        label={
                          <>
                            <FormattedMessage id='global.issueDate' defaultMessage='Issue Date' />
                            <Required />
                          </>
                        }
                      />
                      <DateInput
                        inputProps={{ minDate: moment().add(1, 'days'), id: 'taxExemptExpireDate', clearable: true }}
                        name='taxExempt.expDate'
                        label={
                          <>
                            <FormattedMessage id='global.expDate' defaultMessage='Expiration Date' />
                            <Required />
                          </>
                        }
                      />
                    </FormGroup>
                  </FormArea>
                </>
              )}
              <Button type='submit' primary onClick={() => validateForm()
                .then(r => {
                  console.log(r)
                  // stop when errors found
                  if (
                    Object.keys(r).length &&
                    Object.keys(r).includes('taxExempt')
                  ) {
                    console.log(formikProps)
                    Object.keys(r.taxExempt).forEach((key, index) => {
                      // setFieldTouched is necessary to show error when Formik has defined validation scheme
                      setFieldTouched(`taxExempt.${key}`, true)
                      setFieldError(`taxExempt.${key}`, formatMessage({ id: r.taxExempt[key].props.id, defaultMessage: r.taxExempt[key].props.defaultMessage }))
                    })
                    //submitForm() // show errors
                    return false
                  }

                  this.props.approveTaxExemptCertificate(branch.id, formikProps.values.taxExempt)
                })
                .catch(e => {
                  console.log('CATCH', e)
                })}>Approve</Button>
              <Button type='button' secondary onClick={() => this.props.denyTaxExemptCertificate(branch.id)}>Deny</Button>
            </>
          )
        }}
      </Formik>
    )
  }

  render() {
    const {
      datagrid,
      intl: { formatMessage },
      rows
    } = this.props

    return (
      <>
        <div className='flex stretched warehouse-credentials-wrapper listings-wrapper' style={{padding: '10px 30px'}}>
          <ProdexTable
            {...datagrid.tableProps}
            tableName='warehouse_credentials_grid'
            hideCheckboxes
            loading={datagrid.loading}
            columns={columns}
            rows={this.getRows()}
            rowDetailType={true}
            rowDetail={this.getRowDetail}
            onRowClick={(_, row) => {
              if (row.root && row.branches.length) {
                let ids = this.state.expandedRowIds.slice()
                if (ids.includes(row.id)) {
                  this.setState({ expandedRowIds: ids.filter(id => id !== row.id) })
                } else {
                  ids.push(row.id)
                  this.setState({ expandedRowIds: ids })
                }
              }
            }}
            expandedRowIds={this.state.expandedRowIds}
            onExpandedRowIdsChange={expandedRowIds => this.setState({ expandedRowIds })}
            estimatedRowHeight={1000}
          />
        </div>
      </>
    )
  }
}

const mapDispatchToProps = {
  postNewWarehouseRequest,
  putEditWarehouse,
  downloadAttachment,
  approveTaxExemptCertificate,
  denyTaxExemptCertificate
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map(r => {
      return {
        ...r,
        rawData: r,
        root: true,
        id: r.id,
        user: r.name,
        description: r.name
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(WarehouseCredentialsPending)))
