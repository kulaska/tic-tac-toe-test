import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core";

export default (theme: Theme) =>
    makeStyles({
        symbolContainer: {
            width: theme.spacing(16),
            height: theme.spacing(16),
            backgroundColor: theme.palette.primary.main,
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            [theme.breakpoints.down("sm")]: {
                width: theme.spacing(12),
                height: theme.spacing(12)
            }
        },
        gridContainer: {
            maxWidth: theme.spacing(48),
            margin: "auto",
            padding: "24px 0",
            [theme.breakpoints.down("sm")]: {
                maxWidth: theme.spacing(36)
            }
        },
        symbol: {
            fontSize: "64px"
        },
        paper: {
            padding: theme.spacing(2),
            margin: "24px 0"
        }
    });
