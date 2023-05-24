import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useGetTransactionQuery } from '../../redux/api/api'
import Header from '../../components/Header'
import { useTheme, Box } from '@mui/material'
import CustomToolBar from '../../components/CustomToolBar'


const Transactions = () => {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  console.log(search);
  const {data, isLoading} = useGetTransactionQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },{
      field: "userId",
      headerName: "User Id",
      flex: 1,
    },{
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },{
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length
    },{
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => {
        return `${Number(params.value).toFixed(2)}`
      }
    }
  ]

  return (
    <Box
      m={"1.5rem 2.5rem"}
    >
      <Header title={"TRANSACTION"} subTitle={'Entire List of Transactions'} />
      <Box 
        height={'80vh'}
        mt={'40px'}
      >
        {/* Data Grid */}
        <DataGrid 
          loading={isLoading || !data}
          rows={(data && data.transactions )|| []}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={(data && data?.total?.length) || 0}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode='server'
          sortingMode='server'
          pageSizeOptions={[10,15,20,50,100]}
          onSortModelChange={(newSortMode) => setSort(...newSortMode)}
          components={{Toolbar: CustomToolBar}}
          componentsProps={{
            toolbar: {setSearch, searchInput, setSearchInput}
          }}
        />
      </Box>
    </Box>
  )
}

export default Transactions