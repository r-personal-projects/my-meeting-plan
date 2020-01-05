import React, {FocusEventHandler, SyntheticEvent, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import './Appbar.styles.scss';
import {IconButton, Toolbar, SvgIcon, Typography, InputBase} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {ReactComponent as MenuIcon} from "./icons8-menu.svg";
import {ReactComponent as CreateIcon} from "./icons8-create.svg";
import {AppbarElements} from "./elements/AppbarElements.component";

interface IProps {
    open: boolean,
    setOpen: Function
}

export const Appbar = (props: IProps) => {
    const {t} = useTranslation('navigation-elements');
    const [searchFocus, setSearchFocus] = useState(false);
    const {setOpen, open} = props;

    function handleFocus() {
        setSearchFocus(true);
    }

    function handleBlur() {
        setSearchFocus(false);
    }

    return (
        <>
            <AppBar position={"fixed"} className={clsx('appbar', {
                'appbar-shift': open,
            })}>
                <Toolbar>
                    <IconButton color={'inherit'} title={t('open-drawer')} aria-label={t('open-drawer')}
                                onClick={() => setOpen(!open)} edge={'start'}
                                className={clsx('menu-button', {'hide': open})}>
                        <SvgIcon>
                            <MenuIcon/>
                        </SvgIcon>
                    </IconButton>

                    <Typography className={'appbarHeading'} variant={'h6'}>{t('app-heading')}</Typography>
                    <div className={clsx('search', {
                        'focused': searchFocus
                    })}>
                        <div className={'search-icon'}>
                            <SvgIcon>
                                <CreateIcon/>
                            </SvgIcon>
                        </div>
                        <InputBase
                            onFocus={handleFocus} onBlur={handleBlur}
                            placeholder={t("quick-planner-label")}
                            className={'input'}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>

                    <div className={'grow'}/>

                    <AppbarElements/>

                </Toolbar>
            </AppBar>
        </>
    );
};
