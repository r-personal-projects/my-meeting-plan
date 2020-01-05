import React, {useState} from "react";
import {Appbar} from "./appbar/Appbar.component";
import {DrawerMenu} from "./drawer/Drawer.component";

interface IProps {
    navigationHandler: Function
}

export const Navigation = (props: IProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Appbar open={open} setOpen={setOpen}/>
            <DrawerMenu open={open} setOpen={setOpen} navigationHandler={props.navigationHandler} />
        </>
    );
};
