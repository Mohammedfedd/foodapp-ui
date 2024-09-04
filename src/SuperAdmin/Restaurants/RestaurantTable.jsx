import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllRestaurantsAction,
    SuperarchiveRestaurant,
    unarchiveRestaurant,
} from '../../State/SuperAdmin/superAdmin.action'; // Import both archive and unarchive actions
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
} from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const RestaurantTable = ({ filter, name }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const { restaurants, loading } = useSelector((store) => store.restaurant);

    useEffect(() => {
        dispatch(getAllRestaurantsAction(jwt));
    }, [dispatch, jwt]);

    const filteredRestaurants = restaurants.filter(restaurant => {
        if (filter === 'ALL') return true;
        if (filter === 'ACTIVE') return restaurant.status !== 'ARCHIVED';
        if (filter === 'ARCHIVED') return restaurant.status === 'ARCHIVED';
        return false;
    });

    const handleArchiveToggle = async (restaurantId, isArchived) => {
        if (isArchived) {
            if (window.confirm("Are you sure you want to unarchive this restaurant?")) {
                try {
                    await dispatch(unarchiveRestaurant(restaurantId));
                    alert('Restaurant unarchived successfully');
                    dispatch(getAllRestaurantsAction(jwt));
                } catch (error) {
                    alert('Failed to unarchive restaurant. Please try again.');
                }
            }
        } else {
            if (window.confirm("Are you sure you want to archive this restaurant?")) {
                try {
                    await dispatch(SuperarchiveRestaurant(restaurantId));
                    alert('Restaurant archived successfully');
                    dispatch(getAllRestaurantsAction(jwt));
                } catch (error) {
                    alert('Failed to archive restaurant. Please try again.');
                }
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
                                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRestaurants.map((item) => (
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
                                            onClick={() => handleArchiveToggle(item.id, item.status === 'ARCHIVED')}
                                            color={item.status === 'ARCHIVED' ? "warning" : "primary"}
                                        >
                                            {item.status === 'ARCHIVED' ? <UnarchiveIcon /> : <ArchiveIcon />}
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
