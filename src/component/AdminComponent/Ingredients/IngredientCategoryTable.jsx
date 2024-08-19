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
import React from "react";

const ingrcat=[1,1,1,1]
export const IngredientCategoryTable = () => {
    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                        title={"Ingredient Category"}
                        sx={{pt: 2, alignItems: "center"}}
                        action={
                            <IconButton aria-label="settings">
                                <CreateIcon />
                            </IconButton>
                        }
                    />

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Id</TableCell>
                                    <TableCell align="left">Name</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ingrcat.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {1}
                                        </TableCell>
                                        <TableCell align="left">{"Name"}</TableCell>
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