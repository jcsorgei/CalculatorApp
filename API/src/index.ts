import express, { NextFunction, Request, Response } from 'express';
import { writeFile, readFile } from 'fs/promises';
import asyncHandler from "express-async-handler"
import cors from 'cors';


const PORT = parseInt(process.env.PORT || '3000', 10);

const options: cors.CorsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: `http://localhost:${process.env.NEXT_PORT || 3001}`,
    preflightContinue: false,
  };
  

const main = async (): Promise<void> => {
    const app = express();
    app.use(express.json());
    app.use(cors(options));

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

    app.use('*', (req, res) => {
        return res.status(404).send({ error: 'not found' });
    });
    
    app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
        return res.status(500).send({ error: 'internal server error' });
    });
    

    app.listen(PORT, ()=>{
        console.log(`Listening on PORT ${PORT}`);
    })
}

main().then(console.log).catch(console.error);