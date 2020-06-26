import React, { Component } from 'react'
import { debounce } from 'lodash'
import { Info, ChevronDown, ChevronRight } from 'react-feather'
import {
  Checkbox,
  Dropdown,
  Loader,
  Dimmer,
} from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import styled from 'styled-components'

import { getSafe, uniqueArrayByKey } from '~/utils/functions'
import ProdexGrid from '~/components/table'

import { Button } from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'
import { Formik } from 'formik'

import { FlexSidebar, HighSegment, FlexContent } from '~/modules/inventory/constants/layout'

const CustomHighSegment = styled(HighSegment)`
  margin: 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6  !important;
  background-color: #ffffff;
  z-index: 1;
`

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

const BottomButtons = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 22px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  
  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;    
      &:hover {
        background-color: #f8f9fb !important;;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2 !important;;
        color: #20273a;
      }
    }
    
    &.secondary {
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }
`

const CustomButtonSubmit = styled(Button.Submit)`
  background-color: #2599d5 !important;
  color: #fff !important;
`

const Rectangle = styled.div`
  border-radius: 4px;
  border: solid 1px #2599d5;
  background-color: #ffffff;  
  margin: 0 0 20px 0;
  align-items: center;
  display: block;
  padding: 12px 11px;
`

const CustomDivContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  display: flex;
`

class ExportInventorySidebar extends Component {
  state = {
    columns: [
      {
        name: 'name',
        title: (
              <FormattedMessage id='myInventory.exportInventoryCompanySelect' defaultMessage='Company Select'>
                {text => text}
              </FormattedMessage>
        ),
        width: 498
      },
      {
        name: 'select',
        title: (
              <FormattedMessage id='myInventory.exportInventorySelect' defaultMessage='Select'>
                {text => text}
              </FormattedMessage>
        ),
        width: 70,
        align: 'center'
      }
    ],
    company: '',
    selectedCompanyOption: '',
    selectedBranches: [],
    selectedRows: [],
    expandedRowIds: []
  }

  handleFiltersValue = debounce(value => {
    this.props.datagrid.setSearch(value, true, 'companyFilter')
  }, 300)

  searchCompanies = debounce(text => {
    this.props.searchCompany(text, 5)
  }, 300)

  handleFilterChangeCompany = (e, { value }) => {
    let selectedCompanyOption = ''

    if (value !== '' ) {
      selectedCompanyOption = this.props.searchedCompanies.find(c => value === c.value)
    }

    this.setState({ company: value, selectedCompanyOption })
    this.handleFiltersValue({ company: value })
  }

  submitHandler = async (values, setSubmitting) => {
    console.log('submit Selected Branches', this.state.selectedBranches)
  }

  getRows = rows => {
    const { selectedBranches, expandedRowIds } = this.state

    return rows.map((r, rIndex) => {
      const companyChecked = r.branches.length && selectedBranches.length
        && r.branches.every(b => selectedBranches.some(selB => selB === b.branchId))

      const indeterminate = !companyChecked
        && r.branches.some(b => selectedBranches.some(selB => selB === b.branchId))

      const isRowExpanded = expandedRowIds.includes(r.id)
      const hasBranches = r.branches.length

      return {
        ...r,
        name: (
          <div style={{ display: 'flex'}}>
            {hasBranches
              ? (isRowExpanded
                  ? <ChevronDown size={20} style={{color: '#2599d5', marginRight: '8px' }}/>
                  : <ChevronRight size={20} style={{color: '#2599d5', marginRight: '8px'}}/>
              ) : (
                <div style={{ padding: '0 14px' }}/>
                )
            }
            {hasBranches
              ? (
                <span style={{color: '#20273a', fontWeight: '500'}}>{r.name}</span>
              ) : (
                <span style={{color: 'rgba(191, 191, 191, 0.87)', fontWeight: '500'}}>{r.name}</span>
              )
            }
          </div>
        ),
        select: (
          <Checkbox
            data-test='export_inventory_sidebar_company_chckb'
            toggle
            disabled={!hasBranches}
            defaultChecked={companyChecked || indeterminate}
            indeterminate={indeterminate}
            onChange={(e, { checked }) => {
              e.stopPropagation()
              let selectedBranches = this.state.selectedBranches.slice()
              if (checked) { // Add
                if (r.branches.length) {
                  selectedBranches = selectedBranches.filter(selB =>
                    !r.branches.some(b => b.branchId === selB)
                  )
                  selectedBranches = selectedBranches.concat(r.branchesIds)
                  this.setState({ selectedBranches })
                }
              } else {  // Remove

                if (r.branches.length) {
                  selectedBranches = selectedBranches.filter(selB =>
                    !r.branches.some(b => b.branchId === selB)
                  )
                  this.setState({ selectedBranches })
                }
              }
            }}
          />
        ),
        branches: r.branches.map(b => {
          const checked = selectedBranches.includes(b.branchId)
          return {
            ...b,
            name: (
              <div style={{ color: '#2599d5', paddingLeft: '31px' }}>
                {b.name}
              </div>
            ),
            select: (
              <Checkbox
                data-test='export_inventory_sidebar_branch_chckb'
                toggle
                defaultChecked={checked}
                onChange={(e, { checked }) => {
                  let selectedBranches = this.state.selectedBranches.slice()
                  if (checked) { // Add
                    selectedBranches.push(b.branchId)
                    this.setState({ selectedBranches })
                  } else {  // Remove
                    selectedBranches = selectedBranches.filter(branch => branch !== b.branchId)
                    this.setState({ selectedBranches })
                  }
                }}
              />
            )
          }}
        )
      }
    })
  }

  renderContent = () => {
    const {
      intl: { formatMessage },
      searchedCompaniesLoading,
      searchedCompanies,
      rows,
      datagrid,
      loading
    } = this.props

    const { filterValue, company, selectedCompanyOption, columns } = this.state

    let allCompanyOptions
    if (selectedCompanyOption) {
      allCompanyOptions = uniqueArrayByKey(searchedCompanies.concat([selectedCompanyOption]), 'key')
    } else {
      allCompanyOptions = searchedCompanies
    }

    return (
      <>
        <Rectangle>
          <CustomDivContent>
            <Info size={20} style={{ color: '#2599d5', marginRight: '10px' }}/>
            <FormattedMessage
              id='myInventory.exportInfoText'
              defaultMessage='Please choose, per branch, how many exports you would like'>
              {text => text}
            </FormattedMessage>
          </CustomDivContent>
        </Rectangle>

        <Dropdown
          style={{ width: 275, zIndex: 501 }}
          placeholder={formatMessage({
            id: 'myInventory.exportInventorySearchText',
            defaultMessage: 'Search by Company'
          })}
          icon='search'
          selection
          clearable
          options={allCompanyOptions}
          search={options => options}
          value={company}
          loading={searchedCompaniesLoading}
          onSearchChange={(e, { searchQuery }) => {
            searchQuery.length > 0 && this.searchCompanies(searchQuery)
          }}
          onChange={this.handleFilterChangeCompany}
        />

        <div className='flex stretched' style={{ padding: '20px 0' }}>
          <ProdexGrid
            tableName='export_inventory'
            {...datagrid.tableProps}
            columns={columns}
            rows={this.getRows(rows)}
            loading={datagrid.loading || loading}
            rowSelection={false}
            showSelectionColumn={false}
            treeDataType={true}
            tableTreeColumn='name'
            getChildRows={(row, rootRows) => {
              return row ? row.branches : rootRows
            }}
            onRowClick={(_, row) => {
              if (row.root && row.branches.length) {
                let ids = this.state.expandedRowIds.slice()
                if (ids.includes(row.id)) {
                  //ids.filter(id => id === row.id)
                  this.setState({ expandedRowIds: ids.filter(id => id !== row.id) })
                } else {
                  ids.push(row.id)
                  this.setState({ expandedRowIds: ids })
                }
              }
            }}
            expandedRowIds={this.state.expandedRowIds}
            onExpandedRowIdsChange={expandedRowIds => this.setState({ expandedRowIds })}

          />
        </div>
      </>
    )
  }

  render() {
    const {
      onClose,
      loading
    } = this.props

    return (
      <Formik
        initialValues={{}}
        onReset={onClose}
        onSubmit={this.submitHandler}
        loading={loading}>
        {formikProps => (
          <CustomForm
          >
            <FlexSidebar
              visible={true}
              width='very wide'
              style={{ width: '630px' }}
              direction='right'
              animation='overlay'
            >
              <div>
                <Dimmer inverted active={loading || this.state.loadSidebar}>
                  <Loader />
                </Dimmer>
                <CustomHighSegment basic>
                  <FormattedMessage id='myInventory.exportInventory' defaultMessage='Export Inventory' />
                </CustomHighSegment>
              </div>
              <FlexContent style={{ padding: '30px' }}>
                {this.renderContent()}
              </FlexContent>
              <BottomButtons>
                <Button.Reset
                  className='light'
                  style={{ marginRight: '10px'}}
                  data-test='export_inventory_sidebar_reset_btn'
                >
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </Button.Reset>
                <Button.Submit
                  className='secondary'
                  onClick={() => {
                    console.log('submit - waiting for endpoint')
                    console.log('submit Selected Branches', this.state.selectedBranches)
                  }}
                  data-test='export_inventory_sidebar_submit_btn'>
                  <FormattedMessage id='myInventory.export' defaultMessage='Export'>
                    {text => text}
                  </FormattedMessage>
                </Button.Submit>
              </BottomButtons>
            </FlexSidebar>
          </CustomForm>
        )}
      </Formik>
    )
  }
}

export default injectIntl(withToastManager(ExportInventorySidebar))

