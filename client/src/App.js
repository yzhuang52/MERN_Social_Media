import React, {useState, useEffect} from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/navbar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import {GoogleOAuthProvider} from "@react-oauth/google";

export default function App() {

  return (
        <GoogleOAuthProvider clientId="720205783605-egp4a9lka6263brk4a0c8l4ldqb8asoh.apps.googleusercontent.com">
          <BrowserRouter>
            <Container maxWidth='lg'>
              <Navbar/>
              <Routes>
                  <Route path="/"  element={<Home/>}/>
                  <Route path="/auth"  element={<Auth/>}/>
              </Routes>
            </Container>
          </BrowserRouter>
        </GoogleOAuthProvider>

  );
}
