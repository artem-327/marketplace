import React, { Component } from 'react'
import { func, array, bool, object } from 'prop-types'
import { Accordion, Segment, Grid, GridRow, GridColumn, Popup, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Button } from 'formik-semantic-ui-fixed-validation'
import { withToastManager } from 'react-toast-notifications'

import {
  SavedFilterItem,
  SavedFilterTitle,
  SavedFiltersSegment,
  SavedFilterIcon,
  AccordionContent,
  ActionRow
} from '../constants/layout'

import styled from 'styled-components'

import Notifications from './Notifications'
import { FormattedMessage, injectIntl } from 'react-intl'
import { savedFilterValidation } from '../constants/validation'
import { groupFilters } from '../constants/filter'

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

  getTitle = (filter, i) => {
    let { id, name } = filter
    let filterDescription = groupFilters(filter.filters, this.props.params)
    return (
      <SavedFilterTitle>
        <Grid>
          <GridRow>
            <Popup
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
            </Popup>

            <Popup
              trigger={
                <GridColumn computer={2} onClick={() => this.toggle(id)} data-test={`filter_editNotifications_${i}`}>
                  <SavedFilterIcon
                    name='bell'
                    className={this.state.activeIndex === id && 'thick'}
                    color={this.state.activeIndex === id ? 'yellow' : 'black'}
                  />
                </GridColumn>
              }>
              <FormattedMessage id='filter.editNotifications' />
            </Popup>
            <Popup
              trigger={
                <GridColumn
                  onClick={() => this.toggle(i, 'activeTooltip')}
                  computer={2}
                  data-test={`filter_activeTooltip_${i}`}>
                  <SavedFilterIcon color={this.state.activeTooltip === i ? 'blue' : 'black'} name='info circle' />
                </GridColumn>
              }
              position='left center'>
              <GridColumn computer={8}>
                <StyledGrid verticalAlign='top'>
                  {filterDescription && filterDescription.length > 0 ? (
                    filterDescription.map((f, index) => (
                      <GridRow key={index}>
                        <GridColumn computer={8}>{f.description}:</GridColumn>

                        <GridColumn computer={8}>
                          {f.valuesDescription instanceof Array
                            ? f.valuesDescription.map(v => v)
                            : typeof f.valuesDescription === 'string'
                            ? f.valuesDescription
                            : f.tagDescription}
                        </GridColumn>
                      </GridRow>
                    ))
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
            </Popup>
            <Popup
              trigger={
                <GridColumn
                  onClick={() => this.props.deleteFilter(id)}
                  computer={2}
                  data-test={`filter_deleteFilter_${i}`}>
                  <SavedFilterIcon name='trash alternate outline' />
                </GridColumn>
              }
              position='left center'>
              <FormattedMessage id='filter.deleteFilter' />
            </Popup>
          </GridRow>
        </Grid>
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
      <SavedFiltersSegment basic>
        <Accordion>
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
                          <Grid verticalAlign='middle'>
                            <Notifications values={formikProps.values} formikProps={formikProps} />
                            <ActionRow>
                              <GridColumn computer={4} floated='right'>
                                <Button
                                  onClick={formikProps.submitForm}
                                  loading={this.props.savedFilterUpdating}
                                  fluid
                                  positive
                                  basic
                                  data-test='filter_save_btn'>
                                  {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                                </Button>
                              </GridColumn>
                            </ActionRow>
                          </Grid>
                        )
                      }}
                    </Form>
                  )}
                </AccordionContent>
              </SavedFilterItem>
            )
          })}
        </Accordion>
      </SavedFiltersSegment>
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
