import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment, useTheme } from '@mui/material'
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton
} from '@mui/x-data-grid'
import FlexBoxBetween from './FlexBoxBetween'


const CustomToolBar = ({setSearch, searchInput, setSearchInput}) => {
    const theme = useTheme();
    return (
        <GridToolbarContainer sx={{marginTop: '10px'}}>
            <FlexBoxBetween width={'100%'}>
                <FlexBoxBetween>
                    <GridToolbarColumnsButton sx={{color: theme.palette.primary[100]}}/>
                    <GridToolbarDensitySelector sx={{color: theme.palette.primary[100]}} />
                    <GridToolbarExport sx={{color: theme.palette.primary[100]}} />
                </FlexBoxBetween>
                <TextField 
                    variant='standard'
                    label='Search....'
                    sx={{mb: '0.5rem', width: '15rem'}}
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={() => {
                                    setSearch(searchInput);
                                    setSearchInput("");
                                }}>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </FlexBoxBetween>
        </GridToolbarContainer>
    )
}

export default CustomToolBar