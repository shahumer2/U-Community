import { Box, Button, styled, TextareaAutosize, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from './Comment';
import "./Comments.css"


import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

const Container = styled(Box)
    `margin-top:100px ;
    display:flex
`

const TextArea = styled(TextareaAutosize)
    `
width:100% !important
height:100px
`

const initialValues = {
    name: "",
    postId: "",
    comments: "",
    rating: "",
    date: new Date()

}
const Image = styled("img")({
    width: 50,
    height: 50,
    borderRadius: "50 %"
})
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};


function Comments({ post }) {
    const [comment, setcomment] = useState(initialValues)
    const [comments, setcomments] = useState([])
    const [toggle, settoggle] = useState(false)
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const { account } = useContext(DataContext)

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    // const useStyles = makeStyles({
    //     root: {
    //         width: 200,
    //         display: 'flex',
    //         alignItems: 'center',
    //     },
    // });
    // const classes = useStyles();
    useEffect(() => {

        const getComments = async () => {
            try {
                let response = await API.getAllComments(post._id)
                if (response.isSuccess) {
                    setcomments(response.data)
                }

            } catch (error) {

            }


        }
        getComments();

    }, [post, toggle])

    const handleChange = (e, event) => {

        setcomment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value,
            date: new Date(),
            rating: value
        })




    }




    const addComment = async () => {
        let response = await API.newComment(comment)
        if (response.isSuccess) {

            setcomment({ comments: '' });

        }

        settoggle(prevState => !prevState)


    }

    return (
        <Box>
            <Box className="rate">
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                // onChangeActive={(event, newHover) => {
                //     setHover(newHover);
                // }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
            </Box>
            <Container  >
                <Image src={url} alt="dp" />


                <TextArea className='commm' style={{ width: "70%", height: "100px", margin: "10px 30px 20px 0", border: "1px solid " }} minRows={5}
                    value={comment.comments} minLength={6}
                    onChange={handleChange}

                    placeholder={"whats on your mind"} />


                <Button variant='contained'
                    color='primary'
                    style={{ margin: "30px 20px", height: "40px" }}
                    onClick={addComment}
                >POST</Button>

            </Container>
            <Typography className='totals'> Total Comments:{comments && comments.length}</Typography>
            <Box style={{ width: "50%", marginLeft: "15px" }}>
                {
                    comments && comments.length > 0 && comments.map(comment => (




                        <Comment comment={comment} settoggle={settoggle} />


                    ))
                }
            </Box>
        </Box >
    )
}

export default Comments;
