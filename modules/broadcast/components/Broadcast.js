import React, { Component } from 'react'
import pt, { node, bool, object } from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Actions from '../actions'
import { Modal, Grid, Icon, Button, Form, Input, Dropdown, Dimmer, Loader, Message, Menu, Divider, Header, GridRow, GridColumn, Popup } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Input as FormikInput, Button as FormikButton, Dropdown as FormikDropdown } from 'formik-semantic-ui-fixed-validation'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import TreeModel from 'tree-model'
import { Rule, BottomUnpaddedRow, RightAlignedDiv, StretchedGrid } from './Broadcast.style'
import RuleItem from './RuleItem'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'

import { getSafe } from '~/utils/functions'

import { errorMessages } from '~/constants/yupValidation'

import confirm from '~/src/components/Confirmable/confirm'


const templateInitialValues = {
  name: ''
}

const templateValidation = () => (
  Yup.object().shape({
    name: Yup.string().required(errorMessages.requiredMessage)
  })
)

class Broadcast extends Component {

  state = {
    filterSearch: '',
    tree: new TreeModel().parse({ model: { rule: {} } }),
    selectedTemplate: { name: null, id: null },
    broadcastingTo: 0,
    change: false,
    saved: false
  }

  constructor(props) {
    super(props)

    this.handleFilterChange = _.debounce(this.handleFilterChange, 250)
  }

  componentDidMount() {
    this.props.getTemplates()
  }

  componentWillReceiveProps(props) {
    this.setState({
      filterSearch: props.filter.search,
      tree: this.getFilteredTree(props.treeData, props.filter)
    })
  }

  handlePriceChange = (node) => {
    if (node.hasChildren()) {
      node.walk((n) => {
        let nodePath = n.getPath()
        let parent = nodePath[nodePath.length - 2]

        if (!n.model.rule.priceOverride && (!getSafe(() => parent.model.rule.priceOverride, 0) || node.model.rule.id === parent.model.rule.id)) {
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

    this.setState({ tree: this.state.tree, change: true, saved: false })
  }

  calculateBroadcastingCnt = () => {
    let broadcastingTo = 0

    this.props.treeData.walk((node) => {
      if (!node.isRoot() &&
        (!node.hasChildren() || node.all((n) => n.model.type === 'company' || n.model.type === 'branch')) &&
        node.model.type === 'state' && node.model.broadcast !== 0) broadcastingTo++
    })

    if (this.state.broadcastingTo !== broadcastingTo) this.setState({ broadcastingTo })

  }

  async componentWillUnmount() {
    if (this.state.change && !this.state.saved) {
      await confirm(
        <FormattedMessage
          id='confirm.broadcast.unsavedChanges.header'
          defaultMessage='Unsaved changes' />,
        <FormattedMessage
          id='confirm.broadcast.unsavedChanges.content'
          defaultMessage={`You have unsaved broadcast rules changes. Do you wish to save them?`} />)
        .then(async () => this.saveBroadcastRules())
    }
  }

  componentDidUpdate() {
    this.calculateBroadcastingCnt()
  }

  handleChange = (node) => {
    this.setState({ tree: this.state.tree, change: true, saved: false })
  }

  handleRowClick = (node) => {
    node.model.expanded = !node.model.expanded

    if (!node.model.expanded) node.all(n => n.model.expanded = false)

    this.setState({ tree: this.state.tree })
  }

  handleSearchChange = (e, { name, value }) => {
    this.setState({ filterSearch: value })

    this.handleFilterChange(e, { name, value })
  }

  handleFilterChange = (e, { name, value }) => {
    const { updateFilter, filter } = this.props
    updateFilter({
      ...filter,
      [name]: value
    })
  }

  getFilteredTree = (treeData, filter) => {
    const fs = filter.search.toLowerCase()
    const { intl: { formatMessage } } = this.props

    const searchFn = (n => {
      var found = false
      const name = n.model.name.toLowerCase()

      if (name.startsWith(fs)) {
        return true
      }

      name.split(' ').forEach(s => {
        if (s.startsWith(fs)) { found = true; return }
      })

      return found
    })

    const searchParentFn = (n => n.first(i => i.model.type !== 'company' && searchFn(i)))

    const presets = {
      region: () => new TreeModel().parse({
        // name: 'By region',
        name: formatMessage({ id: 'broadcast.byRegion', defaultMessage: 'By Region' }),
        rule: treeData.model,
        depth: 1,
        children: treeData.children.filter(n => searchParentFn(n)).map(n1 => ({
          name: n1.model.name,
          rule: n1.model,
          depth: 2,
          children: n1.children.filter(n => searchFn(n) || searchParentFn(n)).map(n2 => ({
            name: n2.model.name,
            rule: n2.model,
            depth: 3,
            children: n2.all(n => n.model.type === 'branch' && searchFn(n)).map(n3 => ({
              name: n3.model.name,
              rule: n3.model,
              depth: 4,
              children: []
            }))
          }))
        }))
      }),
      branch: () => new TreeModel().parse({
        // name: 'By company',
        name: formatMessage({ id: 'broadcast.byCompany', defaultMessage: 'By Company' }),
        rule: treeData.model,
        depth: 1,
        children: _.uniqBy(treeData.all(n => n.model.type === 'company'), n => n.model.id).filter(searchFn).map(n1 => ({
          name: n1.model.name,
          rule: n1.model,
          depth: 2,
          children: treeData.all(n => n.model.type === 'branch' && n.parent.model.id === n1.model.id).map(n2 => ({
            name: n2.model.name,
            rule: n2.model,
            depth: 3,
            children: []
          }))
        }))
      })
    }

    let tree = presets[filter.category]()

    // expand when search is active
    if (fs.length > 0) {
      tree.walk(n => n.model.expanded = true)
    }

    return tree
  }


  onTemplateSelected = (_, data, setFieldValue) => {
    let name = data.options.find((opt) => opt.value === data.value).text
    setFieldValue('name', name)
    this.setState({ selectedTemplate: { name, id: data.value } })

    this.props.getTemplate(data.value)
  }

  handleTemplateDelete = async (setFieldValue) => {
    const { deleteTemplate, toastManager, intl } = this.props
    const { formatMessage } = intl
    let { name, id } = this.state.selectedTemplate
    await confirm(
      formatMessage({ id: 'confirm.deleteTemplate.title' }),
      formatMessage({ id: 'confirm.deleteTemplate.content' }, { name })
    )

    await deleteTemplate(id)

    setFieldValue('name', '')

    toastManager.add(generateToastMarkup(
      <FormattedMessage id='notifications.templateDelete.header' />,
      <FormattedMessage id='notifications.templateDelete.content' values={{ name }} />,
    ), { appearance: 'success' })
  }


  getContent = () => {
    let {
      offer, templates, updateTemplate, mode,
      saveTemplate, filter, loading, intl: { formatMessage },
      treeData, toastManager, additionalGridProps,
      asModal
    } = this.props


    let total = treeData.all(n => n.model.type === 'state').length


    return (
      <StretchedGrid className='flex stretched' {...additionalGridProps}>
        <Grid.Row divided className='flex stretched'>
          <Grid.Column width={6}>
            <div>
              <Message info size='large' style={{ padding: '6px 15px' }}>
                <Popup trigger={
                  <Icon name='info circle' />
                } content={<FormattedMessage id='broadcast.broadcastingTooltip' defaultMessage='Shows number of company branches your are currently broadcasting to out of the total number of company branches.' />} />
                <FormattedMessage id='broadcast.broadcastingTo' defaultMessage='Broadcasting To' />: <strong>{this.state.broadcastingTo}/{total}</strong>
              </Message>
              <Form>
                <Form.Field>
                  <label><FormattedMessage id='broadcast.categoryFilter' defaultMessage='Category filter' /></label>
                  <Dropdown
                    data-test='broadcast_modal_category_drpdn'
                    selection
                    name='category'
                    value={filter.category}
                    onChange={this.handleFilterChange}
                    options={[
                      { key: 'region', text: 'By Region', value: 'region' },
                      { key: 'branch', text: 'By Company', value: 'branch' },
                    ]}
                  />
                </Form.Field>
                <Form.Field data-test='broadcast_modal_search_inp' >
                  <label><FormattedMessage id='broadcast.filter' defaultMessage='Filter' /></label>
                  <Input
                    name='search' icon='search'
                    iconPosition='left'
                    value={this.state.filterSearch} onChange={this.handleSearchChange} />
                </Form.Field>
              </Form>
              <Divider />
              <Formik
                initialValues={templateInitialValues}
                validationSchema={templateValidation()}
                validateOnChange={true}
                enableReinitialize
                onSubmit={async (values, { setSubmitting }) => {
                  let payload = {

                    mappedBroadcastRules: {
                      ...treeData.model
                    },
                    ...values
                  }

                  if (templates.some((el) => el.name === values.name)) {
                    let { name, id } = this.state.selectedTemplate

                    await confirm(
                      formatMessage({ id: 'broadcast.overwriteTemplate.header' }, { name }),
                      formatMessage({ id: 'broadcast.overwriteTemplate.content' })
                    )

                    await updateTemplate(id, payload)
                  }
                  else {
                    let { value } = await saveTemplate(payload)
                    this.setState({ selectedTemplate: value })
                  }


                  let status = values.name === name ? 'Updated' : 'Saved'

                  toastManager.add(generateToastMarkup(
                    <FormattedMessage id={`notifications.template${status}.header`} />,
                    <FormattedMessage id={`notifications.template${status}.content`} values={{ name: getSafe(() => values.name, name) }} />
                  ), { appearance: 'success' })



                  setSubmitting(false)
                }}
                render={props => {
                  this.submitForm = props.submitForm

                  return (
                    <Form onSubmit={props.handleSubmit}>
                      <Grid>
                        <BottomUnpaddedRow>
                          <GridColumn computer={16}>
                            <Header as='h4'><FormattedMessage id='broadcast.templates' defaultMessage='Templates' /></Header>
                          </GridColumn>
                        </BottomUnpaddedRow>

                        <GridRow>
                          <GridColumn computer={11}>
                            <Dropdown
                              data-test='broadcast_modal_template_drpdn'
                              fluid selection
                              value={this.state.selectedTemplate.id}
                              onChange={(e, data) => {
                                this.onTemplateSelected(e, data, props.setFieldValue)
                                this.setState({ selectedTemplate: { id: data.value, name: data.options.find((el) => el.value === data.value).text } })
                              }}
                              options={templates.map((template) => ({
                                key: template.id,
                                text: template.name,
                                value: template.id
                              }))
                              } />
                          </GridColumn>
                          <GridColumn computer={5}>
                            <Button
                              data-test='broadcast_modal_delete_btn'
                              onClick={() => this.handleTemplateDelete(props.setFieldValue)}
                              disabled={!this.state.selectedTemplate}
                              loading={this.props.templateDeleting}
                              type='button' basic fluid negative>
                              {formatMessage({ id: 'global.delete', defaultMessage: 'Delete' })}
                            </Button>
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn computer={11}>
                            <FormikInput
                              inputProps={{
                                fluid: true,
                                placeholder: formatMessage({ id: 'broadcast.templateName', defaultMessage: 'Template Name' }),
                                'data-test': 'broadcast_modal_templateName_inp'
                              }} name='name' />
                          </GridColumn>

                          <GridColumn computer={5}>
                            <Button onClick={this.submitForm} type='button' loading={this.props.templateSaving} fluid positive basic data-test='broadcast_modal_submit_btn'>
                              {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                            </Button>
                          </GridColumn>
                        </GridRow>
                      </Grid>
                    </Form>
                  )
                }
                }>
              </Formik>
            </div>
          </Grid.Column>
          <Grid.Column width={10} stretched>
            <Rule.Root>
              <Rule.Header>
                <Rule.RowContent>
                  <FormattedMessage id='broadcast.regionSelect' defaultMessage='Region select' />
                </Rule.RowContent>
                <Rule.Toggle>
                  <FormattedMessage id='broadcast.include' defaultMessage='Include' />
                </Rule.Toggle>
                <Rule.Toggle>
                  <FormattedMessage id='broadcast.markUpDown' defaultMessage='Mark-up/down' />
                </Rule.Toggle>
                <Rule.Toggle>
                  <FormattedMessage id='broadcast.fobHiLo' defaultMessage='FOB high/low' />
                </Rule.Toggle>
              </Rule.Header>
              <Rule.Content>
                <RuleItem
                  item={this.state.tree}
                  mode={mode}
                  offer={offer}
                  onRowClick={this.handleRowClick}
                  onPriceChange={this.handlePriceChange}
                  onChange={this.handleChange}
                  data-test='broadcast_modal_rule_action'
                />
                {loading && <Dimmer active inverted><Loader active /></Dimmer>}
              </Rule.Content>
            </Rule.Root>
            {!asModal &&
              <RightAlignedDiv>
                {this.getButtons()}
              </RightAlignedDiv>
            }
          </Grid.Column>
        </Grid.Row>
      </StretchedGrid>
    )
  }

  getButtons = () => {
    const {
      intl: { formatMessage }, closeBroadcast,
      asModal
    } = this.props

    return (
      <>
        {asModal &&
          <Button onClick={() => closeBroadcast()} data-test='broadcast_modal_close_btn' >
            {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
          </Button >
        }
        <Button primary
          onClick={() => this.saveBroadcastRules()}
          data-test='broadcast_modal_save_btn'>
          {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
        </Button>
      </>
    )
  }

  saveBroadcastRules = async () => {
    const { saveRules, id, treeData, toastManager } = this.props

    await saveRules(id, treeData.model)
    this.setState({ saved: true })
    toastManager.add(generateToastMarkup(
      'Saved successfully!',
      'New broadcast rules have been saved.'
    ), {
      appearance: 'success'
    })

  }

  render() {
    const { open, closeBroadcast, asModal, isPrepared } = this.props

    // const broadcastToBranches = treeData && `${treeData.all(n => n.model.type === 'state' && (n.all(_n => _n.model.broadcast === 1).length > 0 || n.getPath().filter(_n => _n.model.broadcast === 1).length > 0)).length}/${treeData.all(n => n.model.type === 'state').length}`
    if (!asModal) {
      if (!isPrepared) return null
      return this.getContent()
    }

    return (
      <Modal closeIcon open={open} onClose={closeBroadcast} centered={false} size='large'>
        <Modal.Header><FormattedMessage id='inventory.broadcast' defaultMessage='Price Book' /></Modal.Header>
        <Modal.Content scrolling style={{ minHeight: '70vh' }} className='flex stretched'>
          {this.getContent()}
        </Modal.Content>
        <Modal.Actions>
          {this.getButtons()}
        </Modal.Actions>
      </Modal >
    )
  }
}


Broadcast.propTypes = {
  asModal: bool,
  additionalGridProps: object
}

Broadcast.defaultProps = {
  asModal: true,
  additionalGridProps: {}
}

export default injectIntl(withToastManager(connect(({ broadcast: { data, filter, ...rest } }) => {
  const treeData = data
    ? new TreeModel({ childrenPropertyName: 'elements' }).parse(data)
    : new TreeModel().parse({ model: { rule: {} } })

  return {
    treeData,
    filter,
    ...rest,
  }
}, { ...Actions })(Broadcast)))

