import { password } from "bun"
import z from "zod"

export const signupSchema= z.object({
    username:z.string().min(3),
    password: z.string().min(8)
    .regex(/[A-Z]/ ,"Password must contain an uppercase letter")
    .regex(/[a-z]/,"Password must contain a lowercase letter")
    .regex(/[0-9]/,"Password must contain a number")
    .regex(/[^A-Za-z0-9]/,"Password must contain a special character")
})

export const signinSchema = z.object({
    username : z.string(),
    password : z.string()
})