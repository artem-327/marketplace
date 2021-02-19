import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'

//Actions
import { postTradeCriteria } from '../../actions'
//Services
import { getInitialFormValues, formValidation } from './TradeCriteria.services'
//Components
import { Required } from '../../../../components/constants/layout'
import BasicButton from '../../../../components/buttons/BasicButton'
import ErrorFocus from '../../../../components/error-focus'
//Constants
import { DROPDOWNS } from './TradeCriteria.constants'
//Styles
import {
  GridTradeCriteria,
  DivTitle,
  DivDescription,
  DivSubLabel,
  GridColumn,
  GridRow,
  DivTitleLabel,
  GridRowBottom
} from './TradeCriteria.styles'

const TradeCriteria = props => {
  return (
    <>
      <Formik
        initialValues={getInitialFormValues()}
        validationSchema={formValidation()}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await props.postTradeCriteria(values)
          } catch (err) {
            console.error(err)
          } finally {
            setSubmitting(false)
          }
        }}>
        {formikProps => (
          <>
            <Form loading={props.loading}>
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
                {DROPDOWNS &&
                  DROPDOWNS.length &&
                  DROPDOWNS.map((row, i) => (
                    <GridRow key={i}>
                      <GridColumn width='16'>
                        <Dropdown
                          key={i}
                          label={
                            <div>
                              <DivTitleLabel>
                                <FormattedMessage id={row.idTitle} defaultMessage={row.textTitle} />
                              </DivTitleLabel>
                              <DivSubLabel>
                                <FormattedMessage id={row.idSubTitle} defaultMessage={row.textSubTitle} />
                                <Required />
                              </DivSubLabel>
                            </div>
                          }
                          name={row.name}
                          options={row.options}
                          inputProps={{
                            key: i,
                            search: options => options,
                            selection: true,
                            fluid: true,
                            placeholder: props.intl.formatMessage({
                              id: row.idPlaceholder,
                              defaultMessage: row.textPlaceholder
                            }),
                            'data-test': row.dataTest
                          }}
                        />
                      </GridColumn>
                    </GridRow>
                  ))}
                <GridRowBottom>
                  <GridColumn width={2} floated='right'>
                    <BasicButton type='submit' loading={props.loading} onClick={formikProps.handleSubmit}>
                      <b>
                        <FormattedMessage id='global.save' defaultMessage='Save' />
                      </b>
                    </BasicButton>
                  </GridColumn>
                </GridRowBottom>
              </GridTradeCriteria>
              <ErrorFocus />
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

TradeCriteria.propTypes = {
  postTradeCriteria: PropTypes.func,
  loading: PropTypes.bool
}

TradeCriteria.defaultProps = {
  postTradeCriteria: () => {},
  loading: false
}

const mapStateToProps = state => ({
  loading: state.settings.loading
})

export default connect(mapStateToProps, { postTradeCriteria })(injectIntl(TradeCriteria))
