import React, { useEffect } from 'react'
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardHeader, Chip, IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";
import CreateIcon from '@mui/icons-material/Create';
import {Delete} from "@material-ui/icons";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../State/Menu/Action';

//const menu=[1,1,1,1,1];
export const MenuTable = () => {
    const dispatch =useDispatch();
    const jwt=localStorage.getItem("jwt");
    const { restaurant,ingredients ,menu}=useSelector((store)=>store);
    const navigate = useNavigate();

    useEffect(()=>{ 
      dispatch(
        getMenuItemsByRestaurantId({
            jwt,
            restaurantId: restaurant.usersRestaurant.id,
            vegetarian: false,
            nonveg: false,
            seasonal: false,
            foodCategory: ""
            
        }));
     },[])

     const handleDeleteFood=(foodId)=>{
        dispatch(deleteFoodAction({foodId,jwt}))
        
    }
    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                        title={"Restaurant Menu"}
                        sx={{pt: 2, alignItems: "center"}}
                        action={
                            <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">

                                <CreateIcon />
                            </IconButton>
                        }
                    />

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Image</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="right">Ingredients</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Availability</TableCell>
                                    <TableCell align="right">Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menu.menuItems.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.id}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Avatar src={item.images[0]}></Avatar>
                                            </TableCell>
                                        <TableCell align="right">{item.name}</TableCell>
                                        <TableCell align="right">{item.ingredients.map((ingredient)=><Chip label={ingredient.name}/>)}</TableCell>
                                        <TableCell align="right">{item.price}</TableCell>
                                        <TableCell align="right">{item.available?"in_stoke":"out_of_stoke"}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={()=>handleDeleteFood(item.id)} color="error">
                                                <Delete/>
                                        </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Card>
            </Box>
        </div>
    )
}
