import {
    Avatar,
    Backdrop,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, deleteCustomer } from "../../component/State/SuperAdmin/Action"; // Ensure correct path

const SuperAdminCustomerTable = ({ isDashboard, name }) => {
    const dispatch = useDispatch();
    const { customers, loading } = useSelector((store) => store.superAdmin); // Update to correct state path

    useEffect(() => {
        dispatch(getCustomers()); // Fetch customers when the component mounts
    }, [dispatch]);

    const handleDeleteCustomer = async (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await dispatch(deleteCustomer(customerId)); // Dispatch delete action
                alert('Customer deleted successfully'); // Notify user of successful deletion
            } catch (error) {
                alert('Failed to delete customer. Please try again.'); // Notify user of failure
            }
        }
    };

    return (
        <Box width={"100%"}>
            <Card className="mt-1">
                <CardHeader
                    title={name}
                    sx={{
                        pt: 2,
                        alignItems: "center",
                        "& .MuiCardHeader-action": { mt: 0.6 },
                    }}
                />
                <TableContainer>
                    <Table aria-label="table in dashboard">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>User Id</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>User Role</TableCell>
                                <TableCell>Actions</TableCell> {/* Added Actions column */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers
                                .slice(0, isDashboard ? 7 : customers.length)
                                .map((item) => (
                                    <TableRow
                                        hover
                                        key={item.id} // Use item.id for the key
                                        sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                                    >
                                        <TableCell>
                                            <Avatar alt={item.fullName} src={item.imageUrl} />
                                        </TableCell>

                                        <TableCell
                                            sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                                        >
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: "0.875rem !important",
                                                    }}
                                                >
                                                    {item.fullName}
                                                </Typography>
                                                <Typography variant="caption">{item.brand}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.role}</TableCell>

                                        <TableCell>
                                            <Button
                                                color="error"
                                                variant="contained"
                                                onClick={() => handleDeleteCustomer(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default SuperAdminCustomerTable;
