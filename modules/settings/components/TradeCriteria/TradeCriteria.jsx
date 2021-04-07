import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'

//Actions
import { patchTradeCriteria, getTradeCriteria } from '../../actions'
//Services
import { getInitialFormValues, formValidation, getDropdowns } from './TradeCriteria.services'
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
/**
 * Form for save Trade Criteria of company.
 * @category Settings - Trade Criteria
 * @components
 */
const TradeCriteria = ({ tradeCriteria, getTradeCriteria, patchTradeCriteria, loading, dropdowns, intl }) => {
  useEffect(() => {
    const fetchTradeCriteria = async () => {
      await getTradeCriteria()
    }
    if (!tradeCriteria?.length) fetchTradeCriteria()
  }, [tradeCriteria, getTradeCriteria])

  return (
    <>
      <Formik
        initialValues={getInitialFormValues(dropdowns)}
        validationSchema={formValidation()}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let body = {
            settings: dropdowns.map(d => {
              return {
                id: d?.id,
                value: values[d.name]
              }
            })
          }

          await patchTradeCriteria(body)
          setSubmitting(false)
          resetForm()
        }}>
        {formikProps => (
          <>
            <Form loading={loading}>
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
                {dropdowns?.length
                  ? dropdowns?.map((row, i) => (
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
                              placeholder: intl.formatMessage({
                                id: row.idPlaceholder,
                                defaultMessage: row.textPlaceholder
                              }),
                              'data-test': row.dataTest
                            }}
                          />
                        </GridColumn>
                      </GridRow>
                    ))
                  : null}
                <GridRowBottom>
                  <GridColumn width={2} floated='right'>
                    <BasicButton
                      disabled={!dropdowns?.length}
                      type='submit'
                      loading={loading}
                      onClick={formikProps.handleSubmit}>
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
  patchTradeCriteria: PropTypes.func,
  loading: PropTypes.bool,
  tradeCriteria: PropTypes.array
}

TradeCriteria.defaultProps = {
  patchTradeCriteria: () => {},
  loading: false,
  tradeCriteria: null
}

const mapStateToProps = state => ({
  loading: state?.settings?.loading,
  dropdowns: getDropdowns(state?.settings?.tradeCriteria)
})

export default connect(mapStateToProps, { patchTradeCriteria, getTradeCriteria })(injectIntl(TradeCriteria))
