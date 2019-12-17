import {createMuiTheme, Theme} from "@material-ui/core";
import {blue, deepOrange, grey} from "@material-ui/core/colors";

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
                primary: prefersDarkMode ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
                disabled: prefersDarkMode ? grey[500] : grey[500],
                secondary: prefersDarkMode ? grey[300] : grey[700],
                hint: prefersDarkMode ? grey[300] : grey[700]
            },
            background: {
                default: prefersDarkMode ? grey[800] : 'rgb(250,250,250)',
                paper: prefersDarkMode ? grey[900] : 'white',
            },
        },
        typography: {
            button: {
                color: prefersDarkMode ? 'rgb(255,255,255)' : 'rgb(0,0,0)',
            }
        }
    });
}
