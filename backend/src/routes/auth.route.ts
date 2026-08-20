import { Router } from "express";
import { signup,signin } from "../controller/auth.controller";
import { valditation } from "../middleware/auth.validate.middleware";
import { signupSchema, signinSchema } from "../valditation/auth.validation";

 const route = Router()

route.post('/signup',valditation(signupSchema) , signup)
route.post('/signin',valditation(signinSchema), signin)

export default route