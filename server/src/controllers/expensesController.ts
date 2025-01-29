import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const getExpenses = async(req: Request, res: Response):Promise<void> =>{
    try {
        const expensesRaw = await prisma.expenseByCategory.findMany({
            orderBy:{
                date:'desc',
            }
        })
        const expensByCategorySummary = expensesRaw.map((expense)=> (
            {...expense, amount: expense.amount.toString()}
        ))
        res.json(expensByCategorySummary)
    } catch (error) {
        res.status(500).json({message: "Error retrieving expenses"})
        
    }
}