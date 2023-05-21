import * as dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';


dotenv.config();
const app: Express = express();
app.use(bodyParser.json());


const kucoin_url= process.env.KUCOIN_URL;

const fetch_market = async (pair1: string, pair2: string) => {
  let fetch = await axios.get(
    `${kucoin_url}/api/v1/market/histories?symbol=${pair1}-${pair2}`,
  );
  return fetch.data;
};

app.post('/example', (req: Request, res: Response) => {
  const log = console.log(req.body.pair1);
  const log2 = console.log(req.body.pair2); 
  console.log(req.body);
  
 res.send({ log: req.body.pair1, log2: req.body.pair2 });
});

app.get(
    '/api/v1/delta',
    async (req: Request, res: Response, next: NextFunction) => {
        
    let startDeltaIndex: number = 0; // neutral

    //  buy === increment delta by sum = tot buy from index
    //  sell === decrement delta by sum = tot sell from index
    try {
      let data = await fetch_market('ETH', 'USDT');
      let value = data.data;
      let all_buy: number = 0;
      let all_sell: number = 0;
      for (let i = 0; i < value.length; i++) {
        let type_of_transaction = value[i].side;
        let amount_value = value[i].size;

        if (type_of_transaction === 'buy') {
          all_buy += parseFloat(amount_value);
        } else {
          all_sell += parseFloat(amount_value);
        }
      }
      let delta: number = all_buy - all_sell;

      return res.json({ delta });
    } catch (error) {
      next(error);
    }
  },
);

const port = process.env.PORT;
app.listen(port, () => {
  return console.log(`Listening on PORT:${port}`);
});
