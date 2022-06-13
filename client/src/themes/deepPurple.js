import {createMuiTheme} from "@material-ui/core/styles";

const deepPurple = createMuiTheme({
    palette: {
        primary:{
            main: "#4201FF",
            dark: "#240090"
        },
        secondary:{
            main: "#0C0032",
            light: "#190061"
        }
    },

    text:{
        primary: "#fff",
        secondary: "#fff"
    }
});

export default deepPurple;