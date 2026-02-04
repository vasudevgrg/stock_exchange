import { Router } from "express";
import {dbConnection} from './../db-connection'

export const router = Router();

router.post('/', async (req, res) => {
    await dbConnection.
})