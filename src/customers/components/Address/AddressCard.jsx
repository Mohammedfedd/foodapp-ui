import React from 'react';
import { Card, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const AddressCard = ({ item, onSelect, showButton }) => {
    return (
        <Card className="flex space-x-5 p-5 w-64">
            <HomeIcon sx={{ width: 30, height: 30 }} /> {/* Adjusted size */}
            <div className="space-y-3 text-gray-500">
                <p className="font-semibold text-lg">{item.fullName}</p>
                <p>{item.streetAddress}</p>
                <p>{item.city}, {item.state} - {item.postalCode}</p>
                {showButton && (
                    <Button
                        variant="outlined"
                        onClick={onSelect}
                        className="w-full"
                    >
                        Select
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default AddressCard;
