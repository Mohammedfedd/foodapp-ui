import React from 'react'
import {Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import Paper from '@mui/material/Paper';

const orders=[1,1,1,1,1];
export const OrderTable = () => {
    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                    title={"All Orders"}
                    sx={{pt:2,alignItems:"center"}}
                    />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Price)</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Ingredients</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {1}
                                        </TableCell>
                                        <TableCell align="right">{"image"}</TableCell>
                                        <TableCell align="right">{"email@email.com"}</TableCell>
                                        <TableCell align="right">{"20 DH"}</TableCell>
                                        <TableCell align="right">{"itemName"}</TableCell>
                                        <TableCell align="right">{"ingredients"}</TableCell>
                                        <TableCell align="right">{"status"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Card>
            </Box>
        </div>
    )
}
