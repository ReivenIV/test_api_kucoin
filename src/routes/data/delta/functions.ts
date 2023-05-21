import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

// ------------------------
//      delta functions
// ------------------------

const kucoin_url = process.env.KUCOIN_URL;

export async function fetch_market(pair1: string, pair2: string) {
  let fetch = await axios.get(
    `${kucoin_url}/api/v1/market/histories?symbol=${pair1}-${pair2}`,
  );
  return fetch.data;
}

export async function calculateDelta(pair1: string, pair2: string) {
  let data = await fetch_market(pair1, pair2);

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

  return delta;
}
