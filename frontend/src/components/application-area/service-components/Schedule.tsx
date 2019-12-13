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
    TextField,
    FormControl,
    InputAdornment
} from "@material-ui/core";
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import clsx from 'clsx';


const myStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        spacing: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    active: {
        backgroundColor: theme.palette.secondary.main
    },
    stepHeading: {},
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
    step: number = 0
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

function getStepContent(index: number, step: number) {
    const classes = myStyles();
    const stepData: ScheduleStepData = getStepData[index];
    const heading = stepData.label;

    let myContent: ReactComponentElement<any>;

    switch (index) {
        case 0:
            myContent = (
                <Paper className={classes.paper}>
                    <FormControl fullWidth>
                        <TextField label={'What is your meeting about?'} InputProps={{
                            startAdornment: (
                                <InputAdornment position={'start'}>
                                    <SubjectRoundedIcon />
                                </InputAdornment>
                            )
                        }}/>
                    </FormControl>
                </Paper>
            );
            break;
        case 1:
            myContent = (<div>Content of second element</div>);
            break;
        case 2:
            myContent = (<div>Content of third element</div>);
            break;
        case 3:
            myContent = (<div>Content of fourth element</div>);
            break;
        default:
            throw new Error('Unimplemented step');
    }

    return (
        <Grid item xs={stepData.xs} sm={stepData.sm} lg={stepData.lg}>
            <Paper className={clsx(classes.paper, {
                [classes.active]: step === index
            })}>
                <Typography>
                    {heading}
                </Typography>
                {myContent}
            </Paper>
        </Grid>
    );
}

const getStepData: ScheduleStepData[] = [
    {
        label: 'Important things',
        xs: 12, sm: 6, lg: 6
    }, {
        label: 'Attendees',
        xs: 12, sm: 6, lg: 3, optional: true
    }, {
        label: 'Time',
        xs: 12, sm: 6, lg: 3, optional: true
    }, {
        label: 'Place',
        xs: 12, sm: 6, lg: 12, optional: true
    },
];

const getSteps = (params: ScheduleStepperParameter) => {
    const stepData = getStepData;

    return [
        {data: stepData[0], content: getStepContent(0, params.step)},
        {data: stepData[1], content: getStepContent(1, params.step)},
        {data: stepData[2], content: getStepContent(2, params.step)},
        {data: stepData[3], content: getStepContent(3, params.step)}
    ];
};


function ScheduleStepper(param: ScheduleStepperParameter) {
    const classes = stepperStyles();

    return (
        <>
            <Stepper alternativeLabel activeStep={param.step} orientation={'horizontal'}>
                {getSteps(param).map((step: ScheduleStep, index, elem) => {
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

    const [step, setStep] = React.useState(0);

    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <ScheduleStepper step={step}/>
                        </Paper>
                    </Grid>
                    {getSteps({step: step}).map((step, index, elem) => {
                        return (step.content);
                    })}
                </Grid>
            </div>
        </>
    );
}
