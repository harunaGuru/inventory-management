import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";


const prisma = new PrismaClient();

const deleteAllFiles = async (orderedFileNames:string[]) =>{
    const modelNames = orderedFileNames.map(file=>{
        const modelName = path.basename(file, path.extname(file))
        return modelName.charAt(0).toUpperCase() + modelName.slice(1)
    })
    for (const name of modelNames){
        const model: any = prisma[name as keyof typeof prisma]
        if(model){
            await model.deleteMany({})
            console.log(`cleared data from ${name}`)
        }else{
            console.error(
                `Model ${name} not found. Please ensure the model name is correctly specified.`
              );
        }
    }
}
const main = async ()=> {
    const dataDir = path.join(__dirname, "seedData")

    const orderedFileNames = [
        "products.json",
        "expenseSummary.json",
        "sales.json",
        "salesSummary.json",
        "purchases.json",
        "purchaseSummary.json",
        "users.json",
        "expenses.json",
        "expenseByCategory.json",
    ]
    await deleteAllFiles(orderedFileNames)
    
    for (const fileName of orderedFileNames){
        const filePath = path.join(dataDir, fileName)
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
        const modelName = path.basename(fileName, path.extname(fileName));
        const model: any = prisma[modelName as keyof typeof prisma];
    
        if (!model) {
          console.error(`No Prisma model matches the file name: ${fileName}`);
          continue;
        }
        for (const data of jsonData) {
            await model.create({
              data,
            });
          }
          console.log(`Seeded ${modelName} with data from ${fileName}`);
    }
}
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });