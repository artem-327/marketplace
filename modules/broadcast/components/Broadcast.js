import React, { Component } from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Actions from '../actions'
import { Modal, Grid, Icon, Button, Form, Input, Dropdown, Dimmer, Loader, Message, Menu, Divider, Header, GridRow, GridColumn } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Input as FormikInput, Button as FormikButton, Dropdown as FormikDropdown } from 'formik-semantic-ui'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import TreeModel from 'tree-model'
import { Rule } from './Broadcast.style'
import RuleItem from './RuleItem'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'

import styled from 'styled-components'

import { getSafe } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'
import { errorMessages } from '~/constants/yupValidation'


const BottomUnpaddedRow = styled(GridRow)`
  padding-bottom: 0px !important;
`


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
    selectedTemplate: { name: null, id: null }
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

  handlePriceChange = () => {
    this.setState({ tree: this.state.tree })
  }

  handleChange = (node) => {
    this.setState({ tree: this.state.tree })
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
        name: 'By region',
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
        name: 'By company',
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

  render() {
    const {
      open, loading, treeData,
      filter, closeBroadcast, saveRules,
      id, mode, switchMode,
      saveTemplate, toastManager, offer,
      templates, intl, updateTemplate,
      deleteTemplate } = this.props

    const broadcastToBranches = treeData && `${treeData.all(n => n.model.type === 'state' && (n.all(_n => _n.model.broadcast === 1).length > 0 || n.getPath().filter(_n => _n.model.broadcast === 1).length > 0)).length}/${treeData.all(n => n.model.type === 'state').length}`

    const { formatMessage } = intl

    return (
      <Modal open={open} onClose={closeBroadcast} centered={false} size='large'>
        <Modal.Header>Price Book Controls</Modal.Header>
        <Modal.Content scrolling style={{ minHeight: '70vh' }} className='flex stretched'>
          <Grid className='flex stretched'>
            <Grid.Row divided className='flex stretched'>
              <Grid.Column width={6}>
                <div>
                  <Message info size='large' style={{ padding: '6px 15px' }}>
                    <Icon name='info circle' />
                    Broadcasting to: <strong>{broadcastToBranches}</strong>
                  </Message>
                  <Form>
                    <Form.Field>
                      <label>Category filter</label>
                      <Dropdown
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
                    <Form.Field>
                      <label>Filter</label>
                      <Input name='search' icon='search' iconPosition='left' value={this.state.filterSearch} onChange={this.handleSearchChange} />
                    </Form.Field>
                  </Form>
                  <Divider />
                  <Formik
                    initialValues={templateInitialValues}
                    validationSchema={templateValidation()}
                    validateOnChange={false}
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
                    render={props =>
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
                                onClick={() => this.handleTemplateDelete(props.setFieldValue)}
                                disabled={!this.state.selectedTemplate}
                                loading={this.props.templateDeleting}
                                type='button' basic fluid negative><FormattedMessage id='global.delete' /></Button>
                            </GridColumn>
                          </GridRow>

                          <GridRow>
                            <GridColumn computer={11}>
                              <FormikInput
                                inputProps={{
                                  fluid: true,
                                  placeholder: formatMessage({ id: 'broadcast.templateName', defaultMessage: 'Template Name' })
                                }} name='name' />
                            </GridColumn>

                            <GridColumn computer={5}>
                              <FormikButton.Submit loading={this.props.templateSaving} fluid positive basic><FormattedMessage id='global.save' defaultMessage='Save' /></FormikButton.Submit>
                            </GridColumn>
                          </GridRow>
                        </Grid>
                      </Form>
                    }>
                  </Formik>
                </div>
              </Grid.Column>
              <Grid.Column width={10} stretched>
                <Rule.Root>
                  <Rule.Header>
                    <Rule.RowContent>
                      Region select
                    </Rule.RowContent>
                    <Rule.Toggle>
                      Include
                    </Rule.Toggle>
                    <Rule.Toggle>
                      Mark-up/down
                    </Rule.Toggle>
                    <Rule.Toggle>
                      FOB low - high
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
                    />
                    {loading && <Dimmer active inverted><Loader active /></Dimmer>}
                  </Rule.Content>
                </Rule.Root>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => closeBroadcast()}>Cancel</Button>
          <Button primary
            onClick={async () => {
              console.log(treeData.model)
              await saveRules(id, treeData.model)
              toastManager.add(generateToastMarkup(
                'Saved successfully!',
                'New broadcast rules have been saved.'
              ), {
                  appearance: 'success'
                })
            }}
          >
            Save
          </Button>
        </Modal.Actions>
      </Modal >
    )
  }
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

