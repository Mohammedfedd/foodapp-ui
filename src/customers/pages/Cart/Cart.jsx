import { Button, Card, Divider, IconButton, Snackbar } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import AddressCard from "../../components/Address/AddressCard";
import CartItemCard from "../../components/CartItem/CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Box, Modal, Grid, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createOrder } from "../../../State/Customers/Orders/Action";
import { findCart } from "../../../State/Customers/Cart/cart.action";
import { isValid } from "../../util/ValidToOrder";
import { cartTotal } from "./totalPay";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  city: Yup.string().required("City is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Cart = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
  };

  const handleOpenAddressModal = () => setOpenAddressModal(true);

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleAddressSelection = (deliveryAddress) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: deliveryAddress.fullName,
          streetAddress: deliveryAddress.streetAddress,
          city: deliveryAddress.city,
          state: deliveryAddress.state,
          postalCode: deliveryAddress.postalCode,
        },
      },
    };

    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
        },
      },
    };

    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
      resetForm();
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
      <Fragment>
        {cart.cartItems.length > 0 ? (
            <main className="lg:flex justify-between">
              <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
                {cart.cartItems.map((item, i) => (
                    <CartItemCard key={i} item={item} />
                ))}

                <Divider />
                <div className="billDetails px-5 text-sm">
                  <p className="font-extralight py-5">Bill Details</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-400">
                      <p>Item Total</p>
                      <p>{cartTotal(cart.cartItems)} DH</p>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <p>Deliver Fee</p>
                      <p>10 DH</p>
                    </div>
                    <Divider />
                    <div className="flex justify-between text-gray-400">
                      <p>Total Pay</p>
                      <p>{cartTotal(cart.cartItems) + 10} DH</p>
                    </div>
                  </div>
                </div>
              </section>
              <Divider orientation="vertical" flexItem />
              <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
                <div className="">
                  <h1 className="text-center font-semibold text-2xl py-10">
                    Choose Delivery Address
                  </h1>
                  <div className="flex gap-5 flex-wrap justify-center">
                    {auth.user?.addresses.map((item, index) => (
                        <AddressCard
                            key={index}
                            item={item}
                            showButton={true}
                            onSelect={() => handleAddressSelection(item)}
                        />
                    ))}

                    <Card className="flex flex-col justify-center items-center p-5 w-64 ">
                      <div className="flex space-x-5">
                        <AddLocationAltIcon />
                        <div className="space-y-5">
                          <p>Add New Address</p>
                          <Button
                              onClick={handleOpenAddressModal}
                              sx={{ padding: ".75rem" }}
                              fullWidth
                              variant="contained"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </section>
            </main>
        ) : (
            <div className="flex h-[90vh] justify-center items-center">
              <div className="text-center space-y-5">
                <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
                <p className="font-bold text-3xl">Your Cart Is Empty</p>
              </div>
            </div>
        )}
        <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
          <Box sx={style}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                        name="streetAddress"
                        as={TextField}
                        label="Street Address"
                        fullWidth
                        variant="outlined"
                        error={Boolean(ErrorMessage("streetAddress"))}
                        helperText={
                          <ErrorMessage name="streetAddress">
                            {(msg) => <span className="text-red-600">{msg}</span>}
                          </ErrorMessage>
                        }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                        name="state"
                        as={TextField}
                        label="State"
                        fullWidth
                        variant="outlined"
                        error={Boolean(ErrorMessage("state"))}
                        helperText={
                          <ErrorMessage name="state">
                            {(msg) => <span className="text-red-600">{msg}</span>}
                          </ErrorMessage>
                        }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                        name="pincode"
                        as={TextField}
                        label="Pincode"
                        fullWidth
                        variant="outlined"
                        error={Boolean(ErrorMessage("pincode"))}
                        helperText={
                          <ErrorMessage name="pincode">
                            {(msg) => <span className="text-red-600">{msg}</span>}
                          </ErrorMessage>
                        }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                        name="city"
                        as={TextField}
                        label="City"
                        fullWidth
                        variant="outlined"
                        error={Boolean(ErrorMessage("city"))}
                        helperText={
                          <ErrorMessage name="city">
                            {(msg) => <span className="text-red-600">{msg}</span>}
                          </ErrorMessage>
                        }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Deliver Here
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </Modal>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Something went wrong, please try again."
        />
      </Fragment>
  );
};

export default Cart;
