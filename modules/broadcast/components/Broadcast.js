import React, { Component } from 'react'
import { bool, number, object } from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Actions from '../actions'
import {
  Modal,
  Grid,
  Icon,
  Button,
  Form,
  Input,
  Dropdown,
  Dimmer,
  Loader,
  Message,
  Menu,
  Divider,
  Header,
  GridRow,
  GridColumn,
  Popup,
  Table
} from 'semantic-ui-react'
import { Formik } from 'formik'
import { Input as FormikInput, Dropdown as FormikDropdown } from 'formik-semantic-ui-fixed-validation'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import TreeModel from 'tree-model'
import {
  Rule,
  BottomUnpaddedRow,
  RightAlignedDiv,
  FlexWrapper,
  StretchedGrid,
  GridRowSearch,
  FieldInHeaderTable,
  DropdownInHeaderTable,
  InputSearch,
  GridRowTable,
  ButtonSave,
  ButtonTemplate,
  GridColumnFiltersModal,
  GridRowTemplateModal,
  GridRowFiltersModal,
  IconFolder,
  DivIcon,
  GridModalTemplate,
  CustomButtonDelete,
  CustomButton,
  FormFieldBroadcastAllButton,
  UnpaddedRow,
  ButtonCancel,
  GridBottom,
  GridColumnSearch,
  ButtonApply,
  ButtonSaveAs,
  GridActionsModal
} from './Broadcast.style'
import RuleItem from './RuleItem'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import Router from 'next/router'

import styled from 'styled-components'

import { getSafe } from '~/utils/functions'

import { errorMessages } from '~/constants/yupValidation'

import confirm from '~/src/components/Confirmable/confirm'
import { normalizeTree, getBroadcast, getNodeStatus } from '~/modules/broadcast/utils'
import CompanyInfo from './CompanyInfo'

class Broadcast extends Component {
  state = {
    filterSearch: '',
    associationFilter: 'ALL',
    selectedTemplate: { name: null, id: null },
    broadcastingTo: 0,
    change: false,
    saved: false,
    initialize: true,
    loading: false,
    templateInitialValues: {
      name: '',
      templates: ''
    }
  }

  componentDidMount() {
    if (this.props.filter.category !== 'branch') this.handleFilterChange(null, { name: 'category', value: 'branch' })
    this.props.getTemplates()
    this.props.getAssociations()
  }

  formChanged = () => {
    if (this.props.changedForm) this.props.changedForm()
  }

  handlePriceChange = (node, foundAllNodes) => {
    let path = node.getPath()

    for (let i = 0; i < path.length - 1; i++) {
      let { priceAddition, priceMultiplier } = path[i].model.rule
      if (priceAddition || priceMultiplier) node.model.rule.priceOverride = 1
    }

    this.setState({ change: true, saved: false })
    this.updateInTreeData(node, foundAllNodes)
    this.formChanged()
  }

  async componentWillUnmount() {
    const isLogout = getSafe(() => Router.router.pathname, '').includes('auth')
    if (this.state.change && !this.state.saved && !isLogout) {
      await confirm(
        <FormattedMessage id='confirm.broadcast.unsavedChanges.header' defaultMessage='Unsaved changes' />,
        <FormattedMessage
          id='confirm.broadcast.unsavedChanges.content'
          defaultMessage={`You have unsaved broadcast rules changes. Do you wish to save them?`}
        />
      ).then(async () => this.saveBroadcastRules())
    }
  }

  componentDidUpdate(oldProps) {
    const { loadedRulesTrig, broadcastTemplateName, templates } = this.props

    if (oldProps.loadedRulesTrig !== loadedRulesTrig) {
      let name = broadcastTemplateName
      let dataId = broadcastTemplateName
        ? getSafe(() => templates.find(el => el.name === broadcastTemplateName).id, null)
        : null

      if (dataId === null) {
        dataId = ''
        name = ''
      }

      if (this.setFieldValue) this.setFieldValue('templates', dataId)

      this.setState({
        ...this.state,
        selectedTemplate: {
          id: dataId,
          name: name
        },
        templateInitialValues: {
          name: name,
          templates: dataId
        }
      })
    }
  }

  updateInTreeData = (node, foundAllNodes) => {
    let copy = this.props.treeData
    const { filter } = this.props

    if (!node.isRoot()) {
      normalizeTree(node)
      let foundAll = copy.all(n => n.model.id === node.model.rule.id && n.model.type === node.model.rule.type)
      foundAll.forEach(found => {
        let index = found.getIndex()
        let path = found.getPath()
        let parent = path[path.length - 2]
        let parentNode = getSafe(() => foundAllNodes.length, '')
          ? foundAllNodes.find(nod => found.parent.model.id === nod.parent.model.id)
          : ''
        let rule = getSafe(() => parentNode.model.rule, '')

        // Remove node
        found.drop()
        // Set proper values
        found.model = rule || node.model.rule
        // Add back removed node (with updated data)
        parent.addChildAtIndex(found, index)
      })

      this.props.treeDataChanged({
        ...copy,
        model: {
          ...copy.model,
          rule: {
            ...copy.model.rule,
            ...this.treeToModel(copy)
          }
        }
      })
    } else {
      normalizeTree(node)
      let cnt = 1
      if (node.hasChildren()) {
        node.all().forEach(n => {
          if (!n.isRoot()) {
            let found = copy.first(c => c.model.id === n.model.rule.id && c.model.type === n.model.rule.type)

            let index = found.getIndex()
            let path = found.getPath()
            let parent = path[path.length - 2]

            if (found && index) {
              // Remove node
              found.drop()
              // Set proper values
              found.model = n.model.rule
              // Add back removed node (with updated data)
              parent.addChildAtIndex(found, index)
            }
          }
        })
      }

      this.props.treeDataChanged({
        ...copy,
        model: {
          ...copy.model,
          rule: {
            ...this.treeToModel(copy),
            ...node.model.rule
          }
        }
      })
    }
    return copy
  }

  getFilteredTree = (filterCategory = this.props.filter.category) => {
    const {
      treeData,
      filter,
      intl: { formatMessage }
    } = this.props

    const fs = filter.search.toLowerCase()

    const searchFn = n => {
      var found = false
      const name = n.model.name.toLowerCase()

      if (name.startsWith(fs)) {
        return true
      }

      name.split(' ').forEach(s => {
        if (s.startsWith(fs)) {
          found = true
          return
        }
      })

      return found
    }

    const searchParentFn = n => n.first(i => searchFn(i))

    const presets = {
      region: {
        name: formatMessage({
          id: 'broadcast.byRegion',
          defaultMessage: 'Regions'
        }),
        rule: { ...treeData.model, broadcast: getBroadcast(treeData) },
        depth: 1,
        children: treeData.children
          .filter(n => searchParentFn(n))
          .map(n1 => ({
            name: n1.model.name,
            // rule: n1.model,
            rule: { ...n1.model, broadcast: getBroadcast(n1) },
            depth: 2,
            children: n1.children
              .filter(n => searchFn(n) || searchParentFn(n))
              .map(n2 => ({
                name: n2.model.name,
                rule: {
                  hidden: false,
                  ...n2.model,
                  broadcast: n2.children.length ? getBroadcast(n2) : n2.model.broadcast
                },
                depth: 3,
                children: n2
                  .all(n => n.model.type === 'branch')
                  .map(n3 => ({
                    name: n3.model.name,
                    rule: { hidden: false, ...n3.model },
                    // rule: { ...treeData.model, broadcast: getBroadcast(treeData) },
                    depth: 4,
                    children: []
                  }))
              }))
          }))
      },
      branch: {
        // name: 'By company',
        name: formatMessage({
          id: 'broadcast.byCompany',
          defaultMessage: 'Companies'
        }),
        // rule: treeData.model,
        rule: { ...treeData.model, broadcast: getBroadcast(treeData) },
        depth: 1,
        children: _.uniqBy(
          treeData.all(n => n.model.type === 'company'),
          n => n.model.id
        )
          .sort((a, b) => (a.model.name > b.model.name ? 1 : b.model.name > a.model.name ? -1 : 0))
          .filter(searchFn)
          .map(n1 => ({
            name: n1.model.name,
            // rule: n1.model,
            rule: { ...n1.model, broadcast: getBroadcast(n1) },
            depth: 2,
            children: treeData
              .all(n => n.model.type === 'branch' && n.parent.model.id === n1.model.id)
              .map(n2 => ({
                name: n2.model.name,
                rule: { ...n2.model },
                // rule: { ...n2.model, broadcast: getBroadcast(n2) },
                depth: 3,
                children: []
              }))
          }))
      }
    }

    let preset = presets[filterCategory]
    // if (filterCategory === 'branch') {
    //   // add all branches to elements
    //   preset = {
    //     ...presets[filterCategory],
    //     children: presets[filterCategory].children.map(child => ({
    //       ...child,
    //       rule: { ...child.rule, elements: child.children.map(ch => ch.rule) }
    //     }))
    //   }
    // }

    let tree = new TreeModel().parse(preset)

    this.applyAssociationFilter(tree)
    // expand when search is active

    if (fs.length > 0) {
      tree.walk(n => (n.model.expanded = true))
    }

    return tree
  }

  // Oposite function of getFilteredTree
  // Converts tree (what you can see in app) into what BE wants
  treeToModel = (tree = this.getFilteredTree('region'), directExtract = false, removeExpanded = false) => {
    // const tree = this.getFilteredTree('region')

    const extractFromRule = rule => {
      const propertiesOfInterest = [
        'anonymous',
        'associations',
        'elements',
        'clientCompany',
        'broadcast',
        'expanded',
        'id',
        'name',
        'priceAddition',
        'priceMultiplier',
        'priceOverride',
        'type'
      ]

      const index = propertiesOfInterest.indexOf('expanded')
      if (index > -1 && removeExpanded) {
        propertiesOfInterest.splice(index, 1)
      }

      let obj = {}
      propertiesOfInterest.forEach(prop => (rule[prop] !== undefined ? (obj[prop] = rule[prop]) : null))

      return obj
    }

    return {
      ...extractFromRule(getSafe(() => tree.model.rule, tree.model)),
      broadcast: getBroadcast(tree.getPath()[0]),
      type: 'root',
      elements: tree.children.map(ch1 => ({
        ...extractFromRule(getSafe(() => ch1.model.rule, ch1.model)),
        elements: ch1.children.map(ch2 => ({
          ...extractFromRule(getSafe(() => ch2.model.rule, ch2.model)),
          elements: ch2.children.map(ch3 => ({
            ...extractFromRule(getSafe(() => ch3.model.rule, ch3.model)),
            elements: ch3.children.map(ch4 => ({
              ...extractFromRule(getSafe(() => ch4.model.rule, ch4.model))
            }))
          }))
        }))
      }))
    }
  }

  applyAssociationFilter = tree => {
    const { associationFilter } = this.state
    const { filter } = this.props

    this.setHidden(_element => true, false)
    tree.walk(n => {
      if (getSafe(() => n.model.rule.hidden, '')) {
        n.model.rule.hidden = false
        if (n.model.rule.type === 'branch') {
          let company = this.findCompany(n)
          company.model.hidden = false
          if (company.model.elements) {
            company.model.elements.forEach(c => (c.hidden = false))
          }
        }
      }
    })

    if (associationFilter === 'ALL' && filter.broadcast === 'all') return tree

    let companiesToHide = []
    let nodesToHide = tree.all(n => {
      if (n.model.rule.type === 'branch') {
        let company = this.findCompany(n)

        if (
          (associationFilter !== 'ALL' &&
            !getSafe(() => company.model.associations, []).includes(associationFilter) &&
            associationFilter !== 'Guests') ||
          (associationFilter === 'Guests' && company.model.elements[0].clientCompany === false) ||
          (filter.broadcast !== 'all' &&
            ((filter.broadcast === 'on' && getSafe(() => company.model.broadcast, '') === 0) ||
              (filter.broadcast === 'off' && getSafe(() => company.model.broadcast, '') > 0)))
        ) {
          if (companiesToHide.indexOf(company.model.id) === -1) companiesToHide.push(company)
          return true
        }
      }
      return false
    })
    companiesToHide.forEach(company => (company.model.hidden = true))

    nodesToHide.forEach(n => {
      n.model.rule.hidden = true
      this.setHidden(element => element.id === n.model.rule.id && element.type === 'branch', true)
    })

    return tree
  }

  setHidden = (predicate, hidden, elements = this.props.data.elements) => {
    for (let i = 0; i < elements.length; i++) {
      if (predicate(elements[i])) {
        elements[i].hidden = hidden
        return
      } else if (getSafe(() => elements[i].elements.length, false) > 0)
        this.setHidden(predicate, hidden, elements[i].elements)
    }
  }

  findCompany = branch =>
    this.props.treeData.first(
      n => n.model.type === 'branch' && n.model.id === getSafe(() => branch.model.rule.id, branch.id)
    ).parent

  handleChange = (node, propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()
    let copyTreeData = this.props.treeData
    let { rule } = node.model

    const value = rule[propertyName]
    let newValue = 0
    switch (value) {
      case 2: {
        if (getNodeStatus(node, n => n.model.rule.type !== 'company' && !n.model.rule.hidden).anyChildBroadcasting) {
          newValue = 0
        } else newValue = 1
        break
      }
      case 0: {
        newValue = 1
        break
      }
    }

    rule[propertyName] = newValue

    let foundAllNodes = ''
    if (node.hasChildren()) {
      node.walk(n => {
        if (!getSafe(() => n.model.rule.hidden, n.model.hidden)) {
          n.model.rule[propertyName] = newValue
          if (getSafe(() => n.model.rule.elements.length, 0) > 0) {
            this.changeInModel(n.model.rule.elements, { propertyName, value: newValue })
          }
        }
      })
      //find all parents (state) of branches when change company
      if (
        rule.type !== 'root' &&
        this.props.filter.category === 'branch' &&
        node.model.children.length > node.model.rule.elements.length
      ) {
        foundAllNodes = copyTreeData.all(
          n => n.model.id === node.model.rule.id && n.model.type === node.model.rule.type
        )
        foundAllNodes.forEach(nod => {
          nod.walk(no => {
            if (!getSafe(() => no.model.rule, '')) {
              no.model.rule = { ...no.model, [propertyName]: newValue }
              if (getSafe(() => no.model.rule.elements.length, 0) > 0) {
                this.changeInModel(no.model.rule.elements, { propertyName, value: newValue })
              }
            }
          })
        })
      }
    }

    this.updateInTreeData(node, foundAllNodes)
    this.formChanged()
  }

  changeInModel = (elementsParam, data) => {
    const { propertyName, value } = data
    if (getSafe(() => elementsParam.length, false)) {
      elementsParam.forEach(element => {
        if (!element.hidden) {
          if (Array.isArray(propertyName)) {
            propertyName.forEach(name => (element[name] = value))
          } else {
            element[propertyName] = value
          }
        }
        if (getSafe(() => element.elements.length, '') > 0) this.changeInModel(element.elements, data)
      })
    }
  }

  handleRowClick = node => {
    node.model.rule.expanded = !node.model.rule.expanded

    if (!node.model.rule.expanded) node.all(n => (n.model.rule.expanded = false))
    this.updateInTreeData(node)
  }

  handleSearchChange = (e, { name, value }) => {
    this.setState({ filterSearch: value })

    this.handleFilterChange(e, { name, value })
  }

  handleFilterChange = (_, { name, value }) => {
    const { updateFilter, filter } = this.props

    updateFilter({
      ...filter,
      [name]: value
    })
  }

  onTemplateSelected = async (_, data, setFieldValue) => {
    const { getTemplate } = this.props

    let name = data.options.find(opt => opt.value === data.value).text
    this.setState({
      ...this.state,
      selectedTemplate: { name, id: data.value },
      templateInitialValues: { name, templates: data.value }
    })

    try {
      await getTemplate(data.value)
    } catch (e) {
      console.error(e)
    }
  }

  handleTemplateDelete = async (setFieldValue, name, id) => {
    const { deleteTemplate, toastManager, intl } = this.props
    const { formatMessage } = intl
    //let { name, id } = this.state.selectedTemplate
    await confirm(
      formatMessage({ id: 'confirm.deleteTemplate.title' }),
      formatMessage({ id: 'confirm.deleteTemplate.content' }, { name })
    )

    await deleteTemplate(id)

    this.setState({ selectedTemplate: { id: '' } })

    toastManager.add(
      generateToastMarkup(
        <FormattedMessage id='notifications.templateDelete.header' />,
        <FormattedMessage id='notifications.templateDelete.content' values={{ name }} />
      ),
      { appearance: 'success' }
    )
  }
  getAssociationsDropdown = () => {
    const { associationsFetching, associations } = this.props
    const options = getSafe(() => associations.length, '')
      ? associations.map((a, i) => ({ key: i, text: a, value: a }))
      : []

    return (
      <FieldInHeaderTable>
        <DropdownInHeaderTable
          fluid
          value={this.state.associationFilter}
          selection
          loading={associationsFetching}
          options={[
            { key: 'ALL', text: 'Partners', value: 'ALL' },
            { key: 'Guests', text: 'Guests', value: 'Guests' }
          ].concat(options)}
          onChange={(_e, { value }) => this.setState({ associationFilter: value })}
        />
      </FieldInHeaderTable>
    )
  }

  getAssociationFilter = () => {
    const {
      asSidebar,
      intl: { formatMessage }
    } = this.props

    const broadcastButton = (
      <FormFieldBroadcastAllButton>
        <label>&nbsp;</label>
        <CustomButton
          onClick={e => this.handleChange(this.getFilteredTree().getPath()[0], 'broadcast', e)}
          fluid
          basic
          color='blue'>
          {formatMessage({ id: 'broadcast.toAll', defaultMessage: 'Broadcast to All' })}
        </CustomButton>
      </FormFieldBroadcastAllButton>
    )
    if (asSidebar) {
      return (
        <UnpaddedRow.Top verticalAlign='middle'>
          <GridColumn computer={8}>{this.getAssociationsDropdown()}</GridColumn>
          <GridColumn computer={8}>{broadcastButton}</GridColumn>
        </UnpaddedRow.Top>
      )
    }
    return (
      <Form.Group widths='equal'>
        {this.getAssociationsDropdown()}
        {broadcastButton}
      </Form.Group>
    )
  }

  applyTemplate = async (e, name, id) => {
    const { templates } = this.props
    if (name) {
      this.onTemplateSelected(
        e,
        {
          options: templates.map(template => ({
            key: template.id,
            text: template.name,
            value: template.id
          })),
          value: id
        },
        this.setFieldValue
      )
      this.setState({
        selectedTemplate: {
          id: id,
          name: name
        }
      })
      this.formChanged()
    } else {
      this.setFieldValue('name', id)
      this.submitForm()
      this.formChanged()
    }
  }

  getModalTemplateContent = () => {
    const { templates, templateSaving, templateDeleting } = this.props
    return (
      <GridModalTemplate>
        <Grid.Row>
          <Grid.Column>
            <Table singleLine basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='3'>
                    <FormattedMessage id='broadcast.templateName' defaultMessage='Template Name' />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {templateSaving || templateDeleting ? (
                  <Dimmer active={true} inverted>
                    <Loader active={true} />
                  </Dimmer>
                ) : Array.isArray(templates) && templates.length ? (
                  templates.map(template => (
                    <Table.Row>
                      <Table.Cell width={12}>{template.name}</Table.Cell>

                      <Table.Cell textAlign='right'>
                        <CustomButton
                          data-test='broadcast_modal_template_apply_btn'
                          onClick={e => this.applyTemplate(e, template.name, template.id)}
                          type='button'
                          basic
                          fluid>
                          <FormattedMessage id='global.apply' defaultMessage='Apply' />
                        </CustomButton>
                      </Table.Cell>
                      <Table.Cell textAlign='right'>
                        <CustomButtonDelete
                          data-test='broadcast_modal_template_delete_btn'
                          onClick={() => this.handleTemplateDelete(this.setFieldValue, template.name, template.id)}
                          type='button'
                          basic
                          fluid>
                          <FormattedMessage id='global.delete' defaultMessage='Delete' />
                        </CustomButtonDelete>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell width={12}>
                      <FormattedMessage id='global.noRecords' defaultMessage='No records found.' />
                    </Table.Cell>

                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </GridModalTemplate>
    )
  }

  getContent = () => {
    let {
      offer,
      templates,
      updateTemplate,
      mode,
      asSidebar,
      saveTemplate,
      filter,
      loading,
      intl: { formatMessage },
      treeData,
      additionalGridProps,
      asModal,
      hideFobPrice,
      isOpenModalCompanyInfo,
      closeModalCompanyInfo,
      openModalCompanyInfo,
      getCompanyInfo,
      dataCompanyInfo,
      isLoadingModalCompanyInfo,
      templateSaving,
      associationsFetching,
      associations,
      close
    } = this.props

    let totalCompanies = _.uniqBy(
      treeData.all(n => n.model.type === 'company'),
      n => n.model.id
    ).length
    let totalBranches = treeData.all(n => !n.hasChildren() && n.model.type === 'branch').length

    let broadcastingCompanies = _.uniqBy(
      treeData.all(n => getSafe(() => n.model.broadcast, '') === 1 && n.model.type === 'company'),
      n => n.model.id
    ).length
    let broadcastingBranches = treeData.all(
      n => !n.hasChildren() && n.model.broadcast === 1 && n.model.type === 'branch'
    ).length

    const options = getSafe(() => associations.length, '')
      ? associations.map((a, i) => ({ key: i, text: a, value: a }))
      : []

    return (
      <FlexWrapper>
        <Form>
          {asSidebar ? (
            <>
              <CompanyInfo
                isLoadingModalCompanyInfo={isLoadingModalCompanyInfo}
                dataCompanyInfo={dataCompanyInfo}
                isOpenModalCompanyInfo={isOpenModalCompanyInfo}
                closeModalCompanyInfo={closeModalCompanyInfo}
              />
              <Grid>
                <GridRowTemplateModal>
                  <GridColumn>
                    <Modal
                      trigger={
                        <ButtonTemplate data-test='broadcast_modal_template_btn' type='button' basic fluid>
                          <DivIcon>
                            <IconFolder />
                            <div>
                              <span>
                                {formatMessage({
                                  id: 'broadcast.select.templates',
                                  defaultMessage: 'Select From Templates'
                                })}
                              </span>
                            </div>
                          </DivIcon>
                        </ButtonTemplate>
                      }
                      header={formatMessage({
                        id: 'broadcast.select.templates.title',
                        defaultMessage: 'SELECT FROM TEMPLATES'
                      })}
                      content={this.getModalTemplateContent()}
                      actions={['Close']}
                    />
                  </GridColumn>
                </GridRowTemplateModal>
                <GridRowFiltersModal>
                  <GridColumnFiltersModal>
                    <Form.Field data-test='broadcast_modal_search_inp'>
                      <InputSearch
                        name='search'
                        icon='search'
                        iconPosition='right'
                        value={this.state.filterSearch}
                        onChange={this.handleSearchChange}
                        placeholder={formatMessage({
                          id: 'broadcast.search',
                          defaultMessage: 'Search by Company Name, Branch, State, or Country'
                        })}
                      />
                    </Form.Field>
                  </GridColumnFiltersModal>
                </GridRowFiltersModal>
                <GridRowFiltersModal columns={3}>
                  <GridColumnFiltersModal firstColumn>
                    <DropdownInHeaderTable
                      fluid
                      data-test='broadcast_global_category_drpdn'
                      selection
                      name='category'
                      value={filter.category}
                      onChange={this.handleFilterChange}
                      options={[
                        {
                          key: 'region',
                          text: 'Regions',
                          value: 'region'
                        },
                        {
                          key: 'branch',
                          text: 'Companies',
                          value: 'branch'
                        }
                      ]}
                    />
                  </GridColumnFiltersModal>
                  <GridColumnFiltersModal secondColumn>
                    <DropdownInHeaderTable
                      fluid
                      value={this.state.associationFilter}
                      selection
                      loading={associationsFetching}
                      options={[
                        { key: 'ALL', text: 'Partners', value: 'ALL' },
                        { key: 'Guests', text: 'Guests', value: 'Guests' }
                      ].concat(options)}
                      onChange={(_e, { value }) => this.setState({ associationFilter: value })}
                    />
                  </GridColumnFiltersModal>
                  <GridColumnFiltersModal thirdColumn>
                    <DropdownInHeaderTable
                      fluid
                      data-test='broadcast_global_broadcast_drpdn'
                      selection
                      name='broadcast'
                      value={filter.broadcast}
                      onChange={this.handleFilterChange}
                      options={[
                        {
                          key: 'all',
                          text: 'Broadcast - All',
                          value: 'all'
                        },
                        {
                          key: 'on',
                          text: 'Broadcast - On',
                          value: 'on'
                        },
                        {
                          key: 'off',
                          text: 'Broadcast - Off',
                          value: 'off'
                        }
                      ]}
                    />
                  </GridColumnFiltersModal>
                </GridRowFiltersModal>
                {false && (
                  <GridRow>
                    <GridColumn>
                      <Message info size='large' style={{ padding: '6px 15px' }}>
                        <Popup
                          trigger={<Icon name='info circle' />}
                          content={
                            <FormattedMessage
                              id='broadcast.broadcastingTooltip'
                              defaultMessage='Shows number of company branches out of the total company branches you will Broadcast to, once you turn Broadcasting on.'
                            />
                          }
                        />
                        <FormattedMessage id='broadcast.broadcastingTo' defaultMessage='Visible to' />{' '}
                        <strong>
                          {broadcastingBranches}/{totalBranches}
                        </strong>
                        <FormattedMessage id='broadcast.broadcastingBranches' defaultMessage=' branches of ' />
                        <strong>
                          {broadcastingCompanies}/{totalCompanies}
                        </strong>
                        <FormattedMessage id='broadcast.broadcastingCompanies' defaultMessage=' companies' />
                      </Message>
                    </GridColumn>
                  </GridRow>
                )}
                {false && (
                  <UnpaddedRow.Bottom>
                    <GridColumn mobile={8}>
                      <Form.Field>
                        <label>
                          <FormattedMessage id='broadcast.categoryFilter' defaultMessage='Category filter' />
                        </label>
                        <Dropdown
                          data-test='broadcast_modal_category_drpdn'
                          selection
                          name='category'
                          value={filter.category}
                          onChange={this.handleFilterChange}
                          options={[
                            {
                              key: 'region',
                              text: 'Regions',
                              value: 'region'
                            },
                            {
                              key: 'branch',
                              text: 'Companies',
                              value: 'branch'
                            }
                          ]}
                        />
                      </Form.Field>
                    </GridColumn>
                    <GridColumn mobile={8}>
                      <Form.Field data-test='broadcast_modal_search_inp'>
                        <label>
                          <FormattedMessage id='broadcast.filter' defaultMessage='Filter' />
                        </label>
                        <Input
                          name='search'
                          icon='search'
                          iconPosition='left'
                          value={this.state.filterSearch}
                          onChange={this.handleSearchChange}
                        />
                      </Form.Field>
                    </GridColumn>
                  </UnpaddedRow.Bottom>
                )}
                {false && this.getAssociationFilter()}
              </Grid>
            </>
          ) : (
            <Grid>
              <GridRowSearch>
                <GridColumnSearch>
                  <Form.Field data-test='broadcast_modal_search_inp'>
                    <InputSearch
                      name='search'
                      icon='search'
                      iconPosition='right'
                      value={this.state.filterSearch}
                      onChange={this.handleSearchChange}
                      placeholder={formatMessage({
                        id: 'broadcast.search',
                        defaultMessage: 'Search by Company Name, Branch, State, or Country'
                      })}
                    />
                  </Form.Field>
                </GridColumnSearch>
              </GridRowSearch>
              {false && (
                <GridRow textAlign='left'>
                  <GridColumn width={8}>
                    <Message info size='large' style={{ padding: '6px 15px' }}>
                      <Popup
                        trigger={<Icon name='info circle' />}
                        content={
                          <FormattedMessage
                            id='broadcast.broadcastingTooltip'
                            defaultMessage='Shows number of company branches out of the total company branches you will Broadcast to, once you turn Broadcasting on.'
                          />
                        }
                      />
                      <FormattedMessage id='broadcast.broadcastingTo' defaultMessage='Visible to' />{' '}
                      <strong>
                        {broadcastingBranches}/{totalBranches}
                      </strong>
                      <FormattedMessage id='broadcast.broadcastingBranches' defaultMessage=' branches of ' />
                      <strong>
                        {broadcastingCompanies}/{totalCompanies}
                      </strong>
                      <FormattedMessage id='broadcast.broadcastingCompanies' defaultMessage=' companies' />
                    </Message>
                  </GridColumn>
                  <GridColumn width={8}></GridColumn>
                </GridRow>
              )}
            </Grid>
          )}
        </Form>

        <StretchedGrid className='flex dynamic stretched' {...additionalGridProps}>
          <GridRowTable>
            <Grid.Column
              width={16}
              stretched
              style={asSidebar ? { padding: '0', boxShadow: '0 0 0 transparent' } : null}>
              <Rule.Root asSidebar={asSidebar}>
                <Rule.Header asSidebar={asSidebar}>
                  <Rule.Toggle
                    style={
                      asSidebar
                        ? { flex: '0 0 62px', color: '#848893' }
                        : { flex: '0 0 88px', maxWidth: '60px', borderRight: 'none !important', color: '#848893' }
                    }>
                    <FormattedMessage id='broadcast.select' defaultMessage='Select' />
                  </Rule.Toggle>
                  <Rule.RowContent>
                    {!asSidebar && (
                      <>
                        <FieldInHeaderTable>
                          <DropdownInHeaderTable
                            fluid
                            data-test='broadcast_global_category_drpdn'
                            selection
                            name='category'
                            value={filter.category}
                            onChange={this.handleFilterChange}
                            options={[
                              {
                                key: 'region',
                                text: 'Regions',
                                value: 'region'
                              },
                              {
                                key: 'branch',
                                text: 'Companies',
                                value: 'branch'
                              }
                            ]}
                          />
                        </FieldInHeaderTable>
                        {this.getAssociationsDropdown()}
                        <FieldInHeaderTable>
                          <DropdownInHeaderTable
                            fluid
                            data-test='broadcast_global_broadcast_drpdn'
                            selection
                            name='broadcast'
                            value={filter.broadcast}
                            onChange={this.handleFilterChange}
                            options={[
                              {
                                key: 'all',
                                text: 'Broadcast - All',
                                value: 'all'
                              },
                              {
                                key: 'on',
                                text: 'Broadcast - On',
                                value: 'on'
                              },
                              {
                                key: 'off',
                                text: 'Broadcast - Off',
                                value: 'off'
                              }
                            ]}
                          />
                        </FieldInHeaderTable>
                      </>
                    )}
                  </Rule.RowContent>

                  <Rule.Toggle style={!asSidebar ? { maxWidth: '110px', color: '#848893' } : { color: '#848893' }}>
                    <FormattedMessage id='broadcast.markUpDown' defaultMessage='Mark-up/down' />
                  </Rule.Toggle>
                  <Rule.Toggle style={!asSidebar ? { maxWidth: '60px' } : { maxWidth: '50px' }}></Rule.Toggle>
                </Rule.Header>
                <Rule.Content asSidebar={asSidebar}>
                  <RuleItem
                    changeInModel={this.changeInModel}
                    loadingChanged={this.props.loadingChanged}
                    filter={filter}
                    associationFilter={this.state.associationFilter}
                    hideFobPrice={hideFobPrice}
                    item={this.getFilteredTree()}
                    mode={mode}
                    offer={offer}
                    onRowClick={this.handleRowClick}
                    onPriceChange={this.handlePriceChange}
                    onChange={this.handleChange}
                    data-test='broadcast_modal_rule_action'
                    asSidebar={asSidebar}
                    openModalCompanyInfo={openModalCompanyInfo}
                    getCompanyInfo={getCompanyInfo}
                    treeData={treeData}
                  />
                </Rule.Content>
              </Rule.Root>
              {!asSidebar && (
                <RightAlignedDiv>
                  <Button basic onClick={() => this.resetBroadcastRules()} data-test='broadcast_global_reset_btn'>
                    {formatMessage({ id: 'global.reset', defaultMessage: 'Reset' })}
                  </Button>
                  <ButtonSave primary onClick={() => this.saveBroadcastRules()} data-test='broadcast_global_save_btn'>
                    {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                  </ButtonSave>
                </RightAlignedDiv>
              )}
            </Grid.Column>
          </GridRowTable>
        </StretchedGrid>
        {asSidebar && (
          <GridBottom>
            <Grid.Row textAlign='right'>
              <Grid.Column width='8'>
                <ButtonCancel onClick={() => close()} data-test='broadcast_modal_close_btn'>
                  {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                </ButtonCancel>
              </Grid.Column>

              <Grid.Column width='4'>
                <ButtonSaveAs
                  fluid
                  basic
                  onClick={() => this.props.switchTemplateModal(true)}
                  data-test='broadcast_modal_save_as_btn'>
                  {formatMessage({ id: 'global.saveAs', defaultMessage: 'Save as' })}
                </ButtonSaveAs>
              </Grid.Column>
              <Grid.Column width='4'>
                <ButtonApply
                  fluid
                  basic
                  onClick={() => this.saveBroadcastRules()}
                  data-test='broadcast_modal_apply_btn'>
                  {formatMessage({ id: 'global.apply', defaultMessage: 'Apply' })}
                </ButtonApply>
              </Grid.Column>
            </Grid.Row>
          </GridBottom>
        )}
      </FlexWrapper>
    )
  }

  resetAllFilters = async () => {
    this.setState({ filterSearch: '', associationFilter: 'ALL', selectedTemplate: { name: null, id: null } })
    this.props.updateFilter({
      search: '',
      category: 'branch',
      broadcast: 'all'
    })
  }

  resetBroadcastRules = async () => {
    this.resetAllFilters()

    const { treeData } = this.props

    treeData.walk(no => {
      if (!getSafe(no.model.rule, '')) {
        no.model.rule = { ...no.model, priceAddition: 0, priceMultiplier: 0, broadcast: 0 }
      }

      if (getSafe(() => n.model.rule.hidden, '')) {
        n.model.rule.hidden = false
        if (n.model.rule.type === 'branch') {
          let company = this.findCompany(n)
          company.model.hidden = false
          if (company.model.elements) {
            company.model.elements.forEach(c => (c.hidden = false))
          }
        }
      }
      if (getSafe(() => no.model.rule.elements.length, 0) > 0) {
        this.changeInModel(no.model.rule.elements, {
          propertyName: ['priceAddition', 'priceMultiplier', 'broadcast'],
          value: 0
        })
      }
    })

    this.updateInTreeData(treeData)

    this.formChanged()
  }

  saveBroadcastRules = async () => {
    const { saveRules, id, initGlobalBroadcast, asSidebar, toastManager, templates } = this.props
    let filteredTree = this.treeToModel(undefined, undefined, true)

    try {
      this.handleFilterChange(null, {
        name: 'category',
        value: 'branch'
      })

      const { value } = await saveRules(id, filteredTree)

      let name,
        dataId = null
      if (value && value.broadcastTemplateName) {
        name = value.broadcastTemplateName
        dataId = value.broadcastTemplateName
          ? getSafe(() => templates.find(el => el.name === value.broadcastTemplateName).id, null)
          : null
      }

      if (dataId === null) {
        dataId = ''
        name = ''
      }

      //if (this.setFieldValue) this.setFieldValue('templates', dataId)

      if (!asSidebar) {
        await initGlobalBroadcast()
      }
      this.setState({
        saved: true,
        initialize: true,
        selectedTemplate: {
          id: dataId,
          name: name
        },
        templateInitialValues: {
          name: name,
          templates: dataId
        }
      })
      if (getSafe(() => filteredTree.broadcast, null) === 0) {
        toastManager.add(
          generateToastMarkup(
            <FormattedMessage
              id='broadcast.turnoff.title'
              defaultMessage='Price book for this offer has been deleted!'
            />,
            <FormattedMessage
              id='broadcast.turnoff.content'
              defaultMessage='Global rules are going to be used. To turn off broadcasting completely, edit it inside Edit tab.'
            />
          ),
          {
            appearance: 'info'
          }
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {
      isOpenTemplateModal,
      close,
      asModal,
      loading,
      isPrepared,
      templates,
      updateTemplate,
      intl: { formatMessage },
      saveTemplate,
      switchTemplateModal
    } = this.props
    const { templateInitialValues } = this.state

    // const broadcastToBranches = treeData && `${treeData.all(n => n.model.type === 'state' && (n.all(_n => _n.model.broadcast === 1).length > 0 || n.getPath().filter(_n => _n.model.broadcast === 1).length > 0)).length}/${treeData.all(n => n.model.type === 'state').length}`

    if (!asModal) {
      if (loading || !isPrepared)
        return (
          <Dimmer active={true} inverted>
            <Loader active={true} />
          </Dimmer>
        )
      return (
        <>
          {isOpenTemplateModal ? (
            <Formik
              initialValues={templateInitialValues}
              validateOnChange={true}
              enableReinitialize
              onSubmit={async (values, { setSubmitting, setFieldValue }) => {
                let payload = {
                  mappedBroadcastRules: {
                    ...this.treeToModel(undefined, undefined, true)
                  },
                  name: values.name
                }

                if (templates.some(el => el.name === values.name)) {
                  let { name, id } = templates.find(template => template.name === values.name)

                  await confirm(
                    formatMessage({ id: 'broadcast.overwriteTemplate.header' }, { name }),
                    formatMessage({
                      id: 'broadcast.overwriteTemplate.content'
                    })
                  )

                  await updateTemplate(id, payload)
                } else {
                  let { value } = await saveTemplate(payload)
                  this.setState({ selectedTemplate: value })
                  setFieldValue('templates', value.id)
                }

                let status = values.name === name ? 'Updated' : 'Saved'
                setSubmitting(false)
              }}
              render={props => {
                this.submitForm = props.submitForm
                this.setFieldValue = props.setFieldValue

                return (
                  <Form onSubmit={props.handleSubmit}>
                    <Modal closeIcon open={isOpenTemplateModal} onClose={() => switchTemplateModal(false)} size='small'>
                      <Modal.Header>
                        <FormattedMessage id='broadcast.saveAsTemplate' defaultMessage='Save as Template' />
                      </Modal.Header>
                      <Modal.Content scrolling className='flex stretched'>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column>
                              <FormikInput
                                inputProps={{
                                  fluid: true,
                                  placeholder: formatMessage({
                                    id: 'broadcast.templateName',
                                    defaultMessage: 'Template Name'
                                  }),
                                  'data-test': 'broadcast_modal_templateName_inp'
                                }}
                                name='name'
                              />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Modal.Content>
                      <Modal.Actions>
                        <GridActionsModal>
                          <Grid.Row textAlign='right'>
                            <Grid.Column width='13'>
                              <ButtonCancel
                                onClick={() => switchTemplateModal(false)}
                                data-test='broadcast_template_modal_close_btn'>
                                {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                              </ButtonCancel>
                            </Grid.Column>
                            <Grid.Column width='3'>
                              <ButtonSaveAs
                                fluid
                                onClick={this.submitForm}
                                type='button'
                                loading={this.props.templateSaving}
                                basic
                                disabled={!props.values.name}
                                data-test='broadcast_modal_submit_btn'>
                                {formatMessage({
                                  id: 'global.save',
                                  defaultMessage: 'Save'
                                })}
                              </ButtonSaveAs>
                            </Grid.Column>
                          </Grid.Row>
                        </GridActionsModal>
                      </Modal.Actions>
                    </Modal>
                  </Form>
                )
              }}></Formik>
          ) : null}

          {this.getContent()}
        </>
      )
    }
  }
}

Broadcast.propTypes = {
  asModal: bool,
  additionalGridProps: object,
  hideFobPrice: bool,
  asSidebar: bool,
  isOpenTemplateModal: bool,
  saveSidebar: number
}

Broadcast.defaultProps = {
  asModal: true,
  additionalGridProps: {},
  hideFobPrice: false,
  asSidebar: false,
  isOpenTemplateModal: false,
  saveSidebar: 0
}

export default injectIntl(
  withToastManager(
    connect(
      ({ broadcast }) => {
        const treeData = broadcast.data
          ? new TreeModel({ childrenPropertyName: 'elements' }).parse(broadcast.data)
          : new TreeModel().parse({ model: { rule: {} } })

        return {
          treeData,
          ...broadcast
        }
      },
      { ...Actions }
    )(Broadcast)
  )
)
