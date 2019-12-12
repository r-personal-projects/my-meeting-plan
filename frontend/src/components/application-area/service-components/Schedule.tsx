import React from "react";
import {createStyles, Grid, makeStyles, Theme, Stepper, Step, StepLabel, Typography} from "@material-ui/core";
import clsx from 'clsx';


const myStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
    step: number = 0
}

class ScheduleStep {
    constructor(label: string) {
        this.label = label;
    }

    label: string;
    optional?: boolean = false;
}

function ScheduleStepper(param: ScheduleStepperParameter) {
    const classes = stepperStyles();
    const steps = [
        {label: 'Important things'},
        {label: 'Attendees', optional: true},
        {label: 'Time', optional: true},
        {label: 'Place', optional: true}
    ];

    return (
        <>
            <Stepper alternativeLabel activeStep={param.step} orientation={'horizontal'}>
                {steps.map((step: ScheduleStep, index) => {
                    return (
                        <Step key={step.label}>
                            <StepLabel>{step.label}
                                <Typography variant="caption" className={clsx({
                                    [classes.block]: step.optional,
                                    [classes.hide]: !step.optional
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
                <Grid item className={classes.paper} xs={12}>
                    <ScheduleStepper step={step}/>
                </Grid>
                <Grid item className={classes.paper} xs={12} sm={6}>
                    Im xs 12 sm 6
                </Grid>
            </div>
        </>
    );
}
