import React, {useState, useEffect} from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/navbar";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import {GoogleOAuthProvider} from "@react-oauth/google";
import PostDetails from "./PostDetails/PostDetails";
export default function App() {
    const user = JSON.parse(localStorage.getItem('profile'));

  return (
        <GoogleOAuthProvider clientId="720205783605-egp4a9lka6263brk4a0c8l4ldqb8asoh.apps.googleusercontent.com">
          <BrowserRouter>
            <Container maxWidth='xl'>
              <Navbar/>
              <Routes>
                  <Route path="/"  element={<Navigate to="/posts"/>}/>
                  <Route path="/posts" element={<Home/>}/>
                  <Route path="/posts/search" element={<Home/>}/>
                  <Route path="/posts/:id" element={<PostDetails/>}/>
                  <Route path="/auth"  element={!user?<Auth/>:<Navigate to="/posts"/>}/>
              </Routes>
            </Container>
          </BrowserRouter>
        </GoogleOAuthProvider>

  );
}
