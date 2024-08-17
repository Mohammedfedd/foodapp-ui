import {Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, FormGroup,Button} from "@mui/material";
import React, {useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {categorizedIngredients} from "../util/categorizeIngredients";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../State/Cart/Action";
const MenuCard =({item}) =>{
    const dispatch=useDispatch()
    const [selectedIngredients,setSelectedIngredients]=useState([])
    const handlecheckBoxChange=(itemName)=>{
        if(selectedIngredients.includes(itemName)){
            setSelectedIngredients(selectedIngredients.filter((item)=>item!==itemName))

        }
        else{
            setSelectedIngredients([...selectedIngredients,itemName])
        }
        console.log("value")
    }
    const handleAddItemToCart=(e)=>{
        e.preventDefault()
        const reqData={
            token:localStorage.getItem("jwt"),
            cartItem:{
                foodId:item.id,
                    quantity:1,
                ingredients:selectedIngredients,

        },

        };
        dispatch(addItemToCart(reqData))
        console.log(reqData);
    };
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
                src={item.images[0]}
                alt="" />
                <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                  <p className="font-semibold text-xl">{item.name}</p>
                  <p>{item.price} </p>
                  <p className="text-gray-400">{item.description} </p>
                </div>
            </div>

          </div>
        </AccordionSummary>
           <AccordionDetails>
               <form onSubmit={handleAddItemToCart}>
                   <div className="flex gap-5 flex-wrap">
                       {
                           Object.keys(categorizedIngredients(item.ingredients)).map((category) =>(
                               <div>
                                   <p>{item.category}</p>
                                   <FormGroup>
                                       {categorizedIngredients(item.ingredients)[category].map((item)=>( <FormControlLabel key={item.id} control={<Checkbox onChange={()=>handlecheckBoxChange(item.name)}/>} label={item.name}/>))}
                                   </FormGroup>
                               </div>
                           ))

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