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
  Popup
} from 'semantic-ui-react'
import { Formik } from 'formik'
import { Input as FormikInput, Dropdown as FormikDropdown } from 'formik-semantic-ui-fixed-validation'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import TreeModel from 'tree-model'
import { Rule, BottomUnpaddedRow, RightAlignedDiv, StretchedGrid } from './Broadcast.style'
import RuleItem from './RuleItem'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'

import styled from 'styled-components'

import { getSafe } from '~/utils/functions'

import { errorMessages } from '~/constants/yupValidation'

import confirm from '~/src/components/Confirmable/confirm'
import { normalizeTree, getBroadcast, getNodeStatus } from '~/modules/broadcast/utils'
import CompanyInfo from './CompanyInfo'
const UnpaddedRow = {
  Bottom: styled(GridRow)`
    padding-bottom: 0px !important;
  `,
  Top: styled(GridRow)`
    padding-top: 0px !important;
  `
}

const templateValidation = () =>
  Yup.object().shape({
    name: Yup.string().required(errorMessages.requiredMessage)
  })

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
    if (this.props.filter.category !== 'region') this.handleFilterChange(null, { name: 'category', value: 'region' })
    this.props.getTemplates()
    this.props.getAssociations()
  }

  formChanged = () => {
    if (this.props.changedForm) this.props.changedForm()
  }

  handlePriceChange = node => {
    if (node.hasChildren()) {
      node.walk(n => {
        let nodePath = n.getPath()
        let parent = nodePath[nodePath.length - 2]

        if (
          !n.model.rule.priceOverride &&
          (!getSafe(() => parent.model.rule.priceOverride, 0) || node.model.rule.id === parent.model.rule.id)
        ) {
          n.model.rule.priceAddition = node.model.rule.priceAddition
          n.model.rule.priceMultiplier = node.model.rule.priceMultiplier
        }
      })
    }

    let path = node.getPath()

    for (let i = 0; i < path.length - 1; i++) {
      let { priceAddition, priceMultiplier } = path[i].model.rule
      if (priceAddition || priceMultiplier) node.model.rule.priceOverride = 1
    }

    this.setState({ change: true, saved: false })
    this.updateInTreeData(node)
    this.formChanged()
  }

  async componentWillUnmount() {
    if (this.state.change && !this.state.saved) {
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

    if (oldProps.saveBroadcast !== this.props.saveBroadcast && this.props.saveBroadcast) {
      this.saveBroadcastRules()
    }

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

  updateInTreeData = node => {
    let copy = this.props.treeData
    const { filter } = this.props

    console.log('!!!!!!!!!! updateInTreeData copy', copy)
    console.log('!!!!!!!!!! updateInTreeData node', node)

    if (!node.isRoot()) {
      let found = copy.first(n => n.model.id === node.model.rule.id && n.model.type === node.model.rule.type)
      let index = found.getIndex()
      let path = found.getPath()
      let parent = path[path.length - 2]

      // Remove node
      found.drop()
      // Set proper values
      found.model = node.model.rule
      // Add back removed node (with updated data)
      parent.addChildAtIndex(found, index)
      normalizeTree(node)

      this.props.treeDataChanged({
        ...copy,
        model: { ...copy.model, rule: { ...copy.model.rule, ...this.treeToModel(copy) } }
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
            ...node.model.rule,
          }}
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
          defaultMessage: 'By Region'
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
          defaultMessage: 'By Company'
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
                rule: n2.model,
                // rule: { ...n2.model, broadcast: getBroadcast(n2) },
                depth: 3,
                children: []
              }))
          }))
      }
    }
    console.log('!!!!!!!!!! getFilteredTree presets', presets)

    let preset = presets[filterCategory]

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

    console.log('!!!!!!!!!! treeToModel tree', tree)
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

    this.setHidden(_element => true, false)
    tree.walk(n => {
      if (n.model.rule.hidden) {
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

    if (associationFilter === 'ALL') return tree

    let companiesToHide = []
    let nodesToHide = tree.all(n => {
      if (n.model.rule.type === 'branch') {
        let company = this.findCompany(n)

        if (
          (!getSafe(() => company.model.associations, []).includes(associationFilter) &&
            associationFilter !== 'Guest Company') ||
          (associationFilter === 'Guest Company' && company.model.elements[0].clientCompany === false)
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

    if (node.hasChildren()) {
      node.walk(n => {
        if (!getSafe(() => n.model.rule.hidden, n.model.hidden)) {
          n.model.rule[propertyName] = newValue
          if (getSafe(() => n.model.rule.elements.length, 0) > 0 && this.props.filter.category !== 'branch') {
            this.changeInModel(n.model.rule.elements, { propertyName, value: newValue })
          }
        }
      })
    }
    // const { treeData } = this.props
    // const findInData = node =>
    //   getSafe(
    //     () => treeData.first(n => n.model.id === node.model.rule.id && n.model.type === node.model.rule.type),
    //     null
    //   )

    // let path = getSafe(() => findInData(node).getPath(), [])
    // for (let i = path.length - 2; i >= 0; i--) setBroadcast(path[i])

    // Hotfix - Changes were not applied to data structure when clicking on nodes with childs with 'By Company' filter applied
    // This fixes it, but causes a delay when clicking on root as it iterates through every node and it's path in data structure

    // if (this.props.filter.category === 'branch') {
    //   if (node.isRoot()) {
    //     node.walk(n => {
    //       if (n.model.rule.type === 'branch' && !n.model.rule.hidden) {
    //         n.model.rule[propertyName] = newValue
    //       }
    //     })
    //   }
    // }

    this.updateInTreeData(node)
    this.formChanged()
  }

  changeInModel = (elementsParam, data) => {
    const { propertyName, value } = data
    if (getSafe(() => elementsParam.length, false)) {
      elementsParam.forEach(element => {
        if (!element.hidden) {
          element[propertyName] = value
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
    setFieldValue('name', name)
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

  handleTemplateDelete = async setFieldValue => {
    const { deleteTemplate, toastManager, intl } = this.props
    const { formatMessage } = intl
    let { name, id } = this.state.selectedTemplate
    await confirm(
      formatMessage({ id: 'confirm.deleteTemplate.title' }),
      formatMessage({ id: 'confirm.deleteTemplate.content' }, { name })
    )

    await deleteTemplate(id)

    setFieldValue('name', '')

    toastManager.add(
      generateToastMarkup(
        <FormattedMessage id='notifications.templateDelete.header' />,
        <FormattedMessage id='notifications.templateDelete.content' values={{ name }} />
      ),
      { appearance: 'success' }
    )
  }

  getAssociationFilter = () => {
    const {
      associationsFetching,
      associations,
      asSidebar,
      intl: { formatMessage }
    } = this.props

    const associationsDropdown = (
      <Form.Field>
        <label>
          <FormattedMessage id='global.associations' defaultMessage='Associations' />
        </label>
        <Dropdown
          fluid
          value={this.state.associationFilter}
          selection
          loading={associationsFetching}
          options={['ALL', 'Guest Company'].concat(associations).map((a, i) => ({ key: i, text: a, value: a }))}
          onChange={(_e, { value }) => this.setState({ associationFilter: value })}
        />
      </Form.Field>
    )
    const broadcastButton = (
      <Form.Field>
        <label>&nbsp;</label>
        <Button
          onClick={e => this.handleChange(this.getFilteredTree().getPath()[0], 'broadcast', e)}
          fluid
          basic
          color='blue'>
          {formatMessage({ id: 'broadcast.toAll', defaultMessage: 'Broadcast to All' })}
        </Button>
      </Form.Field>
    )
    if (asSidebar) {
      return (
        <UnpaddedRow.Top verticalAlign='middle'>
          <GridColumn computer={8}>{associationsDropdown}</GridColumn>
          <GridColumn computer={8}>{broadcastButton}</GridColumn>
        </UnpaddedRow.Top>
      )
    }
    return (
      <Form.Group widths='equal'>
        {associationsDropdown}
        {broadcastButton}
      </Form.Group>
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
      isLoadingModalCompanyInfo
    } = this.props

    const { templateInitialValues } = this.state

    let totalCompanies = _.uniqBy(
      treeData.all(n => n.model.type === 'company'),
      n => n.model.id
    ).length
    let totalBranches = treeData.all(n => !n.hasChildren() && n.model.type === 'branch').length

    let broadcastingCompanies = _.uniqBy(
      treeData.all(n => getSafe(() => n.model.rule.broadcast, n.model.broadcast) === 1 && n.model.type === 'company'),
      n => n.model.id
    ).length
    let broadcastingBranches = treeData.all(
      n => !n.hasChildren() && n.model.broadcast === 1 && n.model.type === 'branch'
    ).length

    return (
      <>
        <CompanyInfo
          isLoadingModalCompanyInfo={isLoadingModalCompanyInfo}
          dataCompanyInfo={dataCompanyInfo}
          isOpenModalCompanyInfo={isOpenModalCompanyInfo}
          closeModalCompanyInfo={closeModalCompanyInfo}
        />
        <StretchedGrid
          className={asSidebar ? 'flex stretched' : ''}
          {...additionalGridProps}
          style={asSidebar ? { height: 'auto' } : null}>
          <Grid.Row divided className='flex stretched'>
            <Grid.Column width={asSidebar ? 16 : 6}>
              <div>
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
                <Form>
                  {asSidebar ? (
                    <Grid>
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
                                  text: 'By Region',
                                  value: 'region'
                                },
                                {
                                  key: 'branch',
                                  text: 'By Company',
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
                      {this.getAssociationFilter()}
                    </Grid>
                  ) : (
                    <>
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
                            { key: 'region', text: 'By Region', value: 'region' },
                            { key: 'branch', text: 'By Company', value: 'branch' }
                          ]}
                        />
                      </Form.Field>
                      <Form.Field data-test='broadcast_modal_search_inp'>
                        <label>
                          <FormattedMessage id='broadcast.filter' defaultMessage='Filter' />
                        </label>
                        <Input
                          name='search'
                          icon='search'
                          iconPosition='right'
                          value={this.state.filterSearch}
                          onChange={this.handleSearchChange}
                          placeholder={formatMessage({
                            id: 'broadcast.keyword',
                            defaultMessage: 'Keyword'
                          })}
                        />
                      </Form.Field>
                      {this.getAssociationFilter()}
                    </>
                  )}
                </Form>
                <Divider />
                <Formik
                  initialValues={templateInitialValues}
                  validationSchema={templateValidation()}
                  validateOnChange={true}
                  enableReinitialize
                  onSubmit={async (values, { setSubmitting, setFieldValue }) => {
                    let payload = {
                      mappedBroadcastRules: {
                        ...this.getFilteredTree().model.rule
                      },
                      name: values.name
                    }

                    if (templates.some(el => el.name === values.name)) {
                      let { name, id } = this.state.selectedTemplate

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
                        <Grid className='upper-grid'>
                          <BottomUnpaddedRow>
                            <GridColumn computer={16}>
                              <Header as='h4'>
                                <FormattedMessage id='broadcast.templates' defaultMessage='Templates' />
                              </Header>
                            </GridColumn>
                          </BottomUnpaddedRow>

                          {asSidebar ? (
                            <GridRow>
                              <GridColumn computer={11}>
                                <FormikDropdown
                                  name='templates'
                                  data-test='broadcast_modal_template_drpdn_addtn'
                                  options={templates.map(template => ({
                                    key: template.id,
                                    text: template.name,
                                    value: template.id
                                  }))}
                                  inputProps={{
                                    style: { width: '100%' },
                                    onChange: async (e, data) => {
                                      const dataName = getSafe(
                                        () => templates.find(el => el.id === data.value).name,
                                        null
                                      )
                                      if (dataName) {
                                        this.onTemplateSelected(
                                          e,
                                          {
                                            options: templates.map(template => ({
                                              key: template.id,
                                              text: template.name,
                                              value: template.id
                                            })),
                                            value: data.value
                                          },
                                          props.setFieldValue
                                        )
                                        this.setState({
                                          selectedTemplate: {
                                            id: data.value,
                                            name: dataName
                                          }
                                        })
                                        this.formChanged()
                                      } else {
                                        props.setFieldValue('name', data.value)
                                        await this.submitForm()
                                        this.formChanged()
                                      }
                                    },
                                    allowAdditions: true,
                                    additionLabel: formatMessage({
                                      id: 'global.dropdown.add',
                                      defaultMessage: 'Add '
                                    }),
                                    search: true,
                                    selection: true,
                                    selectOnBlur: false,
                                    noResultsMessage: formatMessage(
                                      {
                                        id: 'global.dropdown.startTyping',
                                        defaultMessage: 'Start typing to add {typeName}.'
                                      },
                                      {
                                        typeName: formatMessage({
                                          id: 'global.aCode',
                                          defaultMessage: 'a code'
                                        })
                                      }
                                    )
                                  }}
                                />
                              </GridColumn>
                              <GridColumn computer={5}>
                                <Button
                                  data-test='broadcast_modal_delete_btn'
                                  onClick={() => this.handleTemplateDelete(props.setFieldValue)}
                                  disabled={!this.state.selectedTemplate}
                                  loading={this.props.templateDeleting}
                                  type='button'
                                  basic
                                  fluid
                                  negative>
                                  {formatMessage({
                                    id: 'global.delete',
                                    defaultMessage: 'Delete'
                                  })}
                                </Button>
                              </GridColumn>
                            </GridRow>
                          ) : (
                            <GridRow>
                              <GridColumn computer={11}>
                                <Dropdown
                                  selectOnBlur={false}
                                  data-test='broadcast_modal_template_drpdn'
                                  fluid
                                  selection
                                  value={this.state.selectedTemplate.id}
                                  onChange={(e, data) => {
                                    this.onTemplateSelected(e, data, props.setFieldValue)
                                    this.setState({
                                      selectedTemplate: {
                                        id: data.value,
                                        name: data.options.find(el => el.value === data.value).text
                                      }
                                    })
                                    this.formChanged()
                                  }}
                                  options={templates.map(template => ({
                                    key: template.id,
                                    text: template.name,
                                    value: template.id
                                  }))}
                                />
                              </GridColumn>
                              <GridColumn computer={5}>
                                <Button
                                  data-test='broadcast_modal_delete_btn'
                                  onClick={() => this.handleTemplateDelete(props.setFieldValue)}
                                  disabled={!this.state.selectedTemplate}
                                  loading={this.props.templateDeleting}
                                  type='button'
                                  basic
                                  fluid
                                  negative>
                                  {formatMessage({
                                    id: 'global.delete',
                                    defaultMessage: 'Delete'
                                  })}
                                </Button>
                              </GridColumn>
                            </GridRow>
                          )}

                          <GridRow
                            style={
                              asSidebar
                                ? {
                                    position: 'absolute',
                                    top: '-20000px',
                                    left: '-20000px'
                                  }
                                : null
                            }>
                            <GridColumn computer={11}>
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
                            </GridColumn>

                            <GridColumn computer={5}>
                              <Button
                                onClick={this.submitForm}
                                type='button'
                                loading={this.props.templateSaving}
                                fluid
                                positive
                                data-test='broadcast_modal_submit_btn'>
                                {formatMessage({
                                  id: 'global.save',
                                  defaultMessage: 'Save'
                                })}
                              </Button>
                            </GridColumn>
                          </GridRow>
                        </Grid>
                      </Form>
                    )
                  }}></Formik>
              </div>
            </Grid.Column>
            <Grid.Column
              width={asSidebar ? 16 : 10}
              stretched
              style={asSidebar ? { padding: '0', boxShadow: '0 0 0 transparent' } : null}>
              <Rule.Root style={asSidebar ? null : { overflowY: 'scroll', flexBasis: '300px' }}>
                <Rule.Header style={asSidebar ? { 'justify-content': 'flex-end' } : {}}>
                  <Rule.RowContent>
                    <FormattedMessage id='broadcast.regionSelect' defaultMessage='Region select'>
                      {text => text}
                    </FormattedMessage>
                  </Rule.RowContent>
                  <Rule.Toggle style={asSidebar ? { flex: '0 0 62px' } : { flex: '0 0 88px' }}>
                    <FormattedMessage id='broadcast.include' defaultMessage='Include' />
                  </Rule.Toggle>

                  <Rule.Toggle>
                    <FormattedMessage id='broadcast.markUpDown' defaultMessage='Mark-up/down' />
                  </Rule.Toggle>
                  <Rule.Toggle>
                    {!hideFobPrice && <FormattedMessage id='broadcast.fobHiLo' defaultMessage='FOB high/low' />}
                  </Rule.Toggle>
                </Rule.Header>
                <Rule.Content style={asSidebar ? { flex: '1 0 auto', overflowY: 'hidden' } : null}>
                  <RuleItem
                    changeInModel={this.changeInModel}
                    loadingChanged={this.props.loadingChanged}
                    filter={filter}
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
                  />
                </Rule.Content>
              </Rule.Root>
              {!asModal && <RightAlignedDiv>{this.getButtons()}</RightAlignedDiv>}
            </Grid.Column>
          </Grid.Row>
        </StretchedGrid>
      </>
    )
  }

  getButtons = () => {
    const {
      intl: { formatMessage },
      closeBroadcast,
      asModal,
      asSidebar
    } = this.props

    return (
      <>
        {asModal && (
          <Button onClick={() => closeBroadcast()} data-test='broadcast_modal_close_btn'>
            {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
          </Button>
        )}
        {!asSidebar && (
          <Button primary onClick={() => this.saveBroadcastRules()} data-test='broadcast_modal_save_btn'>
            {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
          </Button>
        )}
      </>
    )
  }

  saveBroadcastRules = async () => {
    const { saveRules, id, initGlobalBroadcast, asSidebar, toastManager, templates } = this.props
    let filteredTree = this.treeToModel(undefined, undefined, true)

    try {
      this.handleFilterChange(null, {
        name: 'category',
        value: 'region'
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
    const { open, closeBroadcast, asModal, loading, isPrepared } = this.props

    // const broadcastToBranches = treeData && `${treeData.all(n => n.model.type === 'state' && (n.all(_n => _n.model.broadcast === 1).length > 0 || n.getPath().filter(_n => _n.model.broadcast === 1).length > 0)).length}/${treeData.all(n => n.model.type === 'state').length}`

    if (!asModal) {
      if (loading || !isPrepared)
        return (
          <Dimmer active={true} inverted>
            <Loader active={true} />
          </Dimmer>
        )
      return this.getContent()
    }

    return (
      <Modal closeIcon open={open} onClose={closeBroadcast} centered={false} size='large'>
        <Modal.Header>
          <FormattedMessage id='inventory.broadcast' defaultMessage='Price Book' />
        </Modal.Header>
        <Modal.Content scrolling className='flex stretched'>
          {this.getContent()}
        </Modal.Content>
        <Modal.Actions>{this.getButtons()}</Modal.Actions>
      </Modal>
    )
  }
}

Broadcast.propTypes = {
  asModal: bool,
  additionalGridProps: object,
  hideFobPrice: bool,
  asSidebar: bool,
  saveSidebar: number
}

Broadcast.defaultProps = {
  asModal: true,
  additionalGridProps: {},
  hideFobPrice: false,
  asSidebar: false,
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
