import express from 'express'
import router from './v1/index.js'

const routerApi = express.Router();

routerApi.use('/v1', router)
export default routerApi;
