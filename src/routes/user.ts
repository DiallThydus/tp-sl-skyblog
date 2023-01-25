import express from "express";
import { signUpUser, signInUser} from  "../handlers/user"
import { body } from 'express-validator';

const app = express.Router()

app.post('/signin',
body('password').isString().isLength({min: 8}),
body('email').isEmail(),
signInUser)

app.post('/signup',
 body('username').isString().isLength({min: 5, max: 64}),
 body('password').isString().isLength({min: 8}),
 body('email').isEmail(),
 signUpUser)

export default app