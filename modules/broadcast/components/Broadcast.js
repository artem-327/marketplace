import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Modal, Segment, Grid, Icon, FormField, FormGroup } from 'semantic-ui-react'
import { connect as formikConnect, getIn, setNestedObjectValues } from 'formik'
import { Form, Button, Input, Dropdown } from 'formik-semantic-ui'
import TreeModel from 'tree-model'

import { RuleRow, RuleToggle, RulesRoot, RuleCheckbox, RulesHeader } from './Broadcast.style'

const filterTree = (tree, filter, category) => {
  let _t = new TreeModel({ childrenPropertyName: 'elements' }).parse(tree.model)
  _t.all(n => n.model.type === category).forEach(n => delete n.parent)
  
  return _t.all(n => n.model.type === category)

  // if (filter === '') {
  //   tree.all().forEach(n => {
  //     n.model.hidden = false
  //     n.model.expanded = false
  //   })
  // }
  // else {
  //   tree.all(n => n.model.type === category && n.model.name.toLowerCase().indexOf(filter.toLowerCase()) === -1).forEach(n => n.model.hidden = true)
  //   tree.all(n => !n.first(n => !n.model.hidden)).forEach(n => n.model.hidden = true)
  //   tree.all().forEach(n => n.model.expanded = true)
  // }

  return tree.children
}

const RuleItem = ({ onChange, onRowClick, node }) => {

  const handleChange = (propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = node.model[propertyName]

    const newValue = value === 2 || value === 1 ? 0 : 1

    onChange(node, { [propertyName]: newValue })
  }

  const { model: { name, id, broadcast, anonymous, expanded, hidden } } = node

  if (hidden) return null

  return (
    <>
      <RuleRow depth={node.getPath().length} onClick={() => onRowClick(node)}>
        {node.hasChildren() && <Icon name={`chevron ${node.model.expanded ? 'down' : 'right'}`} />}
        <span>{name || 'By region'} [{id}]</span>

        <RuleToggle
          indeterminate={broadcast === 2}
          checked={broadcast === 1}
          onClick={(e) => handleChange('broadcast', e)}
        />

        <RuleCheckbox
          indeterminate={anonymous === 2}
          checked={anonymous === 1}
          onClick={(e) => handleChange('anonymous', e)}
        />

      </RuleRow>

      {expanded && node.children.map((n, i) => <RuleItem key={i} node={n} onRowClick={onRowClick} onChange={onChange} />)}
    </>
  )
}

class Broadcast extends Component {

  updateTreeSelection = (node, values) => {
    const update = (node, values) => {
      Object.keys(values).forEach(k => {
        const v = values[k]

        if (v === 1) {

          node.all(n => n.model[k] = 1)
          node.getPath().forEach(n => {
            const found = n.first(_n => !_n.hasChildren() && _n.model[k] !== 1)
            n.model[k] = found ? 2 : 1
          })
          node.model[k] = 1

        } else if (v === 0) {

          node.all(n => n.model[k] = 0)
          node.getPath().forEach(n => {
            const found = n.first(_n => !_n.hasChildren() && _n.model[k] === 1)
            n.model[k] = found ? 2 : 0
          })
          node.model[k] = 0

        }
      })
    }

    update(node, values)
  }

  handleChange = (node, values) => {
    const { updateLocalRules, treeData } = this.props

    this.updateTreeSelection(node, values)

    updateLocalRules(treeData.model)
  }

  handleRowClick = (node) => {
    const { updateLocalRules, treeData } = this.props
    node.model.expanded = !node.model.expanded
    if (!node.model.expanded) node.all(n => n.model.expanded = false)

    updateLocalRules(treeData.model)
  }

  handleFilterChange = () => {

  }

  render() {
    const { open, loading, treeData, closeBroadcast } = this.props

    return (
      <Modal open={open} onClose={closeBroadcast} centered={false}>
        <Modal.Header>Broadcast center</Modal.Header>
        <Modal.Content scrolling style={{ minHeight: '80vh' }} className="flex stretched">
          <Form
            className="flex stretched"
            initialValues={{
              filter: '',
              category: 'region'
            }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false)
            }}
            render={({ values }) => (
              <Grid className="flex stretched">
                <Grid.Row divided className="flex stretched">
                  <Grid.Column width={6}>
                    <div>
                      <Dropdown label="Category filter" name="category" 
                        options={[
                          {key: 'region', text: 'All Regions', value: 'region'},
                          {key: 'company', text: 'All Companies', value: 'company'},
                        ]} 
                      />
                      <Input label="Filter" name="filter" />
                    </div>
                  </Grid.Column>
                  <Grid.Column width={10} stretched>
                    <RulesRoot>
                      {treeData && filterTree(treeData, values.filter, values.category).map(n => <RuleItem node={n} onRowClick={this.handleRowClick} onChange={this.handleChange} />)}
                    </RulesRoot>
                  </Grid.Column>
                </Grid.Row>

              </Grid>
            )}
          />
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(({ broadcast: { data, ...rest } }) => {
  return {
    treeData: data
      ? new TreeModel({ childrenPropertyName: 'elements' }).parse(data)
      : null,
    ...rest,
  }
}, Actions)(formikConnect(Broadcast))

