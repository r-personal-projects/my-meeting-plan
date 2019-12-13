import {createMuiTheme, Theme, useMediaQuery} from "@material-ui/core";
import {blue, deepOrange, grey, orange, red} from "@material-ui/core/colors";

export function getDefaultTheme(prefersDarkMode : boolean) : Theme {

    return createMuiTheme({
        palette: {
            primary: {
                main: prefersDarkMode ? deepOrange[500] : deepOrange[500],
            },
            secondary: {
                main: prefersDarkMode ? blue[800] : blue[300]
            },
            text: {
                primary: prefersDarkMode ? 'white' : 'black',
                disabled: prefersDarkMode ? grey[500] : grey[500],
                secondary: prefersDarkMode ? grey[300] : grey[700],
                hint: prefersDarkMode ? grey[300] : grey[700]
            },
            background: {
                default: prefersDarkMode ? grey[800] : '#fafafa',
                paper: prefersDarkMode ? grey[900] : 'white',
            },
        },
    });
}
