import { Card,Button } from "@mui/material";
import React from "react";

export const OrderCard =() =>{
return(
   <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5 ">
        <img
        className="h-16 w-16 "
         src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.foodandwine.com%2Frecipes%2Fclassic-cheese-pizza&psig=AOvVaw0xl7enjOY-ClhC_Iyv_oHr&ust=1723061675728000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNiz44qX4YcDFQAAAAAdAAAAABAE" 
         alt="" />
         <div>
            <p>pizza</p>
            <p>50 dh</p>
         </div>
      </div>
      <div>
        <Button className="cursor-not-allowed"> completed </Button>
      </div>
   </Card>
);

}