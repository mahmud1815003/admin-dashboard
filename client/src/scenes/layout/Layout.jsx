import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useGetUserQuery } from '../../redux/api/api';

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const {userId} = useSelector(state => state.global);
  const {data, isLoading, isError, error} = useGetUserQuery(userId);
  console.log(data);

  return <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
    <Sidebar
      user={data || {}}
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSideBarOpen={isSideBarOpen}
      setIsSideBarOpen={setIsSideBarOpen}
    />
    <Box flexGrow={1}>
      <Navbar
        user={data || {}}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Outlet />
    </Box>
  </Box>
}

export default Layout