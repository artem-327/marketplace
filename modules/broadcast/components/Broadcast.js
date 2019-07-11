import React, { Component } from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Actions from '../actions'
import { Modal, Grid, Icon, Button, Form, Input, Dropdown, Dimmer, Loader, Message, Menu } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import TreeModel from 'tree-model'
import { Rule } from './Broadcast.style'
import RuleItem from './RuleItem'


class Broadcast extends Component {

  state = {
    filterSearch: '',
    tree: new TreeModel().parse({model: {rule:{}} })
  }

  constructor(props) {
    super(props)

    this.handleFilterChange = _.debounce(this.handleFilterChange, 250)
  }

  componentWillReceiveProps(props) {
    this.setState({ 
      filterSearch: props.filter.search,
      tree: this.getFilteredTree(props.treeData, props.filter)
    })
  }

  handlePriceChange = () => {
    this.setState({tree: this.state.tree})
  }

  handleChange = (node) => {
    this.setState({tree: this.state.tree})
  }

  handleRowClick = (node) => {
    node.model.expanded = !node.model.expanded
    if (!node.model.expanded) node.all(n => n.model.expanded = false)
    
    this.setState({tree: this.state.tree})
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
        name: "By region",
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
        name: "By company",
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

  render() {
    const { open, loading, treeData, filter, closeBroadcast, saveRules, id, mode, switchMode, toastManager } = this.props
    const broadcastToBranches = treeData && `${treeData.all(n => n.model.type === 'branch' && n.getPath().filter(_n => _n.model.broadcast === 1).length > 0).length}/${treeData.all(n => n.model.type === 'branch').length}`

    return (
      <Modal open={open} onClose={closeBroadcast} centered={false}>
        <Modal.Header>Broadcast Controls</Modal.Header>
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
                          { key: 'region', text: 'By Region', value: 'region' },
                          { key: 'branch', text: 'By Company', value: 'branch' },
                        ]}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Filter</label>
                      <Input name="search" icon='search' iconPosition='left' value={this.state.filterSearch} onChange={this.handleSearchChange} />
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
                    <Rule.Toggle style={{marginRight: '20px'}}>
                      Mark-up/down
                    </Rule.Toggle>
                  </Rule.Header>
                  <Rule.Content>
                    <RuleItem
                      item={this.state.tree}
                      mode={mode}
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
                "Saved successfully!",
                "New broadcast rules have been saved."
              ), {
                appearance: 'success'
              })
            }}
          >
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withToastManager(connect(({ broadcast: { data, filter, ...rest } }) => {
  const treeData = data 
    ? new TreeModel({ childrenPropertyName: 'elements' }).parse(data) 
    : new TreeModel().parse({model: {rule:{}} })

  return {
    treeData,
    filter,
    ...rest,
  }
}, Actions)(Broadcast))

