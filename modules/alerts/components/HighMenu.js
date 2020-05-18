import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Container, Label, Menu} from 'semantic-ui-react'
import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { debounce } from 'lodash'
import styled from 'styled-components'

const StyledMenu = styled(Menu)`
  > .item:not(.active) .ui.circular.label {
    border: solid 1px #dee2e6;
    background-color: #f8f9fb;
    color: #848893;
  }
  
  > .active.item .ui.circular.label {
    background-color: #f16844;
    color: #ffffff;
  }
`

const CircularLabel = styled(Label)`
  margin-left: 5px !important;
  bottom: auto;
  font-size: 0.7142857rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
`

class HighMenu extends Component {
  state = {
    categories: [],
    menuItems: [],
    filters: {},
  }

  componentDidMount = async () => {
    await this.props.getCategories()
    this.setDatagridFilter({ status: this.props.activeStatus })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.categories !== this.props.categories) {
      this.updateCategories(this.props.categories)
    }
  }

  updateCategories = value => {
    const { intl: { formatMessage }, activeStatus } = this.props

    // Generate menu items and filter values from returned Categories
    let filters = {}
    const menuItems = value.map(cat => {
      filters[cat.category] =
        {
          filters: [
            {
              operator: 'EQUALS',
              path: 'Message.category',
              values: [cat.category]
            }
          ]
        }
      return {
        key: cat.category,
        name: cat.category,
        content:
          (
            <>
              {formatMessage({
                id: `alerts.menu.${cat.category.toLowerCase()}`,
                defaultMessage: cat.category
              })}
              <CircularLabel
                circular
              >
                {cat.newMessages}
              </CircularLabel>
            </>
          ),
        onClick: () => this.loadData({
          ...this.props.filterData,
          status: cat.category
        }),
        style: { textTransform: 'uppercase' },
        'data-test': `menu_alerts_${cat.category}`
      }
    })

    this.setState(
      {
        filters,
        categories: value,
        menuItems
      },
      () => {
        if (value.length && value.findIndex(cat => cat.category === activeStatus) === -1) {
          this.loadData({ status: value[0].category})
        }
      })
  }

  setDatagridFilter = debounce( filterData => {
    this.props.datagrid.setFilter(this.state.filters[filterData.status], true, 'alertsMenu')
  }, 300)

  loadData(filterData) {
    this.props.loadData(filterData)
    this.setDatagridFilter(filterData)
  }

  render() {
    const {
      activeStatus
    } = this.props

    const {
      categories,
      menuItems
    } = this.state

    const activeIndex = categories.findIndex(cat => cat.category === activeStatus)

    return (
      <Container fluid style={{ padding: '0 32px' }}>
        <StyledMenu
          pointing
          secondary
          horizontal
          items={menuItems}
          activeIndex={activeIndex}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { alerts } = state
  return {
    activeStatus: alerts.menuStatusFilter,
    categories: alerts.categories
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(HighMenu)))

