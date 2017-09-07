import {INCREASE_FUNDS, SELL_STOCK} from "./types";

export const sellStock = (order) => ({
    type: SELL_STOCK,
    data: order
});

export const increaseFunds = (number) => ({
    type: INCREASE_FUNDS,
    data: number
});