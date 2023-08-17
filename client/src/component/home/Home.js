import { Grid } from '@mui/material'
import React from 'react'
import Banner from '../banner/Banner'
import Categories from './Categories'
import Posts from './posts/Posts'
import "./Home.css"
function Home() {
    return (
        <>

            <Banner />
            <Grid container>
                <Grid item lg={2} sm={12} xs={12}>
                    <Categories style={{ backgroundColor: "f5f5f5" }} />
                </Grid>
                <Grid className='contt' container item lg={10} sm={12} xs={12}>
                    <Posts />
                </Grid>
            </Grid>

        </>
    )
}

export default Home