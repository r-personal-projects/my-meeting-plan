import React, {EventHandler, useState} from "react";
import {useTranslation} from "react-i18next";
import {IconButton, Menu, MenuItem, SvgIcon, useMediaQuery, useTheme} from "@material-ui/core";
import {ReactComponent as NotificationIcon} from "./icons8-notification.svg";
import {ReactComponent as MoreIcon} from "./icons8-more.svg";
import {ReactComponent as ProfileIcon} from "./icons8-login_as_user.svg";
import {ReactComponent as AdminIcon} from "./icons8-crown.svg";
import {isDebug} from "../../../../services/DebugService";
import {TFunction} from "i18next";

const menuItems = [
    {id: 'notifications', icon: <NotificationIcon/>, tKey: 'notifications'},
    {id: 'profile', icon: <ProfileIcon/>, tKey: 'profile'},
    isDebug() ? {id: 'admin', icon: <AdminIcon/>, tKey: 'admin'} : {},
];

interface ISectionProps {
    t: TFunction,
}

const SectionMobile = (props: ISectionProps) => {
    let [anchorElement, setAnchorElement] = useState(undefined);
    const {t} = props;


    const handleMobileClick = (event: any) => {
        setAnchorElement(event.currentTarget);
    };

    const handleMobileClose = (event: any) => {
        setTimeout(() => setAnchorElement(undefined), 300);
    };

    return (
        <div className={'section-mobile'}>
            <IconButton color={'inherit'} onClick={handleMobileClick}>
                <SvgIcon>
                    <MoreIcon/>
                </SvgIcon>
            </IconButton>
            <MobileMenu anchorElement={anchorElement} handleMobileClose={handleMobileClose} t={t}/>
        </div>
    );
};

const SectionDesktop = (props: ISectionProps) => {
    const {t} = props;
    return (
        <div className={'section-desktop'}>
            {menuItems.map(item => {
                return (
                    <IconButton key={item.id} color={'default'} title={t((item.tKey ? item.tKey : ''))}>
                        <SvgIcon color={'inherit'}>
                            {item.icon}
                        </SvgIcon>
                    </IconButton>
                )
            })}
        </div>
    )
};

interface IMobileMenuProps {
    anchorElement: Element | undefined,
    handleMobileClose: EventHandler<any>,
    t: TFunction
}

const MobileMenu = (props: IMobileMenuProps) => {
    const {anchorElement, handleMobileClose, t} = props;

    return (
        <Menu anchorEl={anchorElement} anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted
              transformOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(anchorElement)}
              onClose={handleMobileClose}>
            {menuItems.map(item => {
                const languageKey = item.tKey ? item.tKey : '';
                const text = t(languageKey);
                return (
                    <MenuItem key={item.id} onClick={handleMobileClose}>
                        <IconButton aria-label={text} color="inherit">
                            <SvgIcon color={'inherit'}>
                                {item.icon}
                            </SvgIcon>
                        </IconButton>
                        <p>{t((languageKey))}</p>
                    </MenuItem>
                );
            })}
        </Menu>
    );
};

export const AppbarElements = () => {
    const {t} = useTranslation('navigation-elements-toolbar');
    const theme = useTheme();
    const downSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (<div className={'container'}>
            {downSm
                ? <SectionMobile t={t}/>
                : <SectionDesktop t={t}/>}
        </div>
    );
};
