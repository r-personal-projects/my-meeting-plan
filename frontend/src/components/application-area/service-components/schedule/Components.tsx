import React, {MouseEventHandler, useState} from "react";
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
    Typography
} from "@material-ui/core";
import clsx from "clsx";
import SubjectRoundedIcon from "@material-ui/icons/SubjectRounded";
import {ToggleButton} from "@material-ui/lab";
import SpeedIcon from "@material-ui/icons/Speed";

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


    return (
        <Paper className={clsx(classes.paper)}>
            <FormControl fullWidth >
                <FormControlLabel control={(
                    <ToggleButton value={'check'} selected={autoTimeSelected} className={clsx(classes.toggleButton, {
                        [classes.toggleButtonActive]: autoTimeSelected
                    })}
                                  onMouseLeave={handlePopoverClose} onMouseEnter={handlePopoverOpen}
                                  onChange={() => setAutoTimeSelected(!autoTimeSelected)}>
                        <SpeedIcon/>
                    </ToggleButton>
                )} label={autoTimeSelected ? 'auto-time on' : 'auto-time off'}/>
                <Popover open={popoverOpen} className={classes.popover} classes={{paper: classes.popoverPaper}}
                         anchorEl={hoverAnchor} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                         transformOrigin={{vertical: 'top', horizontal: 'left'}} onClose={handlePopoverClose}
                         disableRestoreFocus>
                    <Typography>{autoTimeSelected ? 'Deactivate auto-time' : 'Activate auto-time'}</Typography>
                </Popover>
            </FormControl>
            <Divider className={classes.sectionDivider} />
            <FormControl fullWidth >
                <TextField value={'test'}>

                </TextField>
            </FormControl>
        </Paper>
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

            paddingLeft: theme.spacing(0.5),
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
        marginRight: theme.spacing(1),
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.text.secondary,
        },
    },
    toggleButtonActive: {
        color: theme.palette.primary.main + ' !important',
    }
}));

export function GeneralContent() {
    const classes = generalStyles();

    return (
        <Paper className={clsx(classes.paper, classes.paperLarge)}>
            <FormControl fullWidth>
                <TextField label={'Subject of your meeting'} InputProps={{
                    startAdornment: (
                        <InputAdornment position={'start'}>
                            <SubjectRoundedIcon/>
                        </InputAdornment>
                    )
                }}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField label={'Describe the agenda of your meeting'} multiline/>
            </FormControl>

            <Fab variant={'extended'} color={'secondary'} className={classes.fab}
                 onClick={(event) => console.log(event)}>
                <SubjectRoundedIcon/>
                Presets
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
