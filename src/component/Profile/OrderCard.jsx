import React from "react";
import { Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const OrderCard = ({ status, order }) => {
    const navigate = useNavigate();

    const handlePaymentClick = () => {
        // Redirect to payment link
        if (status === "PENDING_PAYMENT" && order.paymentLink) {
            window.location.href = order.paymentLink;
        }
    };

    return (
        <Card className="flex justify-between items-center p-5 ">
            <div className="flex items-center space-x-5">
                <img
                    className="h-16 w-16"
                    src={order.food.images ? order.food.images[0] : "default-image.jpg"}
                    alt={order.food.name}
                />
                <div>
                    <p>{order.food.name}</p>
                    <p className="text-gray-400">{order.food.price} DH</p>
                </div>
            </div>
            <div>
                <Button
                    className="cursor-pointer"
                    variant="contained"
                    onClick={handlePaymentClick}
                >
                    {status}
                </Button>
            </div>
        </Card>
    );
};
