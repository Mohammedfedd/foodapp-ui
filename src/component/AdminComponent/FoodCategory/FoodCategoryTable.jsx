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
const category=[1,1,1,1]
export const FoodCategoryTable = () => {
    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                        title={"Food Category"}
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
                                    <TableCell align="left">Id</TableCell>
                                    <TableCell align="left">Name</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {category.map((row) => (
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
