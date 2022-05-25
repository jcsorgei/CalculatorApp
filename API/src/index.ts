import express from 'express';

const PORT = parseInt(process.env.PORT || '3000', 10);

const main = async (): Promise<void> => {
    const app = express();

    app.listen(PORT, ()=>{
        console.log(`Listening on PORT ${PORT}`);
    })
}

main().then(console.log).catch(console.error);