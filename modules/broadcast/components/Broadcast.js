import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Actions from '../actions'
import { Modal, Segment, Grid, Icon, Button, Form, Input, Dropdown, Dimmer, Loader, Checkbox, Message } from 'semantic-ui-react'
import TreeModel from 'tree-model'
import { Rule } from './Broadcast.style'

const filterTree = (tree, filter, category) => {
  if (filter === '') {
    tree.all().forEach(n => {
      n.model.hidden = false
      n.model.expanded = false
    })
  }
  else {
    tree.all(n => n.model.type === category && n.model.name.toLowerCase().indexOf(filter.toLowerCase()) === -1).forEach(n => n.model.hidden = true)
    tree.all(n => !n.first(n => !n.model.hidden)).forEach(n => n.model.hidden = true)
    tree.all().forEach(n => n.model.expanded = true)
  }

  return tree
}

const prepareTree = (tree, category) => {
  let tmpTree = new TreeModel().parse(tree)


}

const RuleItem = (props) => {
  const { onChange, onRowClick, item } = props

  const handleChange = (propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = item.node.model[propertyName]

    const newValue = value === 2 || value === 1 ? 0 : 1

    onChange(item.node, { [propertyName]: newValue })
  }

  const { model: { id, broadcast, anonymous, expanded, hidden, type } } = item.node

  if (hidden) return null

  return (
    <>
      <Rule.Row depth={item.depth} type={type} onClick={() => type !== 'root' && onRowClick(item.node)}>
        <Rule.RowContent>
          {item.children.length > 0 && type !== 'root' && <Icon name={`chevron ${item.node.model.expanded ? 'down' : 'right'}`} />}
          <span>{item.name}</span>
        </Rule.RowContent>

        <Rule.Toggle>
          <Checkbox
            toggle
            indeterminate={broadcast === 2}
            checked={broadcast === 1}
            onClick={(e) => handleChange('broadcast', e)}
          />
        </Rule.Toggle>

        {/* <Rule.Checkbox>
          <Checkbox
            indeterminate={anonymous === 2}
            checked={anonymous === 1}
            onClick={(e) => handleChange('anonymous', e)}
          />
        </Rule.Checkbox> */}

      </Rule.Row>

      {(expanded || type === 'root') && item.children.map((i, idx) => <RuleItem key={idx} item={i} onRowClick={onRowClick} onChange={onChange} />)}
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

  handleFilterChange = (e, { name, value }) => {
    const {updateFilter, updateLocalRules, filter, treeData} = this.props

    if (name === 'search' && value.length > 0) {
      treeData.all().forEach(n => n.model.expanded = true)
      //updateLocalRules(treeData.model)
    } else {
      treeData.all().forEach(n => n.model.expanded = false)
    }

    updateFilter({
      ...filter,
      [name]: value
    })
  }

  getFilteredTree = () => {
    const { treeData, filter } = this.props
    
    const fs = filter.search.toLowerCase()

    const searchFn = (n => {
      var found = false
      n.model.name.toLowerCase().split(' ').forEach(s => { 
        if (s.startsWith(fs)) { found = true; return }
      })

      return found
    })
    const searchParentFn = (n => n.first(i => i.model.type !== 'company' && searchFn(i)))

    const presets = {
      region: () => ({
        name: "By region",
        type: treeData.model.type,
        node: treeData,
        depth: 1,
        children: treeData.children.filter(n => searchParentFn(n)).map(n1 => ({
          name: n1.model.name,
          type: n1.model.type,
          node: n1,
          depth: 2,
          children: n1.children.filter(n => searchFn(n) || searchParentFn(n)).map(n2 => ({
            name: n2.model.name,
            type: n2.model.type,
            node: n2,
            depth: 3,
            children: n2.all(n => n.model.type === 'branch' && searchFn(n)).map(n3 => ({
              name: n3.model.name,
              type: n3.model.type,
              node: n3,
              depth: 4,
              children: []
            }))
          }))
        }))
      }),
      branch: () => ({
        name: "By company",
        type: treeData.model.type,
        node: treeData,
        depth: 1,
        children: treeData.all(n => n.model.type === 'branch').map(n1 => ({
          name: n1.model.name,
          type: n1.model.type,
          node: n1,
          depth: 2,
          children: n1.children.map(n2 => ({
            name: n2.model.name,
            type: n2.model.type,
            node: n2,
            depth: 3,
            children: []
          }))
        }))
      })
    }
    

    return presets[filter.category]()
  }

  render() {
    const { open, loading, treeData, filter, closeBroadcast } = this.props
    const broadcastToBranches = treeData && `${treeData.all(n => n.model.type === 'branch' && n.model.broadcast === 1).length}/${treeData.all(n => n.model.type === 'branch').length}`
    
    return (
      <Modal open={open} onClose={closeBroadcast} centered={false}>
        <Modal.Header>Broadcast center</Modal.Header>
        <Modal.Content scrolling style={{ minHeight: '70vh' }} className="flex stretched">
          <Grid className="flex stretched">
            <Grid.Row divided className="flex stretched">
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
                        name="category"
                        value={filter.category}
                        onChange={this.handleFilterChange}
                        options={[
                          { key: 'region', text: 'All Regions', value: 'region' },
                          { key: 'branch', text: 'All Companies', value: 'branch' },
                        ]}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Filter</label>
                      <Input name="search" onChange={_.debounce(this.handleFilterChange, 300)} />
                    </Form.Field>
                  </Form>
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
                    {/* <Rule.Checkbox>
                      Anomymous
                    </Rule.Checkbox> */}
                  </Rule.Header>
                  <Rule.Content>
                    {treeData && [this.getFilteredTree()].map(i => (
                      <RuleItem item={i} onRowClick={this.handleRowClick} onChange={this.handleChange} />)
                    )}
                    {loading && <Dimmer active inverted><Loader active /></Dimmer>}
                  </Rule.Content>
                </Rule.Root>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>Save</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(({ broadcast: { data, filter, ...rest } }) => {
  const treeData = data ? new TreeModel({ childrenPropertyName: 'elements' }).parse(data) : null
  return {
    treeData,
    filter,
    ...rest,
  }
}, Actions)(Broadcast)

