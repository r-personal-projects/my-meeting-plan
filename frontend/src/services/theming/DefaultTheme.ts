import {createMuiTheme, Theme} from "@material-ui/core";
import {deepOrange, orange, red} from "@material-ui/core/colors";

export function getDefaultTheme() : Theme {
    return createMuiTheme({
        palette: {
            primary: {
                main: deepOrange[500]
            }
        }
    });
}
