import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArchivedRestaurants, unarchiveRestaurant } from "../../component/State/SuperAdmin/Action"; // Update this path to where your action is defined
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
import UnarchiveIcon from '@mui/icons-material/Unarchive'; // Import Unarchive icon

const ArchivedRestaurantTable = () => {
    const dispatch = useDispatch();
    const { archivedRestaurants, loading } = useSelector((store) => store.superAdmin);

    useEffect(() => {
        dispatch(getArchivedRestaurants()); // Fetch archived restaurants when the component mounts
    }, [dispatch]);

    const handleUnarchive = async (restaurantId) => {
        if (window.confirm("Are you sure you want to unarchive this restaurant?")) {
            try {
                await dispatch(unarchiveRestaurant(restaurantId)); // Dispatch unarchive action
                alert('Restaurant unarchived successfully'); // Notify user of successful unarchiving
            } catch (error) {
                alert('Failed to unarchive restaurant. Please try again.'); // Notify user of failure
            }
        }
    };

    return (
        <Box width={"100%"}>
            <Card className="mt-1">
                <CardHeader
                    title="Archived Restaurants"
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
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {archivedRestaurants.map((restaurant) => (
                                <TableRow
                                    hover
                                    key={restaurant.id}
                                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                                >
                                    <TableCell>
                                        <Avatar alt={restaurant.name} src={restaurant.imageUrl} />
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
                                                {restaurant.name}
                                            </Typography>
                                            <Typography variant="caption">{restaurant.brand}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {restaurant.cuisineType}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {restaurant.location}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {restaurant.status}
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        <IconButton onClick={() => handleUnarchive(restaurant.id)} color="success">
                                            <UnarchiveIcon />
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

export default ArchivedRestaurantTable;
