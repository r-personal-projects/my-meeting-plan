import React from "react";
import {
    AppBar, Divider,
    Drawer, fade,
    IconButton, InputBase,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, Menu, MenuItem, SvgIcon,
    Toolbar,
    Typography,
    useTheme
} from "@material-ui/core";
import {ReactComponent as AccountIcon} from "../../res/icons/account.svg";
import {ReactComponent as NotificationIcon} from "../../res/icons/notification.svg";
import {ReactComponent as TestTubeIcon} from "../../res/icons/test-tube.svg";
import {ReactComponent as AppointmentIcon} from "../../res/icons/appointment.svg";
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreateIcon from '@material-ui/icons/Add'
import clsx from 'clsx';
import MoreVert from "@material-ui/icons/MoreVert";
import {isDebug} from "../../../services/DebugService";
import {MenuItemId, MenuItemType} from "../../../constants/Navigation";
import {useTranslation} from "react-i18next";

const drawerWidth = 240;

const myStyles = makeStyles(theme => ({
    appbar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appbarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClosed: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    drawerItem: {
        color: theme.palette.text.secondary
    },
    drawerToggle: {
        color: theme.palette.text.secondary,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '200px'
        }
    }
}));
const myToolbarElementsStyles = makeStyles(theme => ({
    container: {
        display: 'flex'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
}));

const myIconStyles = makeStyles(theme => ({
    icon: {
        color: 'inherit',
    },
}));

const toolbarElementsList = [
    {id: 'notifications', image: (<NotificationIcon/>), text: 'notifications'},
    {id: 'profile', image: (<AccountIcon/>), text: 'profile'},
    isDebug() ? {id: 'admin', image: (<TestTubeIcon/>), text: 'admin'} : {},
];

const createDivider = () => {
    return {type: MenuItemType.Divider, id: MenuItemId.EMPTY, text: '', image: (<></>)}
};

const menuElementsList = [
    {id: MenuItemId.Dashboard, image: (<DashboardIcon/>), text: 'dashboard', type: MenuItemType.Element},
    {id: MenuItemId.Schedule, image: (<ScheduleIcon/>), text: 'schedule', type: MenuItemType.Element},
    createDivider(),
];

function ToolbarElements() {
    const classes = myToolbarElementsStyles();
    let [anchorElement, setAnchorElement] = React.useState(undefined);
    const {t} = useTranslation('navigation-elements-toolbar');

    const handleMobileClick = (event: any) => {
        setAnchorElement(event.currentTarget);
    };

    const handleMobileClose = (event: any) => {
        setTimeout(() => setAnchorElement(undefined), 300);
    };

    function MobileMenu() {
        const {t} = useTranslation('navigation-elements-toolbar');

        return (
            <Menu anchorEl={anchorElement} anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted
                  transformOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(anchorElement)}
                  onClose={handleMobileClose}>
                {toolbarElementsList.map(elem => {
                    const languageKey: string = elem.text ? elem.text : '';
                    return (
                        <MenuItem onClick={handleMobileClose}>
                            <IconButton aria-label={elem.text} color="inherit">
                                <SvgIcon color={'inherit'}>
                                    {elem.image}
                                </SvgIcon>
                            </IconButton>
                            <p>{t((languageKey))}</p>
                        </MenuItem>
                    )
                })}
            </Menu>
        );
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.sectionDesktop}>
                    {toolbarElementsList.map(element => {
                        return (
                            <IconButton color={'default'} title={t((element.text ? element.text : ''))}>
                                <SvgIcon color={'inherit'}>
                                    {element.image}
                                </SvgIcon>
                            </IconButton>
                        );
                    })}
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton onClick={handleMobileClick}>
                        <MoreVert/>
                    </IconButton>
                    <MobileMenu/>
                </div>
            </div>
        </>
    );
}

interface NavigationProps {
    Callback: (id: MenuItemId) => any,
}

export default function (Props: NavigationProps) {
    const classes = myStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const handleMenuClick = (id: MenuItemId) => {
        Props.Callback(id);
    };

    function handleDrawerToggle() {
        setOpen(!open);
    }

    const {t} = useTranslation('navigation-elements');


    return (
        <>
            <AppBar position='fixed' className={clsx(classes.appbar, {
                [classes.appbarShift]: open,
            })}>
                <Toolbar>
                    <IconButton color={'inherit'} aria-label={'open drawer'} onClick={handleDrawerToggle} edge={'start'}
                                className={clsx(classes.menuButton, {[classes.hide]: open})}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant={'h6'} noWrap>My meeting planner</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SvgIcon>
                                <AppointmentIcon />
                            </SvgIcon>
                        </div>
                        <InputBase
                            placeholder={t("quick-planner-label")}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    <div className={classes.grow}/>
                    <ToolbarElements/>
                </Toolbar>
            </AppBar>
            <Drawer variant={'permanent'}
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClosed]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClosed]: !open
                        }),
                    }}
                    open={open}>
                <div className={classes.toolbar}>
                    <IconButton className={classes.drawerToggle} onClick={handleDrawerToggle}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                {menuElementsList.map(elem => {
                    console.log(elem);
                    if (elem.type === MenuItemType.Element) {
                        return (
                            <ListItem button key={elem.id} onClick={() => handleMenuClick(elem.id)}>
                                <ListItemIcon className={classes.drawerItem}>{elem.image}</ListItemIcon>
                                <ListItemText primary={t(elem.text ? elem.text : '')} className={classes.drawerItem}/>
                            </ListItem>
                        );
                    } else if (elem.type === MenuItemType.Divider) {
                        return (
                            <Divider/>
                        );
                    } else {
                        return (
                            <ListItem>
                                ERROR
                            </ListItem>
                        );
                    }
                })}
            </Drawer>
        </>
    );
}
