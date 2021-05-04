import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import Router from './config/Router';

import 'dotenv/config';

const APP: express.Express = express();

//conexão com o banco de dados
mongoose.connect(process.env.BD_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true 
});

new Router(APP);

http.createServer(APP).listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
})