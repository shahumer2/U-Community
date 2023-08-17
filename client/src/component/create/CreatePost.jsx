import { Box, Button, FormControl, InputBase, TextareaAutosize } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./CreatePost.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import Swal from 'sweetalert2'

const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    name: "",
    country: "",
    createddate: new Date()
}

function CreatePost() {
    const [file, setfile] = useState("")
    const [post, setpost] = useState(initialPost)
    const { account } = useContext(DataContext);
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    const location = useLocation();
    const navigate = useNavigate();
    // useEffect(() => {
    //     const getImage = async () => {
    //         // format is diff so save it in coreect format
    //         if (file) {
    //             const data = new FormData();
    //             data.append("name", file.name)
    //             data.append("file", file);
    //             //api call
    //             const response = await API.uploadFile(file);
    //             console.log("yess", response);
    //             post.picture = response.data
    //         }
    //     }
    //     getImage();
    //     post.categories = location.search?.split("=")[1] || "All"
    //     post.username = account.username
    // }, [file])
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB (example size, adjust as needed)

    useEffect(() => {
        const getImage = async () => {
            // format is diff so save it in correct format
            if (file) {
                // console.log("file", file);
                // console.log("name0", file.name);
                // if (file.size > MAX_FILE_SIZE) {
                //     console.log("File size exceeds the limit.");
                //     return;
                // }
                // console.log(file, "filbjzcx");
                const data = new FormData();

                data.set("name", file.name)
                data.set("file", file);
                // console.log("neww ", data.forEach(itm => console.log("itemmmm", itm)));
                // console.log("Name:", data.get("file", file));

                try {

                    // api call
                    const response = await API.uploadFile(data);
                    // console.log("newww", data);

                    post.picture = response.data;
                    // setpost({ ...post, picture: response.data.imageUrl })
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }
        }

        getImage();
        post.categories = location.search?.split("=")[1] || "All";
        post.username = account.username;
        post.name = account.name
        post.country = account.country
    }, [file]);



    const handleChange = (e) => {
        setpost({ ...post, [e.target.name]: e.target.value })


    }
    const submitPost = async () => {
        let response = await API.createpost(post)
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
            }
            if (response.isSuccess) {

                navigate("/")
            }


            else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }
    return (

        <Box className="box">
            <img className='img2' src={url} alt="" />
            <FormControl className='formcontrol'>
                <label htmlFor="fileinput"><AddCircleIcon fontSize='large' color='action' /></label>
                <input type="file" id='fileinput' onChange={(e) => setfile(e.target.files[0])} style={{ display: "none" }} />
                <InputBase className='inputt' placeholder='title' onChange={handleChange} name="title"></InputBase>
            </FormControl>
            <TextareaAutosize className='area' onChange={handleChange} name="description" placeholder='Tell Your Story' minRows={6} maxRows={6}>

            </TextareaAutosize>
            <Button className='pubb' variant="contained" onClick={submitPost}>Publish</Button>
        </Box >
    )
}

export default CreatePost