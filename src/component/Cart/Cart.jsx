import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material';
import React from 'react';
import { CartItem } from './CartItem';
import AddressCard from "./AddressCard";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import auth from "../Auth/Auth";
import { createOrder } from "../State/Order/Action";
import { cartTotal } from "./totalPay";
// import * as Yup from "yup"

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};

const initialValues = {
    streetAddress: "",
    stateProvince: "",
    zipcode: "",
    city: ""
}
// const validationSchema = Yup.object.shape({
//     streetAddress: Yup.string().required("Street address is required"),
//     state: Yup.string().required("State is required"),
//     zipcode: Yup.string().required("Zipcode is required"),
//     city: Yup.string().required("City is required")
// })

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const handleSubmit = async (values) => {
        const total = cartTotal(cart.cartItems) + 10 + 25; // Total price calculation
        console.log('Total Price:', total);

        const paymentData = {
            jwt: localStorage.getItem("jwt"),
            order: {
                restaurantId: cart.cartItems[0].food?.restaurant.id,
                deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: values.streetAddress,
                    city: values.city,
                    stateProvince: values.stateProvince,
                    postalCode: values.zipcode,
                },
                totalPrice: total
            }
        };

        try {
            const response = await dispatch(createOrder(paymentData));
            const { paymentUrl } = response.payload; // Assuming your action returns the payment URL

            // Redirect the user to the Stripe payment page
            window.location.href = paymentUrl;
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    }

    const createOrderUsingSelectedAddress = async (selectedAddress) => {
        const total = cartTotal(cart.cartItems) + 10 + 25; // Total price calculation

        const paymentData = {
            jwt: localStorage.getItem("jwt"),
            order: {
                restaurantId: cart.cartItems[0].food?.restaurant.id,
                deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: selectedAddress.streetAddress,
                    city: selectedAddress.city,
                    stateProvince: selectedAddress.stateProvince,
                    postalCode: selectedAddress.zipcode,
                },
                totalPrice: total
            }
        };

        try {
            const response = await dispatch(createOrder(paymentData));
            const { paymentUrl } = response.payload;

            // Redirect the user to the Stripe payment page
            window.location.href = paymentUrl;
        } catch (error) {
            console.error("Order creation failed:", error);
        }
    }

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems.map((item) => (<CartItem item={item} />))}
                    <Divider />
                    <div className="billDetails px-5 text-sm">
                        <p className="font-extralight py-5">Bill Details</p>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-400">
                                <p>Item Total</p>
                                <p>{cartTotal(cart.cartItems)} DH</p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>Delivery Fee</p>
                                <p>10 DH</p>
                            </div>
                            <Divider />
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <p>Total Price</p>
                            <p>{cartTotal(cart.cartItems) + 10} DH</p>
                        </div>
                    </div>
                </section>
                <Divider orientation="vertical" flexItem />
                <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
                    <div>
                        <h1 className="text-center font-semibold text-2xl py-10">Choose Delivery Address</h1>
                        <div className="flex gap-5 flex-wrap justify-center">
                            {auth.user?.addresses.map((item, index) => (
                                <AddressCard
                                    key={index}
                                    handleSelectAddress={() => createOrderUsingSelectedAddress(item)}
                                    item={item}
                                    showButton={true}
                                />
                            ))}
                            <Card className="flex gap-8 w-80 p-7">
                                <AddLocationIcon />
                                <div className="space-y-3 text-gray-500">
                                    <h1 className="font-semibold text-lg text-white">Add new Address</h1>
                                    <Button variant="outlined" fullWidth onClick={() => setOpen(true)}>Add</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                        // validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Street Address"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="zipcode"
                                        label="Zipcode"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="stateProvince"
                                        label="State"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" fullWidth>Pay Now</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    );
}

export default Cart;
