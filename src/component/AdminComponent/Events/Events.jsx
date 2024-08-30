import React from 'react'
import { Button , Modal,Grid,TextField,Box}  from "@mui/material"
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '@testing-library/react';
import { createEventAction } from '../../State/Restaurant/Action';

const style= {
    position :"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50% , -50%)",
    width: 400,
    bgcolor: "background.paper",
    border:"2px solid #000",
    boxShadow: 24,
    p: 4,
};
const initialValues={
    image:"",
    location:"",
    name:"",
    startedAt:null,
    endsAt:null
 }
const Events = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formValues, setFormValues]=React.useState({initialValues})
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const {restaurant}=useSelector(store=>store)

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("submit" , formValues);
        dispatch(
            createEventAction({
                data:formValues,
                restaurantId:restaurant.usersRestaurant?.id ,
                jwt
            }));

        setFormValues(initialValues );

    };
    const handleFormChange=(e)=>{
       setFormValues=({ ...formValues,[e.target.name]:e.target.value})
    }
    const handleDateChange=(date,dateType)=>{
         const formatedDate=dayjs(date).format("MMMM DD , YYYY hh:mm A");
         setFormValues({...formValues,[dateType]:formatedDate})
        }
    return (
        <div> 
            <div className="p-5 ">
                <Button onClick={handleOpen} variant="contained">Create New Event</Button>

                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>

                    <form onSubmit={handleSubmit}>
                        <Gride container spacing={3}>
                            <Gride item xs={12}>
                              <TextField
                              name="image"
                              label="Image URL"
                              variant="outlined"
                              fullWidth
                              value={formValues.image}
                              onChange={handleFormChange }
                              />
                              </Gride>
                              <Gride item xs={12}>
                                <TextField
                                   name="Location"
                                   label="Location "
                                   variant="outlined"
                                   fullWidth
                                   value={formValues.location}
                                   onChange={ handleFormChange} 
                                />

                              </Gride>
                              <Gride item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                    renderInput={(props)=>
                                    <TextField  { ...props}/>}
                                    label="Start Date and Time"
                               value= {formValues.startedAt}
                                    onChange={(newValue)=>
                                        handleDateChange(newValue,"startedAt")
                                                }
                                   inputFormat="MM/dd/yyyy hh:mm a"
                                    className="w-full"
                                    sx={{width:"100%"}}
                                    />
                                </LocalizationProvider>
                            </Gride>
                        </Gride>
                        <Box mt={2}>
                            <Button variant="contained " color="primary" type="submit">
                                Submit
                            </Button>

                        </Box>
                    </form>
                </Box>
                
                </Modal>
            </div>
        </div>
    )
}
export default Events
