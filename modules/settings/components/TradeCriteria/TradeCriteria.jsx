import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { GridRow } from 'semantic-ui-react'
import { Formik } from 'formik'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'

//Services
import { getInitialFormValues, formValidation, submitHandler } from './TradeCriteria.services'
//Components
import { Required } from '../../../../components/constants/layout'
//Constants
// AGGREGATE_INSURANCE, CREDIT_RISK, VIOLATIONS, SOCIAL_PRESENCE
import { DAYS_BEYOND } from './TradeCriteria.constants'
//Styles
import {
  GridTradeCriteria,
  DivTitle,
  DivDescription,
  DivSubLabel,
  GridColumn,
  DivTitleLabel
} from './TradeCriteria.styles'

const TradeCriteria = props => {
  return (
    <>
      <Formik
        initialValues={getInitialFormValues()}
        validationSchema={formValidation()}
        enableReinitialize
        onSubmit={submitHandler}
        loading={props.loading}>
        {formikProps => (
          <>
            <Form autoComplete='off'>
              <DivTitle>
                <FormattedMessage id='title.settings.tradeCriteria' defaultMessage='Trade Criteria' />
              </DivTitle>
              <GridTradeCriteria className='flex stretched'>
                <DivDescription>
                  <FormattedMessage
                    id='settings.tradeCriteria.description'
                    defaultMessage='Trade Criteria are critical business factors that TradePass will use to pre-evaluate your potential customers and partners. Using proprietary technology, TradePass will verify these customers/partners exceed, meet, or are below your threshold for conducting business.'
                  />
                </DivDescription>

                <GridRow>
                  <GridColumn width='16'>
                    <Dropdown
                      label={
                        <div>
                          <DivTitleLabel>
                            <FormattedMessage
                              id='settings.tradeCriteria.daysBeyond.titleLabel'
                              defaultMessage='Days Beyond Term'
                            />
                          </DivTitleLabel>
                          <DivSubLabel>
                            <FormattedMessage
                              id='settings.tradeCriteria.daysBeyond.subLabel'
                              defaultMessage='What Days Beyond Term (DBT) are you comfortable with your customers/partners having?'
                            />
                            <Required />
                          </DivSubLabel>
                        </div>
                      }
                      name='daysBeyondTerm'
                      options={DAYS_BEYOND}
                      inputProps={{
                        search: options => options,
                        selection: true,
                        fluid: true,
                        placeholder: props.intl.formatMessage({
                          id: 'settings.tradeCriteria.selectPaymentTerms',
                          defaultMessage: 'Select your Payment Terms'
                        }),
                        'data-test': 'settings_trade_criteria_days_beyond_drpdn'
                      }}
                    />
                  </GridColumn>
                </GridRow>
              </GridTradeCriteria>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

TradeCriteria.propTypes = {}

export default injectIntl(TradeCriteria)
