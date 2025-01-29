"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const deleteAllFiles = (orderedFileNames) => __awaiter(void 0, void 0, void 0, function* () {
    const modelNames = orderedFileNames.map(file => {
        const modelName = path_1.default.basename(file, path_1.default.extname(file));
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    });
    for (const name of modelNames) {
        const model = prisma[name];
        if (model) {
            yield model.deleteMany({});
            console.log(`cleared data from ${name}`);
        }
        else {
            console.error(`Model ${name} not found. Please ensure the model name is correctly specified.`);
        }
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataDir = path_1.default.join(__dirname, "seedData");
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
    ];
    yield deleteAllFiles(orderedFileNames);
    for (const fileName of orderedFileNames) {
        const filePath = path_1.default.join(dataDir, fileName);
        const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
        const model = prisma[modelName];
        if (!model) {
            console.error(`No Prisma model matches the file name: ${fileName}`);
            continue;
        }
        for (const data of jsonData) {
            yield model.create({
                data,
            });
        }
        console.log(`Seeded ${modelName} with data from ${fileName}`);
    }
});
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
