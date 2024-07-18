// const express = require('express');
import express from 'express'
import connect from './config/database.js'
import Tweet from './models/Tweet.js'
import routerApi from './routes/index.js'
import bodyParser from 'body-parser'
import passport from 'passport'
import { passportAuth } from './config/jwt-middleware.js'

const PORT = 3001
import { UserRepository } from './repository/index.js';



const SetUpAndStartServer = async () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/api', routerApi)
    app.use(passport.initialize());
    passportAuth(passport);

    app.listen(PORT, async () => {
        console.log("Heeyaa server started at port", PORT)
        await connect();
        console.log("MOngo db connected");


    });

}

SetUpAndStartServer()