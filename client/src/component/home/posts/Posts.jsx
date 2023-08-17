
import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API } from "../../../service/api"
import { Link, useSearchParams } from "react-router-dom"



import Post from './Post'

const Posts = () => {

    const [posts, getPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category")



    useEffect(() => {
        const fetchData = async () => {
            // it is params cateofory: category
            let response = await API.getAllPosts({ category: category || "" });
            if (response.isSuccess) {
                getPosts(response.data);
            }
        }
        fetchData();
    }, [category]);


    return (
        <>
            {
                // post._id is the mongo db id of a particular post
                posts?.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>

                        <Link to={`details/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}>

                            < Post post={post} />
                        </Link>
                    </Grid>



                )) :

                    <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                        No data is available for selected category
                    </Box>
            }
        </>

    )
}
export default Posts

