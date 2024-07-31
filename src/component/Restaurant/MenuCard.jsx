import {Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, FormGroup,Button} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const  demo=[
    {
        category:"Nuts & Seeds",
        ingredients:["Cashews"]
    },
    {
        category:"Protein",
        ingredients:["Ground Beef","Chicken"]
    },
]
const MenuCard =() =>{
    const handlecheckBoxChange=(value)=>{
        console.log("value")
    }
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
               <form>
                   <div className="flex gap-5 flex-wrap">
                       {
                           demo.map((item) =>
                               <div>
                                   <p>{item.category}</p>
                                   <FormGroup>
                                       {item.ingredients.map((item)=> <FormControlLabel control={<Checkbox onChange={()=>handlecheckBoxChange}/>} label={item}/>)}
                                   </FormGroup>
                               </div>
                           )

                       }
                   </div>
                   <div className="pt-5">
                    <Button variant="contained" disabled={false} type="submit">{true?"Add to Cart":"Out of Strock"}</Button>
                   </div>
               </form>
           </AccordionDetails>
       </Accordion>


    )


}
export default MenuCard