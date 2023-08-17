import { Box, Button, styled, Typography } from '@mui/material'
import React, { useContext } from 'react'

import { Delete } from "@mui/icons-material"
import { DataContext } from '../../../context/DataProvider'
import { API } from '../../../service/api'
import "./Comments.css"
import PersonIcon from '@mui/icons-material/Person';
import Rating from '@material-ui/lab/Rating';
const Components = styled(Box)
    `
    margin-top:30px;
    background:#f5f5f5;
    margin-left:30px;
    padding:10px;
    margin-right:30px;
`
const Container = styled(Box)
    `
display:flex;
margin-bottom:10px;
padding:10px;
gap:10px


`
const Name = styled(Typography)
    `
font-weight:600
`

const StyleDate = styled(Typography)
    `
    color:#878787;
    font-size:14px;
    `
// const DeleteIcons = styled(Delete)
//     `
//     display:flex
//     margin-left:auto !important;
//     padding-left:50px;
//     `

const Comment = ({ comment, settoggle }) => {
    const { account } = useContext(DataContext);

    const removeComment = async () => {


        let response = await API.deleteComment(comment._id)
        if (response.isSuccess) {
            settoggle(prevState => !prevState)
        }


    }

    return (
        <Components className="allcom">

            <Container className='deta' >
                <Box className="interior">
                    <PersonIcon></PersonIcon>
                    <Name className='name'>{comment.name}</Name>
                </Box>
                <Box className="last">
                    <Rating className='rating'
                        name="readOnly"
                        value={comment.rating}
                        precision={0.5}
                        readOnly

                    />
                    <StyleDate className='sdate'>{new Date(comment.date).toDateString()}</StyleDate>
                    {


                        comment.name === account.username ?
                            <div className='delbutton'>
                                <Delete color="primary" onClick={(e) => removeComment()}> click
                                </Delete>
                            </div>
                            : ''
                    }
                </Box>
                <Box>

                </Box>
            </Container>
            <Box>
                <Typography className='commb'>{comment.comments}</Typography>

            </Box>
        </Components >
    )
}

export default Comment