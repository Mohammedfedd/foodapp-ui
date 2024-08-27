import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, deleteCustomer } from "../../component/State/SuperAdmin/Action";
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SuperAdminCustomerTable = ({ isDashboard, name, filterRole }) => {
    const dispatch = useDispatch();
    const { customers, loading } = useSelector((store) => store.superAdmin);

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    const handleDeleteCustomer = async (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await dispatch(deleteCustomer(customerId));
                alert('Customer deleted successfully');
            } catch (error) {
                alert('Failed to delete customer. Please try again.');
            }
        }
    };

    const filteredCustomers = customers.filter(customer => {
        if (filterRole === 'ALL') return true;
        return customer.role === filterRole;
    });

    const nonAdminCustomers = filteredCustomers.filter(customer => customer.role !== "ROLE_ADMIN");

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
                    <Table aria-label="customer table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Full Name</TableCell>
                                <TableCell>User ID</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>User Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {nonAdminCustomers
                                .slice(0, isDashboard ? 7 : nonAdminCustomers.length)
                                .map((item) => (
                                    <TableRow
                                        hover
                                        key={item.id}
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
                                            <IconButton
                                                onClick={() => handleDeleteCustomer(item.id)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
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
