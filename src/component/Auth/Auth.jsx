import { Alert, Box, Button, Modal, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "../Auth/RegisterForm";
import LoginForm from "../../component/Auth/LoginForm";
import ResetPasswordRequest from "./ResetPaswordRequest";
import ResetPasswordForm from "./ResetPasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../State/Authentication/Action";

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

const Auth = ({ open }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useSelector((store) => store);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    useEffect(() => {
        if (auth.success || auth.error) setOpenSnackBar(true);
    }, [auth.success, auth.error]);

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    };

    // Helper function to extract error or success message
    const getMessage = (message) => {
        if (typeof message === "string") {
            return message;
        } else if (message && message.response && message.response.data) {
            // Check for specific error conditions
            if (message.response.data.message === "Access denied") {
                return "Wrong email or password";
            }
            return message.response.data.message || "An error occurred.";
        } else if (message && message.message) {
            // Check for specific error conditions
            if (message.message === "Access denied") {
                return "Wrong email or password";
            }
            return message.message;
        } else {
            return "An unknown error occurred.";
        }
    };

    const handleModalClose = () => {
        navigate('/'); // Navigate to home page
    };

    return (
        <>
            <Modal
                open={
                    location.pathname === "/account/register" ||
                    location.pathname === "/account/login" ||
                    location.pathname === "/account/reset-password-request" ||
                    location.pathname === "/account/reset-password"
                }
                onClose={handleModalClose} // Use handleModalClose to close and navigate
            >
                <Box sx={style}>
                    {location.pathname === "/account/register" ? (
                        <RegisterForm />
                    ) : location.pathname === "/account/login" ? (
                        <LoginForm />
                    ) : location.pathname === "/account/reset-password" ? (
                        <ResetPasswordForm />
                    ) : (
                        <ResetPasswordRequest />
                    )}
                    <div className="flex justify-center mt-5">
                        {location.pathname === "/account/reset-password-request" || location.pathname === "/account/reset-password" ? (
                            <Button onClick={() => navigate("/account/login")}>
                                Go Back To Login
                            </Button>
                        ) : (
                            <Button
                                onClick={() => navigate("/account/reset-password-request")}
                            >
                                Forgot Password
                            </Button>
                        )}
                        <Snackbar
                            sx={{ zIndex: 50 }}
                            open={openSnackBar}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackBar}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <Alert severity={auth.error ? "error" : "success"} sx={{ width: "100%" }}>
                                {getMessage(auth.success || auth.error)}
                            </Alert>
                        </Snackbar>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default Auth;
