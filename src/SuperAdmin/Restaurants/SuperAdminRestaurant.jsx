import React, { useState } from 'react';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import RestaurantTable from './RestaurantTable';

const SuperAdminRestaurant = () => {
    const restaurantStatus = [
        { label: "All Restaurants", value: "ALL" },
        { label: "Active Restaurants", value: "ACTIVE" },
        { label: "Archived Restaurants", value: "ARCHIVED" },
    ];

    const [filterValue, setFilterValue] = useState("ALL");

    const handleFilter = (e) => {
        setFilterValue(e.target.value);
    };

    return (
        <div className='px-2'>
            <Card className='p-5'>
                <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
                    Restaurant Status
                </Typography>
                <FormControl>
                    <RadioGroup onChange={handleFilter} row name='restaurant-status' value={filterValue}>
                        {restaurantStatus.map((item) => (
                            <FormControlLabel
                                key={item.label}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                                sx={{ color: "gray" }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>
            <RestaurantTable filter={filterValue} name={"All Restaurants"} />
        </div>
    );
};

export default SuperAdminRestaurant;
