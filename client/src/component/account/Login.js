import { Box, TextField, Button, styled, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom'
import { API } from '../../service/api'
import "./Login.css"
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'

const Component = styled(Box)

    `
width:400px

`
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const signupInitialValues = {
    name: "",
    username: "",

    password: "",
    country: "",
}
const COUNTRIES = [
    {
        value: 'Select',

    },
    {
        value: 'INDIA',

    },
    {
        value: 'USA',

    },
    {
        value: 'JAPAN',

    },
    {
        value: 'CHINA',

    },
];


function Login({ setisAuthenticated }) {

    const [account, setaccount] = useState("login")
    const [signup, setsignup] = useState(signupInitialValues)
    const [login, setlogin] = useState({ username: "", password: "" })
    const [error, showError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();
    const toggleAccount = () => {
        setaccount("signup")
    }
    const onInputChange = (e) => {

        // e.taegt.name is as a key value
        setsignup({ ...signup, [e.target.name]: e.target.value })


    }


    const loginn = () => {
        setaccount("login")
    }
    const imgUrl = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png"

    const signupUser = async () => {
        if (signup.username.length <= 5 && !signup.username.includes('@')) {
            Swal.fire({
                title: '<strong>VALIDATION <u>ERROR</u></strong>',
                icon: 'info',
                html:
                    'Please    <b>Check the email field </b>, ',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, Continue!',

            })


            return

        }
        if (signup.password.length <= 7) {
            Swal.fire({
                title: '<strong>VALIDATION <u>ERROR</u></strong>',
                icon: 'info',
                html:
                    'Your  <b>Password is Too Short </b>, ',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, Continue!',

            })


            return

        }
        if (signup.name.length <= 4) {
            Swal.fire({
                title: '<strong>VALIDATION <u>ERROR</u></strong>',
                icon: 'info',
                html:
                    'Name <b>Is Too Short </b>, ',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, Continue!',

            })


            return

        }
        if (signup.country.length <= 0) {
            Swal.fire({
                title: '<strong>VALIDATION <u>ERROR</u></strong>',
                icon: 'info',
                html:
                    'Please Fill All The  <b>Country </b>, ',

                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, Continue!',

            })


            return

        }




        console.log(signup, "logggggg");
        let response = await API.userSignup(signup)
        console.log(response, "heyy");






        if (response.isSuccess) {

            showError('');
            setsignup(signupInitialValues);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sign Up Successfull',
                showConfirmButton: false,
                timer: 1500
            })
            setaccount("login")

        } else {
            showError('Something went wrong! please try again later');
        }
    }








    const onValueChange = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value })
    }

    // const loginUser = async () => {
    //     const response = await API.userLogin(login);
    //     console.log(response);
    //     if (response.isSuccess) {
    //         // showError('');

    //         sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
    //         sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
    //         // setAccount({ name: response.data.name, username: response.data.username });

    //         // isUserAuthenticated(true)
    //         setlogin(login);
    //         // navigate('/');
    //     } else {
    //         showError('Something went wrong! please try again later');
    //     }
    // }

    const loginUser = () => {

        API.userLogin(login)
            .then(response => {
                console.log(response);
                if (response.isSuccess) {
                    showError('');

                    sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                    sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                    // now use context api to store username and password 
                    setAccount({ name: response.data.name, username: response.data.username, country: response.data.country });

                    // isUserAuthenticated(true)
                    setlogin(login);
                    setisAuthenticated(true)



                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Login Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/');
                } else {
                    showError('Something went wrong! Please try again later.');
                }
            })
            .catch(error => {
                // Handle error if the API request fails
                showError('Incorrect Credentials.');
                console.error(error);
            });
    };







    return (
        <Box className="outer">

            <Box>

                <Component className='Box'>
                    <img className='image1' src={imgUrl} alt="" />
                    {
                        account === "login" ?







                            <div className='text'>
                                <TextField onChange={onValueChange} name="username" label="Enter Email" />
                                <TextField onChange={onValueChange} name="password" label="Enter Password" />
                                {error && <Error>{error}</Error>}
                                <br></br>
                                <Button onClick={loginUser} variant='contained' > Login</Button>
                                <Button onClick={toggleAccount}>Create An Account </Button>
                            </div>

                            :


                            <Component className='Boxy' >

                                <div className='textyy'>
                                    <TextField onChange={onInputChange} label="Enter name" name="name" />


                                    <TextField type="Email" required variant='outlined' onChange={onInputChange} label="Enter Email" name="username" />
                                    <TextField
                                        id="filled-select-currency-native"
                                        select
                                        label="COUNTRY"

                                        SelectProps={{
                                            native: true,
                                        }}
                                        onChange={onInputChange}
                                        helperText="Please select your Country"
                                        variant="filled"
                                        name="country"
                                    >
                                        {COUNTRIES.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.value}
                                            </option>
                                        ))}
                                    </TextField>
                                    <TextField type="password" required onChange={onInputChange} label="Enter Password" name="password"

                                        helperText={!signup ? "password is Required" : " Do Not Share Your Password With Anyone"}
                                        error={!signup}
                                    />

                                    <br></br>
                                    <Button onClick={signupUser} variant='contained' > Sign Up</Button>
                                    <Button onClick={loginn}>Already  A User </Button>
                                </div>
                            </Component>

                    }
                </Component>
            </Box>
        </Box>
    )

}

export default Login



// if (signup.username.length <= 5 && !signup.username.includes('@') || signup.password.length <= 7 || signup.name.length <= 4 || signup.country.length <= 0) {
//     Swal.fire({
//         title: '<strong>VALIDATION <u>ERROR</u></strong>',
//         icon: 'info',
//         html:
//             'Please Fill All The  <b>Required Field With Correct Information </b>, ',

//         showCloseButton: true,
//         showCancelButton: true,
//         focusConfirm: false,
//         confirmButtonText:
//             '<i class="fa fa-thumbs-up"></i> Great!',
//         confirmButtonAriaLabel: 'Thumbs up, Continue!',

//     })