import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AccountProvider } from "./components/AccountContext";
import Status from "./components/Status";
import Start from "./components/Start";
import Groups from "./components/Groups";
import Group from "./components/Group";
import Report from "./components/Report";
import Reports from "./components/Reports";
import New from "./components/New";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";

const theme = createTheme({
  typography: {
    fontSize: 13,
    fontFamily: "Lato, sans-serif",
    h1: {
      fontWeight: 800,
      textTransform: "uppercase",
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: "#6CACE4",
      light: "#DDEAF1",
      dark: "#0072CE",
      contrastText: "white",
    },
    secondary: {
      main: "#FFBB45",
    },
    background: {
      default: "#F5F5F5",
      gray: "#F5F5F5",
      white: "white",
    },
    success: {
      main: "#3FB63D",
      contrastText: "white",
    },
  },
  // shape: {
  //   borderRadius: 8,
  // },
});

const App = () => {
  return (
    <BrowserRouter>
      <AccountProvider>
        <ThemeProvider theme={theme}>
          <Status />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Reports />} />
              <Route path="/reports" element={<Reports />} />
              <Route exact path="/reports/:id" element={<Report />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:id" element={<Group />} />
              <Route path="/new" element={<New />} />
            </Route>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Start />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AccountProvider>
    </BrowserRouter>
  );
};

export default App;
