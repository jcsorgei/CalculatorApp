import express from 'express';
import { writeFile, readFile } from 'fs/promises';
import asyncHandler from "express-async-handler"


const PORT = parseInt(process.env.PORT || '3000', 10);

const main = async (): Promise<void> => {
    const app = express();
    app.use(express.json());

    app.post("/memory", asyncHandler(async (req, res, next) => {
        const { value } = req.body;

        if (!value) {
            res.status(400).send({error: 'value is missing'});
        }
        
        let valueString = value.toString();

        await writeFile("calculatorMemory.txt",valueString);

        res.status(201).send(valueString);

    }))

    app.get("/memory", asyncHandler(async (_req, res) =>{
        const memoryValue = await readFile("calculatorMemory.txt", "utf8");

        if (!memoryValue) {
            res.status(404).send({error: 'memory is empty'});
        }

        res.status(200).send(memoryValue);
    }))

    app.listen(PORT, ()=>{
        console.log(`Listening on PORT ${PORT}`);
    })
}

main().then(console.log).catch(console.error);