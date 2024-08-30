import {
    Box,
    Card,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Paper from "@mui/material/Paper";
import {Delete} from "@material-ui/icons";
import React, { useEffect } from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsOfRestaurant, updateStockOfIngredient } from "../../State/Ingredients/Action";

const ingredients=[1,1,1,1,1]
const style={
    position :"absolute",
    top : "50%",
    left:"50%",
    transform: "translate(-50% , 50%)",
    width : 400,
    bgcolor: "background.paper",
    border :"2px solid #000",
    boxShadow: 24,
    p:4,
};

export const IngredientTable = () => {
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const { restaurant ,ingredients}=useSelector(store=>store);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        dispatch( 
            getIngredientsOfRestaurant(
                {  jwt,
                id:restaurant.userRestaurant.id} ));
    },[]  );

    const handleUpdateStoke=(id) => {
      dispatch(updateStockOfIngredient(  {id,jwt}))
    }
    return (
        <div>
            <Box>
                <Card className='mt-1'>
                    <CardHeader
                        title={"Ingredients"}
                        sx={{pt: 2, alignItems: "center"}}
                        action={
                            <IconButton onClick={handleOpen} aria-label="settings">
                                <CreateIcon />
                            </IconButton>
                        }
                    />

                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Id</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Ingredients</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Availability</TableCell>
                                    <TableCell align="right">Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ingredients.ingredients.map((item) => (
                                    <TableRow
                                        key={item.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row" align="right">
                                            {item.id}
                                        </TableCell>
                                        <TableCell align="right">{item.name}</TableCell>
                                        <TableCell align="right">{item.category.name}</TableCell>
                                     <TableCell align="right">
                                        <Button onClick={()=>handleUpdateStoke(item.id)}>
                                        {item.inStoke?"instoke":"out_of_stoke"}
                                        </Button>
                                     </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="error">
                                                <Delete/>
                                            </IconButton>
                                             </TableCell> 
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Card>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CreateIngredientForm/>
                </Box>
                
              
              
              </Modal>
                       
            </Box>
        </div>
    )
}