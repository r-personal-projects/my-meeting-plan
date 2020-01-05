import React, {useState} from "react";
import {
    Divider,
    Fab,
    FormControl,
    FormControlLabel,
    InputAdornment,
    makeStyles,
    Paper,
    Popover,
    TextField,
    Typography,
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import clsx from "clsx";
import SubjectRoundedIcon from "@material-ui/icons/SubjectRounded";
import {ToggleButton} from "@material-ui/lab";
import SpeedIcon from "@material-ui/icons/Speed";
import {useTranslation} from "react-i18next";

export function TimeContent() {
    const classes = timeStyles();
    const [autoTimeSelected, setAutoTimeSelected] = useState(true);

    const [hoverAnchor, setHoverAnchor] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setHoverAnchor(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setHoverAnchor(null);
    };
    const popoverOpen = Boolean(hoverAnchor);
    const {t} = useTranslation('schedule-time-content');


    return (
        <Paper className={clsx(classes.paper)}>
            <FormControl fullWidth>
                <FormControlLabel onMouseLeave={handlePopoverClose} onMouseEnter={handlePopoverOpen} control={(
                    <ToggleButton value={'check'} selected={autoTimeSelected} className={clsx(classes.toggleButton, {
                        [classes.toggleButtonActive]: autoTimeSelected
                    })}
                                  onChange={() => setAutoTimeSelected(!autoTimeSelected)}>
                        <SpeedIcon/>
                    </ToggleButton>
                )} label={autoTimeSelected ? t('auto-time-on') : t('auto-time-off')}/>
                <Popover open={popoverOpen} className={classes.popover} classes={{paper: classes.popoverPaper}}
                         anchorEl={hoverAnchor} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                         transformOrigin={{vertical: 'top', horizontal: 'center'}} onClose={handlePopoverClose}
                         disableRestoreFocus>
                    <Typography>{autoTimeSelected ? t('deactivate-auto-time') : t('activate-auto-time')}</Typography>
                </Popover>
            </FormControl>
            <Divider className={classes.sectionDivider}/>

            {/* no auto-time */}
            <div className={clsx({
                [classes.hide]: autoTimeSelected
            })}>
                <ManualTimeComponent/>
            </div>

            {/* auto-time */}
            <div className={clsx({
                [classes.hide]: !autoTimeSelected
            })}>
                <div>Some content for autoTime</div>
            </div>
        </Paper>
    );
}

function ManualTimeComponent() {

    const [dateValue, setDateValue] = React.useState<Date | null>(new Date());
    const handleDateChange = (date: Date | null) => {
        setDateValue(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd.MM.yyyy"
                margin="normal"
                id="date-picker-inline"
                label="TODO"
                value={dateValue}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

const timeStyles = makeStyles(theme => ({
    paper: {
        position: 'relative',
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),

            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(0.5),
        },
    },
    popover: {
        pointerEvents: 'none',
    },
    popoverPaper: {
        padding: theme.spacing(1),
    },
    sectionDivider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    toggleButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.text.secondary,
        },
    },
    toggleButtonActive: {
        color: theme.palette.primary.main + ' !important',
    },
    hide: {
        display: 'none'
    }
}));

export function GeneralContent() {
    const classes = generalStyles();
    const {t} = useTranslation('schedule-general-content');

    return (
        <Paper className={clsx(classes.paper, classes.paperLarge)}>
            <FormControl fullWidth>
                <TextField label={t('subject-label')} InputProps={{
                    startAdornment: (
                        <InputAdornment position={'start'}>
                            <SubjectRoundedIcon/>
                        </InputAdornment>
                    )
                }}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField label={t('description-label')} multiline/>
            </FormControl>

            <Fab variant={'extended'} color={'secondary'} className={classes.fab}
                 onClick={(event) => console.log(event)}>
                <SubjectRoundedIcon/>
                {t('presets-label')}
            </Fab>
        </Paper>
    );
}

const generalStyles = makeStyles(theme => ({
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

            paddingLeft: theme.spacing(1),
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
