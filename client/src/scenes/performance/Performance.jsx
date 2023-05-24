import React from 'react'
import {Box, useTheme} from '@mui/material';
import {useGetAffiliateStatQuery} from '../../redux/api/api';
import {DataGrid} from '@mui/x-data-grid';
import Header from '../../components/Header';
import CustomColumnMenu from '../../components/CustomColumnMenu';
import { useSelector } from 'react-redux';


const Performance = () => {
  const theme = useTheme();
  const {userId} = useSelector(state => state.global);
  const {data, isLoading} = useGetAffiliateStatQuery({userId});
  console.log(data);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },{
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },{
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },{
      field: "products",
      headerName: "# of Products",
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        return params.value.length
      }
    },{
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => {
        return `$${Number(params.value).toFixed(2)}`
      }
    }
  ]

  return (
    <Box
      m={"1.5rem 2.5rem"}
    >
      <Header title={'PERFORMANCE'} subTitle={"Track Your Affiliate Sales Performance Here"} />
      <Box
        mt={"40px"}
        height={"75vh"}
      >
        {/* Data Grid */}
        <DataGrid 
          loading={isLoading || !data}
          rows={(data && data?.sales) || []}
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

export default Performance