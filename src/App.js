import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Account } from "./components/Account";
import Status from "./components/Status";
import Home from "./components/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import Start from "./components/Start";
import Groups from "./components/Groups";
import Reports from "./components/Reports";

const App = () => {
  return (
    <Account>
      <Status />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/home" element={<Home />}/>
            <Route path="/groups" element={<Groups />}/>
            <Route path="/reports" element={<Reports />}/>
          </Route> 
          <Route path="/" element={<Start />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </Account>
  );
}

export default App;
