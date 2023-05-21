import * as dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dataEndpoints from "./routes/data/data.ts";
dotenv.config();
const app: Express = express();

app.use(bodyParser.json());


app.use("/data",dataEndpoints)


const port = process.env.PORT;
app.listen(port, () => {
  return console.log(`Listening on PORT:${port}`);
});


