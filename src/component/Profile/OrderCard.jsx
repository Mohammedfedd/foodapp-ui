import { Card,Button } from "@mui/material";
import React from "react";

export const OrderCard =({status,order}) =>{
    return (
        <Card className="flex justify-between items-center p-5 ">
            <div className="flex items-center space-x-5">
                <img
                    className="h-16 w-16"
                    src={order.food.images[0]}
                    alt=""
                />
                <div>
                    <p>{order.food.name}</p>
                    <p className="text-gray-400">{order.food.price} DH</p>
                </div>
            </div>
            <div>
                <Button className="cursor-not-allowed" variant="contained">{status}</Button>
            </div>
        </Card>
    );
}