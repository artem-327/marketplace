import React, { Component } from 'react'
import { func, array, bool } from 'prop-types'
import { Accordion, Segment, Grid, GridRow, GridColumn, Popup, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Button } from 'formik-semantic-ui'

import { SavedFilterItem, SavedFilterTitle, SavedFiltersSegment, SavedFilterIcon, AccordionContent, ActionRow } from '../constants/layout'

import Notifications from './Notifications'
import { FormattedMessage } from 'react-intl';

export default class SavedFilters extends Component {
  state = {
    activeIndex: 0
  }
  componentDidMount() {
    this.props.getSavedFilters()
  }

  toggleAccordion = (id) => {
    const { activeIndex } = this.state
    const newIndex = activeIndex === id ? -1 : id

    this.setState({ activeIndex: newIndex })
  }

  getTitle = (name, id) => {
    return (
      <SavedFilterTitle>
        <Grid>
          <GridRow>
            <GridColumn computer={10}>
              {name}
            </GridColumn>
            <GridColumn computer={2} onClick={() => this.toggleAccordion(id)}>
              <SavedFilterIcon
                name='bell'
                className={this.state.activeIndex === id && 'thick'}
                color={this.state.activeIndex === id ? 'yellow' : 'black'} />
            </GridColumn>
            <Popup trigger={
              <GridColumn computer={2}>
                <SavedFilterIcon name='info circle' />
              </GridColumn>
            } position='right center'>
              <GridColumn computer={8}>
                <Grid>
                  <GridRow>
                    <GridColumn>
                      IMPLEMENT WHEN BACKEND PROVIDES DATA!
                    </GridColumn>
                  </GridRow>
                </Grid>
              </GridColumn>
            </Popup>
            <GridColumn computer={2}>
              <SavedFilterIcon name='remove' />
            </GridColumn>
          </GridRow>
        </Grid>
      </ SavedFilterTitle>
    )
  }

  render() {
    if (this.props.savedFiltersLoading) {
      return (
        <Segment basic>
          <Dimmer active inverted><Loader active /></Dimmer>
        </Segment>
      )
    }

    return (
      <SavedFiltersSegment basic>
        <Accordion>
          {this.props.savedFilters.map((filter) => {

            let { notificationEnabled, notifyMail, notifyPhone, notifySystem, notificationMail, notificationPhone } = filter
            let initialValues = {
              checkboxes: {
                notificationEnabled, notifyMail, notifyPhone, notifySystem,
              },
              notifications: {
                notificationMail, notificationPhone
              }
            }

            return (
              <SavedFilterItem key={filter.id}>
                {this.getTitle(filter.name, filter.id)}

                <AccordionContent active={this.state.activeIndex === filter.id}>
                  {this.state.activeIndex === filter.id && (
                    <Form initialValues={initialValues}>
                      {({ values }) => {
                        return (
                          <Grid verticalAlign='middle'>
                            <Notifications values={values} />
                            <ActionRow>
                              <GridColumn computer={4} floated='right'>
                                <Button.Submit fluid positive basic><FormattedMessage id='global.save' defaultMessage='Save' /></Button.Submit>
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
      </SavedFiltersSegment >
    )
  }
}

SavedFilters.propTypes = {
  getSavedFilters: func,
  savedFilters: array,
  savedFiltersLoading: bool
}

SavedFilters.defaultProps = {
  getSavedFilters: () => console.warn('getSavedFilters not implemented!'),
  savedFilters: [],
  savedFiltersLoading: false
}