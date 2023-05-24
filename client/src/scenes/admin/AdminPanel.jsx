import React from 'react'
import {Box, useTheme} from '@mui/material';
import {useGetAdminsQuery} from '../../redux/api/api';
import {DataGrid} from '@mui/x-data-grid';
import Header from '../../components/Header';
import CustomColumnMenu from '../../components/CustomColumnMenu';


const AdminPanel = () => {
  const theme = useTheme();
  const {data, isLoading} = useGetAdminsQuery();
  
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },{
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },{
      field: "email",
      headerName: "Email",
      flex: 1,
    },{
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      }
    },{
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },{
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },{
      field: "role",
      headerName: "Role",
      flex: 0.5,
    }
  ]

  return (
    <Box
      m={"1.5rem 2.5rem"}
    >
      <Header title={'ADMINS'} subTitle={"Managing Admins and List of Admins"} />
      <Box
        mt={"40px"}
        height={"75vh"}
      >
        {/* Data Grid */}
        <DataGrid 
          loading={isLoading || !data}
          rows={data || []}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  )
}

export default AdminPanel