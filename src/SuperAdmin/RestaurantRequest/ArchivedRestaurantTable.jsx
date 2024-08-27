import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getArchivedRestaurants,
    unarchiveRestaurant,
} from "../../component/State/SuperAdmin/Action"; // Import necessary actions
import {
    Avatar,
    Backdrop,
    Box,
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
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const ArchivedRestaurantTable = ({ name }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { archivedRestaurants = [], loading } = useSelector((store) => store.restaurant);

    useEffect(() => {
        dispatch(getArchivedRestaurants(jwt)); // Fetch archived restaurants
    }, [dispatch, jwt]);

    const handleUnarchive = async (restaurantId) => {
        if (window.confirm("Are you sure you want to unarchive this restaurant?")) {
            try {
                await dispatch(unarchiveRestaurant(restaurantId)); // Dispatch unarchive action
                alert('Restaurant unarchived successfully');
                dispatch(getArchivedRestaurants(jwt)); // Refetch archived restaurants
            } catch (error) {
                alert('Failed to unarchive restaurant. Please try again.');
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
                    <Table aria-label="archived restaurants table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Banner</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Owner</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {archivedRestaurants.length > 0 ? (
                                archivedRestaurants.map((item) => (
                                    <TableRow
                                        hover
                                        key={item.id}
                                        sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                                    >
                                        <TableCell>
                                            <Avatar alt={item.name} src={item.images[0]} />
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
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="caption">{item.brand}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {item.owner.fullName}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {item.cuisineType}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            {item.address.city}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <IconButton
                                                onClick={() => handleUnarchive(item.id)}
                                                color="success"
                                            >
                                                <UnarchiveIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                                        No archived restaurants found.
                                    </TableCell>
                                </TableRow>
                            )}
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

export default ArchivedRestaurantTable;
