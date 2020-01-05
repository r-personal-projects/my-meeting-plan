import React from "react"
import {Divider, Drawer, IconButton, ListItem, ListItemIcon, useTheme, SvgIcon, ListItemText} from "@material-ui/core";
import clsx from 'clsx';
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {MenuItemId, MenuItemType} from "../../../constants/Navigation";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ScheduleIcon from "@material-ui/icons/Schedule";
import {useTranslation} from "react-i18next";


const createDivider = () => {
    return {type: MenuItemType.Divider, id: MenuItemId.EMPTY, text: '', image: (<></>)}
};

const menuElementsList = [
    {id: MenuItemId.Dashboard, image: (<DashboardIcon/>), text: 'dashboard', type: MenuItemType.Element},
    {id: MenuItemId.Schedule, image: (<ScheduleIcon/>), text: 'schedule', type: MenuItemType.Element},
    createDivider(),
];

interface IProps {
    open: boolean,
    setOpen: Function,
    navigationHandler: Function,
}

export function DrawerMenu(props: IProps) {
    const {open, setOpen} = props;
    const theme = useTheme();
    const {t} = useTranslation('navigation-elements');

    function handleDrawerToggle() {
        setOpen(!open);
    }

    function handleMenuClick(id: MenuItemId) {
        props.navigationHandler(id);
    }

    return (
        <>
            <Drawer variant={'permanent'} className={clsx('drawer', {
                'open': open,
                'closed': !open
            })} classes={{
                paper: clsx({
                    ['open']: open,
                    ['closed']: !open
                }),
            }} open={open}>
                <div className={'toolbar'}>
                    <IconButton color={'inherit'} className={'drawer-toggle'} onClick={handleDrawerToggle}>
                        <SvgIcon>
                            {theme.direction === 'rtl' ? <ArrowRightIcon/> : <ArrowLeftIcon/>}
                        </SvgIcon>
                    </IconButton>
                </div>
                <Divider/>
                {menuElementsList.map(item => {
                    if (item.type === MenuItemType.Element) {
                        return (
                            <ListItem key={item.id} onClick={() => handleMenuClick(item.id)}>
                                <ListItemIcon><SvgIcon className={'drawer-item'}>{item.image}</SvgIcon></ListItemIcon>
                                <ListItemText primary={t(item.text ? item.text : '')} className={'drawer-item'}/>
                            </ListItem>
                        )
                    } else if (item.type === MenuItemType.Divider) {
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
    )
}
