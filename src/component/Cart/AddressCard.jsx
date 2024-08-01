import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import {Button, Card} from "@mui/material";
import AddLocationIcon from '@material-ui/icons/AddLocation';

const AddressCard = ({item,showButton , handleSelectAddress}) => {
    return (
        <Card className="flex gap-1 w-80 p-5">
            <HomeIcon/>
            <div className="space-y-3 text-gray-500">
                <h1 className="font-semibold text-lg text-white">Home</h1>
                <p>Angle Route d'El Jadida et Bd. de la Grande Ceinture,Casablanca,Morocco
                </p>
                {showButton && <Button variant="outlined" fullWidth onClick={()=> handleSelectAddress(item)}>Select</Button>}

            </div>
        </Card>
    )
}
export default AddressCard
