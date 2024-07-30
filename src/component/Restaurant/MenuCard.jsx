import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 
 
const  ingredients=[
    {}
]
const MenuCard =() =>{
    return(
       <Accordion>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"

        >
          <div className="lg:flex items-center justity-between" >
            <div  className="lg:flex items-center lg:gap-5">
                <img 
                className="w-[7rem] h-[7rem] object-cover" 
                src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1708317657/no8xfzdhsrdy4ezmcczr.jpg" 
                alt="" />
                <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                  <p className="font-semibold text-xl">Burger</p>
                  <p>80 dh </p>
                  <p className="text-gray-400">nice food </p>
                </div>
            </div>

          </div>
        </AccordionSummary>
        <AccordionDetails>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quasi 
            nulla nobis officiis impedit. Reiciendis, molestias. Odit, impedit 
            eligendi expedita, minus repellat necessitatibus doloremque maiores
             hic ea veniam exercitationem? Repudiandae!
        </AccordionDetails>
       </Accordion>
        



    )
    

}
export default MenuCard