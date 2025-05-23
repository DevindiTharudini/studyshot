// components/UserLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default UserLayout;
