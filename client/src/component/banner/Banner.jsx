import { Box, Button, styled, Typography } from '@mui/material'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import "./Banner.css"

function Banner() {
    const [searchparams] = useSearchParams();
    const category = searchparams.get("category")
    const Stylebutt = styled(Button)
        `
    margin:10px
    `
    return (
        <Box className="boxx">
            <Typography className='heading1'> COMMUNITY</Typography>
            <Typography className='heading2'> For Every-One</Typography>
            <Link className='linkk' to={`/create?category=${category || ""}`}>
                <Stylebutt variant='contained' color='error' style={{ backgroundColor: "blue" }} > Create Blog</Stylebutt>
            </Link>

        </Box>


    )
}

export default Banner