import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { FormattedMessage } from 'react-intl';
import { setupIndicatorStepMobile } from '../constants'
import { DivTitleText, TextContainer } from './styles';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#fff',
        width: '100%'
    }
}));

const SetupIndicatorMobile = ({ activeStep }) => {
    let stepObject = {}
    const classes = useStyles();

    let grouping;
    for (let i = 0; i < setupIndicatorStepMobile.length; i++) {
        const { range, steps } = setupIndicatorStepMobile[i];

        if (range.includes(activeStep)) {
            grouping = steps;
            break;
        }
    }

    stepObject = grouping?.filter(val => val.type !== 'heading').filter(val => val.active === activeStep)

    return (
        <div className="setup-indicator-mobile">
            <TextContainer><DivTitleText className="module-grouping"><FormattedMessage id={grouping?.[0]?.text} /></DivTitleText></TextContainer>
            <div className={classes.root}>
                <Stepper alternativeLabel activeStep={stepObject[0].step}>
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
        </div>
    );
};

export default SetupIndicatorMobile;
