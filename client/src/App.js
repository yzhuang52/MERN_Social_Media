import React, {useState, useEffect} from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/navbar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Auth from "./components/Auth/Auth";
export default function App() {

  return (
      <BrowserRouter>
        <Container maxWidth='lg'>
          <Navbar/>
          <Routes>
              <Route path="/"  element={<Home/>}/>
              <Route path="/auth"  element={<Auth/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
  );
}
