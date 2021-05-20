import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Info } from 'react-feather'
import { Formik } from 'formik'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Form, Grid } from 'semantic-ui-react'
import styled from 'styled-components'

//Actions
import { putTradeCriteria, getTradeCriteria } from '~/modules/settings/actions'
//Services
import { getInitialFormValues, formValidation, getDropdowns } from '../../../settings/components/TradeCriteria/TradeCriteria.services'
//Components
import { Required } from '../../../../components/constants/layout'
import BasicButton from '../../../../components/buttons/BasicButton'
import ErrorFocus from '../../../../components/error-focus'
import {
    Rectangle,
    CustomDivTitle
  } from '~/modules/cart/components/StyledComponents'
//Styles
import {
  DivSubLabel,
  GridColumn,
  GridRow,
  DivTitleLabel
} from '../../../settings/components/TradeCriteria/TradeCriteria.styles'

const StyledGrid = styled(Grid)`
  margin: 14px 16px !important;
`

const CustomDivContent = styled.div`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  padding: .5rem;
`

/**
 * Form for save Trade Criteria of company.
 * @category Settings - Trade Criteria
 * @components
 */
const RiskTolerance = ({
  tradeCriteria,
  getTradeCriteria,
  putTradeCriteria,
  loading,
  dropdowns,
  criteria,
  criteriaOptions,
  intl
}) => {
  useEffect(() => {
    const fetchTradeCriteria = async () => await getTradeCriteria()
    if (!tradeCriteria?.length) fetchTradeCriteria()
  }, [tradeCriteria, getTradeCriteria])

  return (
    <Formik
        initialValues={getInitialFormValues(criteria, criteriaOptions)}
        validationSchema={formValidation()}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
            await putTradeCriteria(values)
            setSubmitting(false)
        }}
    >
        {formikProps => (
            <StyledGrid className="risk-tolerance">
                <Form loading={loading}>
                    <Rectangle>
                        <CustomDivTitle>
                            <Info size={20} style={{ color: '#3bbef6' }} />
                        </CustomDivTitle>
                        <CustomDivContent style={{ color: '#848893' }}>
                            <FormattedMessage id='onboarding.what.is.risk.tolerance' />  
                        </CustomDivContent>
                    </Rectangle>
                    {dropdowns?.length
                        ? dropdowns?.map((row, i) => (
                            <GridRow style={{ margin: '0 0 1rem 0' }} key={i}>
                                <GridColumn width={16}>
                                    <Dropdown
                                        key={i}
                                        label={
                                            <>
                                                <DivTitleLabel>
                                                    <FormattedMessage id={row.idTitle} defaultMessage={row.textTitle} />
                                                </DivTitleLabel>
                                                <DivSubLabel>
                                                    <FormattedMessage id={row.idSubTitle} defaultMessage={row.textSubTitle} />
                                                    <Required />
                                                </DivSubLabel>
                                            </>
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
                    <GridRow>
                        <GridColumn>
                            <BasicButton
                                className="btn-save s-full-width btn-primary-color"
                                disabled={!dropdowns?.length}
                                type='submit'
                                loading={loading}
                                onClick={formikProps.handleSubmit}
                            >
                                    <FormattedMessage id='global.save' defaultMessage='Save' />
                            </BasicButton>
                        </GridColumn>
                    </GridRow>
                    <ErrorFocus />
                </Form>
            </StyledGrid>
        )}
    </Formik>
  )
}

RiskTolerance.propTypes = {
  putTradeCriteria: PropTypes.func,
  loading: PropTypes.bool,
  tradeCriteria: PropTypes.array
}

RiskTolerance.defaultProps = {
  putTradeCriteria: () => {},
  loading: false,
  tradeCriteria: null
}

const mapStateToProps = state => ({
  loading: state?.settings?.loading,
  dropdowns: getDropdowns(state?.settings?.tradeCriteria),
  criteria: state?.settings?.tradeCriteria?.criteria,
  criteriaOptions: state?.settings?.tradeCriteria?.criteriaOptions
})

export default connect(mapStateToProps, { putTradeCriteria, getTradeCriteria })(injectIntl(RiskTolerance))
