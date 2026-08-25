import z from "zod"

export const balanceSchema = z.object({
    amount: z.int().positive()
})