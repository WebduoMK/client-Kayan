import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#53b88c",
    },
    secondary: {
      main: "#231f20",
    },
    text: {
      primary: "#231f20",
    },
    grayText: {
      main: "#9FA6AB",
    },
  },
  typography: {
    fontFamily: "NotoSans-Medium",
    h1: {
      fontSize: "4.4rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1.4rem",
      fontWeight: 500,
    },
    body2: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  stepper: {
    iconColor: "#faad1c",
    fontSize: "3rem",
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontSize: "1.8rem",
            fontWeight: 500,
            color: "white",
            padding: "0.7rem 4.7rem",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            fontSize: "1.8rem",
            fontWeight: 500,
            padding: "0.7rem 4.7rem",
          },
        },
      ],
    },
  },
});
