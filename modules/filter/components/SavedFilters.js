import React, { Component } from 'react'
import { func, array, bool, object } from 'prop-types'
import { Accordion, Segment, Grid, GridRow, GridColumn, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Button } from 'formik-semantic-ui-fixed-validation'
import { withToastManager } from 'react-toast-notifications'

import {
  SavedFilterItem,
  SavedFilterTitle,
  SavedFiltersSegment,
  SavedFilterRow,
  SavedFilterIcon,
  DeleteFilterIcon,
  AccordionContent,
  ActionRow,
  BoldTextColumn,
  FlexContent,
  FilterAccordion,
  SavedFiltersGrid,
  SavedFilterDetailGrid,
  SavedFiltersNotifications
} from '../constants/layout'

import styled from 'styled-components'

import Notifications from './Notifications'
import { FormattedMessage, injectIntl } from 'react-intl'
import { savedFilterValidation } from '../constants/validation'
import { groupFilters } from '../constants/filter'
import Tooltip from '~/components/tooltip'

const StyledGrid = styled(Grid)`
  word-break: break-word;
  > .row {
    padding: 0.5rem 0px 0.5rem 0px !important;
  }
`

class SavedFilters extends Component {
  state = {
    activeIndex: -1,
    activeTooltip: -1
  }
  componentDidMount() {
    this.props.getSavedFilters()
  }

  toggle = (id, name = 'activeIndex') => {
    const activeIndex = this.state[name]
    const newIndex = activeIndex === id ? -1 : id

    this.setState({ [name]: newIndex })
  }

  handleFilterApply = filter => {
    let { onApply } = this.props
    onApply(filter)
  }

  handleValuesDescription = f => {
    const result =
      f.valuesDescription instanceof Array
        ? f.valuesDescription.map(v => v)
        : typeof f.valuesDescription === 'string'
        ? f.valuesDescription.replace(/,/g, ', ')
        : f.tagDescription
    return result
  }

  getTitle = (filter, i) => {
    let { id, name } = filter
    let filterDescription = groupFilters(filter.filters, this.props.params)
    return (
      <SavedFilterTitle>
        <SavedFiltersGrid>
          <SavedFilterRow>
            <Tooltip
              trigger={
                <GridColumn
                  computer={10}
                  onClick={() => this.handleFilterApply(filter)}
                  data-test={`filter_activateFilter_${i}`}>
                  {name}
                </GridColumn>
              }
              position='top center'>
              <FormattedMessage id='filter.activateFilter' />
            </Tooltip>

            <Tooltip
              trigger={
                <GridColumn computer={2} onClick={() => this.toggle(id)} data-test={`filter_editNotifications_${i}`}>
                  <SavedFilterIcon
                    name='bell outline'
                    color={this.state.activeIndex === id ? 'yellow' : 'gray'}
                  />
                </GridColumn>
              }>
              <FormattedMessage id='filter.editNotifications' />
            </Tooltip>
            <Tooltip
              trigger={
                <GridColumn
                  onClick={() => this.toggle(i, 'activeTooltip')}
                  computer={2}
                  data-test={`filter_activeTooltip_${i}`}>
                  <SavedFilterIcon color={this.state.activeTooltip === i ? 'blue' : 'gray'} name='info circle outline' />
                </GridColumn>
              }
              position='left center'>
              <GridColumn computer={8}>
                <StyledGrid verticalAlign='top'>
                  {filterDescription && filterDescription.length > 0 ? (
                    filterDescription.map((f, index) => {
                      return (
                        <GridRow key={index}>
                          <GridColumn computer={8}>{f.description}:</GridColumn>

                          <GridColumn computer={8}>{this.handleValuesDescription(f)}</GridColumn>
                        </GridRow>
                      )
                    })
                  ) : (
                    <GridRow>
                      <GridColumn>
                        {' '}
                        <FormattedMessage id='filter.noFitlersApplied' defaultMessage='No filters applied' />{' '}
                      </GridColumn>
                    </GridRow>
                  )}
                </StyledGrid>
              </GridColumn>
            </Tooltip>
            <Tooltip
              trigger={
                <GridColumn
                  onClick={() => this.props.deleteFilter(id)}
                  computer={2}
                  data-test={`filter_deleteFilter_${i}`}>
                  <DeleteFilterIcon name='trash alternate outline' />
                </GridColumn>
              }
              position='left center'>
              <FormattedMessage id='filter.deleteFilter' />
            </Tooltip>
          </SavedFilterRow>
        </SavedFiltersGrid>
      </SavedFilterTitle>
    )
  }

  render() {
    const {
      intl: { formatMessage }
    } = this.props

    if (this.props.savedFiltersLoading) {
      return (
        <Segment basic>
          <Dimmer active inverted>
            <Loader active />
          </Dimmer>
        </Segment>
      )
    }

    return (

        <FilterAccordion>
          {this.props.savedFilters.map((filter, i) => {
            let {
              notificationEnabled,
              notifyMail,
              notifyPhone,
              notifySystem,
              notificationMail,
              notificationPhone
            } = filter
            let initialValues = {
              checkboxes: {
                notificationEnabled,
                notifyMail,
                notifyPhone,
                notifySystem
              },
              notifications: {
                notificationMail,
                notificationPhone
              }
            }

            return (
              <SavedFilterItem key={filter.id}>
                {this.getTitle(filter, i)}

                <AccordionContent key={i} active={this.state.activeIndex === filter.id}>
                  {this.state.activeIndex === filter.id && (
                    <Form
                      enableReinitialize={true}
                      validationSchema={savedFilterValidation}
                      initialValues={initialValues}
                      validateOnChange={false}
                      validateOnBlur={false}
                      onSubmit={async (values, { setSubmitting }) => {
                        try {
                          let { notificationMail, notificationPhone } = values.notifications

                          let body = {
                            name: filter.name,
                            ...values.checkboxes,
                            ...(notificationMail === undefined || notificationMail === ''
                              ? null
                              : { notificationMail }),
                            ...(notificationPhone === undefined || notificationPhone === ''
                              ? null
                              : { notificationPhone })
                          }

                          await this.props.updateFilterNotifications(this.state.activeIndex, body)
                          this.props.toastManager.add(
                            <div>
                              <strong>
                                <FormattedMessage id='confirm.filter.updated' values={{ name: filter.name }} />
                              </strong>
                            </div>,
                            { appearance: 'success', pauseOnHover: true }
                          )
                        } catch (err) {}
                        setSubmitting(false)
                      }}>
                      {formikProps => {
                        return (
                          <SavedFilterDetailGrid>
                            <GridRow>
                              <GridColumn computer={16} floated='left'>
                                <Notifications values={formikProps.values} formikProps={formikProps} />
                              </GridColumn>
                            </GridRow>
                            <GridRow>
                              <GridColumn computer={4} floated='left'>
                                <Button
                                  onClick={formikProps.submitForm}
                                  loading={this.props.savedFilterUpdating}
                                  primary
                                  data-test='filter_save_btn'>
                                  {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                                </Button>
                              </GridColumn>
                            </GridRow>
                          </SavedFilterDetailGrid>
                        )
                      }}
                    </Form>
                  )}
                </AccordionContent>
              </SavedFilterItem>
            )
          })}
        </FilterAccordion>

    )
  }
}

SavedFilters.propTypes = {
  onApply: func,
  getSavedFilters: func,
  savedFilters: array,
  savedFiltersLoading: bool,
  deleteFilter: func,
  params: object
}

SavedFilters.defaultProps = {
  savedFilters: [],
  savedFiltersLoading: false,
  params: {}
}

export default injectIntl(withToastManager(SavedFilters))
