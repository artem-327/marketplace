import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { FormattedMessage } from 'react-intl';
import { setupIndicatorSteps } from '../constants'
import { DivTitleText, TextContainer } from './styles';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#fff',
        width: '100%'
    }
}));

const mobileSteps = [
    {
        group: 0,
        range: [0, 1, 2],
        steps: [
            { type: 'heading', text: 'onboarding.setup.indicator.business.verification' },
            { type: 'step', text: 'onboarding.setup.indicator.agreements.and.terms', step: 0 },
            { type: 'step', text: 'onboarding.setup.indicator.business.information', step: 1 },
            { type: 'step', text: 'onboarding.setup.indicator.industry.type', step: 2 }        
        ],
    },
    {
        group: 1,
        range: [3, 4],
        steps: [
            { type: 'heading', text: 'onboarding.setup.indicator.ownership.verification' },
            { type: 'step', text: 'onboarding.setup.indicator.control.person', step: 0 },
            { type: 'step', text: 'onboarding.setup.indicator.beneficial.owners', step: 1 }
        ]
    },
    {
        group: 2,
        range: [5, 6, 7, 8, 9],
        steps: [
            { type: 'heading', text: 'onboarding.setup.indicator.business.profiling' },
            { type: 'step', text: 'onboarding.setup.indicator.marketing.material', step: 0 },
            { type: 'step', text: 'onboarding.setup.indicator.certificate.of.insurance', step: 1 },
            { type: 'step', text: 'onboarding.setup.indicator.risk.tolerance', step: 2 },
            { type: 'step', text: 'onboarding.setup.indicator.resale.certificates', step: 3 },
            { type: 'step', text: 'onboarding.setup.indicator.ownership.certifications', step: 4 }
        ]
    }
];

const SetupIndicatorMobile = ({ activeStep }) => {
    const classes = useStyles();

    let grouping;
    for (let i = 0; i < mobileSteps.length; i++) {
        const { range, steps } = mobileSteps[i];

        if (range.includes(activeStep)) {
            grouping = steps;
            break;
        }
    }

    console.log('activeStep: ', activeStep);

    return (
        <>
            <TextContainer><DivTitleText><FormattedMessage id={grouping?.[0].text} /></DivTitleText></TextContainer>
            <div className={classes.root}>
                <Stepper alternativeLabel activeStep={activeStep} nonLinear>
                    {grouping.filter(val => val.type !== 'heading').map((currentStep, i) => {
                        const { text } = currentStep;

                        return (
                            <Step key={`setup-indicator-mobile-${i}`}>
                                <StepButton>
                                    <FormattedMessage id={text} />
                                </StepButton>
                            </Step>
                        )
                    })}
                </Stepper>
            </div>
        </>
    );
};

export default SetupIndicatorMobile;
