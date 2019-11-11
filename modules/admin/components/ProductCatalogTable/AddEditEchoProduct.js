import React, {Component} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { FlexSidebar, FlexTabs, FlexContent, TopMargedColumn, GraySegment, HighSegment } from '~/modules/inventory/components/DetailSidebar'

import { DateInput } from '~/components/custom-formik'
import { PhoneNumber } from '~/modules/phoneNumber'
import * as Yup from 'yup'

import { FormattedMessage, injectIntl } from 'react-intl'


import {
  getProductsCatalogRequest, closePopup,
  searchCasProduct, prepareSearchedCasProducts, getDocumentTypes, newElementsIndex, removeElementsIndex, putEchoProduct,
  postEchoProduct, searchManufacturers, searchUnNumber, loadFile, addAttachment, linkAttachment, removeAttachmentLink,
  removeAttachment
} from '~/modules/admin/actions'


import {Form, Button, Dropdown as FormikDropdown, Input} from 'formik-semantic-ui-fixed-validation'
import {Menu, Grid, GridRow, GridColumn, Segment, Header, Dropdown} from 'semantic-ui-react'

import UploadLot from '~/modules/inventory/components/upload/UploadLot'


//import { uniqueArrayByKey } from '~/utils/functions'
//import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'

import { errorMessages, dateValidation } from '~/constants/yupValidation'

import { getSafe, generateToastMarkup } from '~/utils/functions'
//import { Datagrid } from '~/modules/datagrid'
//import debounce from "lodash/debounce"
//import escapeRegExp from "lodash/escapeRegExp"
//import filter from "lodash/filter"



import { tabs, defaultValues, transportationTypes } from "./constants";
import styled from "styled-components";



export const MyContainer = styled.div`
  margin: 0 15px 0 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: bold;
  font-size: 1.1rem;
`

const validationScheme = Yup.object().shape({
  code: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
  name: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.minLength(2)),
  manufacturer: Yup.number().integer().min(1).required(errorMessages.requiredMessage),    // ! ! min 0 or 1 ?
  elements: Yup.array().of(Yup.object().uniqueProperty('casProduct', errorMessages.unique(<FormattedMessage id='admin.casProduct' name='CAS Product'>{text => text}</FormattedMessage>)).shape({
    name: Yup.string().trim().test('requiredIfProprietary', errorMessages.requiredMessage, function (value) {
      const { proprietary } = this.parent
      if (proprietary) {
        return value != null
      }
      return true
    }),
    casProduct: Yup.string().nullable().trim().test('requiredIfNotProprietary', errorMessages.requiredMessage, function (value) {
      const { proprietary } = this.parent
      if (!proprietary) {
        return parseInt(value)
      }
      return true
    }),
    minAssay: Yup.number().min(0).max(100),
    maxAssay: Yup.number().min(0).max(100)
  })),
})


class AddEditEchoProduct extends React.Component {
  state = {
    activeTab: 0,
    changedForm: false,
    transportationType: transportationTypes[0].value

  }

  getInitialFormValues = () => {
    const { popupValues } = this.props

    let initialValues = {
      ...defaultValues,
      ...(popupValues ? {
        attachments: popupValues.attachments,
        appearance: getSafe(() => popupValues.appearance, ''),
        aspirationHazard: getSafe(() => popupValues.aspirationHazard, ''),
        autoIgnitionTemperature: getSafe(() => popupValues.autoIgnitionTemperature, ''),
        boilingPointRange: getSafe(() => popupValues.boilingPointRange, ''),
        code: getSafe(() => popupValues.code, ''),
        conditionsToAvoid: getSafe(() => popupValues.conditionsToAvoid, ''),
        decompositionTemperature: getSafe(() => popupValues.decompositionTemperature, ''),
        developmentalEffects: getSafe(() => popupValues.developmentalEffects, ''),
        dotHazardClass: getSafe(() => popupValues.dotHazardClass, ''),
        dotHazardLabel: getSafe(() => popupValues.dotHazardLabel, ''),
        dotMarinePollutant: getSafe(() => popupValues.dotMarinePollutant, ''),
        dotPackagingGroup: getSafe(() => popupValues.dotPackagingGroup, ''),
        dotProperShippingName: getSafe(() => popupValues.dotProperShippingName, ''),
        dotProperTechnicalName: getSafe(() => popupValues.dotProperTechnicalName, ''),
        dotReportableQuantity: getSafe(() => popupValues.dotReportableQuantity, ''),
        dotSevereMarinePollutant: getSafe(() => popupValues.dotSevereMarinePollutant, ''),
        dotUnNumber: getSafe(() => popupValues.dotUnNumber, ''),
        elements: getSafe(() => popupValues.elements.map(element => ({
          name: getSafe(() => element.displayName, ''),
          casProduct: getSafe(() => element.casProduct.id, null),
          assayMin: getSafe(() => element.assayMin, null),
          assayMax: getSafe(() => element.assayMax, null),
        })), []),
        emergencyPhone: getSafe(() => popupValues.emergencyPhone, ''),
        endocrineDisruptorInformation: getSafe(() => popupValues.endocrineDisruptorInformation, ''),
        evaporationPoint: getSafe(() => popupValues.evaporationPoint, ''),
        eyeContact: getSafe(() => popupValues.eyeContact, ''),
        flammabilityOrExplosiveLower: getSafe(() => popupValues.flammabilityOrExplosiveLower, ''),
        flammabilityOrExplosiveUpper: getSafe(() => popupValues.flammabilityOrExplosiveUpper, ''),
        flammabilitySolidGas: getSafe(() => popupValues.flammabilitySolidGas, ''),
        flashPoint: getSafe(() => popupValues.flashPoint, ''),
        generalAdvice: getSafe(() => popupValues.generalAdvice, ''),
        hazardousDecompositionProducts: getSafe(() => popupValues.hazardousDecompositionProducts, ''),
        hazardousPolymerization: getSafe(() => popupValues.hazardousPolymerization, ''),
        hazardousReactions: getSafe(() => popupValues.hazardousReactions, ''),
        hazardStatement: getSafe(() => popupValues.hazardStatement, ''),
        hmisFlammability: getSafe(() => popupValues.hmisFlammability, ''),
        hmisHealthHazard: getSafe(() => popupValues.hmisHealthHazard, ''),
        hmisChronicHealthHazard: getSafe(() => popupValues.hmisChronicHealthHazard, ''),
        hmisPhysicalHazard: getSafe(() => popupValues.hmisPhysicalHazard, ''),
        hnoc: getSafe(() => popupValues.hnoc, ''),
        iataHazardClass: getSafe(() => popupValues.iataHazardClass, ''),
        iataHazardLabel: getSafe(() => popupValues.iataHazardLabel, ''),
        iataPackagingGroup: getSafe(() => popupValues.iataPackagingGroup, ''),
        iataProperShippingName: getSafe(() => popupValues.iataProperShippingName, ''),
        iataProperTechnicalName: getSafe(() => popupValues.iataProperTechnicalName, ''),
        iataUnNumber: getSafe(() => popupValues.iataUnNumber, ''),
        imdgImoHazardClass: getSafe(() => popupValues.imdgImoHazardClass, ''),
        imdgImoHazardLabel: getSafe(() => popupValues.imdgImoHazardLabel, ''),
        imdgImoPackagingGroup: getSafe(() => popupValues.imdgImoPackagingGroup, ''),
        imdgImoProperShippingName: getSafe(() => popupValues.imdgImoProperShippingName, ''),
        imdgImoProperTechnicalName: getSafe(() => popupValues.imdgImoProperTechnicalName, ''),
        imdgImoUnNumber: getSafe(() => popupValues.imdgImoUnNumber, ''),
        incompatibleMaterials: getSafe(() => popupValues.incompatibleMaterials, ''),
        ingestion: getSafe(() => popupValues.ingestion, ''),
        inhalation: getSafe(() => popupValues.inhalation, ''),
        irritation: getSafe(() => popupValues.irritation, ''),
        labelElements: getSafe(() => popupValues.labelElements, ''),
        manufacturer: getSafe(() => popupValues.manufacturer.id, null),
        meltingPointRange: getSafe(() => popupValues.meltingPointRange, ''),
        mexicoGrade: getSafe(() => popupValues.mexicoGrade, ''),
        mfrProductCodes: getSafe(() => popupValues.mfrProductCodes, []),  // ! !
        molecularFormula: getSafe(() => popupValues.molecularFormula, ''),
        molecularWeight: getSafe(() => popupValues.molecularWeight, ''),
        mostImportantSymptomsAndEffects: getSafe(() => popupValues.mostImportantSymptomsAndEffects, ''),
        mutagenicEffects: getSafe(() => popupValues.mutagenicEffects, ''),
        name: getSafe(() => popupValues.name, ''),
        nfpaFireHazard: getSafe(() => popupValues.nfpaFireHazard, ''),
        nfpaHealthHazard: getSafe(() => popupValues.nfpaHealthHazard, ''),
        nfpaReactivityHazard: getSafe(() => popupValues.nfpaReactivityHazard, ''),
        nfpaSpecialHazard: getSafe(() => popupValues.nfpaSpecialHazard, ''),
        notesToPhysician: getSafe(() => popupValues.notesToPhysician, ''),
        odor: getSafe(() => popupValues.odor, ''),
        odorThreshold: getSafe(() => popupValues.odorThreshold, ''),
        oshaDefinedHazards: getSafe(() => popupValues.oshaDefinedHazards, ''),
        otherAdverseEffects: getSafe(() => popupValues.otherAdverseEffects, ''),
        packagingGroup: getSafe(() => popupValues.packagingGroup.id, null),
        partitionCoefficient: getSafe(() => popupValues.partitionCoefficient, ''),
        ph: getSafe(() => popupValues.ph, ''),
        physicalState: getSafe(() => popupValues.physicalState, ''),
        precautionaryStatements: getSafe(() => popupValues.precautionaryStatements, ''),
        productLc50Inhalation: getSafe(() => popupValues.productLc50Inhalation, ''),
        productLd50Dermal: getSafe(() => popupValues.productLd50Dermal, ''),
        productLd50Oral: getSafe(() => popupValues.productLd50Oral, ''),
        reactiveHazard: getSafe(() => popupValues.reactiveHazard, ''),
        recommendedUse: getSafe(() => popupValues.recommendedUse, ''),
        reproductiveEffects: getSafe(() => popupValues.reproductiveEffects, ''),
        sdsIssuedDate: getSafe(() => popupValues.sdsIssuedDate, ''),
        sdsPreparedBy: getSafe(() => popupValues.sdsPreparedBy, ''),
        sdsRevisionDate: getSafe(() => popupValues.sdsRevisionDate, ''),
        sdsVersionNumber: getSafe(() => popupValues.sdsVersionNumber, ''),
        sensitization: getSafe(() => popupValues.sensitization, ''),
        signalWord: getSafe(() => popupValues.signalWord, ''),
        skinContact: getSafe(() => popupValues.skinContact, ''),
        solubility: getSafe(() => popupValues.solubility, ''),
        specificGravity: getSafe(() => popupValues.specificGravity, ''),
        stability: getSafe(() => popupValues.stability, ''),
        stotRepeatedExposure: getSafe(() => popupValues.stotRepeatedExposure, ''),
        stotSingleExposure: getSafe(() => popupValues.stotSingleExposure, ''),
        supplementalInformation: getSafe(() => popupValues.supplementalInformation, ''),
        symptomsEffects: getSafe(() => popupValues.symptomsEffects, ''),
        tdgHazardClass: getSafe(() => popupValues.tdgHazardClass, ''),
        tdgHazardLabel: getSafe(() => popupValues.tdgHazardLabel, ''),
        tdgPackagingGroup: getSafe(() => popupValues.tdgPackagingGroup, ''),
        tdgProperShippingName: getSafe(() => popupValues.tdgProperShippingName, ''),
        tdgProperTechnicalName: getSafe(() => popupValues.tdgProperTechnicalName, ''),
        tdgUnNumber: getSafe(() => popupValues.tdgUnNumber, ''),
        tdsIssuedDate: getSafe(() => popupValues.tdsIssuedDate, ''),
        tdsPreparedBy: getSafe(() => popupValues.tdsPreparedBy, ''),
        tdsRevisionDate: getSafe(() => popupValues.tdsRevisionDate, ''),
        tdsVersionNumber: getSafe(() => popupValues.tdsVersionNumber, ''),
        teratogenicity: getSafe(() => popupValues.teratogenicity, ''),
        usesAdvisedAgainst: getSafe(() => popupValues.usesAdvisedAgainst, ''),
        vaporDensity: getSafe(() => popupValues.vaporDensity, ''),
        vaporPressure: getSafe(() => popupValues.vaporPressure, ''),
        viscosity: getSafe(() => popupValues.viscosity, ''),
        wasteDisposalMethods: getSafe(() => popupValues.wasteDisposalMethods, ''),
      } : null)
    }

    if (initialValues.sdsIssuedDate) initialValues.sdsIssuedDate = moment(initialValues.sdsIssuedDate).format('MM/DD/YYYY')
    if (initialValues.sdsRevisionDate) initialValues.sdsRevisionDate = moment(initialValues.sdsRevisionDate).format('MM/DD/YYYY')
    if (initialValues.tdsIssuedDate) initialValues.tdsIssuedDate = moment(initialValues.tdsIssuedDate).format('MM/DD/YYYY')
    if (initialValues.tdsRevisionDate) initialValues.tdsRevisionDate = moment(initialValues.tdsRevisionDate).format('MM/DD/YYYY')

    if (initialValues.elements.length === 0) {
      initialValues.elements = [{ name: '', casProduct: null, assayMin: 100, assayMax: 100 }]
    }
    return initialValues
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.visible) {
      if (!prevProps.visible) { // Sidebar just opened
        this.setState({ activeTab: this.props.editTab})
      }

      if (prevProps.editForm && !prevProps.addForm && this.props.addForm) { // Changed from Edit to Add form
        //console.log('!!!!!!!!!!!!!!!!!!!!! AddEditEchoProduct componentDidUpdate EDIT -> ADD', this.props)
        this.setState({ activeTab: 0})
      }

      if (prevProps.addForm && !prevProps.editForm && this.props.editForm) { // Changed from Add to Edit form
        //console.log('!!!!!!!!!!!!!!!!!!!!! AddEditEchoProduct componentDidUpdate ADD -> EDIT', this.props)
        this.setState({ activeTab: this.props.editTab})
      }
    }
  }

  tabChanged = (index) => {
    this.setState({ activeTab: index})
  }

  RowInput = ({ name, readOnly=false, id, defaultMessage }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <Input inputProps={{ readOnly: readOnly, id: name }} name={name} />
      </GridColumn>
    </GridRow>
  )

  RowPhone = ({ name, readOnly=false, id, defaultMessage, props }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <PhoneNumber name={name}  {...props} label={null}/>
      </GridColumn>
    </GridRow>
  )

  RowDate = ({ name, readOnly=false, id, defaultMessage }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <DateInput inputProps={{ maxDate: moment(), id: name }} name={name} />
      </GridColumn>
    </GridRow>
  )

  RowDocument = (values, popupValues, documentType) => {
    return (
        <UploadLot {...this.props}
          attachments={values.attachments.filter(att => getSafe(() => att.documentType.id, 0) === documentType)}
          edit={getSafe(() => popupValues.id, '')}
          name='attachments'
          type={3}
          filesLimit={1}
          fileMaxSize={20}
          onChange={(files) => formikProps.setFieldValue(
           `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
           {
             id: files.id,
             name: files.name,
             documentType: files.documentType
           }
          )}
          data-test='settings_product_import_attachments'
          emptyContent={(
            <label>
              <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
              <br />
              <FormattedMessage id='addInventory.dragDropOr' defaultMessage={'or {link} to select from computer'}
                values={{ link: (<a><FormattedMessage id='global.clickHere' defaultMessage={'click here'} /></a>) }} />
            </label>
          )}
          uploadedContent={(
            <label>
              <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
              <br />
              <FormattedMessage id='addInventory.dragDropOr' defaultMessage={'or {link} to select from computer'}
                values={{ link: (<a><FormattedMessage id='global.clickHere' defaultMessage={'click here'} /></a>) }} />
             </label>
          )}
        />
    )
  }

  RowDropdown = ({ name, readOnly=false, id, defaultMessage, props }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <FormikDropdown
          selection
          fluid
          name={name}
          {...props}
          inputProps={{ disabled: readOnly }}
          options={props.options}
        />
      </GridColumn>
    </GridRow>
  )

  renderEdit = (formikProps) => {

    return (
      <Grid verticalAlign='middle'>
        {this.RowInput({ name: 'name',              id: 'global.productName', defaultMessage: 'Product Name' })}
        {this.RowInput({ name: 'code',              id: 'global.productCode', defaultMessage: 'Product Code' })}



        {this.RowDropdown({ name: 'packagingGroup', id: 'global.packagingGroup', defaultMessage: 'Packaging Group', props: {
            options: this.props.packagingGroups
          }})
        }
        {this.RowPhone({ name: 'emergencyPhone',    id: 'global.emergencyPhone', defaultMessage: 'Emergency Phone', props: formikProps })}
        <Header as='h3'><FormattedMessage id='global.sds' defaultMessage='SDS' /></Header>
        {this.RowDate({ name: 'sdsIssuedDate',      id: 'global.sdsIssuedDate', defaultMessage: 'SDS Issued Date' })}
        {this.RowInput({ name: 'sdsPreparedBy',     id: 'global.sdsPreparedBy', defaultMessage: 'SDS Prepared by' })}
        {this.RowDate({ name: 'sdsRevisionDate',    id: 'global.sdsRevisionDate', defaultMessage: 'SDS Revision Date' })}
        {this.RowInput({ name: 'sdsVersionNumber',  id: 'global.sdsVersionNumber', defaultMessage: 'SDS Version Number' })}
        <Header as='h3'><FormattedMessage id='global.tds' defaultMessage='TDS' /></Header>
        {this.RowDate({ name: 'tdsIssuedDate',      id: 'global.tdsIssuedDate', defaultMessage: 'TDS Issued Date' })}
        {this.RowInput({ name: 'tdsPreparedBy',     id: 'global.tdsPreparedBy', defaultMessage: 'TDS Prepared by' })}
        {this.RowDate({ name: 'tdsRevisionDate',    id: 'global.tdsRevisionDate', defaultMessage: 'TDS Revision Date' })}
        {this.RowInput({ name: 'tdsVersionNumber',  id: 'tdsVersionNumber', defaultMessage: 'TDS Version Number' })}
      </Grid>
    )
  }

  renderInfo = (formikProps) => {
    return (
      <Grid verticalAlign='middle'>
        {this.RowInput({ name: 'appearance',                      id: 'global.appearance', defaultMessage: 'Appearance' })}
        {this.RowInput({ name: 'aspirationHazard',                id: 'global.aspirationHazard', defaultMessage: 'Aspiration Hazard' })}
        {this.RowInput({ name: 'autoIgnitionTemperature',         id: 'global.autoIgnitionTemperature', defaultMessage: 'Auto Ignition Temperature' })}
        {this.RowInput({ name: 'boilingPointRange',               id: 'global.boilingPointRange', defaultMessage: 'Boiling Point/Range' })}
        {this.RowInput({ name: 'conditionsToAvoid',               id: 'global.conditionsToAvoid', defaultMessage: 'Conditions to Avoid' })}
        {this.RowInput({ name: 'decompositionTemperature',        id: 'global.decompositionTemperature', defaultMessage: 'Decomposition Temperature' })}
        {this.RowInput({ name: 'developmentalEffects',            id: 'global.developmentalEffects', defaultMessage: 'Developmental Effects' })}
        {this.RowInput({ name: 'endocrineDisruptorInformation',   id: 'global.endocrineDisruptorInformation', defaultMessage: 'Endocrine Disruptor Information' })}
        {this.RowInput({ name: 'evaporationPoint',                id: 'global.evaporationPoint', defaultMessage: 'Evaporation Point' })}
        {this.RowInput({ name: 'eyeContact',                      id: 'global.eyeContact', defaultMessage: 'Eye Contact' })}
        {this.RowInput({ name: 'flammabilityOrExplosiveLower',    id: 'global.flammabilityOrExplosiveLower', defaultMessage: 'Flammability or Explosive Lower' })}
        {this.RowInput({ name: 'flammabilityOrExplosiveUpper',    id: 'global.flammabilityOrExplosiveUpper', defaultMessage: 'Flammability or Explosive Upper' })}
        {this.RowInput({ name: 'flammabilitySolidGas',            id: 'global.flammabilitySolidGas', defaultMessage: 'Flammability (solid, gas)' })}
        {this.RowInput({ name: 'flashPoint',                      id: 'global.flashPoint', defaultMessage: 'Flash Point' })}
        {this.RowInput({ name: 'generalAdvice',                   id: 'global.generalAdvice', defaultMessage: 'General Advice' })}
        {this.RowInput({ name: 'hazardStatement',                 id: 'global.hazardStatement', defaultMessage: 'Hazard Statement' })}
        {this.RowInput({ name: 'hazardousDecompositionProducts',  id: 'global.hazardousDecompositionProducts', defaultMessage: 'Hazardous Decomposition Products' })}
        {this.RowInput({ name: 'hazardousPolymerization',         id: 'global.hazardousPolymerization', defaultMessage: 'Hazardous Polymerization' })}
        {this.RowInput({ name: 'hazardousReactions',              id: 'global.hazardousReactions', defaultMessage: 'Hazardous Reactions' })}
        {this.RowInput({ name: 'hmisChronicHealthHazard',         id: 'global.hmisChronicHealthHazard', defaultMessage: 'HMIS Chronic Health Hazard' })}
        {this.RowInput({ name: 'hmisFlammability',                id: 'global.hmisFlammability', defaultMessage: 'HMIS Flammability' })}
        {this.RowInput({ name: 'hmisHealthHazard',                id: 'global.hmisHealthHazard', defaultMessage: 'HMIS Health Hazard' })}
        {this.RowInput({ name: 'hmisPhysicalHazard',              id: 'global.hmisPhysicalHazard', defaultMessage: 'HMIS Physical Hazard' })}
        {this.RowInput({ name: 'hnoc',                            id: 'global.hnoc', defaultMessage: 'HNOC' })}
        {this.RowInput({ name: 'incompatibleMaterials',           id: 'global.incompatibleMaterials', defaultMessage: 'Incompatible Materials' })}
        {this.RowInput({ name: 'ingestion',                       id: 'global.ingestion', defaultMessage: 'Ingestion' })}
        {this.RowInput({ name: 'inhalation',                      id: 'global.inhalation', defaultMessage: 'Inhalation' })}
        {this.RowInput({ name: 'irritation',                      id: 'global.irritation', defaultMessage: 'Irritation' })}
        {this.RowInput({ name: 'labelElements',                   id: 'global.labelElements', defaultMessage: 'Label Elements' })}
        {this.RowInput({ name: 'meltingPointRange',               id: 'global.meltingPointRange', defaultMessage: 'Melting Point/Range' })}
        {this.RowInput({ name: 'mexicoGrade',                     id: 'global.mexicoGrade', defaultMessage: 'Mexico-Grade' })}
        {this.RowInput({ name: 'molecularFormula',                id: 'global.molecularFormula', defaultMessage: 'Molecular Formula' })}
        {this.RowInput({ name: 'molecularWeight',                 id: 'global.molecularWeight', defaultMessage: 'Molecular Weight' })}
        {this.RowInput({ name: 'mostImportantSymptomsAndEffects', id: 'global.mostImportantSymptomsAndEffects', defaultMessage: 'Most Important Symptoms and Effects' })}
        {this.RowInput({ name: 'mutagenicEffects',                id: 'global.mutagenicEffects', defaultMessage: 'Mutagenic Effects' })}
        {this.RowInput({ name: 'nfpaFireHazard',                  id: 'global.nfpaFireHazard', defaultMessage: 'NFPA Fire Hazard' })}
        {this.RowInput({ name: 'nfpaHealthHazard',                id: 'global.nfpaHealthHazard', defaultMessage: 'NFPA Health Hazard' })}
        {this.RowInput({ name: 'nfpaReactivityHazard',            id: 'global.nfpaReactivityHazard', defaultMessage: 'NFPA Reactivity Hazard' })}
        {this.RowInput({ name: 'nfpaSpecialHazard',               id: 'global.nfpaSpecialHazard', defaultMessage: 'NFPA Special Hazard' })}
        {this.RowInput({ name: 'notesToPhysician',                id: 'global.notesToPhysician', defaultMessage: 'Notes to Physician' })}
        {this.RowInput({ name: 'odor',                            id: 'global.odor', defaultMessage: 'Odor' })}
        {this.RowInput({ name: 'odorThreshold',                   id: 'global.odorThreshold', defaultMessage: 'Odor Threshold' })}
        {this.RowInput({ name: 'oshaDefinedHazards',              id: 'global.oshaDefinedHazards', defaultMessage: 'OSHA Defined Hazards' })}
        {this.RowInput({ name: 'otherAdverseEffects',             id: 'global.otherAdverseEffects', defaultMessage: 'Other Adverse Effects' })}
        {this.RowInput({ name: 'partitionCoefficient',            id: 'global.partitionCoefficient', defaultMessage: 'Partition Coefficient' })}
        {this.RowInput({ name: 'ph',                              id: 'global.ph', defaultMessage: 'pH' })}
        {this.RowInput({ name: 'physicalState',                   id: 'global.physicalState', defaultMessage: 'Physical State' })}
        {this.RowInput({ name: 'precautionaryStatements',         id: 'global.precautionaryStatements', defaultMessage: 'Precautionary Statements' })}
        {this.RowInput({ name: 'productLc50Inhalation',           id: 'global.productLc50Inhalation', defaultMessage: 'Product LC50 Inhalation' })}
        {this.RowInput({ name: 'productLd50Dermal',               id: 'global.productLd50Dermal', defaultMessage: 'Product LD50 Dermal' })}
        {this.RowInput({ name: 'productLd50Oral',                 id: 'global.productLd50Oral', defaultMessage: 'Product LD50 Oral' })}
        {this.RowInput({ name: 'reactiveHazard',                  id: 'global.reactiveHazard', defaultMessage: 'Reactive Hazard' })}
        {this.RowInput({ name: 'recommendedUse',                  id: 'global.recommendedUse', defaultMessage: 'Recommended Use' })}
        {this.RowInput({ name: 'reproductiveEffects',             id: 'global.reproductiveEffects', defaultMessage: 'Reproductive Effects' })}
        {this.RowInput({ name: 'sensitization',                   id: 'global.sensitization', defaultMessage: 'Sensitization' })}
        {this.RowInput({ name: 'signalWord',                      id: 'global.signalWord', defaultMessage: 'Signal Word' })}
        {this.RowInput({ name: 'skinContact',                     id: 'global.skinContact', defaultMessage: 'Skin Contact' })}
        {this.RowInput({ name: 'solubility',                      id: 'global.solubility', defaultMessage: 'Solubility' })}
        {this.RowInput({ name: 'specificGravity',                 id: 'global.specificGravity', defaultMessage: 'Specific Gravity' })}
        {this.RowInput({ name: 'stability',                       id: 'global.stability', defaultMessage: 'Stability' })}
        {this.RowInput({ name: 'stotRepeatedExposure',            id: 'global.stotRepeatedExposure', defaultMessage: 'STOT- Repeated Exposure' })}
        {this.RowInput({ name: 'stotSingleExposure',              id: 'global.stotSingleExposure', defaultMessage: 'STOT- Single Exposure' })}
        {this.RowInput({ name: 'supplementalInformation',         id: 'global.supplementalInformation', defaultMessage: 'Supplemental Information' })}
        {this.RowInput({ name: 'symptomsEffects',                 id: 'global.symptomsEffects', defaultMessage: 'Symptoms/Effects' })}
        {this.RowInput({ name: 'teratogenicity',                  id: 'global.teratogenicity', defaultMessage: 'Teratogenicity' })}
        {this.RowInput({ name: 'usesAdvisedAgainst',              id: 'global.usesAdvisedAgainst', defaultMessage: 'Uses Advised against' })}
        {this.RowInput({ name: 'vaporDensity',                    id: 'global.vaporDensity', defaultMessage: 'Vapor Density' })}
        {this.RowInput({ name: 'vaporPressure',                   id: 'global.vaporPressure', defaultMessage: 'Vapor Pressure' })}
        {this.RowInput({ name: 'viscosity',                       id: 'global.viscosity', defaultMessage: 'Viscosity' })}
        {this.RowInput({ name: 'wasteDisposalMethods',            id: 'global.wasteDisposalMethods', defaultMessage: 'Waste Disposal Methods' })}
      </Grid>
    )
  }

  renderDocuments = (formikProps, popupValues) => {
    return (
        <Grid verticalAlign='middle'>
          <GridRow>
          <label><FormattedMessage id='global.sdsDocument' defaultMessage='SDS Document' /></label>
          {this.RowDocument(formikProps.values, popupValues, 3)}
          </GridRow>
          <GridRow>
          <label><FormattedMessage id='global.tdsDocument' defaultMessage='TDS Document' /></label>
          {this.RowDocument(formikProps.values, popupValues, 11)}
          </GridRow>
        </Grid>
      )
  }

  renderTransportation = (formikProps) => {
    return (
      <>
        <Grid verticalAlign='middle'>
          <GridRow>
            <GridColumn computer={6}>
              <FormattedMessage id='global.filter' defaultMessage='Filter' />
            </GridColumn>
            <GridColumn computer={10}>
              <Dropdown
                selection fluid
                options={transportationTypes}
                value={this.state.transportationType}
                onChange={(_, { value }) => this.setState({ transportationType: value })}
              />
            </GridColumn>
          </GridRow>
        </Grid>
        {this.renderTransportationContent(this.state.transportationType)}
      </>
    )
  }

  renderTransportationContent = (transportationType) => {
    switch (transportationType) {
      case 'dot': {
        return (
          <Grid verticalAlign='middle'>
            {this.RowInput({ name: 'dotHazardClass',            id: 'global.dotHazardClass', defaultMessage: 'DOT Hazard Class' })}
            {this.RowInput({ name: 'dotHazardLabel',            id: 'global.dotHazardLabel', defaultMessage: 'DOT Hazard Label' })}
            {this.RowInput({ name: 'dotMarinePollutant',        id: 'global.dotMarinePollutant', defaultMessage: 'DOT Marine Pollutant' })}
            {this.RowInput({ name: 'dotPackagingGroup',         id: 'global.dotPackagingGroup', defaultMessage: 'DOT Packaging Group' })}
            {this.RowInput({ name: 'dotProperShippingName',     id: 'global.dotProperShippingName', defaultMessage: 'DOT Proper Shipping Name' })}
            {this.RowInput({ name: 'dotProperTechnicalName',    id: 'global.dotProperTechnicalName', defaultMessage: 'DOT Proper Technical Name' })}
            {this.RowInput({ name: 'dotReportableQuantity',     id: 'global.dotReportableQuantity', defaultMessage: 'DOT Reportable Quantity' })}
            {this.RowInput({ name: 'dotSevereMarinePollutant',  id: 'global.dotSevereMarinePollutant', defaultMessage: 'DOT Severe Marine Pollutant' })}
            {this.RowInput({ name: 'dotUnNumber',               id: 'global.dotUnNumber', defaultMessage: 'DOT UN Number' })}
          </Grid>
        )
      }

      case 'iata': {
        return (
          <Grid verticalAlign='middle'>
            {this.RowInput({ name: 'iataHazardClass',           id: 'global.iataHazardClass', defaultMessage: 'IATA Hazard Class' })}
            {this.RowInput({ name: 'iataHazardLabel',           id: 'global.iataHazardLabel', defaultMessage: 'IATA Hazard Label' })}
            {this.RowInput({ name: 'iataPackagingGroup',        id: 'global.iataPackagingGroup', defaultMessage: 'IATA Packaging Group' })}
            {this.RowInput({ name: 'iataProperShippingName',    id: 'global.iataProperShippingName', defaultMessage: 'IATA Proper Shipping Name' })}
            {this.RowInput({ name: 'iataProperTechnicalName',   id: 'global.iataProperTechnicalName', defaultMessage: 'IATA Proper Technical Name' })}
            {this.RowInput({ name: 'iataUnNumber',              id: 'global.iataUnNumber', defaultMessage: 'IATA UN Number' })}
          </Grid>
        )
      }

      case 'tdg': {
        return (
          <Grid verticalAlign='middle'>
            {this.RowInput({ name: 'imdgImoHazardClass',        id: 'global.imdgImoHazardClass', defaultMessage: 'IMDG/IMO Hazard Class' })}
            {this.RowInput({ name: 'imdgImoHazardLabel',        id: 'global.imdgImoHazardLabel', defaultMessage: 'IMDG/IMO Hazard Label' })}
            {this.RowInput({ name: 'imdgImoPackagingGroup',     id: 'global.imdgImoPackagingGroup', defaultMessage: 'IMDG/IMO Packaging Group' })}
            {this.RowInput({ name: 'imdgImoProperShippingName', id: 'global.imdgImoProperShippingName', defaultMessage: 'IMDG/IMO Proper Shipping Name' })}
            {this.RowInput({ name: 'imdgImoProperTechnicalName',id: 'global.imdgImoProperTechnicalName', defaultMessage: 'IMDG/IMO Proper Technical Name' })}
            {this.RowInput({ name: 'imdgImoUnNumber',           id: 'global.imdgImoUnNumber', defaultMessage: 'IMDG/IMO UN Number' })}
          </Grid>
        )
      }

      case 'imdgImo': {
        return (
          <Grid verticalAlign='middle'>
            {this.RowInput({ name: 'tdgHazardClass',            id: 'global.tdgHazardClass', defaultMessage: 'TDG Hazard Class' })}
            {this.RowInput({ name: 'tdgHazardLabel',            id: 'global.tdgHazardLabel', defaultMessage: 'TDG Hazard Label' })}
            {this.RowInput({ name: 'tdgPackagingGroup',         id: 'global.tdgPackagingGroup', defaultMessage: 'TDG Packaging Group' })}
            {this.RowInput({ name: 'tdgProperShippingName',     id: 'global.tdgProperShippingName', defaultMessage: 'TDG Proper Shipping Name' })}
            {this.RowInput({ name: 'tdgProperTechnicalName',    id: 'global.tdgProperTechnicalName', defaultMessage: 'TDG Proper Technical Name' })}
            {this.RowInput({ name: 'tdgUnNumber',               id: 'global.tdgUnNumber', defaultMessage: 'TDG UN Number' })}
          </Grid>
        )
      }
    }
  }


  getContent = (formikProps, popupValues) => {
    let { activeTab } = this.state
    switch (activeTab) {
      case 0: {   // Edit
        return this.renderEdit(formikProps)
      }
      case 1: {   // Info
        return this.renderInfo(formikProps)
      }
      case 2: {   // Documents
        return this.renderDocuments(formikProps, popupValues)
      }
      case 3: {   // Transportation
        return this.renderTransportation(formikProps)
      }

      default: return null
    }
  }


  render() {
    const {
      visible,
      closePopup,
      intl: {formatMessage},






      popupValues,
      config,
      toastManager,
      isLoading,
      packagingGroups,
      hazardClasses,
      postEchoProduct,
      putEchoProduct,
      searchManufacturers,
      searchedManufacturers,
      searchedManufacturersLoading,
      linkAttachment,
      listDocumentTypes,
      // searchedCasProducts
    } = this.props

    const {
      activeTab
    } = this.state

    //console.log('!!!!!!!!!! AddEditEchoProduct render props', this.props)

    return (
      <Form
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        render={(formikProps) => {
          let { values, touched, setFieldValue, validateForm, submitForm } = formikProps
          this.submitForm = submitForm

          return (
            <FlexSidebar
              visible={visible}
              width='very wide'
              style={{ 'width': '500px' }}
              direction='right'
              animation='overlay'
            >
              <div>
                <HighSegment basic>
                  <Menu pointing secondary>
                    {tabs.map((tab, i) => (
                      <Menu.Item
                        onClick={() => this.tabChanged(i)}
                        active={activeTab === i}
                      >{formatMessage(tab.text)}</Menu.Item>
                    ))}
                  </Menu>
                </HighSegment>
              </div>

              <FlexContent>
                <Segment basic>{this.getContent(formikProps, popupValues)}</Segment>
              </FlexContent>

              <GraySegment basic style={{ position: 'relative', overflow: 'visible', height: '4.57142858em', margin: '0' }}>
                <Grid>
                  <GridRow>
                    <GridColumn computer={6} textAlign='left'>
                      <Button
                        size='large'
                        inputProps={{ type: 'button' }}
                        onClick={() => closePopup()}
                        data-test='sidebar_inventory_cancel'>
                        {
                          (Object.keys(touched).length || this.state.changedForm) ?
                            formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' }) :
                            formatMessage({ id: 'global.close', defaultMessage: 'Close' })
                        }
                      </Button>
                    </GridColumn>
                    <GridColumn computer={10} textAlign='right'>
                      <Button
                        disabled={!(Object.keys(touched).length || this.state.changedForm)}
                        primary
                        size='large'
                        inputProps={{ type: 'button' }}
                        onClick={() => validateForm().then(r => {
                          console.log('!!!!! save values', values)
                          //if (Object.keys(r).length)
                          //! !this.switchToErrors(Object.keys(r))

                            //submitForm()
                        })}
                        data-test='sidebar_inventory_save_new'>
                        {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                      </Button>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </GraySegment>

            </FlexSidebar>
          )
        }}
      />
    )
  }
}

export default injectIntl(AddEditEchoProduct)