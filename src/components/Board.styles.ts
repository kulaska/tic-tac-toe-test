import { makeStyles } from "@material-ui/core";

export default makeStyles({
    symbolContainer: {
        width: 128,
        height: 128,
        background: 'blue',
        border: '1px solid black',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center"
    },
    gridContainer: {
        maxWidth: 384,
        margin: "auto",
        padding: "24px 0"
    },
    symbol: {
        fontSize: "64px"
    }
})