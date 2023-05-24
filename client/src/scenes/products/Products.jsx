import React, {useState} from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
    CircularProgress
} from '@mui/material'
import { useGetProductsQuery } from '../../redux/api/api';
import Header from '../../components/Header';
import Product from '../../components/Product';

const Products = () => {
    const {data, isLoading} = useGetProductsQuery();
    const isNonMobile = useMediaQuery('(min-width: 1000px)')
    const theme = useTheme();

    return (
        <Box m={"1.5rem 2.5rem"}>
            <Header title={'PRODUCTS'} subTitle={'See your list of Products'}/>
            {data || !isLoading ? (
                <Box
                    mt={'20px'}
                    display={'grid'}
                    gridTemplateColumns={"repeat(4, minmax(0,1fr))"}
                    justifyContent={"space-between"}
                    rowGap={"20px"}
                    columnGap={"1.33%"}
                    sx={{
                        "& > div" : {
                            gridColumn: isNonMobile ? undefined : "span 4"
                        }
                    }}
                >
                    {data?.map(({
                        _id,
                        name,
                        description,
                        price,
                        rating,
                        category,
                        supply,
                        stat,
                    }) => {
                        return <Product
                                    key={_id} 
                                    _id={_id}
                                    name={name}
                                    description={description}
                                    price={price}
                                    rating = {rating}
                                    category={category}
                                    supply={supply}
                                    stat={stat}
                                />
                    })}
                </Box>
            ): (
                <Box sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%',
                    height: '100%'
                }}>
                    <CircularProgress sx={{
                        color: theme.palette.primary[200],
                    }} />
                </Box>
            )}
        </Box>
    )
}

export default Products