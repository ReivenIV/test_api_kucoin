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
  let allBuy: number = 0;
  let allSell: number = 0;
  for (let i = 0; i < value.length; i++) {
    let typeOfTransaction = value[i].side;
    let amountValue = value[i].size;

    if (typeOfTransaction === 'buy') {
      allBuy += parseFloat(amountValue);
    } else {
      allSell += parseFloat(amountValue);
    }
  }
  let delta: number = allBuy - allSell;

  return delta;
}
