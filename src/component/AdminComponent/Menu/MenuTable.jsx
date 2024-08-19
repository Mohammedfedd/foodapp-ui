import React from 'react'
import {
    Box,
    Card,
    CardActions,
    CardHeader, IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";
import CreateIcon from '@mui/icons-material/Create';
import {Delete} from "@material-ui/icons";
import {useNavigate} from "react-router-dom";

const menu=[1,1,1,1,1];
export const MenuTable = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                        title={"Restaurant Menu"}
                        sx={{pt: 2, alignItems: "center"}}
                        action={
                            <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">

                                <CreateIcon />
                            </IconButton>
                        }
                    />

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Image</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="right">Ingredients</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Availability</TableCell>
                                    <TableCell align="right">Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menu.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {1}
                                        </TableCell>
                                        <TableCell align="left">{"image"}</TableCell>
                                        <TableCell align="right">{"email@email.com"}</TableCell>
                                        <TableCell align="right">{"20 DH"}</TableCell>
                                        <TableCell align="right">{"itemName"}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="error">
                                                <Delete/>
                                        </IconButton><
                                        /TableCell>
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
