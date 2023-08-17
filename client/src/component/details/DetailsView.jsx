import { Box, Button, styled, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { API } from '../../service/api';
import "./DetailsView.css"
import { Edit, Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';
import PersonIcon from '@mui/icons-material/Person';
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import Swal from 'sweetalert2'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'; // optional
function DetailsView() {
    const [post, setpost] = useState({})
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
    const { id } = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(() => {

        const fetchData = async () => {
            try {
                let response = await API.getPostById(id)
                if (response.isSuccess) {
                    console.log(response, "detailsssssssss");
                    setpost(response.data)

                }
            } catch (error) {

            }


        }
        fetchData();

    }, [])
    const handleDelete = async () => {
        let response = await API.deletePost(post._id)

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                if (response.isSuccess) {
                    navigate("/")

                }
            }
        })

    }
    // const content = [post.username, post.country]

    return (


        // when to show edit and delete button when user name and post user name is same so check by contecxt api
        <Box Box className="mainn" style={{ margin: "50px 50px !important" }
        }>
            <img className='imgg' src={url} alt="" />

            <Box style={{ float: "right" }}>

                {

                    account.username === post.username &&
                    <>

                        <Link to={`/update/${post._id}`}>
                            <Edit className='edi' color='primary' />
                        </Link>

                        <Delete className='del' onClick={handleDelete} />

                    </>
                }

            </Box>
            <Typography className='auth'><PersonIcon ></PersonIcon> Author :<Box component="span" style={{ fontWeight: "600" }}> {post.name} </Box> </Typography>
            <Box className="my-container">
                <Tippy
                    className='tippy'
                    content={
                        <div className='contents'>
                            {post.username}
                            <br />
                            {post.country}
                            <br />
                            {post.name}

                        </div>
                    }
                    placement="right"

                >


                    <Button diabled className='userd' variant='contained'> View User Detail</Button>





                </Tippy>
            </Box>

            <Typography className='countr'><LanguageSharpIcon>cc</LanguageSharpIcon> Country :<Box component="span" style={{ fontWeight: "600" }}> {post.country}</Box></Typography>
            <Typography className='datess' style={{ marginLeft: "auto" }}>{new Date(post.createddate).toDateString()}</Typography>
            <Typography className='headdd'>{post.title}</Typography>
            <Typography className='descr' style={{ marginLeft: "20px" }}>{post.description}</Typography>

            <Box className="texty">


            </Box>

            <Comments className="comm" post={post} />

        </Box >
    )
}

export default DetailsView