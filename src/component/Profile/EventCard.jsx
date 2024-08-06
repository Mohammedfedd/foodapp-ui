import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard =() =>{
    return(
        <div>
            <Card sx={{width:345}}>
                <CardMedia
 
                sx={{height:345}}
                 image='https://www.pexels.com/photo/photo-of-juicy-burger-on-wooden-surface-1639565/' />
                <CardContent > 
                    <Typography variant='h5'>
                        Fast Food
                    </Typography>
                    <Typography variant='body2'>
                        50% off on your first order
                    </Typography>
                    <div className='py-2 space-y-2'>
                        <p>{"Fes"}</p>
                        <p className='text-sm text-blue-500'>August 06 , 2024 12:00 AM</p>
                        <p className='text-sm text-red-500'>August 07 , 2024 12:00 AM</p>
                    </div>
                </CardContent>
      {false &&       <CardActions>
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>  }
            </Card>
        </div>
    )
}