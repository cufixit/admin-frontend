import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AccountProvider } from "./components/AccountContext";
import Status from "./components/Status";
import Start from "./components/Start";
import Groups from "./components/Groups";
import Group from "./components/Group";
import Report from "./components/Report";
import Reports from "./components/Reports";
import Home from "./components/Home";
import New from "./components/New";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Status />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
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
      </AccountProvider>
    </BrowserRouter>
  );
};

export default App;
