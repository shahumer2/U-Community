import { Box, TextField, Button, styled, Wrapper } from '@mui/material'
import React from 'react'
import "./Login.css"
import MenuItem from '@mui/material/MenuItem';
const Component = styled(Box)
    `
width:400px

`

function Login() {
    const imgUrl = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png"
    return (
        <Component className='Box'>
            <img className='image1' src={imgUrl} alt="" />
            <div className='text'>
                <TextField label="Enter name" />
                <TextField label="Enter Email" />
                <TextField label="Enter Password" />
                <br></br>
                <Button variant='contained' > Sign Up</Button>
                <Button>Already  A User </Button>
            </div>
        </Component>
    )
}

export default Login
