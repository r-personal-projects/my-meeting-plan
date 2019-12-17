import React, {ReactComponentElement, useState} from "react";
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
    constructor(label: string) {
        this.label = label;
    }

    xs: boolean | "auto" | 1 | 2 | 12 | 6 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 = 12;
    sm: boolean | "auto" | 1 | 2 | 12 | 6 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 = 6;
    lg: boolean | "auto" | 1 | 2 | 12 | 6 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 = 6;
    label: string;
    optional?: boolean;
}

class ScheduleStep {
    constructor(data: any, content: ReactComponentElement<any>) {
        this.data = data;
        this.content = content;
    }

    data: any;
    content: ReactComponentElement<any>;
}

const stepIds = ['general', 'time', 'attendees', 'place'];

function getStepContent(stepId: string, scheduleStepperParameter: ScheduleStepperParameter) {
    const classes = myStyles();
    const stepData: ScheduleStepData | undefined = getStepData.get(stepId);
    const step = scheduleStepperParameter.step;

    if (stepData === undefined)
        return (<></>);

    const heading = stepData.label;

    let myContent: ReactComponentElement<any>;

    switch (stepId) {
        case 'general':
            myContent = (
                <GeneralContent />
            );
            break;
        case 'time':
            myContent = (
                <TimeContent />
            );
            break;
        case 'attendees':
            myContent = (<div>Content of second element</div>);
            break;
        case 'place':
            myContent = (<div>Content of fourth element</div>);
            break;
        default:
            throw new Error('Unimplemented step: '+ stepId);
    }

    return (
        <Grid item xs={stepData.xs} sm={stepData.sm} lg={stepData.lg}>
            <Paper className={clsx(classes.paper, {
                [classes.active]: step === stepId
            })}>
                <Typography>
                    {heading}
                </Typography>
                {myContent}
            </Paper>
        </Grid>
    );
}

const createStepData = () => {
    const map = new Map<string, ScheduleStepData>();
    map.set('general', {
        label: 'Important things',
        xs: 12, sm: 6, lg: 6
    });
    map.set('attendees', {
        label: 'Attendees',
        xs: 12, sm: 6, lg: 3, optional: true
    });
    map.set('time', {
        label: 'Time',
        xs: 12, sm: 6, lg: 3, optional: true
    });
    map.set('place', {
        label: 'Place',
        xs: 12, sm: 6, lg: 12, optional: true
    });

    return map;
};

const getStepData: Map<string, ScheduleStepData> = createStepData();

const getSteps = (params: ScheduleStepperParameter) => {
    const stepData = getStepData;
    const result: ScheduleStep[] = [];


    stepIds.forEach(key => {
        const step = stepData.get(key);
        result.push(new ScheduleStep(step, getStepContent(key, params)));
    });

    return result;
};


function ScheduleStepper(param: ScheduleStepperParameter) {
    const classes = stepperStyles();
    const step = stepIds.indexOf(param.step);

    return (
        <>
            <Stepper alternativeLabel activeStep={step} orientation={'horizontal'}>
                {getSteps(param).map((step: ScheduleStep) => {
                    return (
                        <Step key={step.data.label}>
                            <StepLabel>{step.data.label}
                                <Typography variant="caption" className={clsx({
                                    [classes.block]: step.data.optional,
                                    [classes.hide]: !step.data.optional
                                })}>Optional</Typography>
                            </StepLabel>
                        </Step>
                    );
                })}
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
                    {getSteps(scheduleStepperParameter).map((step) => {
                        return (step.content);
                    })}
                </Grid>
            </div>
        </>
    );
}
