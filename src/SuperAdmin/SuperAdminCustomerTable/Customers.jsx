import React, { useState } from 'react';
import SuperAdminCustomerTable from './SuperAdminCustomerTable';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

const Customers = () => {
    const [filterRole, setFilterRole] = useState('ALL'); // Default filter role

    const handleFilterChange = (event) => {
        setFilterRole(event.target.value);
    };

    const roles = [
        { label: "All", value: "ALL" },
        { label: "Customer", value: "ROLE_CUSTOMER" },
        { label: "Restaurant Owner", value: "ROLE_RESTAURANT_OWNER" }
    ];

    return (
        <div className='px-2'>
            <Card className='p-5'>
                <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
                    All Users
                </Typography>
                <FormControl>
                    <RadioGroup
                        row
                        name='role'
                        value={filterRole}
                        onChange={handleFilterChange}
                    >
                        {roles.map((role) => (
                            <FormControlLabel
                                key={role.value}
                                value={role.value}
                                control={<Radio />}
                                label={role.label}
                                sx={{ color: "gray" }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>
            <SuperAdminCustomerTable
                filterRole={filterRole} // Pass the filter role to the table component
            />
        </div>
    );
};

export default Customers;
