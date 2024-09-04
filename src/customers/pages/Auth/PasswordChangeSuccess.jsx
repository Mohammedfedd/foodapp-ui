import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PasswordChangeSuccess = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => navigate("/account/login");

  return (
      <div className="min-h-screen px-5">
        <div className="flex flex-col items-center justify-center h-[90vh]">
          <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md">
            <TaskAltIcon sx={{ fontSize: "5rem", color: green[600] }} />
            <h1 className="py-5 text-2xl font-semibold">Password Changed Successfully!</h1>
            <p className="py-3 text-center text-gray-400">
              Your password has been updated.
            </p>
            <p className="py-2 text-center text-gray-200 text-lg">
              Please log in with your new credentials.
            </p>
            <Button
                variant="contained"
                className="my-5"
                sx={{ margin: "1rem 0rem" }}
                onClick={navigateToLogin}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
  );
};

export default PasswordChangeSuccess;
