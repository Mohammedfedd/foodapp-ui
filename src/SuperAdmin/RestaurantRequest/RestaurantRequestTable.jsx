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
import {
    approveRestaurantRequest,
    rejectRestaurantRequest,
    getPendingRestaurants
} from "../../component/State/SuperAdmin/Action"; // Update path to your action file

const RestaurantRequestTable = ({ isDashboard, name }) => {
    const dispatch = useDispatch();
    const { requests, loading } = useSelector((store) => store.restaurantRequests);

    useEffect(() => {
        // Fetch the restaurant requests when the component mounts
        dispatch(getPendingRestaurants());
    }, [dispatch]);

    const handleApproveRequest = (requestId) => {
        console.log("Approve request ", requestId);
        dispatch(approveRestaurantRequest(requestId));
    };

    const handleRejectRequest = (requestId) => {
        console.log("Reject request ", requestId);
        dispatch(rejectRestaurantRequest(requestId));
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
                    <Table aria-label="restaurant requests table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.slice(0, isDashboard ? 7 : requests.length).map((request) => (
                                <TableRow
                                    hover
                                    key={request._id}
                                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                                >
                                    <TableCell>
                                        <Avatar alt={request.name} src={request.imageUrl} />
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
                                                {request.name}
                                            </Typography>
                                            <Typography variant="caption">{request.brand}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {request.cuisineType}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {request.location}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {request.status}
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleApproveRequest(request._id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleRejectRequest(request._id)}
                                        >
                                            Reject
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

export default RestaurantRequestTable;
