import React from 'react'
import { Box, useTheme, CircularProgress } from '@mui/material'
import Header from '../../components/Header'
import { useGetGeographyQuery } from '../../redux/api/api'
import {ResponsiveChoropleth} from '@nivo/geo';
import { geoData } from '../../redux/geodata/geoData';


const Geography = () => {
    const theme = useTheme();
    const {data} = useGetGeographyQuery();

  return (
    <Box m={'1.5rem 2.5rem'}>
        <Header title={'GEOGRAPHY'} subTitle={'Find Where your users are located'} />
        <Box
            mt={'40px'}
            px={'1rem'}
            height={'75vh'}
            border={`1px solid ${theme.palette.secondary[200]}`}
            borderRadius={'4px'}
        >
            {data ? (
            <ResponsiveChoropleth
            data={data}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200]
                        }
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200],
                        }
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        }
                    }
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200],
                    }
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main,
                    }
                }
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            domain={[ 0, 60 ]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={172}
            projectionTranslation={[ 0.45, 0.75 ]}
            projectionRotation={[ 0, 0, 0 ]}
            enableGraticule={true}
            borderWidth={2}
            borderColor="#152538"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: true,
                    translateX: 0,
                    translateY: -125,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: theme.palette.secondary[200],
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: theme.palette.background.alt,
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />) :  (
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
    </Box>
  )
}

export default Geography