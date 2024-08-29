import React, { useEffect } from "react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersOrders } from "../State/Order/Action";

export const Orders = () => {
    const { auth, order } = useSelector((store) => store);
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersOrders(jwt));
    }, [auth.jwt]);

    // Filter out orders with "PAYMENT_PENDING" status
    const filteredOrders = order.orders.filter((order) => order.orderStatus !== "PENDING_PAYMENT");

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
            <div className="space-y-5 w-full lg:w-1/2 ">
                {filteredOrders.map((order) =>
                    order.items.map((item) => (
                        <OrderCard key={item.id} status={order.orderStatus} order={item} />
                    ))
                )}
            </div>
        </div>
    );
};
