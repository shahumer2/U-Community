
import { Box, Button, Typography } from "@mui/material"
import { useContext } from "react"
import { DataContext } from "../../../context/DataProvider"
import { eliptsis } from "../../../utils/common-utils"
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import "./Post.css"


const Post = ({ post }) => {
    const { account } = useContext(DataContext);
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
    return (

        <Box className="Wrapper" id="wrap">

            <Box className="imagess">
                <Box className="inner">

                    <img className="img" src={url} alt="blog" />
                    <Typography className="type"> {post.categories}</Typography>
                    <Typography className="user"><AccountCircleSharpIcon className="uicon"></AccountCircleSharpIcon> {post.name}</Typography>
                    <Typography className='user'><LanguageSharpIcon className="picon"></LanguageSharpIcon>{post.country}</Typography>
                </Box>
                <Box className="content">


                    <Typography className="heading"> {eliptsis(post.title, 30)}</Typography>


                    <Typography className="details"> {eliptsis(post.description, 50)}</Typography>
                    <Button className="detbutt" variant="outlined" color="success"> View Details</Button>
                </Box>
            </Box>





        </Box >

    )
}

export default Post