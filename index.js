// import express from "express";
// import cors from "cors";
// import bodyparser from "body-parser";
// import dotenv from "dotenv"
// import nodemailer from "nodemailer";
const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const nodemailer = require("nodemailer")
require("dotenv").config()


// dotenv.config()

const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/sendmail",async (req, res) => {

    const  { text, email, item, tomail } = req.body

    try{

        let transport = nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: process.env.MAIL_FROM,
                pass: process.env.MAIL_PASS,
            }
        })
      
        let info = await transport.sendMail({
          from: email, // sender address
          to: tomail || "reingsroman042@gmail.com", // list of receivers
          subject: "Order", // Subject line
          text: "Order", // plain text body
          html: `<div style="
          border: 1px solid black;
          padding:15px;
          color: #000;
          font-size: 20px;
          ">
          <h3>Email : ${email}</h3>
          <p>Message : ${text}</p>
          <p>Ordered Item : ${item}</p>
          
          </div>`, // html body
        });
        console.log(info)
        res.send( { message: "Email send successfully" } )

    }catch(err){
        console.log(err)
    }

})


app.get("/",(req, res)=>{
    res.send("Its works")
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("server is running port 5000")
})