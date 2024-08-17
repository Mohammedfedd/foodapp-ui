import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction, SuperarchiveRestaurant } from "../../component/State/SuperAdmin/Action"; // Update this path to where your action is defined
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
import ArchiveIcon from '@mui/icons-material/Archive';
import {findCart} from "../../component/State/Cart/Action"; // Import Archive icon

const RestaurantTable = ({ isDashboard, name }) => {
    const dispatch = useDispatch();
    const jwt=localStorage.getItem("jwt");
    const { restaurants, loading } = useSelector((store) => store.restaurant);

    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt));
        dispatch(findCart(jwt));
    }, [dispatch, jwt]);

    const handleArchive = async (restaurantId) => {
        if (window.confirm("Are you sure you want to archive this restaurant?")) {
            try {
                await dispatch(SuperarchiveRestaurant(restaurantId)); // Dispatch archive action
                alert('Restaurant archived successfully'); // Notify user of successful archiving
            } catch (error) {
                alert('Failed to archive restaurant. Please try again.'); // Notify user of failure
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
                                <TableCell>Banner</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Owner</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Cuisine Type</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>Location</TableCell>
                                {!isDashboard && (
                                    <TableCell sx={{ textAlign: "center" }}>Contact</TableCell>
                                )}
                                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurants
                                .slice(0, isDashboard ? 7 : restaurants.length)
                                .map((item) => (
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

                                        {!isDashboard && (
                                            <TableCell sx={{ textAlign: "center" }}>
                                                {item.contactInformation.email}
                                            </TableCell>
                                        )}
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <IconButton onClick={() => handleArchive(item.id)} color="warning">
                                                <ArchiveIcon />
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

export default RestaurantTable;
