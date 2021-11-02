import React, {useRef} from 'react';
import emailjs, { init } from 'emailjs-com'; init("user_YEoSCj0vTG0FqH93Lfkdh")

import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';

import TEMPLATE_ID from './emailkey'
import USER_ID from './emailkey'
import SERVICE_ID from './emailkey'

import { useState } from 'react';

export function ContactUs() {
    const [firstname, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")


    const form = useRef();
    const sendEmail = (e) => {
        
        e.preventDefault(); 
        // emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
        // .then((result) => {
        // alert("Message Sent, We will get back to you shortly", result.text)
        // console.log(result.text)
        // },

        emailjs.send("service_287i34a","template_i7qavvz",{
            Subject: "Customer Inquiry",
            firstname: firstname,
            lastname: lastName,
            email: email,
            message: message,
            })
            .then((result) => {
                alert("Message Sent, We will get back to you shortly", result.text)
                console.log(result.text)
            }).catch((error) => {
                alert("An error occurred. Please try again", error.text)
                console.log(error)})
        
    };

    return (
        <div classname="ContctUs">
            <Typography gutterBottom variant="h3" align="center">
                Contact Us
            </Typography>

            <Card style={{maxWidth:450, margin:"0 auto"}}>
                <CardContent>
                    <form ref={form} 
                    onSubmit={sendEmail}
                    >
                    <Grid container spacing={1}>

                        <Grid xs={12} item align="center">
                            <TextField 
                            fullWidth label="First Name" 
                            placeholder="Enter First Name" 
                            variant="outlined"> 
                            onChange={function (event) {
                                setFirstName(event.target.value)
                            }}
                            </TextField>
                        </Grid>


                        <Grid xs={12} item align="center">
                            <TextField 
                            fullWidth label="Last Name" 
                            placeholder="Enter Last Name" 
                            variant="outlined"> 
                            onChange={function (event) {
                                setLastName(event.target.value)
                            }}
                            </TextField>
                        </Grid>

                        <Grid xs={12} item align="center">
                            <TextField 
                            fullWidth type="email" 
                            label=" Email" 
                            placeholder="Enter Email" 
                            variant="outlined"> 
                            onChange={function (event) {
                                setEmail(event.target.value)
                            }}
                            </TextField>
                        </Grid>


                        <Grid xs={12} item align="center">
                            <TextField 
                            fullWidth label=" Message" 
                            multiline rows={10} 
                            placeholder="Enter Email" 
                            variant="outlined"> 
                             onChange={function (event) {
                                setMessage(event.target.value)
                            }}
                            </TextField>
                        </Grid>

                        <Grid xs={12} item align="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            > Submit </Button>
                        </Grid>

                    </Grid>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}