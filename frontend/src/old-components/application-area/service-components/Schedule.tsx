import React, {Component, ReactComponentElement} from "react";
import {
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Paper,
    useMediaQuery, useTheme
} from "@material-ui/core";
// noinspection SpellCheckingInspection
import clsx from 'clsx';
import {GeneralContent, TimeContent} from "./schedule/Components";
import {useTranslation} from "react-i18next";


const myStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        spacing: theme.spacing(2),
    },
    paper: {
        position: 'relative',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),

            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
        },
    },
    active: {
        backgroundColor: theme.palette.secondary.main
    },
    stepHeading: {},
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    paperLarge: {
        paddingBottom: theme.spacing(10),
    }
}));

const stepperStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginRight: theme.spacing(1),
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: 'inline-block',
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        hide: {
            display: 'none'
        },
        block: {
            display: 'block'
        }
    }),
);

class ScheduleStepperParameter {
    constructor(step: string, autoTimeSelected: boolean, setAutoTimeSelected: Function) {
        this.step = step;
        this.autoTimeSelected = autoTimeSelected;
        this.setAutoTimeSelected = setAutoTimeSelected;
    }

    step: string;
    autoTimeSelected: boolean;
    setAutoTimeSelected: Function;
}

class ScheduleStepData {
    key: string = '';
    xs: boolean | "auto" | 1 | 2 | 12 | 6 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 = 12;
    sm: boolean | "auto" | 1 | 2 | 12 | 6 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 = 6;
    lg: boolean | "auto" | 1 | 2 | 12 | 6 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 = 6;
    optional?: boolean;
}

const stepDataArray: ScheduleStepData[] = [
    {key: 'general', xs: 12, sm: 6, lg: 6},
    {key: 'attendees', xs: 12, sm: 6, lg: 3, optional: true},
    {key: 'time', xs: 12, sm: 6, lg: 3, optional: true},
    {key: 'place', xs: 12, sm: 6, lg: 12, optional: true}
];

function getStepContent(stepId: string, scheduleStepperParameter: ScheduleStepperParameter) {
    const classes = myStyles();
    const stepData: ScheduleStepData | undefined = stepDataArray.find(value => value.key === stepId);
    const step = scheduleStepperParameter.step;

    if (stepData === undefined)
        return (<></>);

    let myContent: ReactComponentElement<any>;

    switch (stepId) {
        case 'general':
            myContent = (
                <GeneralContent/>
            );
            break;
        case 'time':
            myContent = (
                <TimeContent/>
            );
            break;
        case 'attendees':
            myContent = (<div>Content of second element</div>);
            break;
        case 'place':
            myContent = (<div>Content of fourth element</div>);
            break;
        default:
            throw new Error('Unimplemented step: ' + stepId);
    }

    return (
        <Grid item xs={stepData.xs} sm={stepData.sm} lg={stepData.lg}>
            <Paper className={clsx(classes.paper, {
                [classes.active]: step === stepId
            })}>
                <Typography>
                    {getHeading(step)}
                </Typography>
                {myContent}
            </Paper>
        </Grid>
    );
}

const getHeading = (step: string) => {
    //const {t} = useTranslation('schedule-steps');
    //const heading = '';
    // const {t} = useTranslation('schedule-steps');

    return (<div>ABC</div>);
};

function ScheduleStepper(param: ScheduleStepperParameter) {
    const classes = stepperStyles();
    // const step = stepIds.indexOf(param.step);
    const {t} = useTranslation('schedule-steps');
    const stepName: string = t(param.step) ? t(param.step).toString() : '';

    return (
        <>
            <Stepper alternativeLabel activeStep={stepDataArray.findIndex(value => value.key === param.step)}
                     orientation={'horizontal'}>
                {
                    stepDataArray.map((step: ScheduleStepData) => {
                        return (
                            <Step key={stepName}>
                                <StepLabel>{t(stepName)}
                                    <Typography variant="caption" className={clsx({
                                        [classes.block]: step.optional,
                                        [classes.hide]: !step.optional
                                    })}>Optional</Typography>
                                </StepLabel>
                            </Step>
                        )
                    })
                }
            </Stepper>
        </>
    );
}

export default function () {
    const classes = myStyles();
    const theme = useTheme();

    const [step, setStep] = React.useState('general');
    const [autoTimeSelected, setAutoTimeSelected] = React.useState(true);
    const belowXs = useMediaQuery(theme.breakpoints.down('xs'));

    const scheduleStepperParameter: ScheduleStepperParameter = new ScheduleStepperParameter(step, autoTimeSelected, setAutoTimeSelected);

    return (
        <>
            <div className={classes.root}>
                <Grid component={'form'} container spacing={belowXs ? 1 : 3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {ScheduleStepper(scheduleStepperParameter)}
                        </Paper>
                    </Grid>
                    {/*stepDataArray.map((step) => {
                        //return (getStepContent(step.key, step));
                    })*/}
                </Grid>
            </div>
        </>
    );
}
