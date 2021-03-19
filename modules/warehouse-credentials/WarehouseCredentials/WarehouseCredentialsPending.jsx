import { Component } from 'react'
import { connect } from 'react-redux'
import { func, bool, array, string } from 'prop-types'
import { withDatagrid } from '~/modules/datagrid'
import { Formik } from 'formik'
import moment from 'moment'
import {
  approveDeaListCertificate,
  approveTaxExemptCertificate,
  denyDeaListCertificate,
  denyTaxExemptCertificate
} from '../actions'
// Components
import DetailRow from '../../../components/detail-row'
import { Popup, FormGroup } from 'semantic-ui-react'
import BasicButton from '../../../components/buttons/BasicButton'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { DateInput } from '../../../components/custom-formik'
import { Required } from '../../../components/constants/layout'
import { Download, FileText, Map } from 'react-feather'
// Services
import { injectIntl, FormattedMessage } from 'react-intl'
import ProdexTable from '../../../components/table'
import { postNewWarehouseRequest, putEditWarehouse } from '../../settings/actions'
import { downloadAttachment } from '../../inventory/actions'
import { getSafe, getMimeType, getFormattedAddress } from '../../../utils/functions'
// Constants
import { columns, CONTENT_SUBCOLUMNS, INITIAL_VALUES, VALIDATION_SCHEME } from './WarehouseCredentials.constants'
import { UserCompany, UserImage, UserName } from '../../alerts/components/layout'
import { groupActions } from '../../company-product-info/constants'
// Styles
import {
  IconDown,
  IconUp,
  CertificationLabel,
  CertHeader,
  Warehouse,
  FileName,
  FormArea,
  ButtonGroup
} from './WarehouseCredentials.styles'

class WarehouseCredentialsPending extends Component {
  state = {
    expandedRowIds: [],
    expandedSubrowIds: [],
    formikData: {}
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

  handleChange = (e, branchId, { name, value }) => {
    let { formikData } = this.state
    const parts = name.split(".")
    if (!formikData[branchId])
      formikData[branchId] = {}
    if (!formikData[branchId][parts[0]])
      formikData[branchId][parts[0]] = {}

    formikData[branchId][parts[0]][parts[1]] = value

    //this.setState({ formikData })
  }

  getRows = () => {
    const { rows } = this.props
    const { expandedSubrowIds } = this.state

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
          trigger={
            <div style={{ color: r.read || this.props.isAdmin ? '#848893' : '#20273a' }}>
              {moment(r.createdAt).fromNow()}
            </div>
          }
        />
      ) : (
        'N/A'
      ),
      branches: r.branches.map(branch => ({
        ...branch,
        branchName: (
          <>
            {expandedSubrowIds.includes(branch.id) ? <IconUp /> : <IconDown />}
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
        onDetailRowClick={branchId => {
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

  mergeInitialValues = (initialValues, stateValues) => {
    let mergedValues = {}
    for (let mainAttr in initialValues) {
      mergedValues[mainAttr] = {}
      if (stateValues[mainAttr]) {
        for (let subAttr in initialValues[mainAttr]) {
          if (stateValues[mainAttr][subAttr]) {
            mergedValues[mainAttr][subAttr] = stateValues[mainAttr][subAttr]
          } else {
            mergedValues[mainAttr][subAttr] = initialValues[mainAttr][subAttr]
          }
        }
      } else {
        mergedValues[mainAttr] = initialValues[mainAttr]
      }
    }

    return mergedValues
  }

  renderSubDetail = branch => {
    const {
      intl: { formatMessage }
    } = this.props
    const { formikData } = this.state
    let stateData = {}
    if (`${branch.id}` in formikData)
      stateData = formikData[branch.id]

    const mergedValues = this.mergeInitialValues(INITIAL_VALUES, stateData)

    return (
      <Formik
        onSubmit={async (values, actions) => {}}
        enableReinitialize
        initialValues={mergedValues}
        validationSchema={VALIDATION_SCHEME}>
        {formikProps => {
          const { submitForm, validateForm, setFieldTouched, setFieldError } = formikProps

          return (
            <>
              {branch.deaListReceiveVerify && (
                <>
                  <CertHeader>
                    <FormattedMessage id='warehouseCredentials.deaCertificate' defaultMessage='DEA Certificate' />
                  </CertHeader>
                  <FileName
                    onClick={e => {
                      if (getSafe(() => branch.deaListCertificateFile.name, ''))
                        this.downloadAttachment(branch.deaListCertificateFile.name, branch.deaListCertificateFile.id)
                    }}
                    className={getSafe(() => branch.deaListCertificateFile.name, '') && 'clickable'}>
                    <FileText />
                    <label>
                      <FormattedMessage id='warehouseCredentials.fileName' defaultMessage='File Name' />
                    </label>
                    {getSafe(() => branch.deaListCertificateFile.name, '')}
                    <Download className='download' />
                  </FileName>
                  <FormArea>
                    <FormGroup widths='equal'>
                      <DateInput
                        inputProps={{ maxDate: moment(), id: 'deaIssueDate', clearable: true, onChange: (e, data) => this.handleChange(e, branch.id, data) }}
                        name='dea.issueDate'
                        label={
                          <>
                            <FormattedMessage id='global.issueDate' defaultMessage='Issue Date' />
                            <Required />
                          </>
                        }
                      />
                      <DateInput
                        inputProps={{ minDate: moment().add(1, 'days'), id: 'deaExpDate', clearable: true, onChange: (e, data) => this.handleChange(e, branch.id, data) }}
                        name='dea.expDate'
                        label={
                          <>
                            <FormattedMessage id='global.expDate' defaultMessage='Expiration Date' />
                            <Required />
                          </>
                        }
                      />
                    </FormGroup>
                    <ButtonGroup>
                      <BasicButton $noBorder onClick={() => this.props.denyDeaListCertificate(branch.id)}>
                        <FormattedMessage id='global.deny' defaultMessage='Deny' />
                      </BasicButton>
                      <BasicButton
                        onClick={() =>
                          validateForm()
                            .then(r => {
                              const formPart = 'dea'
                              // stop when errors found
                              if (Object.keys(r).length && Object.keys(r).includes(formPart)) {
                                Object.keys(r[formPart]).forEach((key, index) => {
                                  // setFieldTouched is necessary to show error when Formik has defined validation scheme
                                  setFieldTouched(`${formPart}.${key}`, true)
                                  setFieldError(
                                    `${formPart}.${key}`,
                                    formatMessage({
                                      id: r[formPart][key].props.id,
                                      defaultMessage: r[formPart][key].props.defaultMessage
                                    })
                                  )
                                })
                                //submitForm() // show errors
                                return false
                              }

                              this.props.approveDeaListCertificate(branch.id, formikProps.values[formPart])
                            })
                            .catch(e => {
                              console.error(e)
                            })
                        }>
                        <FormattedMessage id='global.approve' defaultMessage='Approve' />
                      </BasicButton>
                    </ButtonGroup>
                  </FormArea>
                </>
              )}
              {branch.taxExemptReceiveVerify && (
                <>
                  <CertHeader>
                    <FormattedMessage
                      id='warehouseCredentials.taxExemptCertificate'
                      defaultMessage='Tax Exempt Certificate'
                    />
                  </CertHeader>
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
                  <FileName
                    onClick={e => {
                      if (getSafe(() => branch.taxExemptCertificateFile.name, ''))
                        this.downloadAttachment(
                          branch.taxExemptCertificateFile.name,
                          branch.taxExemptCertificateFile.id
                        )
                    }}
                    className={getSafe(() => branch.taxExemptCertificateFile.name, '') && 'clickable'}>
                    <FileText />
                    <label>
                      <FormattedMessage id='warehouseCredentials.fileName' defaultMessage='File Name' />
                    </label>
                    {getSafe(() => branch.taxExemptCertificateFile.name, '')}
                    <Download className='download' />
                  </FileName>
                  <FormArea>
                    <FormGroup widths='equal'>
                      <Input
                        label={
                          <>
                            <FormattedMessage id='global.certificateNumber' defaultMessage='Certificate Number' />
                            <Required />
                          </>
                        }
                        inputProps={{ onChange: (e, data) => this.handleChange(e, branch.id, data) }}
                        name='taxExempt.certificateNumber'
                      />
                      <DateInput
                        inputProps={{ maxDate: moment(), id: 'taxExemptIssueDate', clearable: true, onChange: (e, data) => this.handleChange(e, branch.id, data) }}
                        name='taxExempt.issueDate'
                        label={
                          <>
                            <FormattedMessage id='global.issueDate' defaultMessage='Issue Date' />
                            <Required />
                          </>
                        }
                      />
                      <DateInput
                        inputProps={{ minDate: moment().add(1, 'days'), id: 'taxExemptExpireDate', clearable: true, onChange: (e, data) => this.handleChange(e, branch.id, data) }}
                        name='taxExempt.expDate'
                        label={
                          <>
                            <FormattedMessage id='global.expDate' defaultMessage='Expiration Date' />
                            <Required />
                          </>
                        }
                      />
                    </FormGroup>
                    <ButtonGroup>
                      <BasicButton $noBorder onClick={() => this.props.denyTaxExemptCertificate(branch.id)}>
                        <FormattedMessage id='global.deny' defaultMessage='Deny' />
                      </BasicButton>
                      <BasicButton
                        onClick={() =>
                          validateForm()
                            .then(r => {
                              const formPart = 'taxExempt'
                              // stop when errors found
                              if (Object.keys(r).length && Object.keys(r).includes(formPart)) {
                                Object.keys(r[formPart]).forEach((key, index) => {
                                  // setFieldTouched is necessary to show error when Formik has defined validation scheme
                                  setFieldTouched(`${formPart}.${key}`, true)
                                  setFieldError(
                                    `${formPart}.${key}`,
                                    formatMessage({
                                      id: r[formPart][key].props.id,
                                      defaultMessage: r[formPart][key].props.defaultMessage
                                    })
                                  )
                                })
                                //submitForm() // show errors
                                return false
                              }

                              this.props.approveTaxExemptCertificate(branch.id, formikProps.values[formPart])
                            })
                            .catch(e => {
                              console.error(e)
                            })
                        }>
                        <FormattedMessage id='global.approve' defaultMessage='Approve' />
                      </BasicButton>
                    </ButtonGroup>
                  </FormArea>
                </>
              )}
            </>
          )
        }}
      </Formik>
    )
  }

  toggleCellComponent = ({ expanded, tableRow, row, style, ...restProps }) => {
    return (
      <td data-test='warehouse_toggle_column' className={`warehouse_opener ${expanded ? 'opened' : 'closed'}`}>
        {expanded ? <IconUp /> : <IconDown />}
      </td>
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
        <div className='flex stretched warehouse-credentials-wrapper' style={{ padding: '10px 30px' }}>
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
            toggleCellComponent={this.toggleCellComponent}
            isToggleCellComponent={true}
            estimatedRowHeight={1500}
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
  approveDeaListCertificate,
  approveTaxExemptCertificate,
  denyDeaListCertificate,
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
