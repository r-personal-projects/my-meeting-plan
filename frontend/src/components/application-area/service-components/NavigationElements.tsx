import React, {Component} from "react";
import {
    AppBar, Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, Menu, MenuItem,
    Toolbar,
    Typography,
    useTheme
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PizzaIcon from '@material-ui/icons/LocalPizza';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationIcon from '@material-ui/icons/Notifications';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import MoreVert from "@material-ui/icons/MoreVert";
import {isDebug} from "../../../services/DebugService";
import {Router} from "@material-ui/icons";
import {MenuItemId, MenuItemType} from "../../../constants/Navigation";

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

const toolbarElementsList = [
    {id: 'notifications', image: (<NotificationIcon/>), text: 'notifications'},
    {id: 'profile', image: (<PersonIcon/>), text: 'profile'},
    isDebug() ? {id: 'admin', image: (<PizzaIcon/>), text: 'admin'} : {},
];

const createDivider = () => {
    return {type: MenuItemType.Divider, id: '', text: '', image: (<></>)}
};

const menuElementsList = [
    {id: MenuItemId.Dashboard, image: (<DashboardIcon/>), text: 'Dashboard', type: MenuItemType.Element},
    {id: MenuItemId.Schedule, image: (<ScheduleIcon />), text: 'Schedule a meeting', type: MenuItemType.Element},
    createDivider(),
];

function ToolbarElements() {
    const classes = myToolbarElementsStyles();
    let [anchorElement, setAnchorElement] = React.useState(undefined);

    const handleMobileClick = (event: any) => {
        setAnchorElement(event.currentTarget);
    };

    const handleMobileClose = (event: any) => {
        setTimeout(() => setAnchorElement(undefined), 300);
    };

    function MobileMenu() {
        return (
            <Menu anchorEl={anchorElement} anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted
                  transformOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(anchorElement)} onClose={handleMobileClose}>
                {toolbarElementsList.map(elem => {
                    return (
                        <MenuItem onClick={handleMobileClose}>
                            <IconButton aria-label={elem.text} color="inherit">
                                {elem.image}
                            </IconButton>
                            <p>{elem.text}</p>
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
                            <IconButton>
                                {element.image}
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
    Callback: (id: string) => any,
}

export default function (Props: NavigationProps) {
    const classes = myStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const handleMenuClick = (id: string) => {
        console.log(id + ' clicked');
        Props.Callback(id);
    };

    function handleDrawerToggle() {
        setOpen(!open);
    }

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
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                {menuElementsList.map(elem => {
                    console.log(elem);
                    if (elem.type === MenuItemType.Element) {
                        return (
                            <ListItem button key={elem.id} onClick={() => handleMenuClick(elem.id)}>
                                <ListItemIcon>{elem.image}</ListItemIcon>
                                <ListItemText primary={elem.text}/>
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
