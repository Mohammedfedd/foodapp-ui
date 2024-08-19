import {
    Box,
    Card,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Paper from "@mui/material/Paper";
import {Delete} from "@material-ui/icons";
import React from "react";

const ingredients=[1,1,1,1,1]

export const IngredientTable = () => {
    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                        title={"Ingredients"}
                        sx={{pt: 2, alignItems: "center"}}
                        action={
                            <IconButton aria-label="settings">
                                <CreateIcon />
                            </IconButton>
                        }
                    />

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Id</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Ingredients</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Availability</TableCell>
                                    <TableCell align="right">Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ingredients.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row" align="right">
                                            {1}
                                        </TableCell>
                                        <TableCell align="right">{"image"}</TableCell>
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
